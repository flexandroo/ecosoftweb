import fs from "node:fs";

const XML_PATH =
  "C:/Users/kav10/Documents/Codex/2026-06-03/xml-ecosoft-ua/outputs/ecosoft_products.xml";
const OUT_PATH = new URL("../lib/products.ts", import.meta.url);

const xml = fs.readFileSync(XML_PATH, "utf8");

// ---- category mapping (XML "parent :: name" -> { category, subcategory }) ----
const CAT = {
  "Фільтри зворотного осмосу": "reverse-osmosis",
  "Проточні фільтри": "flow-filters",
  "Фільтраційні системи": "filtration-systems",
  "Магістральні фільтри": "mainline-filters",
  "Картриджі для фільтрів води": "ro-cartridges",
  "Картриджі для магістральних фільтрів": "mainline-cartridges",
  "Матеріали для фільтраційних систем": "filter-media",
  "Фільтри для кафе, ресторанів, готелів": "horeca",
};
const SUB = {
  "Фільтри PURE з мінералами": "ro-pure",
  "Покращені фільтри Absolute": "ro-absolute",
  "Базові фільтри Standard": "ro-standard",
  "Смарт фільтри CROSS": "ro-cross",
  "Потрійні фільтри": "flow-triple",
  "Компактні фільтри": "fs-compact",
  "Фільтри від заліза та твердості": "fs-iron-hardness",
  "Фільтри колонного типу": "fs-column",
  "Фільтри помякшення води": "fs-softening",
  "Фільтри для видалення хлору": "fs-chlorine",
  "Фільтри від сірководню": "fs-h2s",
  "Фільтри механічного очищення": "fs-mechanical",
  "Промивні": "ml-flushing",
  "Картриджні": "ml-cartridge",
  "Від накипу": "ml-antiscale",
  "Для гарячої води": "ml-hot",
  "Для холодної води": "ml-cold",
  "Для зворотних осмосів Standard": "roc-standard",
  "Для зворотних осмосів Absolute": "roc-absolute",
  "Для зворотних осмосів PURE": "roc-pure",
  "Для проточних фільтрів": "roc-flow",
  "Для стандартного фільтра 2,5x10": "mlc-standard",
  "Для фільтра BB10 4,5x10": "mlc-bb10",
  "Для фільтра BB20 4,5x20": "mlc-bb20",
  "Фільтрувальний матеріал Ecomix": "fm-ecomix",
  "Таблетована сіль": "fm-salt",
  "Вугілля": "fm-carbon",
  "Іонообмінні смоли": "fm-resin",
  "Для механічної фільтрації": "fm-mechanical",
  "Фільтри для кафе, ресторанів, готелів": null, // horeca has no subcategory
};

// labels that should not become features (some become badges instead)
const BADGE_PRIORITY = [
  ["Бестселер", "Хіт продажів"],
  ["Новинка", "Новинка"],
  ["Акція", "Акція"],
];
const SKIP_LABELS = new Set([
  "Акція",
  "Новинка",
  "Бестселер",
  "Аналіз води",
  "Проєкт",
  "Тільки в Екософт",
]);

function cdata(s) {
  const m = s.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  return m ? m[1] : s;
}

function cleanText(s) {
  return s
    .replace(/\r/g, "")
    .split("\n")
    .map((l) => l.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function isHeadingLine(l) {
  // ALL CAPS slogans / short headings repeated as titles
  const letters = l.replace(/[^A-Za-zА-Яа-яІЇЄҐіїєґ]/g, "");
  if (!letters) return true;
  return letters === letters.toUpperCase() && l.length < 80;
}

function makeShort(schema, name) {
  const lines = cleanText(schema).split("\n").filter(Boolean);
  for (const l of lines) {
    if (l.length >= 30 && !isHeadingLine(l)) {
      return l.length > 160 ? l.slice(0, 157).replace(/\s+\S*$/, "") + "…" : l;
    }
  }
  return name;
}

function makeDescription(schema) {
  const text = cleanText(schema);
  if (text.length <= 520) return text;
  const cut = text.slice(0, 520);
  const lastDot = cut.lastIndexOf(". ");
  const lastNl = cut.lastIndexOf("\n");
  const at = Math.max(lastDot, lastNl);
  return (at > 200 ? cut.slice(0, at + (lastDot >= lastNl ? 1 : 0)) : cut).trim() + "…";
}

function pickImage(block) {
  const imgs = [...block.matchAll(/<image>([^<]+)<\/image>/g)].map((m) => m[1]);
  return (
    imgs.find((u) => !/ytimg|youtube/.test(u) && !/\/75_75_/.test(u)) ||
    imgs.find((u) => !/ytimg|youtube/.test(u)) ||
    imgs[0] ||
    null
  );
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9а-яіїєґ]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}

const rawProducts = xml.split(/<product\s/).slice(1).map((p) => "<product " + p);

const usedSlug = new Set();
const usedId = new Set();
const unmapped = new Set();
const out = [];

for (const block of rawProducts) {
  const head = block.match(/<product\s+sku="([^"]*)"\s+available="([^"]*)"/);
  const sku = head ? head[1] : "";
  const available = head ? head[2] === "true" : true;

  const rawName = cdata((block.match(/<name>([\s\S]*?)<\/name>/) || [])[1] || "");
  const name = rawName.replace(/\s*\([^()]*\)\s*$/, "").trim() || rawName.trim();

  const url = (block.match(/<url>([\s\S]*?)<\/url>/) || [])[1].trim();
  const stock = (block.match(/<stock>([\s\S]*?)<\/stock>/) || [])[1] || "";
  const inStock = available && /in_stock/.test(stock);
  const price = parseInt(
    (block.match(/<price[^>]*>(\d+)/) || [])[1] || "0",
    10
  );

  // memberships from product-level <categories> block
  const catBlock = (block.match(/<categories>([\s\S]*?)<\/categories>/) || [])[1] || "";
  const memberships = [];
  const seen = new Set();
  for (const m of catBlock.matchAll(/<category parent="([^"]*)" name="([^"]*)"/g)) {
    const parent = m[1];
    const subName = m[2];
    const category = CAT[parent];
    if (!category) {
      unmapped.add(parent);
      continue;
    }
    const subcategory = SUB[subName] === undefined ? undefined : SUB[subName];
    if (SUB[subName] === undefined && subName !== parent) unmapped.add(subName);
    const key = category + "/" + (subcategory || "");
    if (seen.has(key)) continue;
    seen.add(key);
    memberships.push({ category, subcategory: subcategory || undefined });
  }
  if (memberships.length === 0) continue; // skip products we cannot place

  // labels -> badge + features
  const labelBlock = (block.match(/<labels>([\s\S]*?)<\/labels>/) || [])[1] || "";
  const labels = [...labelBlock.matchAll(/<label><!\[CDATA\[([\s\S]*?)\]\]><\/label>/g)].map(
    (m) => m[1].trim()
  );
  let badge;
  for (const [needle, val] of BADGE_PRIORITY) {
    if (labels.includes(needle)) {
      badge = val;
      break;
    }
  }
  const features = labels.filter((l) => !SKIP_LABELS.has(l)).slice(0, 6);

  const schema = cdata((block.match(/<schemaDescription>([\s\S]*?)<\/schemaDescription>/) || [])[1] || "");
  const shortDescription = makeShort(schema, name);
  const description = makeDescription(schema) || shortDescription;
  const image = pickImage(block);

  // ids / slugs
  let id = sku || slugify(name);
  while (usedId.has(id)) id = id + "-x";
  usedId.add(id);

  let slug = slugify(url.split("/").filter(Boolean).pop() || sku || name);
  if (!slug) slug = slugify(sku || name);
  let base = slug;
  let n = 2;
  while (usedSlug.has(slug)) slug = base + "-" + n++;
  usedSlug.add(slug);

  out.push({
    id,
    slug,
    name,
    category: memberships[0].category,
    subcategory: memberships[0].subcategory,
    memberships,
    price,
    image,
    shortDescription,
    description,
    features,
    badge,
    inStock,
  });
}

if (unmapped.size) {
  console.error("UNMAPPED:", [...unmapped]);
  process.exit(1);
}

// ---- serialize ----
const categoriesLiteral = `[
  {
    slug: "reverse-osmosis",
    title: "Фільтри зворотного осмосу",
    description:
      "Багатоступеневе очищення води до рівня питної. Видаляють до 99,8% домішок, солей, бактерій і вірусів.",
    icon: "osmosis",
    subcategories: [
      { slug: "ro-pure", title: "PURE з мінералізацією" },
      { slug: "ro-absolute", title: "Absolute" },
      { slug: "ro-standard", title: "Standard" },
      { slug: "ro-cross", title: "Смарт CROSS" },
    ],
  },
  {
    slug: "flow-filters",
    title: "Проточні фільтри",
    description:
      "Системи під мийку для щоденного очищення питної води. Швидкий потік без накопичувального бака.",
    icon: "drop",
    subcategories: [{ slug: "flow-triple", title: "Потрійні системи" }],
  },
  {
    slug: "filtration-systems",
    title: "Фільтраційні системи",
    description:
      "Комплексне очищення води для дому — від заліза, жорсткості, хлору та сірководню до механічних домішок.",
    icon: "gear",
    subcategories: [
      { slug: "fs-compact", title: "Компактні системи" },
      { slug: "fs-iron-hardness", title: "Від заліза та твердості" },
      { slug: "fs-column", title: "Колонного типу" },
      { slug: "fs-softening", title: "Пом'якшення води" },
      { slug: "fs-chlorine", title: "Видалення хлору" },
      { slug: "fs-h2s", title: "Від сірководню" },
      { slug: "fs-mechanical", title: "Механічного очищення" },
    ],
  },
  {
    slug: "mainline-filters",
    title: "Магістральні фільтри",
    description:
      "Очищення води на вході у квартиру чи будинок. Захищають сантехніку й техніку від домішок, іржі та накипу.",
    icon: "filter",
    subcategories: [
      { slug: "ml-flushing", title: "Промивні" },
      { slug: "ml-cartridge", title: "Картриджні" },
      { slug: "ml-antiscale", title: "Від накипу" },
      { slug: "ml-hot", title: "Для гарячої води" },
      { slug: "ml-cold", title: "Для холодної води" },
    ],
  },
  {
    slug: "ro-cartridges",
    title: "Картриджі для фільтрів води",
    description:
      "Оригінальні змінні картриджі та мембрани Ecosoft для систем осмосу й проточних фільтрів.",
    icon: "cartridge",
    subcategories: [
      { slug: "roc-standard", title: "Standard" },
      { slug: "roc-absolute", title: "Absolute" },
      { slug: "roc-pure", title: "PURE" },
      { slug: "roc-flow", title: "Для проточних фільтрів" },
    ],
  },
  {
    slug: "mainline-cartridges",
    title: "Картриджі для магістральних фільтрів",
    description:
      "Змінні картриджі типорозмірів Standard і Big Blue для магістральних корпусів Ecosoft.",
    icon: "accessory",
    subcategories: [
      { slug: "mlc-standard", title: 'Standard 2,5"×10"' },
      { slug: "mlc-bb10", title: 'BB10 4,5"×10"' },
      { slug: "mlc-bb20", title: 'BB20 4,5"×20"' },
      { slug: "mlc-antiscale", title: "Від накипу" },
    ],
  },
  {
    slug: "filter-media",
    title: "Матеріали для фільтраційних систем",
    description:
      "Засипки та реагенти для завантаження й обслуговування фільтраційних колон і систем пом'якшення.",
    icon: "leaf",
    subcategories: [
      { slug: "fm-ecomix", title: "Ecomix" },
      { slug: "fm-salt", title: "Таблетована сіль" },
      { slug: "fm-carbon", title: "Вугілля" },
      { slug: "fm-resin", title: "Іонообмінні смоли" },
      { slug: "fm-mechanical", title: "Для механічної фільтрації" },
    ],
  },
  {
    slug: "horeca",
    title: "Фільтри для кафе, ресторанів, готелів",
    description:
      "Професійні рішення водопідготовки для HoReCa — для кавомашин, пароконвектоматів та льодогенераторів.",
    icon: "award",
    subcategories: [],
  },
]`;

function lit(p) {
  const parts = [];
  parts.push(`    id: ${JSON.stringify(p.id)}`);
  parts.push(`    slug: ${JSON.stringify(p.slug)}`);
  parts.push(`    name: ${JSON.stringify(p.name)}`);
  parts.push(`    category: ${JSON.stringify(p.category)}`);
  if (p.subcategory) parts.push(`    subcategory: ${JSON.stringify(p.subcategory)}`);
  const mems = p.memberships
    .map(
      (m) =>
        `{ category: ${JSON.stringify(m.category)}${
          m.subcategory ? `, subcategory: ${JSON.stringify(m.subcategory)}` : ""
        } }`
    )
    .join(", ");
  parts.push(`    memberships: [${mems}]`);
  parts.push(`    price: ${p.price}`);
  if (p.image) parts.push(`    image: ${JSON.stringify(p.image)}`);
  parts.push(`    shortDescription: ${JSON.stringify(p.shortDescription)}`);
  parts.push(`    description: ${JSON.stringify(p.description)}`);
  parts.push(`    features: ${JSON.stringify(p.features)}`);
  if (p.badge) parts.push(`    badge: ${JSON.stringify(p.badge)}`);
  parts.push(`    inStock: ${p.inStock}`);
  return `  {\n${parts.join(",\n")},\n  }`;
}

const file = `import type { IconName } from "@/components/Icon";

// AUTO-GENERATED product data from ecosoft.ua catalog export.
// Categories taxonomy is hand-maintained; products imported via scripts/gen-products.mjs.

export type Subcategory = {
  slug: string;
  title: string;
};

export type Category = {
  slug: string;
  title: string;
  description: string;
  icon: IconName;
  subcategories: Subcategory[];
};

export type Membership = {
  category: string;
  subcategory?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string; // primary category slug
  subcategory?: string; // primary subcategory slug
  memberships: Membership[]; // all category/subcategory placements
  price: number; // UAH
  oldPrice?: number;
  image?: string;
  shortDescription: string;
  description: string;
  features: string[];
  badge?: string;
  inStock: boolean;
};

export const categories: Category[] = ${categoriesLiteral};

export const products: Product[] = [
${out.map(lit).join(",\n")},
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getSubcategory(
  categorySlug: string,
  subSlug: string
): Subcategory | undefined {
  return getCategory(categorySlug)?.subcategories.find((s) => s.slug === subSlug);
}

export function productInCategory(
  product: Product,
  categorySlug?: string,
  subSlug?: string
): boolean {
  if (!categorySlug) return true;
  return product.memberships.some(
    (m) =>
      m.category === categorySlug && (!subSlug || m.subcategory === subSlug)
  );
}

export function productsByCategory(slug: string): Product[] {
  return products.filter((p) => productInCategory(p, slug));
}

export function formatPrice(uah: number): string {
  return new Intl.NumberFormat("uk-UA").format(uah) + " ₴";
}
`;

fs.writeFileSync(OUT_PATH, file, "utf8");

// summary
const byCat = {};
for (const p of out)
  for (const m of p.memberships) {
    const k = m.category + (m.subcategory ? "/" + m.subcategory : "");
    byCat[k] = (byCat[k] || 0) + 1;
  }
console.log("Products written:", out.length);
console.log("With image:", out.filter((p) => p.image).length);
console.log("With badge:", out.filter((p) => p.badge).length);
console.log("In stock:", out.filter((p) => p.inStock).length);
console.log("Placements:");
console.log(
  Object.entries(byCat)
    .sort()
    .map(([k, v]) => "  " + k + ": " + v)
    .join("\n")
);

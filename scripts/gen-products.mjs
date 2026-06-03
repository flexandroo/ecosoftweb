import fs from "node:fs";

const XML_PATH =
  "C:/Users/kav10/Documents/Codex/2026-06-03/xml-ecosoft-ua/outputs/ecosoft_products.xml";
const DATA_PATH = new URL("../lib/products.data.json", import.meta.url);
const DETAILS_PATH = new URL("../lib/product-details.data.json", import.meta.url);

const xml = fs.readFileSync(XML_PATH, "utf8");

// ---- category mapping (XML "parent" -> category slug, "name" -> subcategory slug) ----
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
  "Фільтри для кафе, ресторанів, готелів": null,
};

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

// sections handled elsewhere or pure noise -> not kept as generic content sections
const SKIP_SECTIONS = new Set([
  "Опис", // duplicates schemaDescription
  "Характеристики", // rendered as a structured specs table
  "З цим товаром рекомендуємо", // cross-sell list, not product info
  "Відгуки", // parsed into structured reviews
]);

function decodeEntities(s) {
  return s
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#34;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

function cdata(s) {
  const m = s.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  return m ? m[1] : s;
}

function cleanText(s) {
  return s
    .replace(/\r/g, "")
    .split("\n")
    .map((l) => l.replace(/ /g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function isHeadingLine(l) {
  const letters = l.replace(/[^A-Za-zА-Яа-яІЇЄҐіїєґ]/g, "");
  if (!letters) return true;
  return letters === letters.toUpperCase() && l.length < 80;
}

function makeShort(schema, name) {
  const lines = cleanText(schema).split("\n").filter(Boolean);
  for (const l of lines) {
    if (l.length >= 30 && !isHeadingLine(l)) {
      return l.length > 170 ? l.slice(0, 167).replace(/\s+\S*$/, "") + "…" : l;
    }
  }
  return name;
}

function stripSectionHeader(name, body) {
  let lines = cleanText(body).split("\n");
  const lname = name.toLowerCase();
  // drop up to 2 leading lines that just repeat the section title
  let dropped = 0;
  while (lines.length && dropped < 2) {
    const l = lines[0].trim().toLowerCase().replace(/\s+/g, " ");
    if (l === lname || (isHeadingLine(lines[0]) && l.replace(/[()0-9\s]/g, "") === lname.replace(/[()0-9\s]/g, ""))) {
      lines.shift();
      dropped++;
    } else break;
  }
  return lines.join("\n").trim();
}

function pickGallery(block) {
  const all = [...block.matchAll(/<image>([^<]+)<\/image>/g)]
    .map((m) => m[1])
    .filter((u) => /ecosoft\.ua/.test(u));
  const groups = new Map(); // basename -> best url
  const order = [];
  const sizeRank = (u) =>
    /564_564/.test(u) ? 3 : /350_350/.test(u) ? 2 : /75_75/.test(u) ? 0 : 1;
  for (const u of all) {
    const base = (u.split("/").pop() || "").replace(/^\d+_\d+_/, "");
    if (!groups.has(base)) {
      groups.set(base, u);
      order.push(base);
    } else if (sizeRank(u) > sizeRank(groups.get(base))) {
      groups.set(base, u);
    }
  }
  return order.map((b) => groups.get(b)).slice(0, 12);
}

function parseReviews(body) {
  let lines = cleanText(body)
    .split("\n")
    .map((l) => l.trim())
    .filter(
      (l) =>
        l &&
        l !== "Додати відгук" &&
        l !== "Розгорнути відповідь" &&
        l !== "Показати ще" &&
        l !== "Відгуки" &&
        !/^ВІДГУКИ/i.test(l)
    );
  const dateRe = /^\d{2}\.\d{2}\.\d{4}\s+\d{2}:\d{2}:\d{2}$/;
  const dateIdx = [];
  lines.forEach((l, i) => {
    if (dateRe.test(l)) dateIdx.push(i);
  });
  const reviews = [];
  for (let k = 0; k < dateIdx.length; k++) {
    const di = dateIdx[k];
    const author = di > 0 ? lines[di - 1] : "Клієнт";
    const end = k + 1 < dateIdx.length ? dateIdx[k + 1] - 1 : lines.length;
    const text = lines
      .slice(di + 1, end)
      .join("\n")
      .replace(/\n(Переваги:|Недоліки:)/g, "\n$1 ")
      .trim();
    if (author && text) reviews.push({ author, date: lines[di], text });
  }
  return reviews.slice(0, 12);
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9а-яіїєґ]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}

const rawProducts = xml
  .split(/<product\s/)
  .slice(1)
  .map((p) => "<product " + p.split("</product>")[0]);

const usedSlug = new Set();
const usedId = new Set();
const unmapped = new Set();
const out = [];

for (const block of rawProducts) {
  const head = block.match(/<product\s+sku="([^"]*)"\s+available="([^"]*)"/);
  const sku = head ? head[1] : "";
  const available = head ? head[2] === "true" : true;

  const rawName = decodeEntities(
    cdata((block.match(/<name>([\s\S]*?)<\/name>/) || [])[1] || "")
  ).trim();
  const name = rawName.replace(/\s*\([^()]*\)\s*$/, "").trim() || rawName;

  const url = (block.match(/<url>([\s\S]*?)<\/url>/) || [])[1].trim();
  const brand = decodeEntities(
    (block.match(/<brand>([\s\S]*?)<\/brand>/) || [])[1] || ""
  ).trim();
  const stock = (block.match(/<stock>([\s\S]*?)<\/stock>/) || [])[1] || "";
  const inStock = available && /in_stock/.test(stock);
  const price = parseInt((block.match(/<price[^>]*>(\d+)/) || [])[1] || "0", 10);

  // memberships
  const catBlock = (block.match(/<categories>([\s\S]*?)<\/categories>/) || [])[1] || "";
  const memberships = [];
  const seen = new Set();
  for (const m of catBlock.matchAll(/<category parent="([^"]*)" name="([^"]*)"/g)) {
    const parent = decodeEntities(m[1]);
    const subName = decodeEntities(m[2]);
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
    memberships.push(subcategory ? { category, subcategory } : { category });
  }
  if (memberships.length === 0) continue;

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

  const schema = cdata(
    (block.match(/<schemaDescription>([\s\S]*?)<\/schemaDescription>/) || [])[1] || ""
  );
  const shortDescription = makeShort(schema, name);
  const description = cleanText(schema);

  const gallery = pickGallery(block);
  const image = gallery[0] || null;

  // characteristics -> specs
  const specs = [];
  const specSeen = new Set();
  for (const m of block.matchAll(
    /<characteristic name="([^"]*)"><!\[CDATA\[([\s\S]*?)\]\]><\/characteristic>/g
  )) {
    const cname = decodeEntities(m[1]).trim();
    const value = decodeEntities(m[2]).replace(/\s+/g, " ").trim();
    if (!cname || !value) continue;
    const key = cname + "=" + value;
    if (specSeen.has(key)) continue;
    specSeen.add(key);
    specs.push({ name: cname, value });
  }

  // documents
  const documents = [];
  const docSeen = new Set();
  for (const m of block.matchAll(
    /<document title="([^"]*)">([^<]+)<\/document>/g
  )) {
    const durl = m[2].trim();
    if (docSeen.has(durl)) continue;
    docSeen.add(durl);
    documents.push({ title: decodeEntities(m[1]).trim(), url: durl });
  }

  // sections (content) + reviews
  const sections = [];
  let reviews = [];
  let reviewCount = 0;
  for (const m of block.matchAll(/<section name="([^"]*)">([\s\S]*?)<\/section>/g)) {
    const sname = decodeEntities(m[1]).trim();
    const raw = cdata(m[2]);
    if (sname === "Відгуки") {
      reviews = parseReviews(raw);
      const cm = raw.match(/ВІДГУКИ\s*\((\d+)\)/i);
      reviewCount = cm ? parseInt(cm[1], 10) : reviews.length;
      continue;
    }
    if (SKIP_SECTIONS.has(sname)) continue;
    let body = stripSectionHeader(sname, raw);
    if (body.length > 4000) body = body.slice(0, 4000).replace(/\s+\S*$/, "") + "…";
    if (body) sections.push({ title: sname, body });
  }

  // ids / slugs
  let id = sku || slugify(name);
  while (usedId.has(id)) id = id + "-x";
  usedId.add(id);

  let slug = slugify(url.split("/").filter(Boolean).pop() || sku || name);
  if (!slug) slug = slugify(sku || name);
  const base = slug;
  let n = 2;
  while (usedSlug.has(slug)) slug = base + "-" + n++;
  usedSlug.add(slug);

  out.push({
    id,
    slug,
    name,
    sku,
    brand: brand || undefined,
    url: url || undefined,
    category: memberships[0].category,
    subcategory: memberships[0].subcategory,
    memberships,
    price,
    image,
    images: gallery,
    shortDescription,
    description,
    features,
    labels,
    badge,
    specs,
    documents,
    sections,
    reviews,
    reviewCount,
    inStock,
  });
}

if (unmapped.size) {
  console.error("UNMAPPED:", [...unmapped]);
  process.exit(1);
}

// Split into a lightweight list (used site-wide via cart/catalog/home) and a
// heavy details map (loaded only by the product page) to keep bundles small.
const light = out.map((p) => {
  const o = {
    id: p.id,
    slug: p.slug,
    name: p.name,
    sku: p.sku,
    category: p.category,
    memberships: p.memberships,
    price: p.price,
    image: p.image,
    shortDescription: p.shortDescription,
    features: p.features,
    inStock: p.inStock,
  };
  if (p.subcategory) o.subcategory = p.subcategory;
  if (p.badge) o.badge = p.badge;
  if (p.brand) o.brand = p.brand;
  if (p.url) o.url = p.url;
  return o;
});

const details = {};
for (const p of out) {
  details[p.slug] = {
    images: p.images,
    labels: p.labels,
    description: p.description,
    specs: p.specs,
    documents: p.documents,
    sections: p.sections,
    reviews: p.reviews,
    reviewCount: p.reviewCount,
  };
}

fs.writeFileSync(DATA_PATH, JSON.stringify(light, null, 1), "utf8");
fs.writeFileSync(DETAILS_PATH, JSON.stringify(details, null, 1), "utf8");

const sum = (f) => out.reduce((a, p) => a + f(p), 0);
console.log("Products:", out.length);
console.log("Total gallery images:", sum((p) => p.images.length));
console.log("Total specs:", sum((p) => p.specs.length));
console.log("Total documents:", sum((p) => p.documents.length));
console.log("Total content sections:", sum((p) => p.sections.length));
console.log("Products with reviews:", out.filter((p) => p.reviews.length).length);
console.log("Total parsed reviews:", sum((p) => p.reviews.length));
const kb = (u) => (fs.statSync(u).size / 1024).toFixed(0);
console.log("products.data.json (light):", kb(DATA_PATH), "KB");
console.log("product-details.data.json (heavy):", kb(DETAILS_PATH), "KB");

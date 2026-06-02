import type { IconName } from "@/components/Icon";

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

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string; // category slug
  subcategory?: string; // subcategory slug
  price: number; // UAH
  oldPrice?: number;
  shortDescription: string;
  description: string;
  features: string[];
  badge?: string;
  inStock: boolean;
};

export const categories: Category[] = [
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
      { slug: "mlc-standard", title: "Standard 2,5\"×10\"" },
      { slug: "mlc-bb10", title: "BB10 4,5\"×10\"" },
      { slug: "mlc-bb20", title: "BB20 4,5\"×20\"" },
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
];

export const products: Product[] = [
  // Reverse osmosis
  {
    id: "ro-standard",
    slug: "ecosoft-standard",
    name: "Ecosoft Standard",
    category: "reverse-osmosis",
    subcategory: "ro-standard",
    price: 5499,
    oldPrice: 6299,
    shortDescription: "5-ступенева система зворотного осмосу для щоденного використання.",
    description:
      "Класична 5-ступенева система зворотного осмосу Ecosoft Standard забезпечує родину чистою питною водою. Видаляє хлор, важкі метали, нітрати, бактерії та віруси. Ідеальна для квартири на 3–4 особи.",
    features: [
      "5 ступенів очищення",
      "Продуктивність до 200 л/добу",
      "Накопичувальний бак 8 л",
      "Видалення до 99,8% домішок",
    ],
    badge: "Хіт продажів",
    inStock: true,
  },
  {
    id: "ro-pure",
    slug: "ecosoft-pure",
    name: "Ecosoft P'URE",
    category: "reverse-osmosis",
    subcategory: "ro-pure",
    price: 9999,
    shortDescription: "Преміум-система з мінералізатором та помпою підвищення тиску.",
    description:
      "Ecosoft P'URE — преміальна система зворотного осмосу з мінералізатором, який повертає у воду корисні кальцій і магній. Вбудована помпа гарантує стабільну продуктивність навіть за низького тиску у водопроводі.",
    features: [
      "6 ступенів очищення + мінералізація",
      "Помпа підвищення тиску",
      "Продуктивність до 280 л/добу",
      "Швидкоз'ємні картриджі",
    ],
    badge: "Преміум",
    inStock: true,
  },
  {
    id: "ro-robust",
    slug: "ecosoft-robust",
    name: "Ecosoft RObust",
    category: "reverse-osmosis",
    subcategory: "ro-cross",
    price: 14990,
    shortDescription: "Прямоточна система без бака з високою продуктивністю.",
    description:
      "Ecosoft RObust — прямоточна система зворотного осмосу без накопичувального бака. Подає свіжу воду на вимогу, економить місце під мийкою та підходить для офісів і закладів громадського харчування.",
    features: [
      "Прямоточна, без бака",
      "Продуктивність до 600 л/добу",
      "Економія місця під мийкою",
      "Електронний контролер",
    ],
    inStock: true,
  },
  // Flow filters
  {
    id: "jug-dewberry",
    slug: "ecosoft-dewberry",
    name: "Ecosoft Dewberry",
    category: "flow-filters",
    subcategory: "flow-triple",
    price: 549,
    shortDescription: "Фільтр-глечик 3 л із зручним відкидним клапаном.",
    description:
      "Фільтр-глечик Ecosoft Dewberry на 3 літри покращує смак води, зменшує жорсткість і видаляє хлор. Зручний відкидний клапан дозволяє наповнювати глечик однією рукою.",
    features: [
      "Загальний об'єм 3 л",
      "Картридж на 200 л ресурсу",
      "Відкидний клапан наповнення",
      "Індикатор заміни картриджа",
    ],
    inStock: true,
  },
  {
    id: "jug-german",
    slug: "ecosoft-german",
    name: "Ecosoft German",
    category: "flow-filters",
    subcategory: "flow-triple",
    price: 699,
    oldPrice: 799,
    shortDescription: "Глечик 3,5 л із преміальним дизайном і збільшеним ресурсом.",
    description:
      "Ecosoft German — фільтр-глечик об'ємом 3,5 літри зі стильним дизайном. Картридж із підвищеним ресурсом ефективно пом'якшує воду та видаляє домішки.",
    features: [
      "Загальний об'єм 3,5 л",
      "Картридж на 300 л ресурсу",
      "Механічний лічильник ресурсу",
      "Підходить для холодильника",
    ],
    inStock: true,
  },
  // Mainline filters
  {
    id: "main-bb10",
    slug: "ecosoft-bb10",
    name: "Ecosoft Big Blue 10",
    category: "mainline-filters",
    subcategory: "ml-cartridge",
    price: 1890,
    shortDescription: "Магістральний корпус 10\" для механічного очищення води.",
    description:
      "Магістральний фільтр Ecosoft Big Blue 10\" встановлюється на вході у квартиру та захищає сантехніку й побутову техніку від піску, іржі та механічних домішок.",
    features: [
      "Типорозмір Big Blue 10\"",
      "Підключення 1\"",
      "Змінний картридж у комплекті",
      "Робочий тиск до 6 бар",
    ],
    inStock: true,
  },
  {
    id: "main-bb20",
    slug: "ecosoft-bb20",
    name: "Ecosoft Big Blue 20",
    category: "mainline-filters",
    subcategory: "ml-cartridge",
    price: 2490,
    shortDescription: "Магістральний корпус 20\" для будинку з високою витратою.",
    description:
      "Ecosoft Big Blue 20\" — магістральний фільтр збільшеного розміру для приватного будинку. Подвоєний ресурс картриджа та висока пропускна здатність.",
    features: [
      "Типорозмір Big Blue 20\"",
      "Підвищена пропускна здатність",
      "Подвоєний ресурс картриджа",
      "Ключ для заміни в комплекті",
    ],
    inStock: false,
  },
  // Filtration systems
  {
    id: "soft-fu",
    slug: "ecosoft-fu-cabinet",
    name: "Ecosoft FU Cabinet",
    category: "filtration-systems",
    subcategory: "fs-softening",
    price: 18900,
    shortDescription: "Компактна кабінетна система пом'якшення для квартири.",
    description:
      "Ecosoft FU Cabinet — кабінетна система пом'якшення води, що поєднує бак із засипкою та сольовий бак в одному корпусі. Усуває жорсткість і захищає котли та бойлери від накипу.",
    features: [
      "Кабінетне виконання «все в одному»",
      "Клапан керування за об'ємом",
      "Іонообмінна смола преміум-класу",
      "Продуктивність до 1,2 м³/год",
    ],
    badge: "Для будинку",
    inStock: true,
  },
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

export function productsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

export function formatPrice(uah: number): string {
  return new Intl.NumberFormat("uk-UA").format(uah) + " ₴";
}

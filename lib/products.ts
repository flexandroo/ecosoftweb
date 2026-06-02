export type Category = {
  slug: string;
  title: string;
  description: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string; // category slug
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
    title: "Системи зворотного осмосу",
    description:
      "Багатоступеневе очищення води до рівня питної. Видаляють до 99,8% домішок, солей, бактерій і вірусів.",
  },
  {
    slug: "filter-jugs",
    title: "Фільтри-глечики",
    description:
      "Компактне рішення для квартири та офісу. Покращують смак і пом'якшують воду без підключення до водопроводу.",
  },
  {
    slug: "mainline-filters",
    title: "Магістральні фільтри",
    description:
      "Очищення води на вході у квартиру чи будинок. Захищають побутову техніку від механічних домішок, іржі та хлору.",
  },
  {
    slug: "softeners",
    title: "Системи пом'якшення",
    description:
      "Усувають жорсткість води, запобігають утворенню накипу та подовжують термін служби техніки.",
  },
];

export const products: Product[] = [
  // Reverse osmosis
  {
    id: "ro-standard",
    slug: "ecosoft-standard",
    name: "Ecosoft Standard",
    category: "reverse-osmosis",
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
  // Filter jugs
  {
    id: "jug-dewberry",
    slug: "ecosoft-dewberry",
    name: "Ecosoft Dewberry",
    category: "filter-jugs",
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
    category: "filter-jugs",
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
  // Softeners
  {
    id: "soft-fu",
    slug: "ecosoft-fu-cabinet",
    name: "Ecosoft FU Cabinet",
    category: "softeners",
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

export function productsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

export function formatPrice(uah: number): string {
  return new Intl.NumberFormat("uk-UA").format(uah) + " ₴";
}

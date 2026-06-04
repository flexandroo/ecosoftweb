import type { IconName } from "@/components/Icon";
import type { Product, Spec, Section } from "./products";

/* ------------------------------------------------------------------ */
/* Per-category content templates                                      */
/*                                                                     */
/* Product data (specs/sections/description) varies a lot between      */
/* categories and is sometimes incomplete. To keep the PDP friendly    */
/* even when fields are sparse, every product is mapped to a "bundle"  */
/* whose content blocks are filled in from these templates and then    */
/* overridden by anything we can lift from the real product data.      */
/* ------------------------------------------------------------------ */

export type ProblemPoint = { icon: IconName; text: string };

export type ProductTemplate = {
  bundle: string;
  subtitle: string;
  fits: string[];
  notFits: string[];
  problems: ProblemPoint[];
  howItWorks: { title: string; text: string }[];
  maintenance: string;
  keySpecNames: string[]; // substrings to match against actual spec names
};

const drinking: ProductTemplate = {
  bundle: "drinking",
  subtitle: "Система для очищення питної води вдома",
  fits: [
    "для щоденного пиття та приготування їжі",
    "для квартири або будинку",
    "якщо хочете зменшити запах, присмак або домішки",
    "якщо не хочете постійно купувати бутильовану воду",
  ],
  notFits: [
    "потрібне очищення води на весь будинок — оберіть систему для будинку",
    "недостатній тиск води у трубах",
    "вода зі свердловини без аналізу — спочатку зробіть аналіз",
  ],
  problems: [
    { icon: "wave", text: "Неприємний присмак або запах води" },
    { icon: "drop", text: "Хлор і сторонні домішки" },
    { icon: "kettle", text: "Осад і накип після кип'ятіння" },
    { icon: "jug", text: "Бажання менше купувати воду в пляшках" },
  ],
  howItWorks: [
    { title: "Вода надходить у систему", text: "Холодна вода з-під мийки подається на вхід фільтра." },
    { title: "Проходить етапи очищення", text: "Картриджі та мембрана послідовно затримують домішки." },
    { title: "Збирається у баку", text: "Очищена вода накопичується в герметичному баку." },
    { title: "Подається на окремий кран", text: "Готова чиста вода виходить через окремий кран на мийці." },
  ],
  maintenance:
    "Щоб система працювала стабільно, картриджі потрібно замінювати за регламентом — зазвичай раз на 6–12 місяців, мембрану — раз на 2–3 роки. Якщо не впевнені, коли саме це робити, ми допоможемо підібрати комплект для заміни.",
  keySpecNames: [
    "Тип фільтра",
    "Призначення",
    "Кількість ступенів",
    "Продуктивність",
    "Накопичувальний бак",
    "Монтаж",
    "Габарити фільтру",
    "Вхідний тиск",
  ],
};

const home: ProductTemplate = {
  bundle: "home",
  subtitle: "Рішення для очищення води у всьому будинку",
  fits: [
    "для приватного будинку чи котеджу",
    "якщо вода зі свердловини, колодязя або водопроводу",
    "якщо є жорсткість, залізо, запах або осад",
    "якщо потрібно захистити сантехніку, техніку та труби",
  ],
  notFits: [
    "потрібна тільки питна вода — оберіть фільтр під мийку",
    "немає аналізу води — спочатку зробіть аналіз",
    "недостатній тиск у системі для роботи фільтра",
  ],
  problems: [
    { icon: "kettle", text: "Накип у чайнику та техніці" },
    { icon: "drop", text: "Рудий наліт і залізо у воді" },
    { icon: "softener", text: "Жорстка вода і сухість шкіри" },
    { icon: "wave", text: "Запах або присмак води" },
  ],
  howItWorks: [
    { title: "Вода надходить у систему", text: "Уся вода в будинок проходить через фільтр на вході." },
    { title: "Проходить через завантаження", text: "Фільтрувальний матеріал затримує жорсткість, залізо, домішки." },
    { title: "Автоматична регенерація", text: "Клапан керування періодично промиває систему." },
    { title: "Очищена вода йде до всіх кранів", text: "Сантехніка, бойлер і техніка отримують підготовлену воду." },
  ],
  maintenance:
    "Системі для будинку потрібна регулярна регенерація — переважно автоматична. Окремо контролюється рівень солі чи реагенту. За запитом ми проводимо сервісне обслуговування та діагностику.",
  keySpecNames: [
    "Тип фільтра",
    "Проблема",
    "Застосування",
    "Продуктивність",
    "Об'єм фільтрувального матеріалу",
    "Ресурс",
    "Робочий тиск",
    "Діаметр підключення",
    "Габаритні розміри",
  ],
};

const mainline: ProductTemplate = {
  bundle: "mainline",
  subtitle: "Магістральний фільтр для захисту води у квартирі чи будинку",
  fits: [
    "для встановлення на вході води у квартиру або будинок",
    "для захисту сантехніки, бойлера й техніки від домішок",
    "якщо у воді є пісок, іржа, осад або накип",
  ],
  notFits: [
    "потрібна питна вода — додатково встановіть фільтр під мийку",
    "немає місця на вході водопроводу для монтажу",
  ],
  problems: [
    { icon: "grain", text: "Пісок та механічні домішки" },
    { icon: "drop", text: "Іржа й окалина зі старих труб" },
    { icon: "kettle", text: "Накип на сантехніці та техніці" },
    { icon: "shield", text: "Захист подальших етапів очищення" },
  ],
  howItWorks: [
    { title: "Вода входить у корпус", text: "Уся вода в будинку проходить через корпус фільтра." },
    { title: "Затримуються механічні домішки", text: "Сітка або картридж зупиняють пісок, іржу, окалину." },
    { title: "Чиста вода йде далі", text: "Захищені сантехніка, техніка та наступні етапи очищення." },
  ],
  maintenance:
    "Промивні фільтри періодично промиваються вручну або автоматично. Картриджні моделі потребують заміни картриджа за регламентом — зазвичай раз на 3–6 місяців.",
  keySpecNames: [
    "Тип",
    "Тип продукту",
    "Номінальний діаметр",
    "Рейтинг фільтрування",
    "Продуктивність",
    "Робочий тиск",
    "Максимальна температура",
    "Загальна висота",
    "Матеріал корпусу",
  ],
};

const roCartridge: ProductTemplate = {
  bundle: "ro-cartridge",
  subtitle: "Змінний картридж для фільтра зворотного осмосу",
  fits: [
    "для планової заміни картриджа у вашій системі",
    "якщо картридж сумісний з вашим корпусом",
    "якщо хочете тримати систему в робочому стані",
  ],
  notFits: [
    "не підходить до вашої моделі фільтра",
    "потрібен інший тип очищення (наприклад, для магістрального фільтра)",
  ],
  problems: [
    { icon: "wave", text: "Запах або присмак води" },
    { icon: "drop", text: "Хлор перед мембраною" },
    { icon: "grain", text: "Механічні домішки" },
    { icon: "shield", text: "Захист мембрани та продовження її ресурсу" },
  ],
  howItWorks: [
    { title: "Вода проходить через картридж", text: "Матеріал картриджа затримує певний тип домішок." },
    { title: "Передає воду на наступний етап", text: "Відфільтрована вода йде далі по системі очищення." },
    { title: "Заміна після ресурсу", text: "Після вичерпання ресурсу картридж замінюється на новий." },
  ],
  maintenance:
    "Картриджі попереднього очищення зазвичай змінюють раз на 6–12 місяців, постфільтр — раз на 12 місяців. Точний регламент залежить від вашої моделі фільтра та якості води.",
  keySpecNames: [
    "Тип картриджа",
    "Матеріал",
    "Типорозмір",
    "Призначення",
    "Ресурс",
    "Рейтинг фільтрування",
    "Висота",
    "Зовнішній діаметр",
  ],
};

const mainlineCartridge: ProductTemplate = {
  bundle: "mainline-cartridge",
  subtitle: "Картридж для магістрального корпусу фільтра",
  fits: [
    "для заміни картриджа у магістральному корпусі",
    "якщо типорозмір збігається з вашим корпусом",
    "якщо потрібне механічне, вугільне або пом'якшувальне очищення",
  ],
  notFits: [
    "інший типорозмір корпусу",
    "потрібне очищення, для якого цей картридж не призначений",
  ],
  problems: [
    { icon: "grain", text: "Пісок, іржа, осад" },
    { icon: "wave", text: "Запах чи присмак води" },
    { icon: "kettle", text: "Накип і жорсткість" },
    { icon: "shield", text: "Планова заміна ресурсу" },
  ],
  howItWorks: [
    { title: "Картридж встановлюється у корпус", text: "Магістральний корпус відкривається ключем для заміни." },
    { title: "Вода проходить через матеріал", text: "Картридж затримує домішки відповідно до свого типу." },
    { title: "Заміна за регламентом", text: "Після вичерпання ресурсу картридж замінюється." },
  ],
  maintenance:
    "Магістральні картриджі змінюють зазвичай раз на 3–6 місяців. Якщо вода особливо забруднена — частіше. Слідкуйте за перепадом тиску у системі.",
  keySpecNames: [
    "Тип картриджа",
    "Матеріал",
    "Типорозмір",
    "Рейтинг фільтрування",
    "Температура",
    "Висота",
    "Зовнішній діаметр",
    "Рекомендована швидкість",
  ],
};

const media: ProductTemplate = {
  bundle: "media",
  subtitle: "Фільтрувальний матеріал для систем очищення води",
  fits: [
    "для завантаження у фільтраційну колону",
    "для періодичної заміни засипки",
    "якщо потрібен реагент для обслуговування системи",
  ],
  notFits: [
    "не підходить до типу вашої системи",
    "потрібен інший фільтрувальний матеріал",
  ],
  problems: [
    { icon: "softener", text: "Жорсткість і накип" },
    { icon: "drop", text: "Залізо і манган" },
    { icon: "grain", text: "Механічні домішки" },
    { icon: "shield", text: "Підтримка ресурсу системи" },
  ],
  howItWorks: [
    { title: "Засипка у фільтр", text: "Матеріал засипається у фільтраційну колону." },
    { title: "Вода проходить крізь шар", text: "Завантаження затримує цільові домішки." },
    { title: "Регенерація", text: "Періодично шар промивається або регенерується сіллю/реагентом." },
  ],
  maintenance:
    "Ресурс залежить від якості води та типу матеріалу. Регенерація — за регламентом системи. Заміну засипки зазвичай планують раз на 5–8 років.",
  keySpecNames: [
    "Робочий діапазон pH",
    "Максимальна робоча температура",
    "Швидкість фільтрації",
    "Робоча обмінна ємність",
    "Витрата солі",
    "Оптимальна висота шару",
  ],
};

const universal: ProductTemplate = {
  bundle: "universal",
  subtitle: "Допоміжний елемент для монтажу та обслуговування системи",
  fits: [
    "для монтажу або сервісу системи",
    "для заміни деталі у вашій системі",
  ],
  notFits: [
    "не підходить до вашої моделі",
    "потрібна інша деталь — уточніть у консультанта",
  ],
  problems: [
    { icon: "wrench", text: "Заміна деталі" },
    { icon: "gear", text: "Обслуговування системи" },
    { icon: "shield", text: "Захист під час монтажу" },
  ],
  howItWorks: [
    { title: "Встановлення", text: "Деталь встановлюється у відповідне місце системи." },
    { title: "Робота у складі системи", text: "Деталь виконує свою функцію разом з основним обладнанням." },
  ],
  maintenance:
    "Контролюйте стан деталі під час планового сервісу системи. За потреби — замініть.",
  keySpecNames: [],
};

const map: Record<string, ProductTemplate> = {
  "reverse-osmosis": drinking,
  "flow-filters": drinking,
  horeca: drinking,
  "filtration-systems": home,
  "mainline-filters": mainline,
  "ro-cartridges": roCartridge,
  "mainline-cartridges": mainlineCartridge,
  "filter-media": media,
};

export function getProductTemplate(product: Product): ProductTemplate {
  return map[product.category] ?? universal;
}

/* ---- utilities used by the PDP composition ---------------------- */

/** Pick the first matching spec for every whitelist name (case-insensitive substring). */
export function pickKeySpecs(specs: Spec[], whitelist: string[]): Spec[] {
  const out: Spec[] = [];
  const used = new Set<number>();
  for (const w of whitelist) {
    const idx = specs.findIndex(
      (s, i) => !used.has(i) && s.name.toLowerCase().includes(w.toLowerCase())
    );
    if (idx >= 0) {
      used.add(idx);
      out.push(specs[idx]);
    }
    if (out.length >= 8) break;
  }
  return out;
}

/** Split sections into known groups by their title. */
export type SectionGroups = {
  howItWorks?: Section;
  maintenance?: Section;
  keyFeatures?: Section;
  warranty?: Section;
  other: Section[];
};

export function splitSections(sections: Section[]): SectionGroups {
  const groups: SectionGroups = { other: [] };
  const test = (s: string, re: RegExp) => re.test(s.toLowerCase());
  for (const sec of sections) {
    const t = sec.title;
    if (test(t, /як\s+(це\s+)?працює|механізм\s+роботи/)) groups.howItWorks ||= sec;
    else if (test(t, /обслуговування/)) groups.maintenance ||= sec;
    else if (test(t, /ключові\s+особливості|переваг/)) groups.keyFeatures ||= sec;
    else if (test(t, /гарантія/)) groups.warranty ||= sec;
    else groups.other.push(sec);
  }
  return groups;
}

/** Parse the "Комплектація" spec value into discrete items. */
export function parseInclusion(specs: Spec[]): string[] {
  const spec = specs.find((s) => /комплектац/i.test(s.name));
  if (!spec) return [];
  return spec.value
    .split(/[,;]|\s+та\s+|\s+і\s+/i)
    .map((s) => s.trim())
    .filter((s) => s.length > 1);
}

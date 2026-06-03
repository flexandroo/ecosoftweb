"use client";

import { useState } from "react";
import Link from "next/link";
import Icon, { IconName } from "./Icon";

type Option = {
  value: string;
  label: string;
  hint: string;
  icon: IconName;
};

type Step = {
  key: string;
  title: string;
  subtitle: string;
  options: Option[];
};

const steps: Step[] = [
  {
    key: "place",
    title: "Де потрібне очищення?",
    subtitle: "Це визначає тип і продуктивність системи",
    options: [
      {
        value: "apartment",
        label: "Квартира",
        hint: "Компактні рішення під мийку",
        icon: "building",
      },
      {
        value: "house",
        label: "Приватний будинок",
        hint: "Комплексне очищення дому",
        icon: "home",
      },
      {
        value: "office",
        label: "Офіс або заклад",
        hint: "Висока продуктивність",
        icon: "headset",
      },
    ],
  },
  {
    key: "source",
    title: "Яке джерело води?",
    subtitle: "Джерело впливає на ступінь очищення",
    options: [
      {
        value: "central",
        label: "Міський водопровід",
        hint: "Хлор, домішки, накип",
        icon: "filter",
      },
      {
        value: "well",
        label: "Свердловина",
        hint: "Залізо, жорсткість",
        icon: "softener",
      },
      {
        value: "draw-well",
        label: "Колодязь",
        hint: "Механічні домішки, бактерії",
        icon: "osmosis",
      },
      {
        value: "unknown",
        label: "Не знаю",
        hint: "Підкажемо за аналізом води",
        icon: "question",
      },
    ],
  },
  {
    key: "goal",
    title: "Що не так з водою?",
    subtitle: "Підберемо рішення під головну задачу",
    options: [
      {
        value: "scale",
        label: "Накип",
        hint: "Бойлер, чайник, техніка",
        icon: "kettle",
      },
      {
        value: "smell",
        label: "Запах або присмак",
        hint: "Хлор, сірководень, присмак",
        icon: "wave",
      },
      {
        value: "iron",
        label: "Рудий наліт",
        hint: "Залізо у воді",
        icon: "drop",
      },
      {
        value: "sand",
        label: "Пісок або механічні домішки",
        hint: "Каламутність, осад",
        icon: "grain",
      },
      {
        value: "drinking",
        label: "Хочу просто питну воду",
        hint: "Смак і безпека для родини",
        icon: "jug",
      },
      {
        value: "analysis",
        label: "Є аналіз води",
        hint: "Підберемо за показниками",
        icon: "flask",
      },
    ],
  },
  {
    key: "people",
    title: "Скільки людей користуються водою?",
    subtitle: "Впливає на продуктивність системи",
    options: [
      {
        value: "1-2",
        label: "1–2 людини",
        hint: "Компактна продуктивність",
        icon: "drop",
      },
      {
        value: "3-4",
        label: "3–4 людини",
        hint: "Оптимально для сім'ї",
        icon: "shield",
      },
      {
        value: "5+",
        label: "5 і більше",
        hint: "Підвищена продуктивність",
        icon: "award",
      },
    ],
  },
];

type Recommendation = {
  category: string;
  subcategory?: string;
  title: string;
  text: string;
};

function recommend(answers: Record<string, string>): Recommendation {
  const goal = answers.goal;
  const place = answers.place;

  if (goal === "scale") {
    return {
      category: "filtration-systems",
      subcategory: "fs-softening",
      title: "Системи пом'якшення води",
      text: "Усунуть жорсткість і захистять бойлер, котел та пральну машину від накипу.",
    };
  }
  if (goal === "iron") {
    return {
      category: "filtration-systems",
      subcategory: "fs-iron-hardness",
      title: "Системи від заліза та твердості",
      text: "Прибирають рудий наліт, залізо та жорсткість, щоб вода була чистою у всіх кранах.",
    };
  }
  if (goal === "smell") {
    return {
      category: "filtration-systems",
      subcategory: "fs-chlorine",
      title: "Очищення від хлору та запаху",
      text: "Усувають хлор, сірководень і сторонній присмак, повертаючи воді природний смак.",
    };
  }
  if (goal === "sand") {
    return {
      category: "mainline-filters",
      title: "Магістральні фільтри",
      text: "Затримують пісок, іржу та механічні домішки на вході та захищають усю сантехніку.",
    };
  }
  if (goal === "analysis") {
    return {
      category: "filtration-systems",
      title: "Підбір за аналізом води",
      text: "За показниками аналізу підберемо систему, яка вирішить саме вашу задачу. Залиште заявку — і спеціаліст порадить рішення.",
    };
  }

  // drinking water (default goal) — depends on where
  if (place === "house") {
    return {
      category: "reverse-osmosis",
      title: "Зворотний осмос для будинку",
      text: "Багатоступеневе очищення до рівня питної води для всієї родини — видаляє до 99,8% домішок.",
    };
  }
  return {
    category: "reverse-osmosis",
    title: "Системи зворотного осмосу",
    text: "Багатоступеневе очищення до рівня питної води — видаляють до 99,8% домішок, солей і бактерій.",
  };
}

export default function SystemQuiz() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const total = steps.length;
  const step = steps[stepIndex];
  const progress = done ? 100 : Math.round((stepIndex / total) * 100);

  function choose(value: string) {
    const next = { ...answers, [step.key]: value };
    setAnswers(next);
    if (stepIndex < total - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setDone(true);
    }
  }

  function back() {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  }

  function restart() {
    setAnswers({});
    setStepIndex(0);
    setDone(false);
  }

  const rec = done ? recommend(answers) : null;

  return (
    <div className="quiz">
      <div className="quiz__bar" aria-hidden="true">
        <span className="quiz__bar-fill" style={{ width: `${progress}%` }} />
      </div>

      {!done && (
        <>
          <div className="quiz__meta">
            <span className="quiz__count">
              Крок {stepIndex + 1} з {total}
            </span>
          </div>
          <h3 className="quiz__title">{step.title}</h3>
          <p className="quiz__subtitle">{step.subtitle}</p>

          <div className="quiz__options" role="radiogroup" aria-label={step.title}>
            {step.options.map((opt) => {
              const selected = answers[step.key] === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  className={`quiz-card${selected ? " is-selected" : ""}`}
                  onClick={() => choose(opt.value)}
                >
                  <span className="quiz-card__icon">
                    <Icon name={opt.icon} />
                  </span>
                  <span className="quiz-card__body">
                    <span className="quiz-card__label">{opt.label}</span>
                    <span className="quiz-card__hint">{opt.hint}</span>
                  </span>
                  <span className="quiz-card__check" aria-hidden="true">
                    <Icon name="arrow" size={18} />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="quiz__nav">
            {stepIndex > 0 ? (
              <button type="button" className="btn btn--ghost" onClick={back}>
                Назад
              </button>
            ) : (
              <span />
            )}
            <span className="quiz__hint-text">Оберіть варіант, щоб продовжити</span>
          </div>
        </>
      )}

      {done && rec && (
        <div className="quiz__result">
          <span className="quiz__result-badge">
            <Icon name="check" size={16} />
            Готова рекомендація
          </span>
          <h3 className="quiz__title">{rec.title}</h3>
          <p className="quiz__subtitle">{rec.text}</p>
          <div className="quiz__result-actions">
            <Link
              href={`/catalog?category=${rec.category}${
                rec.subcategory ? `&subcategory=${rec.subcategory}` : ""
              }`}
              className="btn btn--lg"
            >
              <Icon name="drop" />
              Переглянути рішення
            </Link>
            <Link href="/contacts" className="btn btn--lg btn--secondary">
              <Icon name="headset" />
              Консультація
            </Link>
          </div>
          <button type="button" className="btn btn--ghost quiz__restart" onClick={restart}>
            Пройти ще раз
          </button>
        </div>
      )}
    </div>
  );
}

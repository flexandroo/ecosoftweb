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
    title: "Де плануєте очищати воду?",
    subtitle: "Це визначає тип і продуктивність системи",
    options: [
      {
        value: "apartment",
        label: "Квартира",
        hint: "Компактні рішення під мийку",
        icon: "drop",
      },
      {
        value: "house",
        label: "Приватний будинок",
        hint: "Комплексне очищення дому",
        icon: "shield",
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
    title: "Звідки надходить вода?",
    subtitle: "Джерело впливає на ступінь очищення",
    options: [
      {
        value: "central",
        label: "Центральний водопровід",
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
    ],
  },
  {
    key: "goal",
    title: "Що для вас найважливіше?",
    subtitle: "Підберемо рішення під головну задачу",
    options: [
      {
        value: "drinking",
        label: "Чиста питна вода",
        hint: "Смак, безпека для родини",
        icon: "drop",
      },
      {
        value: "scale",
        label: "Захист техніки від накипу",
        hint: "Бойлер, пральна машина, котел",
        icon: "softener",
      },
      {
        value: "whole",
        label: "Очищення на вході в дім",
        hint: "Захист усієї сантехніки",
        icon: "filter",
      },
      {
        value: "budget",
        label: "Економне рішення",
        hint: "Без підключення до води",
        icon: "jug",
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
  if (goal === "scale") {
    return {
      category: "filtration-systems",
      subcategory: "fs-softening",
      title: "Системи пом'якшення",
      text: "Усунуть жорсткість і захистять бойлер, котел та пральну машину від накипу.",
    };
  }
  if (goal === "whole") {
    return {
      category: "mainline-filters",
      title: "Магістральні фільтри",
      text: "Очищують воду на вході та захищають усю сантехніку від механічних домішок, іржі та хлору.",
    };
  }
  if (goal === "budget") {
    return {
      category: "flow-filters",
      title: "Проточні фільтри",
      text: "Просте й доступне рішення для смачної питної води під мийку.",
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

type Props = {
  className?: string;
  flip?: boolean;
};

export default function WaveDivider({ className = "", flip = false }: Props) {
  return (
    <div
      className={`wave${flip ? " wave--flip" : ""}${
        className ? " " + className : ""
      }`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="wave__back"
          d="M0 64L48 58.7C96 53 192 43 288 48C384 53 480 75 576 80C672 85 768 75 864 64C960 53 1056 43 1152 48C1248 53 1344 75 1392 85.3L1440 96V120H0V64Z"
        />
        <path
          className="wave__front"
          d="M0 88L48 82.7C96 77 192 67 288 69.3C384 72 480 88 576 90.7C672 93 768 83 864 80C960 77 1056 83 1152 85.3C1248 88 1344 88 1392 88L1440 88V120H0V88Z"
        />
      </svg>
    </div>
  );
}

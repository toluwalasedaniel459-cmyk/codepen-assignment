import { useEffect, useRef } from "react";

function ControlPanel({
  revealed,
  blanks,
  guess,
  onGuessChange,
  onSubmit,
  feedback,
  disabled,
  roundId,
}) {
  const inputRef = useRef(null);

  // Earned effect: focusing an input is a DOM API React doesn't manage,
  // so we sync it whenever a new round starts.
  useEffect(() => {
    inputRef.current?.focus();
  }, [roundId]);

  return (
    <section className="control-panel">
      <div className="hint-row">
        <span className="hint-label">
          <svg
            className="hint-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a7 7 0 0 0-4 12.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26A7 7 0 0 0 12 2z" />
            <line x1="9" y1="21" x2="15" y2="21" />
            <line x1="10" y1="18" x2="14" y2="18" />
          </svg>
          hint
        </span>
        <span className="hint-display">
          {revealed && <span className="revealed">{revealed.toUpperCase()}</span>}
          {revealed && blanks > 0 && " "}
          {blanks > 0 && (
            <span className="blank">{Array(blanks).fill("_").join(" ")}</span>
          )}
        </span>
      </div>

      <form className="guess-form" autoComplete="off" onSubmit={onSubmit}>
        <input
          ref={inputRef}
          type="text"
          className="guess-input"
          placeholder="type your guess"
          aria-label="Your guess"
          required
          value={guess}
          disabled={disabled}
          onChange={(e) => onGuessChange(e.target.value)}
        />
        <button type="submit" className="guess-submit">
          Guess
        </button>
      </form>

      <p
        className={`feedback${feedback.kind ? ` is-${feedback.kind}` : ""}`}
        role="status"
        aria-live="polite"
      >
        {feedback.message}
      </p>
    </section>
  );
}

export default ControlPanel;

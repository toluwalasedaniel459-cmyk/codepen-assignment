import { useEffect, useRef } from "react";
import Card from "./Card.jsx";

const SWIPE_THRESHOLD = 40;

function Table({ cards, selectedId, won, onSelect, onCycle }) {
  const startX = useRef(null);

  useEffect(() => {
    function handlePointerUp(e) {
      if (startX.current === null) return;
      const delta = e.clientX - startX.current;
      startX.current = null;
      if (delta <= -SWIPE_THRESHOLD) onCycle("forward");
      else if (delta >= SWIPE_THRESHOLD) onCycle("backward");
    }
    function handlePointerCancel() {
      startX.current = null;
    }

    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerCancel);
    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerCancel);
    };
  }, [onCycle]);

  return (
    <main className={`table${won ? " is-won" : ""}`}>
      <div
        className="canvas"
        aria-label="Card stack of guessed avatars"
        onPointerDown={(e) => {
          startX.current = e.clientX;
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            index={index}
            isSelected={card.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>

      {cards.length === 0 && (
        <p className="empty-state">
          Every wrong guess drops a new card onto the pile. Click a card to
          bring it up front, or swipe the pile left / right to cycle through it.
        </p>
      )}
    </main>
  );
}

export default Table;

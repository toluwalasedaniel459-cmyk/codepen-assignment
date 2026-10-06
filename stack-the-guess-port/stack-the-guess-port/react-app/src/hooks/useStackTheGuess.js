import { useCallback, useRef, useState } from "react";
import { DICEBEAR_STYLES, WORD_BANK, pickRandom } from "../game/wordBank.js";
import { fetchAvatarSVG } from "../game/dicebear.js";
import { computeHintLength } from "../game/hints.js";
import { createCard } from "../game/cards.js";
import { loadBestScore, saveBestScore } from "../storage.js";

const NO_FEEDBACK = { message: "", kind: null };

export function useStackTheGuess() {
  const [target, setTarget] = useState(() => pickRandom(WORD_BANK));
  const [hintLength, setHintLength] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [cards, setCards] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState(NO_FEEDBACK);
  const [won, setWon] = useState(false);
  const [roundId, setRoundId] = useState(0);
  const [bestScore, setBestScore] = useState(loadBestScore);

  const nextCardId = useRef(0);
  const activeRound = useRef(0);

  function newRound() {
    activeRound.current += 1;
    setTarget(pickRandom(WORD_BANK));
    setHintLength(0);
    setWrongGuesses(0);
    setCards([]);
    setSelectedId(null);
    setGuess("");
    setFeedback(NO_FEEDBACK);
    setWon(false);
    setRoundId((id) => id + 1);
  }

  function handleWin() {
    setWon(true);
    setFeedback({
      message: `Solved it! "${target}" \u2014 took ${wrongGuesses} wrong guess(es).`,
      kind: "win",
    });
    if (bestScore === null || wrongGuesses < bestScore) {
      setBestScore(wrongGuesses);
      saveBestScore(wrongGuesses);
    }
  }

  async function handleWrongGuess(word) {
    const round = activeRound.current;

    setWrongGuesses((n) => n + 1);
    setHintLength(computeHintLength(word, target, hintLength));

    const style = pickRandom(DICEBEAR_STYLES);
    try {
      const svg = await fetchAvatarSVG(word, style);
      if (round !== activeRound.current) return;
      const card = createCard(nextCardId.current++, svg);
      setCards((prev) => [...prev, card]);
      setFeedback({
        message: "Not quite \u2014 a new card joins the pile.",
        kind: "wrong",
      });
    } catch (err) {
      console.error(err);
      if (round !== activeRound.current) return;
      setFeedback({
        message:
          "Couldn't fetch that card \u2014 check your connection and try again.",
        kind: "error",
      });
    }
  }

  function submitGuess(e) {
    e.preventDefault();
    const word = guess.trim().toLowerCase();
    if (!word) return;
    setGuess("");

    if (word === target) {
      handleWin();
      return;
    }
    handleWrongGuess(word);
  }

  const selectCard = useCallback((id) => {
    setSelectedId(id);
    setCards((prev) => {
      const card = prev.find((c) => c.id === id);
      if (!card) return prev;
      return [...prev.filter((c) => c.id !== id), card];
    });
  }, []);

  const cycleCards = useCallback((direction) => {
    setCards((prev) => {
      if (prev.length < 2) return prev;
      if (direction === "forward") {
        return [prev[prev.length - 1], ...prev.slice(0, -1)];
      }
      return [...prev.slice(1), prev[0]];
    });
  }, []);

  const revealed = target.slice(0, hintLength);
  const blanks = target.length - hintLength;

  return {
    cards,
    selectedId,
    wrongGuesses,
    guess,
    feedback,
    won,
    roundId,
    bestScore,
    revealed,
    blanks,
    setGuess,
    submitGuess,
    selectCard,
    cycleCards,
    newRound,
  };
}

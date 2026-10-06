import { useState } from "react";
import { useStackTheGuess } from "./hooks/useStackTheGuess.js";
import Hud from "./components/Hud.jsx";
import Table from "./components/Table.jsx";
import ControlPanel from "./components/ControlPanel.jsx";
import HelpModal from "./components/HelpModal.jsx";

function App() {
  const game = useStackTheGuess();
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <>
      <div className="stage">
        <Hud
          wrongGuesses={game.wrongGuesses}
          cardCount={game.cards.length}
          bestScore={game.bestScore}
          onHelp={() => setHelpOpen(true)}
          onNewWord={game.newRound}
        />
        <Table
          cards={game.cards}
          selectedId={game.selectedId}
          won={game.won}
          onSelect={game.selectCard}
          onCycle={game.cycleCards}
        />
        <ControlPanel
          revealed={game.revealed}
          blanks={game.blanks}
          guess={game.guess}
          onGuessChange={game.setGuess}
          onSubmit={game.submitGuess}
          feedback={game.feedback}
          disabled={game.won}
          roundId={game.roundId}
        />
      </div>

      {helpOpen && <HelpModal onClose={() => setHelpOpen(false)} />}
    </>
  );
}

export default App;

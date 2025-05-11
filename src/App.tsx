import { useState } from "react";
import css from "./App.module.css";
import CafeInfo from "./components/cafeInfo/CafeInfo";
import type { Votes, VoteType } from "./types/votes";
import VoteOptions from "./components/voteOptions/VoteOptions";
import VoteStats from "./components/voteStats/VoteStats";
import Notification from "./components/notification/Notifitacion";

function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleVote = (type: VoteType) => {
    setVotes((prev): Votes => {
      const key = type as keyof Votes;
      return {
        ...prev,
        [key]: prev[key]! + 1,
      };
    });
  };

  const resetVotes = () => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const totalVotes = votes.bad + votes.good + votes.neutral;

  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={Boolean(totalVotes)}
      />

      {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}

export default App;

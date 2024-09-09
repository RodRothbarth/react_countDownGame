import { useRef, useState } from "react";
import { ResultModal } from "./ResultModal.jsx";

export function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();
  const [timerExpired, setTimerExpired] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  function handleStart() {
    setTimerStarted(true);
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      dialog.current.openModal();
    }, targetTime * 1000);
  }

  function handleStop() {
    clearTimeout(timer.current);
    setTimerStarted(false);
  }

  return (
    <>
      <ResultModal ref={dialog} result="lost" targetTime={targetTime} />

      <section className="challenge">
        <h2>{title}</h2>
        {timerExpired && <p>you lose</p>}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop Challenge" : "Start Challenge"}
          </button>
        </p>
        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}

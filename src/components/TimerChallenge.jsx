import { useRef, useState } from "react";
import { ResultModal } from "./ResultModal.jsx";

export function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [remaningTime, setRemaningTime] = useState(targetTime * 1000);

  const activeTime = remaningTime > 0 && remaningTime < targetTime * 1000;
  if (remaningTime <= 0) {
    clearInterval(timer.current);
    dialog.current.openModal();
  }
  function handleReset() {
    setRemaningTime(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setRemaningTime((prev) => prev - 10);
    }, 10);
  }

  function handleStop() {
    clearInterval(timer.current);
    dialog.current.openModal();
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remaningTime={remaningTime}
        reset={handleReset}
      />

      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={activeTime ? handleStop : handleStart}>
            {activeTime ? "Stop Challenge" : "Start Challenge"}
          </button>
        </p>
        <p className={activeTime ? "active" : undefined}>
          {activeTime ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}

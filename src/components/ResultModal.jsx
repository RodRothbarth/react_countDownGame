import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export const ResultModal = forwardRef(function ResultModal(
  { targetTime, remaningTime, reset },
  ref,
) {
  const dialog = useRef();
  const formatedSeconds = (remaningTime / 1000).toFixed(2);
  const lost = remaningTime <= 0;
  const score = Math.round((1 - remaningTime / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      openModal() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog className="result-modal" ref={dialog} onClose={reset}>
      {!lost && <h2>Your Score: {score}</h2>}
      {lost && <h2>You Lost, loser!</h2>}
      <p>
        The target time was <strong>{targetTime}</strong> second
        {targetTime > 1 ? "s" : ""}
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formatedSeconds} seconds left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal"),
  );
});

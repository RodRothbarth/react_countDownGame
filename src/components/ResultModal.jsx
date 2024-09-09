import { forwardRef, useImperativeHandle, useRef } from "react";

export const ResultModal = forwardRef(function ResultModal(
  { result, targetTime },
  ref,
) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      openModal() {
        dialog.current.showModal();
      },
    };
  });

  return (
    <dialog className="result-modal" ref={dialog}>
      <h2>You {result} </h2>
      <p>
        The target time was <strong>{targetTime}</strong> second
        {targetTime > 1 ? "s" : ""}
      </p>
      <p>
        You stopped the timer with <strong>x seconds left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

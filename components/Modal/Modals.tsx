import useModals from "@/hooks/useModal";
import ReactDOM from "react-dom";
import { animated, useTransition } from "react-spring";

export default function Modals() {
  const { modal, isOpen } = useModals();
  const transitions = useTransition(isOpen, {
    enter: { delay: 5000 },
    // This basically forces the modal to unmount
    leave: { delay: 5000 },
  });

  return (
    <div>
      {modal
        ? ReactDOM.createPortal(
            transitions(() => <animated.div>{modal}</animated.div>),
            document.getElementById("modal-root")!
          )
        : undefined}
    </div>
  );
}

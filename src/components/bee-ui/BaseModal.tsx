import { Modal, ModalProps } from "antd";
import { RefCallback, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

/** Hook that generates the basic state and functions needed for the modal */
export function useBaseModal() {
  const [open, setOpen] = useState(false);

  const toggleModal = (newState?: boolean) =>
    setOpen((state) => (newState ? newState : !state));

  const onOk = () => toggleModal(false);
  const onClose = () => toggleModal(false);
  const onCancel = () => toggleModal(false);

  return { open, toggleModal, onOk, onClose, onCancel };
}

/** Hook that generates the bodyref, event and state needed for verifying if the user has scrolled through
 *  the modal content at least once
 */
export function useHasScrolledBaseModal() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const bodyRefCallback: RefCallback<HTMLDivElement | null> = (
    node: HTMLDivElement
  ) => {
    const onScroll = () => {
      const scrolledToEnd = (function () {
        const {
          scrollHeight = 0,
          clientHeight = 0,
          scrollTop = 0,
        } = bodyRef.current || {};

        if (scrollHeight <= clientHeight) return true;

        return scrollHeight <= scrollTop + clientHeight;
      })();

      if (scrolledToEnd) {
        setHasScrolled(true);
      }
    };

    // cleanup on old node
    bodyRef.current?.removeEventListener("scroll", onScroll);

    // attach event to new node
    bodyRef.current = node;
    bodyRef.current?.addEventListener("scroll", onScroll);
  };

  return { bodyRef: bodyRefCallback, hasScrolled };
}

type Props = ModalProps & { bodyRef?: RefCallback<HTMLDivElement> };

export default function BaseModal({
  className,
  classNames,
  children,
  bodyRef,
  bodyProps,
  ...props
}: Props) {
  return (
    <Modal
      className={twMerge(
        // TODO: style modal
        "!w-[900px]",
        className
      )}
      classNames={{
        // TODO: style modal
        content: "!p-0 !overflow-hidden",
        body: "!p-4 !max-h-[400px] !overflow-y-scroll",
        header: "!bg-gray-200 !mb-0 !px-4 !py-4",
        footer: "!px-4 !py-4",
        ...classNames,
      }}
      bodyProps={{
        ref: bodyRef,
        ...bodyProps,
      }}
      {...props}
    >
      {children}
    </Modal>
  );
}

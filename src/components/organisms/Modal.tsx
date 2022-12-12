/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import React, { ReactNode, useRef } from "react";
import { useClickAway } from "react-use";

import { CloseIcon } from "@/src/components/atoms/vectors";

interface Imodal {
  children: ReactNode;
  openModal: boolean;
  title?: string;
  closeModal: (val: boolean) => void;
  noTop?: boolean;
  modalWt?: string;
  modalHt?: string;
  twClx?: string;
  active?: boolean;
}

const Modal = ({
  children,
  openModal,
  title,
  closeModal,
  modalWt,
  modalHt,
  twClx,
  noTop,
  active,
}: Imodal) => {
  const ref = useRef(null);
  useClickAway(ref, () => {
    closeModal(false);
  });
  // console.log({ openModal, active });
  return (
    <div className="Modal">
      {/*the overlay behind modal, children passed inbetween modal, twClx: for additional styles.*/}
      {openModal && (
        <div
          className={clsx(
            "modal-overlay",
            active ? "modal-active-bg" : "modal-overlay-bg",
            twClx
          )}
          onClick={() => closeModal(false)}
        ></div>
      )}
      <div className={clsx("modal-wrap", openModal && "modal-open")}>
        <div
          className={clsx(
            "modal-box scrollbar-hide",
            active ? "bg-transparent" : "bg-bg-4",
            modalWt ?? "w-[48.125rem]",
            modalHt ?? "my-28 h-fit"
          )}
          ref={ref}
        >
          {!active && (
            <div className={clsx("modal-head", noTop && "hidden")}>
              <div></div>
              <h1>{title}</h1>
              <span onClick={() => closeModal(false)}>
                {active ? (
                  <CloseIcon />
                ) : (
                  <img src="/vectors/close-icon.svg" alt="close modal" />
                )}
              </span>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

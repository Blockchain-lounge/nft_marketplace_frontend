/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import React, { ReactNode, useRef } from "react";
import { useClickAway } from "react-use";

import { CloseIcon } from "@/src/components/atoms/vectors";

interface Imodal {
  children: any;
  openModal: boolean;
  title: string;
  closeModal: (val: boolean) => void;
  twClx?: string;
  active: boolean;
}

const Modal = ({
  children,
  openModal,
  title,
  closeModal,
  twClx,
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
          className={clsx("modal-box", active ? "bg-transparent" : "bg-bg-4")}
          ref={ref}
        >
          {!active && (
            <div className="modal-head">
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
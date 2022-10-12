import React from "react";
import clsx from "clsx";

const Footer2 = () => {
  const footer2links = [
    "Help",
    "Terms of service",
    "Privacy policy",
    "Feedback",
  ];
  return (
    <footer className="footer-2">
      {footer2links.map((link, i, arr) => (
        <div key={link} className="footer-2-link-wrapper">
          <span className="footer-2-link">{link}</span>
          <span
            className={clsx(
              "footer-2-link-indicator",
              i === footer2links.length - 1 && "bg-transparent"
            )}
          ></span>
        </div>
      ))}
    </footer>
  );
};

export default Footer2;

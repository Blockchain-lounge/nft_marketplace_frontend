import React from "react";
import clsx from "clsx";
import Link from "next/link";

const Footer2 = () => {
  const footer2links = [
    { label: "Blog", to: "https://spotlight.cloudax.io/" },
    { label: "Terms Of Use", to: "https://www.cloudax.io/terms" },
    { label: "Privacy Policy", to: "https://www.cloudax.io/privacy" },
    { label: "Academy", to: "https://academy.cloudax.io/" },
  ];
  return (
    <footer className="footer-2">
      {footer2links.map((link, i, arr) => (
        <a key={link.label} href={link.to} target="_blank" rel="noreferrer">
          <div className="footer-2-link-wrapper">
            <span className="footer-2-link">{link.label}</span>
            <span
              className={clsx(
                "footer-2-link-indicator",
                i === footer2links.length - 1 && "bg-transparent"
              )}
            ></span>
          </div>
        </a>
      ))}
    </footer>
  );
};

export default Footer2;

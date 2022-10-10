import React from "react";
import clsx from "clsx";
import "./heading-style.scss";

interface IHeading {
  title: string;
  twClasses?: string;
}

const Heading = ({ title, twClasses }: IHeading) => {
  return <h1 className={clsx("hd", twClasses)}>{title}</h1>;
};

export default Heading;

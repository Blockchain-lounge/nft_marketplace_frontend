import React from "react";
import clsx from "clsx";

interface IHeading {
  title: string;
  twClasses?: string;
}

const Heading2 = ({ title, twClasses }: IHeading) => {
  return <h2 className={clsx("hd2", twClasses)}>{title}</h2>;
};

export default Heading2;

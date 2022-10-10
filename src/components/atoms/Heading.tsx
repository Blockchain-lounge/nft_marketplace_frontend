import React from "react";
import clsx from "clsx";


interface IHeading {
  title: string;
  twClasses?: string;
}

const Heading = ({ title, twClasses }: IHeading) => {
  return <h1 className={clsx("hd", twClasses)}>{title}</h1>;
};

export default Heading;

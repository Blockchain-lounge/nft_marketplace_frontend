import clsx from "clsx";
import { ReactNode } from "react";


interface ITag {
    icon?: ReactNode
    tag: string
    twClasses?: string
    twClasses2?: string
}

const Tag = ({ icon, tag, twClasses, twClasses2 }: ITag) => {
  return (
    <div className={clsx("tag", twClasses)}>
      <span className={clsx(twClasses2)}>
        {icon}
        {tag}
      </span>
    </div>
  );
};

export default Tag;

import clsx from "clsx";
import SearchIcon from "./vectors/search-icon";

interface InputProps {
  placeholder: string;
  twClasses: string;
}

const InputField = ({
  placeholder = "Search Collections",
  twClasses,
}: Partial<InputProps>) => {
  return (
    <div className={clsx("input-wrapper", twClasses)}>
      <SearchIcon />
      <input
        type="text"
        placeholder={placeholder}
        className="text-[1.125rem] w-full"
      />
    </div>
  );
};

export default InputField;

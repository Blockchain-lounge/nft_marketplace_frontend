import clsx from "clsx";
import { FC, InputHTMLAttributes } from "react";
import { InputProps } from "./Input-2";

interface CheckboxProps extends Partial<InputProps> {
  check?: boolean;
  handleCheck?: () => void;
}

const Checkbox: FC<CheckboxProps> = ({
  check = false,
  handleCheck,
  label,
  ...rest
}) => {
  return (
    <div className="flex items-center gap-x-4">
      <input
        type="checkbox"
        name={label}
        id="check"
        className={clsx("checkbox", !check && "border border-white")}
        onChange={handleCheck}
        {...rest}
      />
      {label && <label htmlFor="check">{label}</label>}
    </div>
  );
};

export default Checkbox;

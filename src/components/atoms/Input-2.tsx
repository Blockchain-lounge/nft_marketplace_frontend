import { ChangeEvent, FC, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  name: string;
  type?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  belowDesc?: string;
  suffix?: string;
}

const Input2: FC<InputProps> = ({
  label,
  placeholder,
  name,
  type = "text",
  belowDesc,
  suffix,
  onChange,
  ...rest
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="block mb-2">
          {label}
        </label>
      )}
      <div className="select">
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={onChange}
          {...rest}
        />
        {suffix && <span className="text-txt-2">{suffix}</span>}
      </div>
      {belowDesc && (
        <p className="create-new-nft-wrapper-2-label-type">{belowDesc}</p>
      )}
    </div>
  );
};

export default Input2;

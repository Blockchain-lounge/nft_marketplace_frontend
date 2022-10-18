const Input2 = ({
  label,
  placeholder,
  name,
  type = "text",
  belowDesc,
  suffix,
}: {
  label?: string;
  placeholder?: string;
  name: string;
  type?: string;
  belowDesc?: string;
  suffix?: string;
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="block mb-2">
          {label}
        </label>
      )}
      <div className="select">
        <input type={type} name={name} id={name} placeholder={placeholder} />
        {suffix && <span className="text-txt-2">{suffix}</span>}
      </div>
      {belowDesc && (
        <p className="create-new-nft-wrapper-2-label-type">{belowDesc}</p>
      )}
    </div>
  );
};

export default Input2;

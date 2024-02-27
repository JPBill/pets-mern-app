const FormInput = ({
  inputLabel,
  labelFor,
  inputType,
  inputId,
  inputName,
  placeholderText,
  inputDefaultValue,
  inputStyles,
  onChange,
}) => {
  return (
    <div className="redhat-medium text-sm">
      <label className="block text-gray-700 mb-1" htmlFor={labelFor}>
        {inputLabel}
      </label>
      <input
        className={`${inputStyles} appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500`}
        type={inputType}
        id={inputId}
        name={inputName}
        placeholder={placeholderText}
        defaultValue={inputDefaultValue}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default FormInput;

import React from 'react';

const Button = (props) => {
  const { label, placeholder, type, ...remaining } = props;

  return (
    <>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        className="border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-inner focus:shadow-green-200"
        placeholder={placeholder}
        {...remaining}
      />
    </>
  );
};

export default Button;

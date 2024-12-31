import React from 'react';

interface InputProps {
  id: string;
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  dir?: 'rtl' | 'ltr';
  className?: string;
}

const Input = ({
  id,
  name,
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  dir = 'rtl',
  className = '',
}: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
          dir={dir}
        >
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        dir={dir}
        className={`
          block w-full px-3 py-2 border rounded-md shadow-sm
          placeholder-gray-400 
          focus:outline-none focus:ring-blue-500 focus:border-blue-500
          ${error ? 'border-red-300' : 'border-gray-300'}
          ${className}
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600" dir={dir}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;

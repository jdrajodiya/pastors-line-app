import React from 'react'

type InputProps = {
  type: string;
  className?: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const Input = ({ type = "text", className, placeholder, value, onChange, onKeyDown }: InputProps) => {
  return (
    <div className="form-group mb-0 w-100">
      <input
        type={type}
        className={`form-control ${className}`}
        style={{ height: 50 }}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onKeyDown={onKeyDown}
      />
    </div>
  )
}

export default Input;
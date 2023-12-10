import React, { useState } from 'react';

type SwitchProps = {
  onChange: (checked: boolean) => void;
  checked: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
};

const Switch = ({
  onChange,
  checked,
  disabled,
  className,
  label,
  ...props
}: SwitchProps) => {

  const toggle = () => {
    onChange(!checked);
  };

  return (
    <label className={`flex items-center cursor-pointer ${className} gap-2`} {...props}>
      <div className="relative w-[42px] h-6">
        <input type="checkbox" className="hidden" checked={checked} onChange={toggle} disabled={disabled} />
        <div className={`toggle__line flex items-center absolute w-full h-full bg-gray-400 rounded-full shadow-inner px-1 ${
          checked ? 'justify-end bg-green-400' : 'justify-start bg-gray-400'
        } `}>
          <div className={`toggle__dot w-4 h-4 bg-white rounded-full shadow `}></div>
        </div>
      </div>
      {label && <span className="mr-2 text-gray-700">{label}</span>}
    </label>
  );
};

export default Switch;
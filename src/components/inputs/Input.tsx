import { Icon, IconifyIcon } from '@iconify/react';
import React, { HTMLInputTypeAttribute } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form/dist/types';
import { FieldError } from 'react-hook-form/dist/types/errors';

interface IProps<T extends FieldValues = FieldValues> {
  id: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  icon?: IconifyIcon;
  rightIcon?: IconifyIcon;
  error?: FieldError;
  register: UseFormRegister<T>;
}

const Input = <T extends FieldValues = FieldValues>({
  id,
  label,
  type,
  placeholder,
  icon,
  rightIcon,
  error,
  register,
}: IProps<T>) => {
  return (
    <div>
      <label className="select-none" htmlFor={id}>
        {label}:
        <div className="flex h-12 w-full flex-row items-center rounded-lg border-2 border-gray-700 bg-gray-800 px-1 py-3 focus-within:border-purple-800">
          {icon && <Icon icon={icon} className="mx-1 text-2xl" />}
          <input
            className="flex-1 bg-transparent px-1 placeholder:text-gray-400 focus:outline-none"
            placeholder={placeholder}
            id={id}
            type={type}
            {...register(id as Path<T>)}
            name={id}
          />
          {rightIcon && <Icon icon={rightIcon} className="mx-1 text-2xl" />}
        </div>
        {error && <div className="text-xs text-red-500">{error.message}</div>}
      </label>
    </div>
  );
};

export default Input;

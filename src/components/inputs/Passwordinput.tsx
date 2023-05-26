import eyeIcon from '@iconify/icons-mdi/eye';
import eyeOff from '@iconify/icons-mdi/eye-off';
import lockIcon from '@iconify/icons-mdi/lock';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { FieldValues, Path } from 'react-hook-form/dist/types';
import { FieldError } from 'react-hook-form/dist/types/errors';
import { UseFormRegister } from 'react-hook-form/dist/types/form';

interface IProps<T extends FieldValues = FieldValues> {
  id: string;
  label: string;
  error?: FieldError;
  register: UseFormRegister<T>;
}

const PasswordInput = <T extends FieldValues = FieldValues>({ id, label, error, register }: IProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="select-none" htmlFor={id}>
        {label}:
        <div className="flex h-12 w-full flex-row items-center rounded-lg border-2 border-gray-700 bg-gray-800 px-1 py-3 focus-within:border-purple-800">
          <Icon icon={lockIcon} className="mx-1 text-2xl" />
          <input
            className="flex-1 bg-transparent px-1 placeholder:text-gray-400 focus:outline-none"
            placeholder="********"
            id={id}
            type={showPassword ? 'text' : 'password'}
            {...register(id as Path<T>)}
            name={id}
          />
          <Icon
            icon={showPassword ? eyeOff : eyeIcon}
            className="mx-1 cursor-pointer text-2xl"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          />
        </div>
        {error && <div className="text-xs text-red-500">{error.message}</div>}
      </label>
    </div>
  );
};

export default PasswordInput;

import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import { FieldError } from 'react-hook-form/dist/types/errors';
import { UseFormRegister } from 'react-hook-form/dist/types/form';

interface IProps {
  id: string;
  label: string;
  error?: FieldError;
  register: UseFormRegister<any>;
}

const PasswordInput = ({ id, label, error, register }: IProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="select-none" htmlFor={id}>
        {label}:
        <div className="flex h-12 w-full flex-row items-center rounded-lg border-2 border-gray-700 bg-gray-800 px-1 py-3 focus-within:border-purple-800">
          <FontAwesomeIcon className="w-10" icon={faLock} />
          <input
            className="flex-1 bg-transparent px-1 placeholder:text-gray-400 focus:outline-none"
            placeholder="********"
            id={id}
            type={showPassword ? 'text' : 'password'}
            {...register(id)}
            name={id}
          />
          <FontAwesomeIcon
            className="w-10 cursor-pointer"
            icon={showPassword ? faEyeSlash : faEye}
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

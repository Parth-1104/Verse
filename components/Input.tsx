'use client';
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';


const PasswordInput = ({ register, required }: { register?: ReturnType<typeof useForm>['register'], required: boolean }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative w-full">
      <Input
        type={isVisible ? 'text' : 'password'}
        placeholder="********"
        className="pr-10"
        {...register} 
        required={required}
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        {isVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default PasswordInput;

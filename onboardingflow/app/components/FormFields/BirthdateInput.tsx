import React from 'react';
import { ValidationErrors } from '../../types/ValidationErrors';

export default function BirthdateInput({ value, onChange, birthdateError, updateErrors}: { 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
    birthdateError: string,
    updateErrors: ((onError: (prevErrors: ValidationErrors) => ValidationErrors) => void) }) {
  
    const setError = (error: string) => {
      updateErrors(prevErrors => ({...prevErrors, birthdate: error}));
    };
  
    const validateBirthdate = (birthdate: string) => {
      if (!birthdate) {
        setError('Birthdate is required');
        return false;
      }
  
      const selectedDate = new Date(birthdate);
      const currentDate = new Date();
      const minAge = 13; // Minimum age requirement
      const maxAge = 120; // Maximum reasonable age
  
      const age = currentDate.getFullYear() - selectedDate.getFullYear();
      const monthDiff = currentDate.getMonth() - selectedDate.getMonth();
      const dayDiff = currentDate.getDate() - selectedDate.getDate();
  
      // Calculate exact age
      let calculatedAge = age;
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        calculatedAge--;
      }
  
      if (calculatedAge < minAge) {
        setError(`You must be at least ${minAge} years old`);
        return false;
      }
  
      if (calculatedAge > maxAge) {
        setError(`Please enter a valid birthdate`);
        return false;
      }
  
      setError('');
      return true;
    };
  
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      validateBirthdate(e.target.value);
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e);
      validateBirthdate(e.target.value);
    };
  
    return (
      <div className='flex flex-col items-start justify-center'>
        <label htmlFor="birthdate" className='font-mono ml-1'>Birthdate: </label>
        <input 
          type="date" 
          id="birthdate"
          name="birthdate" 
          value={value} 
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-72 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 
            ${birthdateError ? 'border-red-500 focus:ring-red-300' : 'border-green-500 focus:ring-green-300'}`}
        />
        {birthdateError && <p className='text-red-500 text-sm mt-1'>{birthdateError}</p>}
      </div>
    );
  };
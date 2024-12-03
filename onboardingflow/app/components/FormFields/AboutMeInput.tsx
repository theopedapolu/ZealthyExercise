import React from 'react';
import { ValidationErrors } from '../../types/ValidationErrors';
export default function AboutMeInput ({ value, onChange, aboutMeError, updateErrors}: { 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void 
    aboutMeError: string,
    updateErrors: ((onError: (prevErrors: ValidationErrors) => ValidationErrors) => void) }) {
  
    const validateAboutMe = (aboutMe: string) => {
      if (!aboutMe) {
        updateErrors((prevErrors:ValidationErrors) => ({...prevErrors, about_me: 'About Me is required'}));
        return false;
      }
      if (aboutMe.length < 20) {
        updateErrors((prevErrors:ValidationErrors) => ({...prevErrors, about_me: 'About Me must be at least 20 characters long'}));
        return false;
      }
      if (aboutMe.length > 500) {
        updateErrors((prevErrors:ValidationErrors) => ({...prevErrors, about_me: 'About Me cannot exceed 500 characters'}));
        return false;
      }
      updateErrors((prevErrors:ValidationErrors) => ({...prevErrors, about_me: ''}));
      return true;
    };
  
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      validateAboutMe(e.target.value);
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e);
      validateAboutMe(e.target.value);
    };
  
    return (
      <div className='flex flex-col items-start justify-center'>
        <label htmlFor="about_me" className='font-mono ml-1'>About Me: </label>
        <textarea 
          id="about_me"
          name="about_me" 
          placeholder='Write about yourself' 
          value={value} 
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-72 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 
            ${aboutMeError ? 'border-red-500 focus:ring-red-300' : 'border-green-500 focus:ring-green-300'}`}
        ></textarea>
        {aboutMeError && <p className='text-red-500 text-sm mt-1'>{aboutMeError}</p>}
      </div>
    );
  };
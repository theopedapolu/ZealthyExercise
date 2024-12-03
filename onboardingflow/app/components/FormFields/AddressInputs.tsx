import React from 'react';
import { FormData } from '../../types/FormData';
import { ValidationErrors } from '../../types/ValidationErrors';
import { AddressErrors } from '../../types/AddressErrors';

export default function AddressInputs ({data, onChange, addressErrors, updateErrors}: { 
    data: FormData, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    addressErrors: AddressErrors,
    updateErrors: ((onError: (prevErrors: ValidationErrors) => ValidationErrors) => void)}) {

    const validateAddressField = (name: string, value: string) => {
      let error = '';
      switch (name) {
        case 'street_address':
          if (!value) error = 'Street address is required';
          break;
        case 'city':
          if (!value) error = 'City is required';
          break;
        case 'state':
          if (!value) error = 'State is required';
          if (value.length !== 2) error = 'State must be a 2-letter abbreviation';
          break;
        case 'zip_code':
          const zipRegex = /^\d{5}(-\d{4})?$/;
          if (!value) error = 'Zip code is required';
          if (!zipRegex.test(value)) error = 'Invalid zip code format';
          break;
      }
      return error;
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const error = validateAddressField(name, value);
      
      // Update onChange from parent component
      onChange(e);
      
      // Update errors state
      updateErrors(prevErrors => ({
        ...prevErrors,
        [name]: error
      }));
    };
  
    const addressFields = [
      { 
        name: 'street_address', 
        label: 'Street Address', 
        placeholder: '123 Main Street' 
      },
      { 
        name: 'city', 
        label: 'City', 
        placeholder: 'San Francisco' 
      },
      { 
        name: 'state', 
        label: 'State', 
        placeholder: 'CA' 
      },
      { 
        name: 'zip_code', 
        label: 'Zip Code', 
        placeholder: '94016' 
      }
    ];
  
    return (
      <>
        {addressFields.map(field => (
          <div key={field.name} className='flex flex-col items-start justify-center'>
            <label htmlFor={field.name} className='font-mono ml-1'>{field.label}: </label>
            <input 
              type="text" 
              id={field.name}
              name={field.name} 
              placeholder={field.placeholder} 
              value={data[field.name as keyof FormData]} 
              onChange={handleChange}
              className={`w-72 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 
                ${addressErrors[field.name as keyof typeof addressErrors] ? 'border-red-500 focus:ring-red-300' : 'border-green-500 focus:ring-green-300'}`}
            />
            {addressErrors[field.name as keyof typeof addressErrors] && (
              <p className='text-red-500 text-sm mt-1'>
                {addressErrors[field.name as keyof typeof addressErrors]}
              </p>
            )}
          </div>
        ))}
      </>
    );
  };
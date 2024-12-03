import { ValidationErrors } from '../../types/ValidationErrors';
export default function EmailInput({ value, onChange, emailError, updateErrors}: { 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
    emailError: string
    updateErrors: ((onError: (prevErrors: ValidationErrors) => ValidationErrors) => void) }) {
  
    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        updateErrors((prevErrors:ValidationErrors) => ({...prevErrors, email: 'Email is required'}));
        return false;
      }
      if (!emailRegex.test(email)) {
        updateErrors((prevErrors:ValidationErrors) => ({...prevErrors, email: 'Please enter a valid email address'}));
        return false;
      }
      updateErrors((prevErrors:ValidationErrors) => ({...prevErrors, email: ''}));
      return true;
    };
  
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      validateEmail(e.target.value);
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e);
      validateEmail(e.target.value);
    };
  
    return (
      <div className='flex flex-col items-start justify-center'>
        <label htmlFor="email" className='font-mono ml-1'>Email: </label>
        <input 
          type="email" 
          id="email"
          name="email" 
          placeholder='johndoe@example.com' 
          value={value} 
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-72 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 
            ${emailError ? 'border-red-500 focus:ring-red-300' : 'border-green-500 focus:ring-green-300'}`}
        />
        {emailError && <p className='text-red-500 text-sm mt-1'>{emailError}</p>}
      </div>
    );
  };
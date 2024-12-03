import { ValidationErrors } from '../../types/ValidationErrors';
export default function PasswordInput ({ value, onChange, passwordError, updateErrors}: { 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    passwordError: string,
    updateErrors: ((onError: (prevErrors: ValidationErrors) => ValidationErrors) => void)
}) {
  
    const validatePassword = (password: string) => {
      if (!password) {
        updateErrors((prevErrors:ValidationErrors) => ({...prevErrors, password: 'Password is required'}));
        return false;
      }
      if (password.length < 8) {
        updateErrors((prevErrors:ValidationErrors) => ({...prevErrors, password: 'Must be at least 8 characters long'}));
        return false;
      }
      if (!/[A-Z]/.test(password)) {
        updateErrors((prevErrors:ValidationErrors) => ({...prevErrors, password: 'Must contain at least one uppercase letter'}));
        return false;
      }
      if (!/[a-z]/.test(password)) {
        updateErrors((prevErrors:ValidationErrors) => ({...prevErrors, password: 'Must contain at least one lowercase letter'}));
        return false;
      }
      if (!/[0-9]/.test(password)) {
        updateErrors((prevErrors:ValidationErrors) => ({...prevErrors, password: 'Must contain at least one number'}));
        return false;
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        updateErrors((prevErrors:ValidationErrors) => ({...prevErrors, password: 'Must contain at least one special character'}));
        return false;
      }
      updateErrors((prevErrors:ValidationErrors) => ({...prevErrors, password: ''}));
      return true;
    };
  
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      validatePassword(e.target.value);
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e);
      validatePassword(e.target.value);
    };
  
    return (
      <div className='flex flex-col items-start justify-center'>
        <label htmlFor="password" className='font-mono ml-1'>Password: </label>
        <input 
          type="password" 
          id="password"
          name="password" 
          placeholder="••••••••" 
          value={value} 
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-72 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 
            ${passwordError? 'border-red-500 focus:ring-red-300' : 'border-green-500 focus:ring-green-300'}`}
        />
        {passwordError && <p className='text-red-500 text-sm mt-1'>{passwordError}</p>}
      </div>
    );
  };
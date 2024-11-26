
type FormData = {
    email: string;
    password: string;
    about_me: string;
    street_address: string;
    city: string;
    state: string;
    zip_code: string;
    birthdate: string;
  };
  
  type AdminSettings = {
    address: string;
    aboutme: string;
    birthdate: string;
  };

// Individual input components for better readability and reusability
const EmailInput = ({ value, onChange }: { 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
  }) => (
    <div className='flex flex-col items-start justify-center'>
      <label htmlFor="email" className='font-mono ml-1'>Email: </label>
      <input 
        type="email" 
        id="email"
        name="email" 
        placeholder='johndoe@example.com' 
        value={value} 
        onChange={onChange}
        className='w-72 px-4 py-2 border border-green-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300'
      />
    </div>
  );
  
  const PasswordInput = ({ value, onChange }: { 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
  }) => (
    <div className='flex flex-col items-start justify-center'>
      <label htmlFor="password" className='font-mono ml-1'>Password: </label>
      <input 
        type="password" 
        id="password"
        name="password" 
        placeholder="••••••••" 
        value={value} 
        onChange={onChange}
        className='w-72 px-4 py-2 border border-green-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300'
      />
    </div>
  );
  
  const AboutMeInput = ({ value, onChange }: { 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void 
  }) => (
    <div className='flex flex-col items-start justify-center'>
      <label htmlFor="about_me" className='font-mono ml-1'>About Me: </label>
      <textarea 
        id="about_me"
        name="about_me" 
        placeholder='Write about yourself' 
        value={value} 
        onChange={onChange}
        className='w-72 px-4 py-2 border border-green-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300'
      ></textarea>
    </div>
  );
  
  const AddressInputs = ({ 
    data, 
    onChange 
  }: { 
    data: FormData, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
  }) => (
    <>
      <div className='flex flex-col items-start justify-center'>
        <label htmlFor="street_address" className='font-mono ml-1'>Street Address: </label>
        <input 
          type="text" 
          id="street_address"
          name="street_address" 
          placeholder='123 Main Street' 
          value={data.street_address} 
          onChange={onChange}
          className='w-72 px-4 py-2 border border-green-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300'
        />
      </div>
      <div className='flex flex-col items-start justify-center'>
        <label htmlFor="city" className='font-mono ml-1'>City: </label>
        <input 
          type="text" 
          id="city"
          name="city" 
          placeholder='San Francisco' 
          value={data.city} 
          onChange={onChange}
          className='w-72 px-4 py-2 border border-green-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300'
        />
      </div>
      <div className='flex flex-col items-start justify-center'>
        <label htmlFor="state" className='font-mono ml-1'>State: </label>
        <input 
          type="text" 
          id="state"
          name="state" 
          placeholder='CA' 
          value={data.state} 
          onChange={onChange}
          className='w-72 px-4 py-2 border border-green-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300'
        />
      </div>
      <div className='flex flex-col items-start justify-center'>
        <label htmlFor="zip_code" className='font-mono ml-1'>Zip Code: </label>
        <input 
          type="text" 
          id="zip_code"
          name="zip_code" 
          placeholder='94016' 
          value={data.zip_code} 
          onChange={onChange}
          className='w-72 px-4 py-2 border border-green-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300'
        />
      </div>
    </>
  );
  
  const BirthdateInput = ({ value, onChange }: { 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
  }) => (
    <div className='flex flex-col items-start justify-center'>
      <label htmlFor="birthdate" className='font-mono ml-1'>Birthdate: </label>
      <input 
        type="date" 
        id="birthdate"
        name="birthdate" 
        value={value} 
        onChange={onChange}
        className='w-72 px-4 py-2 border border-green-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300'
      />
    </div>
  );

  export {EmailInput, PasswordInput, AboutMeInput, AddressInputs, BirthdateInput};
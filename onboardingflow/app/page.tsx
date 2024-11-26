"use client"
import React, { useState, useEffect } from 'react';
import { EmailInput, PasswordInput, AboutMeInput, AddressInputs, BirthdateInput } from './components/FormFields';
import { useRouter } from 'next/navigation';

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

export default function UserForm() {
  // Router for navigation
  const router = useRouter();
  
  // Initial state with empty form data
  const [data, setData] = useState<FormData>({
    email: '',
    password: '',
    about_me: '',
    street_address: '',
    city: '',
    state: '',
    zip_code: '',
    birthdate: ''
  });

  // State for admin settings to control form pages
  const [adminSettings, setAdminSettings] = useState<AdminSettings>({
    address: '1',
    aboutme: '1',
    birthdate: '1'
  });

  // Current page state
  const [pageNum, setPageNum] = useState(1);

  // Fetch admin settings on component mount
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch('/api/getAdminData');
        const admin_data = await response.json();
        setAdminSettings(admin_data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, []);

  // Generic change handler for all inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/saveUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      console.log(result);
      // Handle successful submission (e.g., show success message, redirect)
      router.push('/success');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  // Page navigation handlers
  const goToPrevPage = () => setPageNum(Math.max(1, pageNum - 1));
  const goToNextPage = () => setPageNum(Math.min(3, pageNum + 1));

  // Render components based on page and admin settings
  const renderPageComponents = () => {
    switch (pageNum) {
      case 1:
        return (
          <>
            <EmailInput value={data.email} onChange={handleChange} />
            <PasswordInput value={data.password} onChange={handleChange} />
          </>
        );
      case 2:
        return (
          <>
            {adminSettings.address === '2' && <AddressInputs data={data} onChange={handleChange} />}
            {adminSettings.aboutme === '2' && <AboutMeInput value={data.about_me} onChange={handleChange} />}
            {adminSettings.birthdate === '2' && <BirthdateInput value={data.birthdate} onChange={handleChange} />}
          </>
        );
      case 3:
        return (
          <>
            {adminSettings.address !== '2' && <AddressInputs data={data} onChange={handleChange} />}
            {adminSettings.aboutme !== '2' && <AboutMeInput value={data.about_me} onChange={handleChange} />}
            {adminSettings.birthdate !== '2' && <BirthdateInput value={data.birthdate} onChange={handleChange} />}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white backdrop-blur-xl shadow-lg border border-white border-opacity-30 rounded-xl p-8 w-fit h-fit flex flex-col items-center">
      <div>
        <p className="text-3xl font-mono font-bold">Welcome!</p>
      </div>
      
      <form onSubmit={handleSubmit} className='mt-10 flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center gap-y-3'>
          {renderPageComponents()}
          
          {pageNum === 3 && (
            <button 
              type='submit' 
              className='mt-5 px-4 py-2 font-mono text-white bg-green-500 hover:bg-green-600 rounded-xl'
            >
              Submit
            </button>
          )}
        </div>
      </form>

      <div className='mt-10 flex flex-row gap-x-20 items-center justify-between'>
        <button 
          type="button"
          onClick={goToPrevPage} 
          className='flex items-center px-2 font-mono text-white bg-rose-500 hover:bg-rose-600 rounded-xl'
          disabled={pageNum === 1}
        >
          Prev <span className='font-bold ml-2 text-2xl'>&larr;</span>
        </button>

        <div className='flex flex-row gap-x-2 items-center justify-center'>
          {[1, 2, 3].map((num) => (
            <div 
              key={num} 
              className={`px-2 py-1 font-mono text-white ${
                pageNum === num ? 'bg-blue-500' : 'bg-blue-200'
              } rounded-xl`}
            >
              {num}
            </div>
          ))}
        </div>

        <button 
          type="button"
          onClick={goToNextPage} 
          className='flex items-center px-2 font-mono text-white bg-rose-500 hover:bg-rose-600 rounded-xl'
          disabled={pageNum === 3}
        >
          Next <span className='font-bold ml-2 text-2xl'>&rarr;</span>
        </button>
      </div>
    </div>
  );
}


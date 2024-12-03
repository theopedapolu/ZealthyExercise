"use client"
import React, { useState, useEffect} from 'react';
import { FormData } from './types/FormData';
import { AdminSettings } from './types/AdminSettings';
import { ValidationErrors } from './types/ValidationErrors';
import {EmailInput, PasswordInput, AboutMeInput, AddressInputs, BirthdateInput} from './components/FormFields/FormFields';
import { useRouter } from 'next/navigation';
import OnboardingFlow from './components/OnboardingFlow';

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

  // State for form input validation errors
  const [errors, setErrors] = useState<ValidationErrors>({
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
    email: '1',
    password: '1',
    address: '1',
    aboutme: '1',
    birthdate: '1'
  });

  const dataToAdmin: Record<keyof FormData, keyof AdminSettings> = {
    email: "email",
    password: "password",
    street_address: "address",
    city: "address",
    state: "address",
    zip_code: "address",
    about_me: "aboutme",
    birthdate: "birthdate"
  }

  // Current page state
  const [pageNum, setPageNum] = useState(1);

  // Fetch admin settings on component mount
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch('/api/getAdminData');
        const admin_data = await response.json();
        setAdminSettings((prevSettings) => ({ ...prevSettings, ...admin_data}));
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, []);

  // Fetch partial user data on component mount
  useEffect(() => {
    const fetchPartialUserData = async () => {
      try {
        const response = await fetch('/api/getPartialUserData');
        const userData = await response.json();
        const newUserData: FormData = {
          email: '',
          password: '',
          about_me: '',
          street_address: '',
          city: '',
          state: '',
          zip_code: '',
          birthdate: ''
        };
        Object.keys(userData).forEach((key) => {
          if (key != 'pageNum' && key != '_id') {
            newUserData[key as keyof FormData] = userData[key];
          }
        })
        setData(newUserData);
        setPageNum(parseInt(userData["pageNum"]));
        console.log(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchPartialUserData();
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
      // Insert new User record
      const responseSave = await fetch('/api/saveUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const resultSave = await responseSave.json();
      console.log(resultSave);
      
      // Reset Partial Data
      const responseReset = await fetch('/api/updatePartialUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: '',
          password: '',
          about_me: '',
          street_address: '',
          city: '',
          state: '',
          zip_code: '',
          birthdate: '',
          pageNum:1
        })
      });
      const resultReset = await responseReset.json();
      console.log(resultReset);
      // Handle successful submission (e.g., show success message, redirect)
      router.push('/success');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  // Page navigation handlers
  const goToPrevPage = () => setPageNum(Math.max(1, pageNum - 1));
  const goToNextPage = () => {
    setPageNum(Math.min(3, pageNum + 1));
    const saveUserData = async () => {
        try {
        const response = await fetch('/api/updatePartialUserData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({...data,pageNum:Math.min(3, pageNum + 1)})
        });
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
    saveUserData();
  }

  // Render components based on page and admin settings
  const renderPageComponents = (num : number) => {
    switch (num) {
      case 1:
        return (
          <>
            <EmailInput value={data.email} onChange={handleChange} emailError={errors.email} updateErrors={setErrors}/>
            <PasswordInput value={data.password} onChange={handleChange} passwordError={errors.password} updateErrors={setErrors}/>
          </>
        );
      case 2:
        return (
          <>
            {adminSettings.address === '2' && <AddressInputs data={data} onChange={handleChange} addressErrors={{street_address:errors.street_address, city:errors.city, state: errors.state, zip_code: errors.zip_code}} updateErrors={setErrors} />}
            {adminSettings.aboutme === '2' && <AboutMeInput value={data.about_me} onChange={handleChange} aboutMeError={errors.about_me} updateErrors={setErrors}/>}
            {adminSettings.birthdate === '2' && <BirthdateInput value={data.birthdate} onChange={handleChange} birthdateError={errors.birthdate} updateErrors={setErrors}/>}
          </>
        );
      case 3:
        return (
          <>
            {adminSettings.address === '3' && <AddressInputs data={data} onChange={handleChange} addressErrors={{street_address:errors.street_address, city:errors.city, state: errors.state, zip_code: errors.zip_code}} updateErrors={setErrors} />}
            {adminSettings.aboutme === '3' && <AboutMeInput value={data.about_me} onChange={handleChange} aboutMeError={errors.about_me} updateErrors={setErrors}/>}
            {adminSettings.birthdate === '3' && <BirthdateInput value={data.birthdate} onChange={handleChange} birthdateError={errors.birthdate} updateErrors={setErrors}/>}
          </>
        );
      default:
        return <></>
    }
  };

  const preventProceed = (keys : string[], pageNum : number) => {
    return keys.filter((key) => parseInt(adminSettings[dataToAdmin[key as keyof FormData]])==pageNum).some((key) => data[key as keyof FormData] === '' || errors[key as keyof ValidationErrors] !== '')
  }

  return (
    <OnboardingFlow 
      renderPageComponents={renderPageComponents} 
      handleSubmit={handleSubmit} 
      goToPrevPage={goToPrevPage} 
      goToNextPage={goToNextPage} 
      pageNum={pageNum} 
      preventProceed={preventProceed(Object.keys(data),pageNum)}
    />
  );  
}
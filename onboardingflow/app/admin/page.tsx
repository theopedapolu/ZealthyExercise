"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

export default function Admin() {
    const [admin_data, set_admin_data] = useState({
        address: '0',
        aboutme: '0',
        birthdate: '0',
    });
    
    const admin_data_ref = useRef({
        address: '0',
        aboutme: '0',
        birthdate: '0'
    });

    // Validation and feedback states
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        admin_data_ref.current.address = admin_data.address;
        admin_data_ref.current.aboutme = admin_data.aboutme;
        admin_data_ref.current.birthdate = admin_data.birthdate;
    }, [admin_data]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/getAdminData');
                const initial_admin_data = await response.json();
                set_admin_data(initial_admin_data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const validateForm = () => {
        const errors: string[] = [];
        
        // Check 2nd page selections
        if (admin_data.address !== '2' && admin_data.aboutme !== '2' && admin_data.birthdate !== '2') {
            errors.push('Please select at least one component for the 2nd page');
        }

        // Check 3rd page selections
        if (admin_data.address !== '3' && admin_data.aboutme !== '3' && admin_data.birthdate !== '3') {
            errors.push('Please select at least one component for the 3rd page');
        }

        return errors;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Reset previous states
        setValidationErrors([]);
        setSubmissionStatus('idle');

        // Validate form
        const errors = validateForm();
        
        if (errors.length > 0) {
            setValidationErrors(errors);
            setSubmissionStatus('error');
            return;
        }

        try {
            const response = await fetch('/api/updateAdminData', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(admin_data_ref.current)
            });
            
            if (response.ok) {
                setSubmissionStatus('success');
            } else {
                setSubmissionStatus('error');
            }
        } catch (error) {
            console.error('Error saving admin data:', error);
            setSubmissionStatus('error');
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        set_admin_data(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200 transform transition-all hover:scale-[1.02]">
                <div className="bg-gray-800 text-white p-6 text-center">
                    <h1 className="font-bold text-2xl sm:text-3xl tracking-tight">Admin Page Controls</h1>
                    <p className="mt-2 text-sm opacity-80">Select the components to appear on each page</p>
                </div>

                <div className="p-6 sm:p-8">
                    {/* Error Messages */}
                    {validationErrors.length > 0 && (
                        <div className="mb-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg p-3">
                            <ul className="text-red-600 list-disc list-inside">
                                {validationErrors.map((error, index) => (
                                    <li key={index} className="text-xs sm:text-sm">{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Success Message */}
                    {submissionStatus === 'success' && (
                        <div className="mb-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg p-3">
                            <div className="text-green-600 text-xs sm:text-sm">
                                Admin settings updated successfully!
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className='grid grid-cols-3 gap-x-2 gap-y-4'>
                        <div className="col-span-3 grid grid-cols-3 text-center text-sm sm:text-base text-gray-600">
                            <p className="col-start-2">2nd Page</p>
                            <p>3rd Page</p>
                        </div>

                        {/* Address Field */}
                        <div className="col-span-3 grid grid-cols-3 items-center gap-x-2 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                            <p className="text-sm sm:text-base text-gray-700">Address Field</p>
                            <div className="flex justify-center">
                                <input 
                                    type='radio' 
                                    name='address' 
                                    value='2' 
                                    onChange={handleChange} 
                                    checked={admin_data.address === '2'}
                                    className="w-5 h-5 text-gray-600 focus:ring-gray-500 border-gray-300"
                                />
                            </div>
                            <div className="flex justify-center">
                                <input 
                                    type='radio' 
                                    name='address' 
                                    value='3' 
                                    onChange={handleChange} 
                                    checked={admin_data.address === '3'}
                                    className="w-5 h-5 text-gray-600 focus:ring-gray-500 border-gray-300"
                                />
                            </div>
                        </div>

                        {/* About Me Field */}
                        <div className="col-span-3 grid grid-cols-3 items-center gap-x-2 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                            <p className="text-sm sm:text-base text-gray-700">About Me Field</p>
                            <div className="flex justify-center">
                                <input 
                                    type='radio' 
                                    name='aboutme' 
                                    value='2' 
                                    onChange={handleChange} 
                                    checked={admin_data.aboutme === '2'}
                                    className="w-5 h-5 text-gray-600 focus:ring-gray-500 border-gray-300"
                                />
                            </div>
                            <div className="flex justify-center">
                                <input 
                                    type='radio' 
                                    name='aboutme' 
                                    value='3'
                                    onChange={handleChange} 
                                    checked={admin_data.aboutme === '3'}
                                    className="w-5 h-5 text-gray-600 focus:ring-gray-500 border-gray-300"
                                />
                            </div>
                        </div>

                        {/* Birth Date Field */}
                        <div className="col-span-3 grid grid-cols-3 items-center gap-x-2 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                            <p className="text-sm sm:text-base text-gray-700">Birth Date Field</p>
                            <div className="flex justify-center">
                                <input 
                                    type='radio' 
                                    name='birthdate' 
                                    value='2' 
                                    onChange={handleChange} 
                                    checked={admin_data.birthdate === '2'}
                                    className="w-5 h-5 text-gray-600 focus:ring-gray-500 border-gray-300"
                                />
                            </div>
                            <div className="flex justify-center">
                                <input 
                                    type='radio' 
                                    name='birthdate' 
                                    value='3'
                                    onChange={handleChange} 
                                    checked={admin_data.birthdate === '3'}
                                    className="w-5 h-5 text-gray-600 focus:ring-gray-500 border-gray-300"
                                />
                            </div>
                        </div>

                        <div className="mt-6 col-span-3 flex flex-row justify-center">
                            <button 
                                type="submit" 
                                className="w-full max-w-xs px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
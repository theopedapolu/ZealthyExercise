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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white backdrop-blur-xl shadow-lg border border-white border-opacity-30 rounded-xl p-8 rounded-lg w-fit h-fit flex flex-col items-center">
            <div className="flex flex-col items-center justify-center">
                <p className="font-bold text-3xl font-mono">Admin Page Controls</p>
                <p className="mt-3 text-slate-500">Select the components to appear on each page</p>
            </div>

            {/* Error Messages */}
            {validationErrors.length > 0 && (
                <div className="mt-4 w-full bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="text-red-600">
                        <ul className="list-disc list-inside">
                            {validationErrors.map((error, index) => (
                                <li key={index} className="text-sm">{error}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Success Message */}
            {submissionStatus === 'success' && (
                <div className="mt-4 w-full bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="text-green-600 text-sm">
                        Admin settings updated successfully!
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className='mt-5 grid grid-rows-4 grid-cols-3 gap-x-2 gap-y-3 font-mono'>
                <p className="ml-10 col-start-2">2nd Page</p>
                <p className="ml-10">3rd Page</p>
                <p>Address Field</p>
                <input 
                    type='radio' 
                    name='address' 
                    value='2' 
                    onChange={handleChange} 
                    checked={admin_data.address === '2'}
                />
                <input 
                    type='radio' 
                    name='address' 
                    value='3' 
                    onChange={handleChange} 
                    checked={admin_data.address === '3'}
                />
                <p>About Me Field</p>
                <input 
                    type='radio' 
                    name='aboutme' 
                    value='2' 
                    onChange={handleChange} 
                    checked={admin_data.aboutme === '2'}
                />
                <input 
                    type='radio' 
                    name='aboutme' 
                    value='3'
                    onChange={handleChange} 
                    checked={admin_data.aboutme === '3'}
                />
                <p>Birth Date Field</p>
                <input 
                    type='radio' 
                    name='birthdate' 
                    value='2' 
                    onChange={handleChange} 
                    checked={admin_data.birthdate === '2'}
                />
                <input 
                    type='radio' 
                    name='birthdate' 
                    value='3'
                    onChange={handleChange} 
                    checked={admin_data.birthdate === '3'}
                />
                <div className="mt-8 col-span-3 flex flex-row justify-center">
                    <button 
                        type="submit" 
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
"use client";
import { useEffect, useState } from 'react';

export default function Data() {
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

    const [documents, setDocuments] = useState<FormData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/getUserData');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                
                const data = await response.json();
                setDocuments(data.documents);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl font-mono">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                <p className="text-xl font-mono">Error: {error}</p>
            </div>
        );
    }

    if (documents.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl font-mono">No documents found.</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        {['Email', 'Password Hash', 'About Me', 'Street Address', 'City', 'State', 'Zip Code', 'Birthdate'].map((header) => (
                            <th key={header} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {documents.map((doc, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-4 py-2">{doc.email}</td>
                            <td className="px-4 py-2">{doc.password}</td>
                            <td className="px-4 py-2">{doc.about_me}</td>
                            <td className="px-4 py-2">{doc.street_address}</td>
                            <td className="px-4 py-2">{doc.city}</td>
                            <td className="px-4 py-2">{doc.state}</td>
                            <td className="px-4 py-2">{doc.zip_code}</td>
                            <td className="px-4 py-2">{doc.birthdate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
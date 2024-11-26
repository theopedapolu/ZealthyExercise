import React from 'react';
import Link from 'next/link';

export default function Success() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white backdrop-blur-xl shadow-lg border border-white border-opacity-30 rounded-xl p-8 w-fit h-fit flex flex-col items-center">
      <div className="text-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-24 w-24 mx-auto text-green-500 mb-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <p className="text-3xl font-mono font-bold text-green-600 mb-4">Success!</p>
        <p className="text-lg font-mono text-gray-700 mb-6 text-center">
          Your form has been submitted successfully.
        </p>
        <Link href="/" className='mt-5 px-4 py-2 font-mono text-white bg-green-500 hover:bg-green-600 rounded-xl'>
          Return to Form
        </Link>
      </div>
    </div>
  )
}

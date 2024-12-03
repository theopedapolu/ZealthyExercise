import React from "react";

export default function Pagination({goToPrevPage,goToNextPage,pageNum,preventNext} :
    {
        goToPrevPage: () => void,
        goToNextPage: () => void,
        pageNum: number,
        preventNext: boolean
    }) {

    return (
        <div className='mt-6 sm:mt-10 flex flex-row gap-x-10 sm:gap-x-20 items-center justify-center w-full'>
            <button 
            type="button"
            onClick={goToPrevPage} 
            className={`flex items-center px-2 py-1 font-mono rounded-xl text-sm sm:text-base ${
                pageNum === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-rose-500 hover:bg-rose-600 text-white'
            }`}
            disabled={pageNum === 1}
            >
            Prev <span className='font-bold ml-1 sm:ml-2 text-xl sm:text-2xl'>&larr;</span>
            </button>
    
            <div className='flex flex-row gap-x-1 sm:gap-x-2 items-center justify-center'>
            {[1, 2, 3].map((num) => (
                <div 
                key={num} 
                className={`px-2 py-1 font-mono text-white text-sm sm:text-base ${
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
            className={`flex items-center px-2 py-1 font-mono rounded-xl text-sm sm:text-base ${
                pageNum === 3 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-rose-500 hover:bg-rose-600 text-white'
            }`}
            disabled={pageNum === 3 || preventNext}
            >
            Next <span className='font-bold ml-1 sm:ml-2 text-xl sm:text-2xl'>&rarr;</span>
            </button>
        </div>
    )
};
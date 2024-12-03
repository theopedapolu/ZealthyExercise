import React from "react";
import Pagination from "./Pagination";

export default function OnboardingFlow ({renderPageComponents, handleSubmit, goToPrevPage, goToNextPage, pageNum, preventProceed} : {
    renderPageComponents: (num: number) => JSX.Element,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
    goToPrevPage: () => void,
    goToNextPage: () => void,    
    pageNum: number,
    preventProceed: boolean
}) {
    return (
    <div className="w-full max-w-md bg-white shadow-lg border border-white border-opacity-30 rounded-xl p-6 sm:p-8 flex flex-col items-center">
      <div className="text-center">
        <p className="text-2xl sm:text-3xl font-mono font-bold">Welcome!</p>
      </div>
      
      <form onSubmit={handleSubmit} className='mt-6 sm:mt-10 w-full flex flex-col items-center justify-center'>
        <div className='w-full flex flex-col items-center justify-center gap-y-3'>
          {renderPageComponents(pageNum)}
          
          {pageNum === 3 && (
            <button 
              type='submit' 
              className={`mt-4 sm:mt-5 w-full max-w-xs px-4 py-2 font-mono text-white rounded-xl ${preventProceed ? 'bg-gray-300 cursor-not-allowed' : "bg-green-500 hover:bg-green-600"}`}
              disabled={preventProceed}
            >
              Submit
            </button>
          )}
        </div>
      </form>
      <Pagination 
        goToPrevPage={goToPrevPage} 
        goToNextPage={goToNextPage} 
        pageNum={pageNum} 
        preventNext={preventProceed}
      />
    </div>
    )
}
import React from 'react'

export const Footer = () => {
  return (
    <div>
      <div className="text-small font-bold bg-gray-800 h-15 text-gray-200 text-center flex justify-center items-center p-4">
        <p className='text-gray-400'>&copy; {new Date().getFullYear()} Lafarge Africa. All rights reserved.</p>
      </div>
    </div>
  )
}

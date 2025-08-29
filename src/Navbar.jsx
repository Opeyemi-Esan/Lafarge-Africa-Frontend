import React from 'react'
import { Link } from 'react-router-dom';

export const Navbar = () => {

  const LogoUrl = "https://www.lafarge.com.ng/themes/custom/corporate_lafarge/components/header/images/holcim_logo_color.svg";

  return (
    <nav className='flex justify-between items-center pt-4 bg-gray-200 h-30 px-50 border-b-8 border-green-700'>
      <Link to="/"><img src={LogoUrl} /></Link>
      <Link className='hover:text-white/100 cursor-pointer transition-all duration-300 ease-in-out px-15 py-4 bg-green-700 rounded-full font-semibold text-gray-200' to="/signup">Signup</Link>
     
    </nav>
  )
}

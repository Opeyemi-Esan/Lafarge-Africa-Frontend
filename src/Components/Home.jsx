import React from 'react'
import { Link } from 'react-router-dom';

export const Home = () =>{

  const backgroundUrl = "https://www.lafarge.com.ng/sites/nigeria/files/styles/big_image_slider_extra/public/2023-04/dji_0048.jpg.webp?itok=zCuazCWl";

  return (
    <div className='h-screen bg-gray-500 items-center' style={{ backgroundImage: `url(${backgroundUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className='bg-gray-500/70 backdrop-blur-sm h-full flex flex-col justify-center items-center gap-30'>
        <div className='flex flex-col justify-center items-center px-20 gap-10'>
          <h1 className="text-5xl font-bold text-white ">Welcome to Lafarge Africa Plc</h1>
          <p className='text-xl text-white px-20'>Lafarge Africa Plc is a leading cement and building materials company in 
            Nigeria, committed to delivering high-quality products and sustainable solutions for the construction industry. With a rich 
            history and a strong focus on innovation, Lafarge Africa Plc plays a pivotal role in shaping the infrastructure landscape of Nigeria and beyond.</p>
        </div>

        <div className='flex justify-center items-center gap-10'>
          <Link to="/signup" className='px-40 py-6 bg-slate-500 shadow-lg font-semibold text-xl text-gray-200 hover:shadow-xl hover:bg-green-900 trasition-all duration-300 ease-in-out'>Signup</Link>
          <Link to="/login" className='px-40 py-6 bg-slate-500 shadow-lg font-semibold text-xl text-gray-200 hover:shadow-xl hover:bg-green-900 trasition-all duration-300 ease-in-out'>Login</Link>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import { Link } from 'react-router-dom';
export const DashBoardHeader = () => {
  return (
    <div className='h-20 bg-slate-200 flex justify-between items-center px-50'>
      <h1 className="text-3xl font-bold">DashBoard</h1>
      <Link to="/users" className='bg-slate-400 px-8 py-2 text-slate-50 font-semibold hover:bg-slate-500 cursor-pointer drop-shadow-lg transition-all duration-300 ease-in-out'>View Users</Link>
    </div>
  )
}

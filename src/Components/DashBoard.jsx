import React from 'react'
import { DashBoardHeader } from './DashBoardHeader';
import { UserList } from '../Components/UserList';
import { Link } from 'react-router-dom';

export const DashBoard = () => {

  
  return (
    <div className='h-screen'>
      <DashBoardHeader />
      <div className='flex justify-center items-center h-[calc(100vh-80px)] bg-slate-100'>
        <Link to="/users" className='bg-slate-400  text-center px-60 py-30 text-4xl text-slate-50 font-semibold hover:bg-slate-500 cursor-pointer drop-shadow-lg transition-all duration-300 ease-in-out'>View Users</Link>
      </div>
    </div>
  )
}

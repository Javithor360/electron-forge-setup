import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <div className='flex'>
                <div className='p-5'>
                    <Sidebar />
                </div>
                <div className='p-5'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Layout

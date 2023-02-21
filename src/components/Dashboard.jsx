import React from 'react'
import MsgBoard from './MsgBoard';
import Navbar from './Navbar';

const Dashboard = ({ user, loading, auth }) => {
    if (loading) return <h1>LOADING...</h1>;
    return (
        < div className=''>
            <div className='overflow-hidden top-0 left-0 fixed z-10 shadow-md shadow-[#00000053]'>
                <Navbar user={user} auth={auth} />
            </div>
            <div className='pt-32 flex flex-col justify-center items-center '>
                <MsgBoard user={user} />
            </div>
        </div>
    )
}

export default Dashboard
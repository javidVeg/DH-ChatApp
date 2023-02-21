import React from 'react'



const Navbar = ({ user, auth }) => {
    return (
        <div className='flex flex-row gap-3 items-center overflow-hidden bg-[#28283e] bg-opacity-none w-[100vw] h-24'>
            <div className='w-1/2 flex flex-row items-center ml-10 gap-3' >
                <img src={user.photoURL} />
                <div className='flex flex-col items-start'>
                    <h2 className=' text-lg'>Welcome </h2>
                    <h1 className='text-3xl'>{user.displayName}</h1>
                </div>
            </div>
            <div className="w-1/2 flex justify-end mr-10 " >
                <button className='flex flex-row items-center bg-transparent hover:bg-[#18DBFF] text-pink-700 font-semibold
                 hover:text-black py-2 px-4 border border-[#18DBFF] hover:shadow-[0_1px_8px_2px] hover:shadow-[rgb(190_24_93)]
                 hover:border-transparent rounded' onClick={() => auth.signOut()}>Sign Out</button>
            </div>
        </div>
    )
}

export default Navbar
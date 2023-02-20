import React from 'react'



const Navbar = ({ user, auth }) => {
    return (
        <div className='flex flex-row gap-3 items-center overflow-hidden bg-[#28283e] bg-opacity-none w-[100vw] h-24'>
            <div className='w-1/2 flex flex-row items-center ml-10 gap-2' >
                <img src={user.photoURL} />
                <div className='flex flex-col items-start'>
                    <h2 className=' text-lg'>Welcome </h2>
                    <h1 className=' text-xl'>{user.displayName}</h1>
                </div>
            </div>
            <div className="w-1/2 flex justify-end mr-10" >
                <button onClick={() => auth.signOut()}>Sign Out</button>
            </div>
        </div>
    )
}

export default Navbar
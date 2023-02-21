import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../utils/firebase'
import Dashboard from '../components/Dashboard'
import Register from '../components/Register'


const Home = () => {

//! useAuthState is a hook that allows you to grab the user data from the Fire store
    const [user, loading] = useAuthState(auth)
    return (
        <>
            <div >
                {!user && (
                    <div className=''>
                    <Register />
                    </div>
                )}
                {user && (
                    <div className='relative h-[100%]'>
                        {/* __passing user data to the children__ */}
                        <Dashboard user={user} loading={loading} auth={auth} />
                    </div>
                )}
            </div>
        </>
    )
}

export default Home
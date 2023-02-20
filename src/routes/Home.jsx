import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../utils/firebase'
import Dashboard from '../components/Dashboard'
import Register from './Register'


const Home = () => {

    const [user, loading] = useAuthState(auth)
    return (
        <>
          
            <div>
                {!user && (
                    
                 <Register/>
                )}
                {user && (
                    <div className='relative h-[100%]'>
                        <Dashboard user={user} loading={loading} auth={auth} />
                    </div>
                )}

            </div>
        </>
    )
}

export default Home
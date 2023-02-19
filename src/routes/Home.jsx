import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../utils/firebase'
import Dashboard from '../components/Dashboard'

const Home = () => {

    const [ user, loading ] = useAuthState(auth)
    return (
        <div>
            <div>
                {!user && (
                <button>Join the conversation</button>
                )}
                {user && ( 
                 <div>
                  <Dashboard user={user} loading={loading} auth={auth}/>
                 </div>
                )}
                
            </div>
        </div>
    )
}

export default Home
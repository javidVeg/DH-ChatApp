import React from 'react'
import MsgBoard from '../routes/MsgBoard';

const Dashboard = ({user, loading, auth}) => {
    if(loading) return <h1>LOADING...</h1>;
  return (
    <div>
        <h1>Welcome {user.displayName}</h1>
        <button onClick={() => auth.signOut()}>Sign Out</button>
        <img src={user.photoURL}/>
        <div>
            <MsgBoard user={user}/>
        </div>
    </div>
  )
}

export default Dashboard
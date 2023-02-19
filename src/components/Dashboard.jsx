import React from 'react'

const Dashboard = ({user, loading, auth}) => {
    if(loading) return <h1>LOADING...</h1>;
  return (
    <div>
        <h1>Welcome {user.displayName}</h1>
        <img src={user.photoURL}/>
        <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  )
}

export default Dashboard
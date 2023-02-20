import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from '../../utils/firebase'

const NewMsg = ({ user }) => {

    const [newMsg, setNewMsg] = useState("")

    const collectionRef = collection(db, "chat")

    const dateTime = new Date();
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();
    
    useEffect(() => {
        console.log(newMsg)
    }, [newMsg])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addDoc(collectionRef, {
            textField: newMsg,
            userID: user.uid,
            userName: user.displayName,
            createdAtDate: date,
            createdAtTime: time,
            dataTimeGroup: serverTimestamp(),
            userAvatar: user.photoURL
        })

        setNewMsg('')
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    msg:
                    <input type="text" name="textfield"  onChange={(e) => setNewMsg(e.target.value)} value={newMsg}/>
                </label>
                <button type='submit'>Send</button>
            </form>
        </div>
    )
}

export default NewMsg;
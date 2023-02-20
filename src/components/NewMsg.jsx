import React, { useEffect, useState, useRef } from 'react'
import { addDoc, collection, doc, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from '../../utils/firebase'
import { MdSend } from 'react-icons/md';

const NewMsg = ({ user }) => {

    const [newMsg, setNewMsg] = useState("")

    const scrollToRef = useRef();

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
        
        scrollToRef.current.scrollIntoView({ behavior: "smooth" })
    }
    return (
        <div className=' '>
            <div ref={scrollToRef}></div>
            <form onSubmit={handleSubmit} className=" w-full flex flex-row">
                    <input className=" p-3 text-[#ffffffbc] rounded w-full"
                        placeholder="  New Message" type="text" name="textfield" onChange={(e) => setNewMsg(e.target.value)} value={newMsg} />
                <button type='submit'><MdSend size={25}/></button>
            </form>
        </div>
    )
}

export default NewMsg;
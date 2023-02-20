import React, { useEffect, useState } from 'react'
import { collection, getDocs, doc, onSnapshot, query, where, orderBy, deleteDoc } from "firebase/firestore";
import { db } from '../../utils/firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import NewMsg from '../components/NewMsg';

const MsgBoard = ({ user }) => {

    const [msgData, setMsgData] = useState([])

    const collectionRef = collection(db, "chat")

    useEffect(() => {
        const q = query(collectionRef, orderBy("dataTimeGroup"))
        const watchForNewData = onSnapshot(q, (msg) => {
            let messages = [];
            msg.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id })
            })
            setMsgData(messages)
        });
        return () => watchForNewData();
    }, [])

    useEffect(() => {
        const getMsgs = async () => {
            try {
                const items = await getDocs(collectionRef)
                const getItem = items.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                setMsgData(getItem)
            } catch (error) {
                console.log(error)
            }
        }
        getMsgs();

    }, [])
    console.log(msgData)

    const deleteMsg = async (id) => {
        try {
            const remove = await deleteDoc(doc(db, "chat", id))
        } catch (error) {
            console.log(error)
        }
    }



    // getMsgs()


    return (
        <div>
            {msgData.map((msg) =>
                <div>
                    <img src={msg.userAvatar} />
                    <p>{msg.textField}</p>
                    <button onClick={() => deleteMsg(msg.id)} className=' text-red-600'>X</button>
                </div>
            )}
            <NewMsg user={user} />

        </div>
    )
}

export default MsgBoard
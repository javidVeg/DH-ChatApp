import React, { useEffect, useState } from 'react'
import { collection, getDocs, doc, onSnapshot, query, where, orderBy, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../../utils/firebase'
// import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FiEdit } from 'react-icons/fi';
import { AiFillCheckCircle } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';

import NewMsg from '../components/NewMsg';

const MsgBoard = ({ user }) => {

    const [msgData, setMsgData] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [selectedMsg, setSelectedMsg] = useState()
    const [msgBeingUpdated, setMsgBeingUpdated] = useState("")
    // const [newUpdatedMsg, setNewUpdateMsg] = useState()

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


    const deleteMsgDB = async (id) => {
        try {
            const remove = await deleteDoc(doc(db, "chat", id))
        } catch (error) {
            console.log(error)
        }
    }


    const updateMsgDB = async (id) => {
        try {
            const update = await updateDoc(doc(db, "chat", id), { textField: msgBeingUpdated })
        } catch (error) {
            console.log(error)
        }
    }


    const editMsg = (id, textField) => {
        setEditMode(true)
        setSelectedMsg(id)
        setMsgBeingUpdated(textField)
    }
    console.log(selectedMsg)
    console.log(msgBeingUpdated)


    const updateMsg = (id) => {
        setEditMode(false)
        setSelectedMsg()
        updateMsgDB(id);
        // console.log(editMode)
    }
    const deleteMsg = (id) => {
        deleteMsgDB(id)
        setEditMode(false)
    }

    const handleUpdate = (e) => {
        setMsgBeingUpdated(e.target.value)
    }

    // useEffect(() => {
    //     console.log(newUpdatedMsg)
    // }, [newUpdatedMsg])





    return (
        <div className='flex flex-col gap-10'>
            {msgData.map((msg) =>
                <div className='flex flex-row justify-evenly items-center border-lime-500 border-solid border-2'>
                    <div className='flex flex-row justify-center items-center gap-2 '>
                        <img className=' rounded-xl scale-50' src={msg.userAvatar} />
                        <div className='flex flex-col items-start'>
                            <div className='flex flex-row items-center gap-2'>
                                <p>{msg.userName}</p>
                                <p className=' text-sm'>{msg.createdAtDate}</p>
                                <p className=' text-xs'>{msg.createdAtTime}</p>
                            </div>
                            {msg.id != selectedMsg && <p className=' text-[#00c3ff] font-semibold'>{msg.textField}</p>}
                            {editMode && msg.id === selectedMsg &&
                                <label>
                                    msg:
                                    <input type="text" name="textfield" value={msgBeingUpdated} onChange={handleUpdate} />
                                </label>}
                        </div>
                    </div>
                    <div className='flex flex-col justify-evenly items-center'>
                        {editMode && msg.id === selectedMsg &&
                            <button onClick={() => deleteMsg(msg.id)} className=' text-purple-600'><AiFillDelete/></button>
                        }
                        {msg.userID === user.uid && !editMode &&
                            <button onClick={() => editMsg(msg.id, msg.textField)} className=' text-purple-600'><FiEdit /></button>
                        }
                        {editMode && msg.id === selectedMsg &&
                            <button onClick={() => updateMsg(msg.id)} className=' text-purple-600' ><AiFillCheckCircle /></button>
                        }
                    </div>

                </div>
            )}
            <NewMsg user={user} />

        </div>
    )
}

export default MsgBoard
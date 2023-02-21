import React, { useEffect, useState, useRef } from 'react'
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
    const [msgBeingUpdated, setMsgBeingUpdated] = useState("");

    const scrollToRef = useRef();

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
        scrollToRef.current.scrollIntoView({ behavior: "smooth" })
        return () => watchForNewData();

    }, [])

    useEffect(() => {
        scrollToRef.current.scrollIntoView({ behavior: "smooth" })
    }, [msgData])

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
        scrollToRef.current.scrollIntoView({ behavior: "smooth" })

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


    const receivedMsg = ' flex flex-row justify-between px-2 relative left-10  items-center bg-white bg-opacity-30 rounded-md shadow-[#eb459526] shadow-[0px_2px_10px_2px] border-[#ffffff2c] border-solid border-[.01rem]'
    const sentMsg = 'flex flex-row justify-between px-2 relative right-10 items-center bg-white bg-opacity-10 rounded-md shadow-[#eb459526] shadow-[0px_2px_10px_2px] border-[#ffffff2c] border-solid border-[.01rem]'



    return (
        <div className='flex flex-col  gap-5 w-3/4'>
            {msgData.map((msg) =>
                <div className={msg.userID === user.uid ? sentMsg : receivedMsg}>
                    <div className='flex flex-row justify-center items-center'>
                        <img className=' rounded-xl scale-50' src={msg.userAvatar} />
                        <div className='flex flex-col items-start'>
                            <div className='flex flex-row flex-wrap items-center gap-1'>
                                <p className=' font-bold '>{msg.userName}</p>
                                <p className=' text-[.7rem] text-slate-300 font-medium'>{msg.createdAtDate}</p>
                                <p className=' text-[.7rem] text-slate-300 font-medium'>{msg.createdAtTime}</p>
                            </div>
                            {editMode && msg.id === selectedMsg ? (
                                <input
                                    className="rounded-md bg-[#00000026] p-1 pl-2"
                                    type="text"
                                    name="textfield"
                                    value={msgBeingUpdated || msg.textField}
                                    onChange={handleUpdate}
                                />
                            ) : (
                                <p className='text-[#00c3ff] font-semibold'>{msg.textField}</p>
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col justify-evenly items-center pr-5'>
                        {editMode && msg.id === selectedMsg &&
                            <button onClick={() => deleteMsg(msg.id)} className=' text-white'><AiFillDelete size={20} /></button>
                        }
                        {msg.userID === user.uid && !editMode &&
                            <button onClick={() => editMsg(msg.id, msg.textField)} className=' text-white'><FiEdit size={20} /></button>
                        }
                        {editMode && msg.id === selectedMsg &&
                            <button onClick={() => updateMsg(msg.id)} className=' text-green-300 ' ><AiFillCheckCircle size={20} /></button>
                        }
                    </div>

                </div>
            )}
            <div ref={scrollToRef} ></div>
            <div className='mt-1 sticky bottom-5'>
                <NewMsg user={user} />
            </div>

        </div>
    )
}

export default MsgBoard
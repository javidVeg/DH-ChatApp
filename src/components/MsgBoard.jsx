import React, { useEffect, useState, useRef } from 'react'
import { collection, getDocs, doc, onSnapshot, query, orderBy, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../../utils/firebase'
import { FiEdit } from 'react-icons/fi';
import { AiFillCheckCircle } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import NewMsg from '../components/NewMsg';

const MsgBoard = ({ user }) => {
    //! sets array of documents from fire store ⤵
    const [msgData, setMsgData] = useState([])
    //! sets state to trigger the edit features within the html ⤵
    const [editMode, setEditMode] = useState(false)
    //! sets state to id of message being edited ⤵
    const [selectedMsg, setSelectedMsg] = useState()
    //! sets state to string of the actual message being edited ⤵
    const [msgBeingUpdated, setMsgBeingUpdated] = useState("");

    //! ref for where to scroll to on page load ⤵
    const scrollToRef = useRef();

    const collectionRef = collection(db, "chat") //! Fire store ref to collection


    //! This useEffect uses fire stores onSnapshot function to watch for new updates to the 
    //! DB and then sets them into the msgData state ⤵
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

    //! Smooth scrolls the window to the ref in the html by watching for changes to msgData ⤵
    useEffect(() => {
        scrollToRef.current.scrollIntoView({ behavior: "smooth" })
    }, [msgData])

    //! This useEffect gets fire store data on initial load ⤵
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
        //! Smooth scrolls the window to the ref in the html on initial load ⤵
        scrollToRef.current.scrollIntoView({ behavior: "smooth" })
    }, [])

    //! Function that deletes documents from the DB ⤵
    const deleteMsgDB = async (id) => {
        try {
            const remove = await deleteDoc(doc(db, "chat", id))
        } catch (error) {
            console.log(error)
        }
    }

    //! Function that updates documents in the DB ⤵    
    const updateMsgDB = async (id) => {
        try {
            const update = await updateDoc(doc(db, "chat", id), { textField: msgBeingUpdated })
        } catch (error) {
            console.log(error)
        }
    }

    //! These are handler functions for the buttons within the html ⤵
    const editMsg = (id, textField) => {
        setEditMode(true)
        setSelectedMsg(id)
        setMsgBeingUpdated(textField)
    }

    const updateMsg = (id) => {
        setEditMode(false)
        setSelectedMsg()
        updateMsgDB(id);
    }

    const deleteMsg = (id) => {
        deleteMsgDB(id)
        setEditMode(false)
    }

    const handleUpdate = (e) => {
        setMsgBeingUpdated(e.target.value)
    }
    //! These are handler functions for the buttons within the html ⤴


    //! variables with Tailwind styling depending if the msg was received or sent ⤵
    const receivedMsg = ' flex flex-row justify-between px-2 relative left-10  items-center bg-white bg-opacity-30 rounded-md shadow-[#eb459526] shadow-[0px_2px_10px_2px] border-[#ffffff2c] border-solid border-[.01rem]'
    const sentMsg = 'flex flex-row justify-between px-2 relative right-10 items-center bg-white bg-opacity-10 rounded-md shadow-[#eb459526] shadow-[0px_2px_10px_2px] border-[#ffffff2c] border-solid border-[.01rem]'



    return (
        <div className='flex flex-col  gap-5 w-3/4'>
            {/* __Maps through the MsgData state__ */}
            {msgData.map((msg) =>
                // Sets styling depending on if msg was sent or received by comparing id's
                <div key={msg.id} className={msg.userID === user.uid ? sentMsg : receivedMsg}>
                    <div className='flex flex-row justify-center items-center'>
                        <img className=' rounded-xl scale-50' src={msg.userAvatar} />
                        <div className='flex flex-col items-start'>
                            <div className='flex flex-row flex-wrap items-center gap-1'>
                                <p className=' font-bold '>{msg.userName}</p>
                                <p className=' text-[.7rem] text-slate-300 font-medium'>{msg.createdAtDate}</p>
                                <p className=' text-[.7rem] text-slate-300 font-medium'>{msg.createdAtTime}</p>
                            </div>
                            {/* if the msg id and user id match and editMode is true then it renders input field to edit,
                            if conditions aren't met then it shows the textField data */}
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
                        {/* if editMode is false and msg USER id = USER uid then this will render the ability to edit msg */}
                        {msg.userID === user.uid && !editMode &&
                            <button onClick={() => editMsg(msg.id, msg.textField)} className=' text-white'><FiEdit size={20} /></button>
                        }
                        {/* if editMode is true and msg id = selectedMsg id then it will allow user to delete */}
                        {editMode && msg.id === selectedMsg &&
                            <button onClick={() => deleteMsg(msg.id)} className=' text-white'><AiFillDelete size={20} /></button>
                        }
                        {/* if editMode is true and msg id = selectedMsg id then it will allow user to send updates to fire store */}
                        {editMode && msg.id === selectedMsg &&
                            <button onClick={() => updateMsg(msg.id)} className=' text-green-300 ' ><AiFillCheckCircle size={20} /></button>
                        }
                    </div>

                </div>
            )}
            {/* __Smooth scrolls the window to here using ref__ */}
            <div ref={scrollToRef} ></div>
            <div className='mt-1 sticky bottom-5'>
                <NewMsg user={user} />
            </div>

        </div>
    )
}

export default MsgBoard
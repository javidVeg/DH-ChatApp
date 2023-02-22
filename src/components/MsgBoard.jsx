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
    const textAreaRef = useRef(null);

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


        return () => watchForNewData() && scrollToRef.current.scrollIntoView({ behavior: "smooth" })

    }, [])

    //! Smooth scrolls the window to the ref in the html by watching for changes to msgData ⤵
    useEffect(() => {
        scrollToRef.current.scrollIntoView({ behavior: "smooth" })
    }, [msgData])

    // //! This useEffect gets fire store data on initial load ⤵
    // useEffect(() => {
    //     const getMsgs = async () => {
    //         try {
    //             const items = await getDocs(collectionRef)
    //             const getItem = items.docs.map((doc) => ({
    //                 ...doc.data(),
    //                 id: doc.id
    //             }))
    //             setMsgData(getItem)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     getMsgs();
    //     //! Smooth scrolls the window to the ref in the html on initial load ⤵
    //     scrollToRef.current.scrollIntoView({ behavior: "smooth" })
    // }, [])

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
    const receivedMsg = ' w-[60%] h-auto flex flex-row justify-between relative left-16 md:left-20  items-center bg-white bg-opacity-30 rounded-md shadow-[#eb459526] shadow-[0px_2px_10px_2px] border-[#ffffff2c] border-solid border-[.01rem]'
    const sentMsg = ' w-[60%] h-auto flex flex-row justify-between relative right-16 md:right-20 items-center bg-white bg-opacity-10 rounded-md shadow-[#eb459526] shadow-[0px_2px_10px_2px] border-[#ffffff2c] border-solid border-[.01rem]'




    //! this is used to add height to the textarea based on the scroll height⤵
    useEffect(() => {
        const textarea = textAreaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; //!reset height to auto
            textarea.style.height = textarea.scrollHeight + 'px'; //! set height to fit the content 
        }
    }, [textAreaRef.current?.value]);

    console.log("Created by Decoded Healths next Developer 😜")

    return (
        <div className='flex flex-col justify-center items-center relative min-h-[100vh] w-screen gap-5 mb-28'>
            {/* __Maps through the MsgData state__ */}
            {msgData.map((msg) =>
                // Sets styling depending on if msg was sent or received by comparing id's
                <div key={msg.id} className={msg.userID === user.uid ? sentMsg : receivedMsg}>
                    <div className='flex flex-row justify-center items-center h-auto w-full pr-3 py-3'>
                  
                            <img className='rounded-xl scale-50 ' src={msg.userAvatar} />
                        
                        <div className='flex flex-col items-start w-full'>
                            <div className='flex flex-row flex-wrap items-center gap-1'>
                                <p className=' font-semibold text-sm md:font-bold text-left w-full md:w-auto '>{msg.userName}</p>
                                <p className=' text-[.5rem] md:text-[.7rem] text-slate-300 font-medium'>{msg.createdAtDate}</p>
                                <p className='text-[.5rem] md:text-[.7rem] text-slate-300 font-medium'>{msg.createdAtTime}</p>
                            </div>
                            {/* if the msg id and user id match and editMode is true then it renders input field to edit,
                            if conditions aren't met then it shows the textField data */}
                            {editMode && msg.id === selectedMsg ? (
                                <div className='w-full mt-2'>
                                    <textarea
                                        ref={textAreaRef}
                                        className="rounded-md bg-[#00000026] p-1 pl-2 h-auto w-full overflow-hidden resize-none focus:border-none"
                                        type="text"
                                        name="textfield"
                                        value={msgBeingUpdated || msg.textField}
                                        onChange={handleUpdate}
                                    ></textarea>
                                </div>
                            ) : (
                                <p className='text-[#00c3ff] font-semibold text-left text-sm md:text-md '>{msg.textField}</p>
                            )}
                        </div>
                    </div>
                    <div className='absolute -right-10 '>
                        {/* if editMode is false and msg USER id = USER uid then this will render the ability to edit msg */}
                        {msg.userID === user.uid && !editMode &&
                            <button onClick={() => editMsg(msg.id, msg.textField)} className=' text-white'><FiEdit size={20} /></button>
                        }
                        <div className='flex flex-col'>
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

                </div>
            )}

            <div className='mt-1 fixed w-3/4 bottom-0 mb-10 '>
                <NewMsg user={user} />
            </div>

            {/* __Smooth scrolls the window to here using ref__ */}
            <div ref={scrollToRef} ></div>
        </div>
    )
}

export default MsgBoard
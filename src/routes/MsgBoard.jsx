import React, { useEffect, useState } from 'react'

const MsgBoard = ({ user }) => {

    const [msgData, setMsgData] = useState({
        userID: "",
        userAvatar: "",
        textField: "",
        dataTimeGroup: "",
    })

    useEffect(() => {
        console.log(msgData)
    },[msgData])

    const handleSubmit = (e) => {
        e.preventDefault();
        setMsgData({textField: e.target.textfield.value})
        e.target.textfield.value = ""
        
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    msg:
                    <input type="text" name="textfield"/>
                </label>
                <button type='submit'>Send</button>
            </form>
        </div>
    )
}

export default MsgBoard
import React, { useEffect, useRef, useState } from "react";
import socket from "../api/socketio";
import { useSelector } from "react-redux";
import { BsSend } from "react-icons/bs";
import axios from "axios";
import useSocket from "../hooks/useSocket";

export default function AdminMessageBox({ selectedContactInfo, load_page }) {
  const userState = useSelector((state) => state.user);
  const userId = userState?.userInfo?.data?.user?._id;
  // console.log(userId)
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(true);
  const textareaRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [body, setBody] = useState("");

  const { socket, sendToServer, joinRoom, receive } = useSocket();

  useEffect(() => {
    if (selectedContactInfo?._id) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://new.kajghor.com/api/v1/conversation/${selectedContactInfo?._id}`
          );
          setMessages(response?.data?.data || []);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [selectedContactInfo, load_page]);

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options); // Format date
  };

  const newMessageHandler = (data) => {
    setMessages((prevMessages) => {
      return {
        ...prevMessages,
        message: [...prevMessages?.message, data],
      };
    });
  };

  // for messaging
  const handleSendMessage = async () => {
    joinRoom(userId);
    if (body.trim()) {
      sendToServer("new_message_admin_sent", {
        text: body,
        type: "text",
        time: Date.now(),
        user_id: selectedContactInfo?._id,
        senderRole: userState?.userInfo?.data?.user?.admin, // Notun field
      });

      setMessages((prevMessages) => {
        return {
          ...prevMessages,
          message: [
            ...prevMessages?.message,
            {
              text: body,
              type: "text",
              time: Date.now(),
              user_id: userId,
              senderRole: userState?.userInfo?.data?.user?.admin, 
            },
          ],
        };
      });

      // Optimistically update UI
      setBody("");
    }
  };
 const messagesEndRef = useRef(null);

  // Scroll to the bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <>
    
      
        <div className="flex-grow overflow-y-auto h-[80vh] p-4">
        <div className="flex flex-col space-y-4">
          {messages?.message?.map((msg, index) => (
      <div
        key={index}
        className={`flex  ${
          msg.senderRole ? "justify-end" :  "justify-start" 
        }`}
      >
        <div
          className={`flex flex-col w-fit h-auto lg:max-w-2xl min-w-xs`}
        >
          {/* {msg.senderRole && <p className="text-xs text-gray-400 mb-1">Admin</p>} */}
          <p className={`p-2 rounded h-auto${ 
            msg.senderRole ? "bg-gray-700" : "bg-[#3d6e66]"
          }`}    style={{ wordBreak: "break-word", maxWidth: "100%" }}>{msg?.text}</p>
              <p className="text-xs text-gray-400">{formatDate(msg?.time)}</p>
        </div> 
   
      </div>
   
    ))}  
    <div ref={messagesEndRef}></div>
          </div>
        </div>
        {/* Input Area */}
        <div className="flex items-end gap-2 p-4">
          <textarea
            className="bg-gray-800 w-full h-12 max-h-32 overflow-y-scroll text-white p-2 rounded resize-none"
            placeholder="Type a message..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            ref={textareaRef}
            rows={1}
          />
          <button
            className="bg-green-600 h-10 p-2 rounded"
            onClick={handleSendMessage}
          >
            <BsSend />
          </button>
        </div>

       
      
    </>
  );
}
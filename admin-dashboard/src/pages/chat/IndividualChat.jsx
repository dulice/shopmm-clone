import React, { useState } from "react";
import avatar from "../../assets/user.jpg";
import { useSelector } from "react-redux";
import CustomButton from "../../custom/CustomButton";
import { MdOutlineArrowBackIos, MdSend } from "react-icons/md";
import ScrollToBottom from "react-scroll-to-bottom";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { useGetUserQuery } from "../../api/userApi";
import Loading from "../../components/Loading";
import { socket } from "../Ecommerce/ProductDetail";
import { useGetProductQuery } from "../../api/productApi";

const IndividualChat = () => {
  const { userId, productId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { data: currentUser, isLoading } = useGetUserQuery(userId);
  const { data: product } = useGetProductQuery(productId);
  const [chatConversation, setChatConversation] = useState([]);
  const [message, setMessage] = useState("");

  const orderId = (id1, id2, id3) => {
    if (id1 > id2) {
      return id1 + "_" + id2 + "_" + id3;
    } else {
      return id2 + "_" + id1 + "_" + id3;
    }
  };

  socket.off("room-message").on("room-message", (messages) => {
    setChatConversation(messages);
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    const conversationId = orderId(user._id, userId, productId);
    socket.emit("new-message", {
      conversationId,
      productId,
      sender: user.username,
      receiver: currentUser.username,
      message,
    });
    socket.on("room-message", (messages) => {
      setChatConversation(messages);
    });
    setMessage("");
  };
  if (isLoading) return <Loading />;
  return (
    <div className="card my-2">
      <div className="header flex items-center bg-secondary-300 p-2 text-white">
        <MdOutlineArrowBackIos size={20} onClick={() => navigate(-1)} />
        <img src={avatar} alt="" className="avatar mr-4" />
        <div>
          <p className="font-bold">{currentUser.username}</p>
          <p className="text-success-100 text-xs">online</p>
        </div>
      </div>
      <div className="body my-2 relative overflow-y-auto">
        <ScrollToBottom className="h-[calc(100vh-17rem)]">
          <div>
            {product && (
              <div className="card grid grid-cols-12 gap-4 my-4">
                <img className="col-span-1" src={product.images[0]} alt="" />
                <p className="col-span-11">{product.productName}</p>
              </div>
            )}
            {chatConversation.map((chat, i) => (
              <div
                key={i}
                className={`flex ${
                  chat.sender === user.username ? "flex-row-reverse" : ""
                }`}
              >
                <img src={avatar} alt="" className="avatar mr-4" />
                <div
                  className={`flex flex-col mr-2 ${
                    chat.sender === user.username ? "items-end" : "items-start"
                  }`}
                >
                  <p
                    className={`p-2 rounded-full ${
                      chat.sender === user.username
                        ? "bg-secondary-100 text-white"
                        : "bg-light-100 dark:bg-dark-100 dark:text-white"
                    }`}
                  >
                    {chat.message}
                  </p>
                  <p className="text-xs">{moment(chat.createdAt).fromNow()}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollToBottom>
      </div>
      <form className="footer flex items-stretch">
        <input
          type="text"
          placeholder="Send Message..."
          className="input mt-0 w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <CustomButton
          type="submit"
          variant="btn-secondary"
          title={<MdSend size={20} />}
          onClick={(e) => handleSendMessage(e)}
        />
      </form>
    </div>
  );
};

export default IndividualChat;

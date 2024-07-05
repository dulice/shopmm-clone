import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { motion } from "framer-motion";
import { fadeAnimation } from "../../config/motion";
import { useGetProductQuery } from "../../api/productApi";
import { MdArrowBack, MdChat } from "react-icons/md";
import axios from 'axios';
import { useSelector } from "react-redux";
import { io } from 'socket.io-client'
export const socket = io(import.meta.env.VITE_API_URL);

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useSelector(state => state.user);
  const navigate = useNavigate();
  const { data: product, isLoading } = useGetProductQuery(id);
  const [chatUsers, setChatUsers] = useState([]);
  const [currentRoom, setCurrentRoom] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/messages/admin-message?receiver=${user.username}&productId=${id}`)
      setChatUsers(data);
    };
    fetchUsers();
  },[id]);

  const orderId = (id1, id2, id3) => {
    if (id1 > id2) {
      return id1 + "_" + id2 + "_" + id3;
    } else {
      return id2 + "_" + id1 + "_" + id3;
    }
  };

  const handleChat = (chatUserId) => {
    const roomId = orderId(user._id, chatUserId, id);
    socket.emit("room", roomId, currentRoom);
    setCurrentRoom(roomId);
    navigate(`/chat/${chatUserId}/${id}`)
  }

  if (isLoading) return <Loading />;
  return (
    <motion.div {...fadeAnimation}>
      <div className="m-4">
        <MdArrowBack
          onClick={() => navigate(-1)}
          className="dark:text-white text-2xl my-4 cursor-pointer"
        />
        <div className="grid grid-cols-12 gap-4">
          {product.images.map((image, i) => (
            <img key={i} className="col-span-6 md:col-span-3 card" src={image} alt="" />
          ))}
          <div className="card col-span-12 md:col-span-4 lg:col-span-3">
            {chatUsers?.map(user => (
              <div key={user.username} className="flex gap-4 p-2 cursor-pointer hover:bg-dark-100" onClick={() => handleChat(user._id)}>
                <MdChat className="text-3xl bg-primary-100 p-1 avatar"/>
                <p>{user.username}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h1 className="text-xl font-bold">{product.productName}</h1>
          <p>Stock : {product.stock}</p>
          <p className="text-primary-100 text-3xl">Ks {product.price}</p>
          <div dangerouslySetInnerHTML={{__html: product.description}}></div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;

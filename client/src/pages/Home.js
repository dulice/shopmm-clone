import React, { useEffect } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { register } from '../features/userSlice';
import { toast } from 'react-toastify';
import Promotion from '../components/Promotion';
import CategoriesHome from '../components/CategoriesHome';
import JustForYou from '../components/JustForYou';
import LatestProduct from '../components/LatestProduct';

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getUser = async () => {
            try {
                const {data}= await axios.get("/auth/login/success", { withCredentials: true});
                dispatch(register(data.user));
            } catch (err) {
                toast.error(err.data.message);
            }
        }
        getUser();
    },[dispatch]);

  return (
    <div>
        <Promotion />
        <CategoriesHome />
        <LatestProduct />
        <JustForYou />
    </div>
  )
}

export default Home
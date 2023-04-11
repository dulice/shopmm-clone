import React, { useEffect } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { register } from '../features/userSlice';
import { toast } from 'react-toastify';
import Promotion from '../components/Promotion';
import CategoriesHome from '../components/CategoriesHome';
import JustForYou from '../components/JustForYou';
import LatestProduct from '../components/LatestProduct';
import { useSelector } from 'react-redux';

const Home = () => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const getUser = async () => {
            try {
                const {data}= await axios.get(`${process.env.REACT_APP_API_URL}/auth/login/success`, { withCredentials: true});
                if(!user) return dispatch(register(data.user));
            } catch (err) {
                console.log(err);
                if(err.data) {
                    toast.error(err.status);
                }
            }
        }
        getUser();
    },[dispatch, user]);

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
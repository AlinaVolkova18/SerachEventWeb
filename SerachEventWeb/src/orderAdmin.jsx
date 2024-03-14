import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import OrderCardAdmin from './orderCardAdmin'
import 'antd/dist/antd.css';
import { useNavigate, NavLink } from 'react-router-dom';


const uri = "http://localhost:32143/api/Order/";

export function InitializeOrderAdmin() { return Order(); }

const Order = () => {

    let navigate = useNavigate();
    axios.post('http://localhost:32143/api/Account/' + 'checkRole', {}, { withCredentials: true })
        .then((response) => {
            if (response.status == 200) {
                if (response.data.role !== "admin") {
                    navigate("../../login", { replace: true });
                }
            }
        })
        .catch(console.error);


    const [order, setOrder ] = useState([]);
    const [pickUp, setPickUp] = useState([]);
    const [destination, setDestination] = useState([]);
    const [cost, setCost] = useState([]);

    

    return (
        <div className="container" >
            {/*<AddEvent*/}
            {/*    event={event}*/}
            {/*    setEvent={setEvent}*/}
            {/*    age={age}*/}
            {/*    setAge={setAge}*/}
            {/*    type={type}*/}
            {/*    setType={setType}*/}
            {/*    category={category}*/}
            {/*    setCategory={setCategory}*/}
            {/*/>*/}
            <OrderCardAdmin
                order={order}
                setOrder={setOrder}
                
            />
            
        </div>
    );
}



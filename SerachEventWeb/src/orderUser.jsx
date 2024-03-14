import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import OrderCardUser from './orderCardUser'
import AddOrder from './createOrder'
import 'antd/dist/antd.css';
import { useNavigate, NavLink } from 'react-router-dom';


const uri = "http://localhost:32143/api/Order/";

export function InitializeOrderUser() { return Order(); }

const Order = () => {

    let navigate = useNavigate();
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:32143/api/Account/' + 'checkRole')
        .then((response) => {
            if (response.status == 200) {
                console.log(response.data);
                if (response.data.role === "admin") {
                    navigate("../admin", { replace: true });
                }
                if (response.data.role === "user") {
                    navigate("../user", { replace: true });
                }
            }
        })
        .catch(console.error);


    const [order, setOrder] = useState([]);
    const [pickUp, setPickUp] = useState([]);
    const [destination, setDestination] = useState([]);
    const [cost, setCost] = useState([]);
    

    return (
        <div className="container" >
            <AddOrder
                order={order}
                setOrder={setOrder}
                pickUp={pickUp}
                setPickUp={setPickUp}
                destination={destination}
                setDestination={setDestination}
                cost={cost}
                setCost={setCost}
            />
            <OrderCardUser
                order={order}
                setOrder={setOrder}
                
            />
            
        </div>
    );
}



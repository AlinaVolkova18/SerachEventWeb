import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import ScheduleTableAdmin from './scheduleTableAdmin'
import 'antd/dist/antd';
import AddCar from './createCar'
import DelCar from './deleteCar'
import AddDriver from './createDriver'
import DelDriver from './deleteDriver'
import { Row, Space, } from 'antd';
import AddSchedule from './createSchedule'
import { useNavigate, NavLink } from 'react-router-dom';

const uri = "http://localhost:32143/api/Schedule/";

export function InitializeScheduleAdmin() { return Schedule(); }

const Schedule = () => {

    let navigate = useNavigate();

    const [schedule, setSchedule] = useState([]);
    const [car, setCar] = useState([]);
    const [model, setModel] = useState([]);
    const [color, setColor] = useState([]);
    const [driver, setDriver] = useState([]);

    axios.post('http://localhost:32143/api/Account/' + 'checkRole', {}, { withCredentials: true })
        .then((response) => {
            if (response.status == 200) {
                if (response.data.role !== "admin") {
                    navigate("../../login", { replace: true });
                }
            }
        })
        .catch(console.error);

    return (
        <div className="container">
            
            <Row>
                <Space>
                    <DelCar
                        car={DelCar}
                        setCar={setCar}
                    />

                    <AddCar
                        car={car}
                        setCar={setCar}
                        model={model}
                        setModel={setModel}
                        color={color}
                        setColor={setColor}
                    />
                    <DelDriver
                        driver={DelDriver}
                        setDriver={setDriver}
                    />

                    <AddDriver
                        driver={driver}
                        setDriver={setDriver}
                    />
                    <AddSchedule
                        schedule={schedule}
                        setSchedule={setSchedule}
                        driver={driver}
                        setDriver={setDriver}
                        car={car}
                        setCar={setCar}
                    />
                </Space>
            </Row>
           
            <ScheduleTableAdmin
                schedule={schedule}
                setSchedule={setSchedule}
            />
        </div>
    );
}



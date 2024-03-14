/* JSX - файл для удаления машины (доступно только админу) */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './orderAdmin'
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { Modal, Table } from 'antd';

const uri = "http://localhost:32143/api/Car/"; //ссылка на api машины

const DelCar = ({ car, setCar }) => { // передается список
    const [isModalVisible, setIsModalVisible] = useState(false); //видимость всплывающего окна

    const removeCar = (removeId) => setCar(car.filter(item => item.id !== removeId));  //удаление машины

    useEffect(() => {
        axios({
            "method": "GET",
            "url": uri,
            "mode": 'no-cors',
            "headers": {
                "content-type": "application/json",
            }
        })
            .then((response) => {
                setCar(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [setCar]);

    const showModal = () => { //показать всплывающее окно
        setIsModalVisible(true);
    };

    const handleCancel = () => { //кнопка выхода всплыющего окна
        setIsModalVisible(false);
    };

    const deleteCar = (Id) => { // отправка delete запроса, получает id элемента для удаления
        axios.delete(uri + Id)
            .then((response) => {
                response.status = 204 ? removeCar(Id) : null;
            })
    };


    const columns = [

        {
            title: 'Номер',
            dataIndex: 'number',
            key: 'number',

        },
        {
            title: 'Действия',
            key: 'action',
            render: (text, record) => (
                <Button shape="round" danger onClick={(e) => deleteCar(record.id)}> Удалить </Button>
            ),
        },



    ];

    return (
        <React.Fragment>
            <div align="right">
                <br />
                <Button shape="round" type="primary" size="large" onClick={showModal}>Удаление мест провидения</Button>

                <Modal title="Удаление машины" visible={isModalVisible} onCancel={handleCancel}>
                    <p class="text-danger">*При удалении машины, которая относится к конкретной записи в расписании, она так-же удалится!</p>
                    <br/>
                        <Table dataSource={car} columns={columns} />
                </Modal>
            </div>
        </React.Fragment>
    );
};

export default DelCar;
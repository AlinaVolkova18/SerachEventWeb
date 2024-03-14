/* JSX - файл для удаления водителя (доступно только админу) */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './orderAdmin'
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { Modal, Table } from 'antd';

const uri = "http://localhost:32143/api/Driver/"; //ссылка на api водителя

const DelDriver = ({ driver, setDriver }) => { // передается список
    const [isModalVisible, setIsModalVisible] = useState(false); //видимость всплывающего окна

    const removeDriver = (removeId) => setDriver(driver.filter(item => item.id !== removeId));  //удаление водителя

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
                setPlace(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [setDriver]);

    const showModal = () => { //показать всплывающее окно
        setIsModalVisible(true);
    };

    const handleCancel = () => { //кнопка выхода всплыющего окна
        setIsModalVisible(false);
    };

    
    const deleteDriver = (Id) => { // отправка delete запроса, получает id элемента для удаления
        axios.delete(uri + Id)
            .then((response) => {
                response.status = 204 ? removeDriver(Id) : null;
            })
    };


    const columns = [
        {
            title: 'ФИО',
            dataIndex: 'fullName',
            key: 'fullName',

        },
        {
            title: 'Телефон',
            dataIndex: 'phone',
            key: 'phone',

        },
        {
            title: 'Паспорт',
            dataIndex: 'passport',
            key: 'passport',

        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',

        },
        {
            title: 'Действия',
            key: 'action',
            render: (text, record) => (
                <Button shape="round" danger onClick={(e) => deleteDriver(record.id)}> Удалить </Button>
            ),
        },
    ];


    return (
        <React.Fragment>
            <div align="right">
                <br />
                <Button shape="round" type="primary" size="large" onClick={showModal}>Удаление водителя</Button>

                <Modal title="Удаление водителя" visible={isModalVisible} onCancel={handleCancel}>
                    <p class="text-danger">*При удалении водителя, который находится в записи расписания, она так-же удалится!</p>
                    <br/>
                        <Table dataSource={driver} columns={columns} />
                </Modal>
            </div>


        </React.Fragment>
    );
};

export default DelDriver;
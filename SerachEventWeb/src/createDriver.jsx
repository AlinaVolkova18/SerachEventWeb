/* JSX - файл для создания водителя (доступно только админу) */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './orderAdmin'
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { Modal, Form, Input, Select } from 'antd';

const uri = "http://localhost:32143/api/Driver/"; //ссылка на api водителя

const AddDriver = ({ driver, setDriver }) => { // передается список
    const [isModalVisible, setIsModalVisible] = useState(false); //видимость всплывающего окна

    const [form] = Form.useForm();

    const showModal = () => { //показать всплывающее окно
        setIsModalVisible(true);
    };

    const handleOk = () => { //кнопка подтверждения всплывабщего окна
        setIsModalVisible(false);
    };

    const handleCancel = () => { //кнопка выхода всплыющего окна
        setIsModalVisible(false);
    };

    const addDriver = (drivers) => setDriver([...driver, drivers]); //добавление созданного водителя

    const handleSubmit = (e) => { //отправка нового водителя на сервер и закрытие окна
        const fullName = e.fullName;
        const phone = e.phone;
        const passport = e.passport;
        const status = e.status;
        handleOk();
        axios.post(uri, {
            fullName: fullName, phone, passport, status
        })
            .then((response) => {
                response.status = 201 ? addDriver(response.data) : null;
            })
            .catch(console.error);
    };

    return (
        <React.Fragment>
            <div align="right">
                <br />
                <Button shape="round" type="primary" size="large" onClick={showModal}>Добавить водителя</Button>

                <Modal title="Добавить водителя" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
                    <Form form={form} onFinish={handleSubmit}>
                        <Form.Item
                            label="ФИО"
                            name="fullName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите ФИО!',
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                       
                        <Form.Item
                            label="Телефон"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите телефон!',
                                },
                            ]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Паспорт"
                            name="passport"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите паспорт!',
                                },
                            ]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Статус"
                            name="status"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите статус!',
                                },
                            ]}>
                            <Input />
                        </Form.Item>

                    </Form>
                </Modal>
            </div>
        </React.Fragment>
    );
};

export default AddDriver;
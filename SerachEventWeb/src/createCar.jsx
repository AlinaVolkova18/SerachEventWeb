/* JSX - файл для создания машины (доступно только админу) */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './orderAdmin'
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { Modal, Form, Input, Select } from 'antd';

const uri = "http://localhost:32143/api/Car/"; //ссылка на api машины

const AddCar = ({ car, setCar }) => { // передается список
    const [isModalVisible, setIsModalVisible] = useState(false); //видимость всплывающего окна
    const [model, setModel] = useState([]);
    const [color, setColor] = useState([]);

    useEffect(() => {
        axios({
            "method": "GET",
            "url": "http://localhost:32143/api/Model/",
            "mode": 'no-cors',
            "headers": {
                "content-type": "application/json",
            }
        })
            .then((response) => {
                setModel(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [model]);

    useEffect(() => {
        axios({
            "method": "GET",
            "url": "http://localhost:32143/api/Color/",
            "mode": 'no-cors',
            "headers": {
                "content-type": "application/json",
            }
        })
            .then((response) => {
                setCity(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [color]);

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

    const addCar = (cars) => setCar([...car, cars]); //добавление созданной машины

    const handleSubmit = (e) => { //отправка новой машины на сервер и закрытие окна
        const number = e.number;
        const modelsId = e.modelsId;
        const colorsId = e.colorsId;
        handleOk();
        axios.post(uri, {
            number: number, model_id, color_id: modelsId, colorsId
        })
            .then((response) => {
                response.status = 201 ? addCar(response.data) : null;
            })
            .catch(console.error);
    };

    return (
        <React.Fragment>
            <div align="right">
                <br />
                <Button shape="round" type="primary" size="large" onClick={showModal}>Добавить машину</Button>

                <Modal title="Добавить машину" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
                    <Form form={form} onFinish={handleSubmit}>
                        <Form.Item
                            label="Номер"
                            name="number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите номер машины!',
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                       
                        <Form.Item
                            label="Модель"
                            name="modelsId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Выберите модель машины!',

                                },
                            ]}>
                            <Select>
                                {model.map(({ id, name }) => (
                                    <Option value={id}>{name}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Цвет"
                            name="colorsId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Выберите цвет машины!',

                                },
                            ]}>
                            <Select>
                                {color.map(({ id, name }) => (
                                    <Option value={id}>{name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </React.Fragment>
    );
};

export default AddCar;
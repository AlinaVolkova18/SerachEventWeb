/* JSX - файл для создания строки расписания (доступно только админу) */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './scheduleAdmin'
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { Modal, Form, Input, Select } from 'antd';

const uri = "http://localhost:32143/api/Schedule/"; //ссылка на api расписания

const AddSchedule = ({ schedule, setSchedule }) => { // передается список
    const [isModalVisible, setIsModalVisible] = useState(false); //видимость всплывающего окна
    const [car, setCar] = useState([]);
    const [driver, setDriver] = useState([]);

    useEffect(() => {
        axios({
            "method": "GET",
            "url": "http://localhost:32143/api/Car/",
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
    }, [car]);

    useEffect(() => {
        axios({
            "method": "GET",
            "url": "http://localhost:32143/api/Driver/",
            "mode": 'no-cors',
            "headers": {
                "content-type": "application/json",
            }
        })
            .then((response) => {
                setDriver(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [driver]);

    const [form] = Form.useForm();

    const showModal = () => { //показать всплывающее окно
        setIsModalVisible(true);
    };

    const handleOk = () => { //кнопка подтверждения всплывающего окна
        setIsModalVisible(false);
    };

    const handleCancel = () => { //кнопка выхода всплыющего окна
        setIsModalVisible(false);
    };

    const addSchedule = (schedule) => setSchedule([...schedule, schedules]); //добавление созданного расписания

    const handleSubmit = (e) => { //отправка новой строки расписания на сервере и закрытие окна
        const date = e.date;
        const carsId = e.carsId;
        const driversId = e.driversId;
        handleOk();
        axios.post(uri, {
            date: date, car_id, driver_id: carsId, driversId
        })
            .then((response) => {
                response.status = 201 ? addSchedule(response.data) : null;
            })
            .catch(console.error);
    };

    return (
        <React.Fragment>
            <div align="right">
                <br />
                <Button shape="round" type="primary" size="large" onClick={showModal}>Добавить новую запись в расписание:</Button>

                <Modal title="Добавить запись" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
                    <Form form={form} onFinish={handleSubmit}>
                        <Form.Item
                            label="Дата"
                            name="date"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите дату!',
                                },
                            ]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Водитель"
                            name="driversId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Выберите водителя!',
                                },
                            ]}>
                            <Select>
                                {driver.map(({ id, fullName, phone, passport, status }) => (
                                    <Option value={id}>{fullName, phone, passport, status}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Машина"
                            name="carsId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Выберите машину!',

                                },
                            ]}>
                            <Select>
                                {car.map(({ id, number }) => (
                                    <Option value={id}>{number}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </React.Fragment>
    );
};

export default AddSchedule;
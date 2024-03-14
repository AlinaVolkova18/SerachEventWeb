import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Row, Col,} from 'antd';
import { Table, Card } from 'antd';
import { Button, Space } from 'antd';

const uri = "http://localhost:32143/api/Schedule/";

const ScheduleTableAdmin = () => {
    const [schedule, setSchedule] = useState([]);

    const removeSchedule = (removeId) => setSchedule(schedule.filter(item  => item.id !== removeId));  //удаление записи

    useEffect(() => {
        axios({
            "method": "GET",
            "url": uri,
            "headers": {
                "content-type": "application/json",
            }
        })
            .then((response) => {
                setSchedule(response.data);
                
            })
            .catch((error) => {
                console.log(error);
                
            });
    }, [setSchedule]);

    const deleteSchedule = (Id) => { // отправка delete запроса, получает id элемента для удаления
        axios.delete(uri + Id)
            .then((response) => {
                response.status = 204 ? removeSchedule(Id) : null;
            })
    };

    const columns = [
        
        {
            title: 'Расписание',
            dataIndex: 'date',
            key: 'date',
            render: (date, record) =>
                <form id={record.id}>
                    <a name="date" form={record.id} href={date}>{date}</a>
                </form>
            
        },
        {
            title: 'Действия',
            key: 'action',
            render: (text, record) => (
                <Button shape="round" danger onClick={(e) => deleteSchedule(record.id)}> Удалить </Button>
            ),
        }, 
    ];

    

    const updateSchedule = (schedules) => {
        let bufSchedule = Object.assign([], schedule);
        bufSchedule.filter(item => item.id === schedules.id)[0].date = schedules.date;
        setSchedule(bufSchedule);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const date = e.target.elements.date.value;
        const id = e.target.id;
        const schedules = { id: Number(id), date: date };
        axios.put(uri + id, schedules)
            .then((response) => {
                response.status = 201 ? updateSchedule(schedules) : null;
            })
            .catch(console.error);
    };

    return (
        <React.Fragment>
            <div>
                <br />
                <h2 align="center">Расписание</h2>
                <br />
                <Card style={{ width: 1290 }} >
                    <Row>
                        <Col span={12}>
                            <h5 align="center"><strong>Таблица расписания</strong></h5>
                            <br/>
                            <Table dataSource={schedule} columns={columns} />
                        </Col>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        <Col span={11}>
                            <h5 align="center"><strong>Адреса организаторов</strong></h5>
                            <br />
                            {schedule.map(({ data, car, driver }) => (
                                <div>
                                    <Row>
                                        <p><strong>{data}:&nbsp;</strong></p>
                                        <p>{car.number}</p>
                                        <p>{driver.fullName, driver.phone, driver.passport, driver.status}</p>
                                    </Row>
                                </div>
                            ))}
                        </Col>
                    </Row>
                </Card>
            </div>
        </React.Fragment>
    );
};

export default ScheduleTableAdmin;
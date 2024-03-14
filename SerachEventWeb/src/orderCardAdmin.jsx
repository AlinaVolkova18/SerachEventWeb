/* JSX - файл для отображения заказов (доступно только админу) */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Row, Col, } from 'antd';
import {Card } from 'antd';
import { Button, Input } from 'antd';
const { TextArea } = Input;

const uri = "http://localhost:32143/api/Order/"; //ссылка на api заказа

const OrderCardAdmin = () => {
    const [order, setOrder] = useState([]);

    useEffect(() => {
        axios({
            "method": "GET",
            "url": uri,
            "headers": {
                "content-type": "application/json",
            }
        })
            .then((response) => {
                setOrder(response.data);
                
            })
            .catch((error) => {
                console.log(error);
                
            });
    }, [setOrder]);


    return (
        <React.Fragment>
            <br />
            <h2 align="center">Заказы</h2>
            <br />
            {event.map(({ id, pickUp, destination, cost, kind }) => (
                <div className="Order" key={id} id={id} >
                    <Card hoverable style={{ width: 1290 }} >
                        <Row>
                            <Col span={5}>
                                <img alt="NO DATA" height="380" width="250" />
                                <p>&nbsp;</p>
                                <Row>
                                    <Button shape="round" danger onClick={(e) => deleteOrder({ id })}> Удалить </Button>
                                </Row>
                            </Col>
                            <p>&nbsp;&nbsp;&nbsp;</p>
                            <Col span={18}>
                                <div>
                                    <h5><strong>Откуда:</strong></h5>
                                    <p>{pickUp}</p>
                                </div>
                                <div>
                                    <h5><strong>Куда:</strong></h5>
                                    <p>{cost}</p>
                                </div>
                                <div>
                                    <h5><strong>Стоимость:</strong></h5>
                                    <p>{destination}</p>
                                </div>
                                <div>
                                    <h5><strong>Вид:</strong></h5>
                                    <p>{kind}</p>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                    <br/>
                </div>
            ))}
        </React.Fragment>
    );
};

export default OrderCardAdmin;
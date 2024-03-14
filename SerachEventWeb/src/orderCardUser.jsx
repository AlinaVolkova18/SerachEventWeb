/* JSX - файл для отображения формы заказа для пользователя */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Row, Col,} from 'antd';
import {Card } from 'antd';
import { Button } from 'antd';
import { Empty } from 'antd';


const uriEvent = "http://localhost:32143/api/Order/"; //ссылка на api заказа

const OrderCardUser = () => {
    const [order, setOrder] = useState([]);

    useEffect(() => {
        axios({
            "method": "GET",
            "url": uriEvent,
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
            
            <h2 align="center">Заказ</h2>
            <br />
            {order.map(({ id, pickUp, cost, destination, kind }) => (
                <div className="Order" key={id} id={id} >
                    <Card hoverable style={{ width: 1290 }} >
                        <Row>
                            <Col span={5}>
                                <img alt="NO DATA" height="380" width="250" />
                                <p>&nbsp;</p>
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
                       
                </div>
            ))}
        </React.Fragment>
    );
};

export default OrderCardUser;
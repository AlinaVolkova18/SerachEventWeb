import React, { Component } from 'react';
import { useNavigate, NavLink } from "react-router-dom"
import axios from 'axios';

const Initialize = () =>
{
    let navigate = useNavigate();

    const Exit = () => {
        axios.post('http://localhost:32143/api/Account/' + 'LogOff', {}, { withCredentials: true })
            .then((response) => {
                if (response.status == 200) {
                    navigate("../login", { replace: true });
                }
            })
            .catch(console.error);
    }

    return (
        <div className="px-3 py-2 bg-success text-black">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                        <span className="fs-4 text-black">Приложение заказа такси</span>
                    </a>
                    <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                        <li>
                            <a href="/" className="nav-link text-black">
                                Расписание
                            </a>
                        </li>
                        <li>
                            <a className="nav-link text-black">
                                Выход
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>);
}

function Footer() {
    return (<div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div className="col-md-4 d-flex align-items-center">
                <span className="text-muted">©Frortate 2022 Волкова Алина 3-41xx</span>
            </div>
        </footer>
    </div>);
}

export function InitializeAdminTheme() { return Initialize(); }
export function InitializeFooter() { return Footer(); }

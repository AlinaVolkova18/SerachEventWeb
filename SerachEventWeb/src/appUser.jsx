import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import ReactDOM from 'react-dom';
import HeaderUser from './headerUser' //header для пользователя
import { Route, Routes } from "react-router-dom"
import { InitializeOrderUser } from './orderUser.jsx'; //страница заказа такси для пользователя

const AppUser = () => {
    return (<React.Fragment>
        < HeaderUser />
        <Routes>
            <Route path="/orderUser" element={<InitializeOrderUser />} />
            <Route path='/*' element={<InitializeOrderUser />} />
        </Routes>
    </React.Fragment>);
}

export default AppUser;
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import ReactDOM from 'react-dom';
import { InitializeAdminTheme, } from './headerAdmin.jsx'; //из header для админа испортируется header
import { InitializeOrderAdmin } from './orderAdmin.jsx'; //страница заказов для админа
import { InitializeScheduleAdmin } from './scheduleAdmin.jsx'; //страница расписания для админа
import { Route, Routes } from "react-router-dom"

const AppAdmin = () => {
    return (<React.Fragment>
        <InitializeAdminTheme />
        <Routes>
            <Route path="/order" element={<InitializeOrderAdmin />} />
            <Route path='/*' element={<InitializeScheduleAdmin />} />
        </Routes>
    </React.Fragment>);
}

export default AppAdmin;
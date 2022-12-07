import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

const Router = () => {

        return (
            <Routes>
                <Route path="/" element={<LoginPage></LoginPage>}></Route>
                <Route path="/error" element={<NotFoundPage></NotFoundPage>}></Route>
            </Routes>
        );

}

export default Router;
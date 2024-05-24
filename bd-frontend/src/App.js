import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//importaciones del homescreen
import HomeScreen from './homeScreen/HomeScreen';
import Login from "./homeScreen/Login";
import About from "./homeScreen/About";


function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    //path inicial
                    <Route path='/' element={<HomeScreen />} />

                    <Route path='login' element={<Login />} />
                    <Route path='about' element ={<About/>}/>

                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

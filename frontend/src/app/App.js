import HomePage from '../features/home';
import Header from '../features/header';
import { Route, Routes } from 'react-router-dom';
import SignupForm from '../features/Signup';

import './App.css';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/signup' element={<SignupForm />} />
            </Routes>
        </>
    );
}

export default App;

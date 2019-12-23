import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                     <h1 className="x-large">New MERN APP</h1>
                     <p className="lead">
                       Первое MERN приложение О ДА ЭТО ПЕРВОЕ приложение.
                     </p>
                     <div className="buttons">
                        <Link to="/register" className="btn btn-primary">Зарегестрироваться </Link>
                        <Link to="/login" className="btn btn-light">Войти</Link>
                    </div>
                </div>               
            </div>            
        </section>
    )
}

export default Landing
import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth'; 

const Login = ({ login, isAuthenticated }) => {
    
    const [formData, setFormData] =  useState({
        email: '',
        password:''
    });

    const {email, password} = formData;

    const onChange = e =>
        setFormData({...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
    }
    //перенаправление, если пользователь авторизован 
    if (isAuthenticated) {
        return <Redirect to = '/dashboard'/>        
    }

    return (
        <Fragment>
            <h1 class="large text-primary">Авторизация</h1>
            <p class="lead"><i class="fas fa-user"></i>Войдите в ваш аккаунт</p>
            <form class="form" onSubmit = {e => onSubmit(e) }>
                <div class="form-group">
                <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    required
                    value = { email }
                    onChange = { e => onChange(e) }
                    />
                </div>
                <div class="from-group">
                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    value = { password }
                    onChange = { e => onChange(e) }
                    />
                </div>
                <input type="submit" class="btn btn-primary" value="Login" />
            </form>
            <p class="my-1">
                Еще нет аккаунта?<Link to="/register"> Регистрация</Link>
            </p>
        </Fragment>
    )    
}

Login.propTypes ={
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
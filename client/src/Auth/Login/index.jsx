import React, { useEffect } from 'react'
import { Row, Col } from 'antd';
import FormLogin from './components/FormLogin';
// import "/login.css";
// import {useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import Particles from './components/Particles'


const Login = () => {
    
    // const token = useSelector(state => state.user.token);
    // const login = useSelector(state => state.user.login);
    // const userInfo = useSelector(state => state.user);
    // const history = useHistory();

    // useEffect(() => {
    //     if (token && login && userInfo) {
    //         history.push('/admin/dashboard')
    //     }
    // }, [token]);

    // useEffect(() => {
    //     if (userInfo) {
    //         // dispatch(getAcount(user.id));
    //     }
    // }, []);

    return (
        <div className="wraper">
            <div className="container">
                <Row>
                    <Col span={12}>
                        <div className="bg-image">
                        </div>
                    </Col>
                    <Col span={4}></Col>
                    <Col span={8}>
                        <FormLogin/>
                    </Col>
                </Row>
            </div>
           {/* <Particles /> */}
        </div>
    )
}

export default Login;
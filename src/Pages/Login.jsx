/* eslint-disable react/no-children-prop */
import {
    InputGroup,
    InputLeftAddon,
    Input,
    Button,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import style from "../Styles/Login.module.css";
import loginImg from "../Images/LoginImg.png";
import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Routes/AuthContext';

const Login = () => {
    const { setLogin } = useContext(AuthContext)
    const [phNumber, setPhNumber] = useState("");
    const [otp, setOpt] = useState("");
    const toast = useToast();
    const navigate = useNavigate();

    const handleLogin = async () => {
        console.log(phNumber);
        if (otp) {
            await axios.post("https://kv-varlu.vercel.app/api/v1/verify/login", {
                mobileNumber: phNumber,
                otp: otp
            })
                .then((res) => {
                    console.log(res.data)
                    toast({
                        title: 'Login Successful.',
                        description: "You have successfully logged into your account!",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    })
                    localStorage.setItem("token", res.data.token);
                    navigate("/");
                })
                .catch((err) => {
                    console.log(err);
                    toast({
                        title: 'Login Failed',
                        description: "Please try again",
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    })
                })
        } else {
            await axios.post("https://kv-varlu.vercel.app/api/v1/login", {
                mobileNumber: phNumber
            })
                .then((res) => {

                    console.log(res.data);
                    setOpt(res.data.otp);
                    alert(`You OTP is : ${res.data.otp}`)
                })
                .catch((err) => {
                    console.log(err);
                    toast({
                        title: 'You have not registered yet!',
                        description: " Please Register first!",
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    })
                    setOpt("");                   
                })
        }
    }

    return (
        <div className={style.mainDiv}>
                    <img src={loginImg} alt="loginImg" />
                    <InputGroup>
                        <InputLeftAddon children="+91" />
                        <Input type='tel' placeholder='Mobile Number' onChange={(e) => {
                            setPhNumber(e.target.value)
                        }} />
                    </InputGroup>
                    {
                        otp ? <Input type="text" placeholder="Enter OTP here" />
                            : ""
                    }
                    <Button className={style.button} colorScheme='blue' onClick={handleLogin}>{otp ? "Verify OTP" : "Login"}</Button>
                    <p>Do not have an account?<button onClick={() => {
                        setLogin(false);
                        navigate("/register")
                    }}>Register here</button></p>
        </div>
    )
}

export default Login
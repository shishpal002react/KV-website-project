/* eslint-disable react/no-children-prop */
import { Button, Input, InputGroup, InputLeftAddon, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from "../Styles/Login.module.css";
import loginImg from "../Images/LoginImg.png";
import { AuthContext } from '../Routes/AuthContext';

const Register = () => {
    //const [login, setLogin] = useState(true);
    const [phNumber, setPhNumber] = useState("");
    const { setLogin } = useContext(AuthContext)
    const [otp, setOpt] = useState("");
    const toast = useToast();
    const navigate = useNavigate();
    const handleRegister = async () => {
        console.log(phNumber);

        if (otp) {
            await axios.post("https://kv-varlu.vercel.app/api/v1/verify/otp", {
                mobileNumber: phNumber,
                otp: otp
            })
                .then((res) => {
                    console.log(res.data)
                    toast({
                        title: 'Register Successful.',
                        description: "You have successfully registered your account!",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    })
                    setLogin(true);
                    localStorage.setItem("token", res.data.token);
                    navigate("/")
                })
                .catch((err) => {
                    console.log(err);
                    toast({
                        title: 'Registration Failed',
                        description: "Please try again",
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    })
                })
        } else {
            await axios.post("https://kv-varlu.vercel.app/api/v1/register", {
                mobileNumber: phNumber
            })
                .then((res) => {
                    console.log(res.data);
                    setOpt(res.data.user.otp);
                    alert(`OTP : ${res.data.user.otp}`);
                })
                .catch((err) => {
                    console.log(err.response.data.error);
                    alert(err.response.data.error)
                    /* toast({
                        title: 'Login Failed',
                        description: "Please try again",
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    }) */
                    navigate("/login")
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

                <Button className={style.button} colorScheme='blue' onClick={handleRegister}>{otp ? "Verify OTP" : "Register"}</Button>

                <Link to="/login"><p>Login?</p></Link>
            
        </div>
    )
}

export default Register
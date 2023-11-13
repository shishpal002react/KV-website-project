import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import style from "../Styles/Coupon.module.css"
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import logo from "../Images/LOGO.png"

const Coupon = () => {
    const [coupons, setCoupons] = useState([]);
    const [code, setCode] = useState("");
    const navigate = useNavigate();
    let discount = 0;

    const handleCoupon = (newCode) =>{
        if(newCode === "SUMMER20") discount = 20;
        else if(newCode === "SUMMER50") discount = 50;
        else if(newCode === "SUMMER23") discount = 23;

        localStorage.setItem("discount" , discount)
        navigate('/checkout')
        
    }

    const fetchCoupons = async () => {
        await axios.get('https://kv-varlu.vercel.app/api/v1/coupon')
            .then((res) => {
                console.log(res.data)
                setCoupons(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchCoupons();
    }, [])
    return (
        <div id={style.mainContainer}>
            <div id={style.heading}>Apply Coupon</div>
            <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    /*  type={show ? 'text' : 'password'} */
                    placeholder='ENTER COUPON'
                    onChange={(e)=>{
                        setCode(e.target.value)
                    }}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={()=>{
                        handleCoupon(code)
                    }}>APPLY
                        {/* {show ? 'Hide' : 'Show'} */}
                    </Button>
                </InputRightElement>
            </InputGroup>
            <p>AVAILABLE COUPONS</p>
            {
                coupons?.map((ele, i) => {
                    return (
                        <div key={i} className={style.couponDiv}>
                            <div id={style.logo}><img src={logo} alt="logo" /><p>CAR SERVICE</p></div>

                            <p>Flat 10% OFF on Scheduled Services, AC, Brakes, Detailing & Cleaning.</p>
                            <Link to="/terms"><p id={style.terms}>VIEW T&C </p></Link>
                            <hr />
                            <div id={style.code}>
                                <div>{ele.code}</div><button>APPLY</button>
                            </div>
                            <hr />
                            <p>*Applicable with any Periodic Service  Detailing Service.</p>
                        </div>
                    )
                })
            }
        </div>

    )
}

export default Coupon
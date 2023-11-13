import Navbar from "../Routes/Navbar";
import Footer from "../Components/Footer";
import { Button } from "@chakra-ui/react";
import style from "../Styles/Checkout.module.css";
import logo from "../Images/LOGO.png";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
import { useContext } from "react";
import { AuthContext } from "../Routes/AuthContext";

const Checkout = () => {
    const { carDetails, setCarDetails } = useContext(AuthContext);

    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [finalAmount, setFinalAmount] = useState(0);
    const [schedule, setSchedule] = useState({
        date: "",
        day: "",
        time: ""
    })
    const dateArr = [{ day: "Mon", date: "05" }, { day: "Tue", date: "05" }, { day: "Wed", date: "05" }, { day: "Thu", date: "05" }];
    const tiemArr = [{ time: "02:00 PM" }, { time: "03:00 PM" }, { time: "05:00 AM" }, { time: "06:00 AM" }, { time: "07:00 AM" }];

    const navigate = useNavigate();
    const { token } = useContext(AuthContext)
    const discount = useRef(0);
    const toast = useToast();
    const key = import.meta.env.VITE_REACT_APP_RAZOR_PAY_KEY;

    //Razorpay Payment Gateway
    const resolveScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src

            script.onload = () => {
                resolve(true)
            }

            script.onerror = () => {
                resolve(false)
            }

            document.body.appendChild(script)
        })
    }

    const handleCheckout = async (amount) => {
        //console.log(amount);
        toast({
            title: "Test Payment Details",
            status: 'info',
            description: 'Test Card No: 4111 1111 1111 1111, Use RANDOM exp. date, CVV, and OTP',
            position: 'bottom-left',
            duration: 10000,
            isClosable: true
        })
        const res = await resolveScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            alert('Failed to Load Razorpay. You are offline!')
            return
        }

        const options = {
            key : key,
            currency: 'INR',
            amount: amount * 100,
            name: 'Payment Using Razorpay',
            description: 'Thankyou for Purchasing',
            image: logo,

            handler: function (response) {
                alert('Payment Successfull. Your payment ID is ' + response.razorpay_payment_id)
                localStorage.removeItem('discount')
                setCarDetails({
                    ...carDetails, manufacturer: "",
                    model: "",
                    fuelType: "",
                    name: "",
                })
                navigate("/")
            },

            prefill: {
                name: 'Car Service'
            }
        }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }

    const handleCoupon = () => {
        navigate("/coupon");
    }

    const fetchCartItems = async () => {
        await axios.get("https://kv-varlu.vercel.app/api/v1/cart" , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                //console.log(res.data.cart)
                setCartItems(res.data.cart.items);
                getAmount()
            })
            .catch((err) => console.log(err))
    }

    const getAmount = () => {
        discount.current = localStorage.getItem("discount");
        //console.log(discount.current);
        let priceArr = [];
        cartItems.map((ele)=>{
            priceArr.push(Number(ele.serviceType.price * ele.quantity))
        })
        setTotal(
            priceArr.reduce((acc, ele) => {
                return acc + Number(ele)
            }, 0)
        )
        //console.log(total);
        
        setFinalAmount((total - (total * (discount.current * 0.01))).toFixed(2))
    }

    const handleIncrement = async () => {
        console.log(token);
        const config = {
          method: 'put', 
          url: 'https://kv-varlu.vercel.app/api/v1/cart/increase/64fb141aa2811457759dc60c',
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        };
      
        try {
          const response = await axios(config); 
      
          console.log(response.data); 
        } catch (error) {
          console.error(error);
        }
      };

    const handleDecrement = async () => {
        console.log(token);
        const config = {
          method: 'put',
          url: 'https://kv-varlu.vercel.app/api/v1/cart/decrease/64fb098759f460e30319e4c7', 
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        };
      
        try {
          const response = await axios(config); 
      
          console.log(response.data);
        } catch (error) {
          console.error(error); 
        }
    }

    useEffect(() => {
        fetchCartItems()
    }, [cartItems, total])

    return (
        <div>
            <Navbar />
            <div className={style.checkout}>
                <header>Check Out</header>
                <div>
                    <p className={style.title}>Select Date & Time</p>
                    <div className={style.days}>
                        {
                            dateArr.map((ele, i) => {
                                return (
                                    <div key={i} onClick={() => {
                                        setSchedule({ ...schedule, day: ele.day, date: ele.date })
                                    }} style={{ backgroundColor: (schedule.day === ele.day && schedule.date === ele.date) ? "#001B39" : "#E7E7E7", color: (schedule.day === ele.day && schedule.date === ele.date) ? "#E7E7E7" : "#001B39" }}>
                                        <p>{ele.day}</p>
                                        <p>{ele.date}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>


                <div>
                    <p className={style.title}>Pick Time Slot</p>
                    <div className={style.timeslots}>
                        {
                            tiemArr.map((ele, i) => {
                                return (
                                    <div key={i} onClick={() => {
                                        setSchedule({ ...schedule, time: ele.time })
                                    }} style={{ backgroundColor: (schedule.time === ele.time) ? "#001B39" : "#E7E7E7", color: (schedule.time === ele.time) ? "#E7E7E7" : "#001B39" }}>
                                        <p>{ele.time}</p>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
                <div className={style.cart}>
                    <header>Cart</header>
                    {
                        total > 500 ? (
                            <p>{`You Can Save INR ${(total * (discount.current * 0.01)).toFixed(2)}`}</p>

                        ) : ""
                    }
                    <div className={style.items}>
                        {
                            cartItems?.map((ele, i) => {
                                return (<div key={i} >
                                    <p>{ele.serviceType.name}</p>
                                    <div>
                                        <Button onClick={() => handleIncrement(ele._id)}>+</Button><p>{ele.quantity}</p><Button onClick={() => handleDecrement(ele._id)}>-</Button>
                                    </div>
                                </div>)
                            })
                        }
                    </div>

                    <Button colorScheme='black' variant='outline' className={style.coupoun} onClick={handleCoupon}>
                        APPLY COUPOUN
                    </Button>

                    <div className={style.bill}>
                        <p >Bill Details</p>
                        <div>
                            <p>Item Total</p>
                            <p>{`INR ${total}`}</p>
                        </div>
                        {
                            total > 399 ? (
                                <div>
                                    <p>You Pay</p>
                                    <p>{`INR ${finalAmount}`}</p>
                                </div>
                            ) : ""
                        }
                    </div>

                    <button className={style.checkoutbtn} onClick={() => handleCheckout(finalAmount)}>Check Out</button>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Checkout
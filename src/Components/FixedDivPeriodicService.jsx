/* import { Link } from "react-router-dom";
import style from "../Styles/FixedDivPeriodicService.module.css";
import cart from "../Images/Cart.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Routes/AuthContext";
import axios from "axios";
import { Button, Heading, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons"; */

const FixedDivPeriodicService = ({ fetchServices, setServices }) => {

    /* const { carDetails, setCarDetails } = useContext(AuthContext)
    const { manufacturer, model, fuelType, name } = carDetails; */

    //const navigate = useNavigate()
    //all data
    /* const [allManufacturer, setAllManufacturer] = useState([]);
    const [allCarModel, setAllCarModel] = useState([]);
    const [allFuel, setAllFuel] = useState([]);
 */
    /* const getServiceByDetails = () => {
        //navigate("/periodicService");
        fetchServices();
    } */

    /* const changeCarDetails = () => {
        setCarDetails({
            ...carDetails, manufacturer: "",
            model: "",
            fuelType: "",
            name: "",
        })
        setServices([])
    } */

    /* const fetchManufacturer = async () => {
        await axios.get('https://kv-varlu.vercel.app/api/v1/manufacturer')
            .then((res) => {
                console.log(res.data)
                setAllManufacturer(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const fetchCarModels = async () => {
        await axios.get('https://kv-varlu.vercel.app/api/v1/model')
            .then((res) => {
                console.log(res.data);
                setAllCarModel(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const fetchFuelType = async () => {
        await axios.get('https://kv-varlu.vercel.app/api/v1/fuelType')
            .then((res) => {
                console.log(res.data);
                setAllFuel(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    } */

   /*  useEffect(() => {
        fetchManufacturer();
        fetchCarModels();
        fetchFuelType();
    }, []) */

    return (
        /* fuelType ? (
            <div className={style.fixedDiv}>
                <img src="" alt="img" />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p>{name}</p>
                    <p onClick={changeCarDetails}>Change</p>
                </div>
                <img src={cart} alt="" />
                <p>Go ahead and book a service for your car.</p>
                <Link to="/checkout">
                    <button>Schedule your Booking</button>
                </Link>
            </div>
        ) : (
            <div className={style.fixedDiv}>
                <Menu>
                    <MenuButton as={Button} style={{ width: "100%" }}>
                        {
                            manufacturer ? (
                                model ? "Select Fuel Type"
                                    : "Select Car Model"
                            )
                                : "Select your car"
                        }
                    </MenuButton>
                    {
                        manufacturer ?
                            (
                                model ?
                                    //map fuel
                                    <MenuList style={{ color: "black" }}>
                                        <Heading as='h5' size='sm'>Select Fuel Type</Heading>
                                        <hr />
                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none'>
                                                <SearchIcon color='gray.300' />
                                            </InputLeftElement>
                                            <Input type='text' placeholder='Search' />
                                        </InputGroup>
                                        {
                                            allFuel?.map((ele, i) => {
                                                return (
                                                    <MenuItem key={i} onClick={() => {
                                                        setCarDetails({ ...carDetails, fuelType: "64f57403ed0e2af1aea0c632" })
                                                        getServiceByDetails()
                                                    }}>{ele.name}</MenuItem>
                                                )
                                            })
                                        }
                                    </MenuList>
                                    :
                                    //map carmodels
                                    <MenuList style={{ color: "black" }}>
                                        <Heading as='h5' size='sm'>Select Car Model</Heading>
                                        <hr />
                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none'>
                                                <SearchIcon color='gray.300' />
                                            </InputLeftElement>
                                            <Input type='text' placeholder='Search' />
                                        </InputGroup>
                                        {
                                            allCarModel?.map((ele, i) => {
                                                return (
                                                    <MenuItem key={i} onClick={() =>
                                                        setCarDetails({ ...carDetails, model: "64dcd45e78988a5b661cdd91", name: ele.name })
                                                    }>{ele.name}</MenuItem> //
                                                )
                                            })
                                        }
                                    </MenuList>
                            )
                            :
                            //map manufacturer
                            <MenuList style={{ color: "black" }}>
                                <Heading as='h5' size='sm'>Select Car Manufacturer</Heading>
                                <hr />
                                <InputGroup>
                                    <InputLeftElement pointerEvents='none'>
                                        <SearchIcon color='gray.300' />
                                    </InputLeftElement>
                                    <Input type='text' placeholder='Search' />
                                </InputGroup>
                                {
                                    allManufacturer?.map((ele, i) => {
                                        return (
                                            <MenuItem onClick={() =>
                                                setCarDetails({ ...carDetails, manufacturer: "64d62d3bd4f60b74f55fb826" })
                                            } key={i}>{ele.name}</MenuItem> //
                                        )
                                    })
                                }
                            </MenuList>
                    }
                </Menu>
            </div> 
            */
    )
}

export default FixedDivPeriodicService
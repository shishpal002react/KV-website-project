import { SearchIcon } from '@chakra-ui/icons'
import { Heading, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Button } from '@chakra-ui/react'
import { AuthContext } from '../Routes/AuthContext'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import style from "../Styles/FixedDivHome.module.css"

const FixedDivHome = () => {
    const { carDetails, setCarDetails } = useContext(AuthContext)
    const navigate = useNavigate();

    //all data
    const [allManufacturer, setAllManufacturer] = useState([]);
    const [allCarModel, setAllCarModel] = useState([]);
    const [allFuel, setAllFuel] = useState([]);

    const fetchManufacturer = async () => {
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
    }

    useEffect(() => {
        fetchManufacturer();
        fetchCarModels();
        fetchFuelType();
    }, [])
    return (
        <>
            <p style={{ fontWeight: "600", fontSize: "32px" }}>Book your Car Service Now!</p>
            <p style={{ fontWeight: "500", fontSize: "18px" }}>Get instant quotes for your car service</p>
            <div style={{ color: '#FBBC04', display: "flex" }}>
                <p>Rating</p>
                <img src="" />
                <p>4.7 / 5</p>
            </div>
            <div>
                <Menu>
                    <MenuButton as={Button} style={{ width: "100%" }}>
                        {
                            carDetails.manufacturer ? (
                                carDetails.model ? "Select Fuel Type"
                                    : "Select Car Model"
                            )
                                : "Select your car"
                        }
                    </MenuButton>
                    {
                        carDetails.manufacturer ?
                            (
                                carDetails.model ?
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
                                                        setCarDetails({ ...carDetails, fuelType: "64f57403ed0e2af1aea0c632" }) //
                                                        navigate("/periodicService");
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
                                                    <MenuItem key={i} onClick={() => setCarDetails({ ...carDetails, model: "64dcd45e78988a5b661cdd91", name: ele.name })}>{ele.name}</MenuItem> //
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
                                            <MenuItem onClick={() => setCarDetails({ ...carDetails, manufacturer: "64d62d3bd4f60b74f55fb826" })} key={i}>{ele.name}</MenuItem> //
                                        )
                                    })
                                }
                            </MenuList>
                    }
                </Menu>
            </div>
            <div>
                <Input placeholder="Enter your Mobile Number" style={{ width: "100%" }} />
            </div>
            <div>
                <button id={style.checkPrice}>Check Prices For Free</button>
            </div>

        </>

    )
}

export default FixedDivHome
import { useState, useEffect, useContext } from "react";
import logo from "../Images/LOGO.png";
import { Input, Button, Select, Menu, MenuList, MenuButton, MenuItem, Text, InputGroup, InputRightElement } from '@chakra-ui/react';
import style from '../Styles/Navbar.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SearchIcon } from "@chakra-ui/icons";
import { AuthContext } from "./AuthContext";

const Navbar = () => {
    const { token, setToken } = useContext(AuthContext);

    const [query, setQuery] = useState("");
    //const [subCategories, setSubCategories] = useState([]);
    const [result, setResult] = useState(0);

    const navigate = useNavigate();

    const handleLogin = () => {
        if (!token) navigate("/login");
        else {
            localStorage.removeItem("token")
            setToken("");
        }
    }

    const handleSearch = async () => {
        if(!query){
            await axios.get(`https://kv-varlu.vercel.app/api/v1/subcategory/search?search=search=Engine Services2`)
            .then((res) => {
                console.log(res.data)
                setResult(res.data.productsCount)
                alert('Search Result - Products Count ' + result)
            })
            .catch((err) => {
                console.log(err)
            })  
        }
        else{
            await axios.get(`https://kv-varlu.vercel.app/api/v1/subcategory/search?search=${query}`)
            .then((res) => {
                console.log(res.data)
                setResult(res.data.productsCount)
                alert('Search Result - Products Count ' + result)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        
        /* toast({
          title: 'Search Success',
          description: 'Search Result Fetched',
          status: 'success',
          duration: 9000,
          isClosable: true,
        }) */
    }

    /* const fetchSubCategories = async () => {
        await axios.get('https://kv-varlu.vercel.app/api/v1/subcategory/all')
            .then((res) => {
                console.log(res.data.subcategories); //[0].type
                setSubCategories(res.data.subcategories);
            })
    } */

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        //fetchSubCategories()
    }, [])

    return (
        <div className={style.navbar}>
            <Link to="/">
                <img src={logo} alt="logo" />
            </Link>
            <Link to="/">
                <header>CAR SERVICE</header>
            </Link>
            <div className={style.selectLoc}>
                <Select placeholder='Select your City'
                    bg='white'
                    borderColor='black'
                    color='black'>
                    <option value='option1'>Hyderabad</option>
                    <option value='option2'>New Delhi</option>
                    <option value='option3'>Mumbai</option>
                    <option value='option3'>Agra</option>
                </Select>
            </div>

            <InputGroup size='md'>
                <Input placeholder='Search Engine Services2' onChange={(e) => {
                    setQuery(e.target.value)
                }} />
                <InputRightElement width='4.5rem'>
                    <SearchIcon onClick={handleSearch} />
                </InputRightElement>
            </InputGroup>

            <p>Spares</p>
            <Link to="/blogs">
                <p>Blog</p>
            </Link>
            <Menu>
                <MenuButton as={Text}>
                    Menu
                </MenuButton>
                <MenuList style={{ color: "black" }}>
                    <MenuItem onClick={() => navigate("/faq")}>FAQ</MenuItem>
                    <MenuItem onClick={() => navigate("/contact")}>Contact Us</MenuItem>
                    <MenuItem onClick={() => navigate("/terms")}>Terms</MenuItem>
                    <MenuItem onClick={() => navigate("/privacy")}>Privacy</MenuItem>
                    <MenuItem onClick={() => navigate("/offers")}>Offers</MenuItem>
                    <MenuItem onClick={() => navigate("/reviews")}>Reviews</MenuItem>
                </MenuList>
            </Menu>
            <Button variant='link' color={'white'} onClick={handleLogin}><p>{token ? "Customer" : "Login"}</p></Button>
        </div>
    )
}

export default Navbar
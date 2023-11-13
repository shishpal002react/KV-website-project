import style from "../Styles/Home.module.css";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Select,
  Button,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import logo from "../Images/LOGO.png";
import location from "../Images/Mask group.png";
import star from "../Images/star.png";
import happyCustomer from "../Images/happyCustomer.png";
import poster1 from "../Images/poster1.jpg";
import poster2 from "../Images/Poster2.jpg";
import poster3 from "../Images/poster3.jpg";
import service1 from "../Images/service1.jpg";
import service2 from "../Images/service2.jpg";
import service3 from "../Images/service3.jpg";
import works1 from "../Images/works1.jpg";
import works2 from "../Images/works2.jpg";
import works3 from "../Images/works3.jpg";
import works0 from "../Images/works0.jpg";
import Reviews from "../Components/Reviews";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Routes/AuthContext";
import FixedDivHome from "../Components/FixedDivHome";

export const Home = () => {
  const { token, setToken } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [curatedService, setCuratedService] = useState([]);
  const [search, setSearch] = useState("");

  console.log("search information", search);

  const navigate = useNavigate();

  const services = useRef(null);
  const customService = useRef(null);
  const howWorks = useRef(null);
  const reviews = useRef(null);
  const price = useRef(null);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  const handleLogin = () => {
    if (!token) navigate("/login");
    else {
      localStorage.removeItem("token");
      setToken("");
    }
  };

  const fetchCategory = async () => {
    await axios
      .get("https://kv-varlu.vercel.app/api/v1/category/all")
      .then((res) => {
        console.log(res.data.categories);
        setCategories(res.data.categories);
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong!");
      });
  };

  const fetchCuratedCustomService = async () => {
    await axios
      .get("https://kv-varlu.vercel.app/api/v1/curated/all")
      .then((res) => {
        //console.log(res.data.categories)
        setCuratedService(res.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    fetchCategory();
    fetchCuratedCustomService();
  }, [setToken]);

  return (
    <div id={style.mainbox}>
      <div id={style.top}>
        <div id={style.navbar}>
          <div id={style.leftnav}>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
            <Link to="/">
              <header>CAR SERVICE</header>
            </Link>
            <div className={style.selectLoc}>
              <img id={style.location} src={location} />
              <Select
                placeholder="Select your City"
                color="gray"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              >
                <option value="Hyderabad">Hyderabad</option>
                <option value="New Delhi">New Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Agra">Agra</option>
              </Select>
            </div>
          </div>
          <div id={style.rightnav}>
            <p>Spares</p>
            <Link to="/blogs">
              <p>Blog</p>
            </Link>
            <Menu>
              <MenuButton as={Text}>Menu</MenuButton>
              <MenuList style={{ color: "black" }}>
                <MenuItem onClick={() => navigate("/faq")}>FAQ</MenuItem>
                <MenuItem onClick={() => navigate("/contact")}>
                  Contact Us
                </MenuItem>
                <MenuItem onClick={() => navigate("/terms")}>Terms</MenuItem>
                <MenuItem onClick={() => navigate("/privacy")}>
                  Privacy
                </MenuItem>
                <MenuItem onClick={() => navigate("/offers")}>Offers</MenuItem>
                <MenuItem onClick={() => navigate("/reviews")}>
                  Reviews
                </MenuItem>
              </MenuList>
            </Menu>
            <Button
              variant="link"
              color={"white"}
              mt="-20px"
              onClick={handleLogin}
            >
              <p>{token ? "Customer" : "Login"}</p>
            </Button>
          </div>
        </div>

        <div>
          <div id={style.left}>
            <div id={style.leftDiv1}>
              <p id={style.leftDiv1para1}>
                Experience The Best Car Services In Hyedrabad
              </p>
              <p id={style.leftDiv1para2}>
                We provide Our Services in over 100+ Major Cities also.
              </p>
            </div>

            <div id={style.leftDiv2}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                nec egestas ligula. Nulla facilisi. Phasellus faucibus ligula id
                mauris varius, eget faucibus lorem fringilla. Vivamus ut felis
                porta, luctus libero eget, feugiat velit. Sed aliquet leo et ex
                sodales,
              </p>
            </div>

            <div id={style.reviews}>
              <div>
                <div>
                  <img src={star} alt="star" />
                </div>
                <div>
                  <p>4.7</p>
                  <p>Based on 100000+ Reviews</p>
                </div>
              </div>

              <div>
                <div>
                  <img src={happyCustomer} alt="customer" />
                </div>
                <div>
                  <p>2,50,000</p>
                  <p>Happy Customers</p>
                </div>
              </div>
            </div>
          </div>

          {/* <p style={{ fontWeight: "600", fontSize: "32px" }}>Book your Car Service Now!</p>
                        <p style={{ fontWeight: "500", fontSize: "18px" }}>Get instant quotes for your car service</p>
                        <div style={{ color: '#FBBC04', display: "flex" }}>
                            <p>Rating</p>
                            <img src={star} />
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
                                                                    setCarDetails({ ...carDetails, fuelType:"64f57403ed0e2af1aea0c632" }) //
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

                    </div>
                </div> */}
          <div id={style.right}>
            <FixedDivHome />
          </div>
        </div>
      </div>

      <div id={style.menu}>
        <p onClick={() => scrollToSection(services)}>Our Services</p>
        <p onClick={() => scrollToSection(customService)}>
          Curated Custom Service
        </p>
        <p onClick={() => scrollToSection(howWorks)}>How Car Service Works?</p>
        <p onClick={() => scrollToSection(reviews)}>Rating & Reviews</p>
        <p onClick={() => scrollToSection(price)}>Price</p>
      </div>

      <div id={style.heading} ref={services}>
        <p id={style.headingPara1}>Car Services Available In Hyderabad</p>
        <p id={style.headingPara2}>
          Get hassle-free and professional car service, car repair, wheel care
          services, cashless insurance claim and much more in Hyderabad.
        </p>
      </div>

      <div id={style.services}>
        {categories?.map((ele, i) => {
          return (
            <div key={i} onClick={() => navigate("/periodicService")}>
              <img src={ele.image} alt="serviceCategories" />
              <p>{ele.name}</p>
            </div>
          );
        }, [])}
      </div>

      <div id={style.posters}>
        <img src={poster1} alt="poster1" />
        <img src={poster2} alt="poster2" />
        <img src={poster3} alt="poster3" />
      </div>

      <div id={style.curatedservicesDiv} ref={customService}>
        <p>Curated Custom Services</p>
        <div id={style.curatedservices}>
          {curatedService?.map((ele, i) => {
            return (
              <div key={i}>
                <img src={ele.image} alt="" />
                <p>{ele.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div id={style.workshop}>
        <p>Choose the workshop Near You</p>
        <div>
          <img src={service1} alt="" />
          <img src={service2} alt="" />
          <img src={service3} alt="" />
        </div>
      </div>

      <div id={style.serviceworksDiv} ref={howWorks}>
        <p>How Car Service Works?</p>
        <div id={style.serviceworks}>
          <div>
            <img src={works0} />
            <p>Free Pickup Drop</p>
          </div>
          <div>
            <img src={works1} />
            <p>Genuine Parts</p>
          </div>
          <div>
            <img src={works2} />
            <p>30 Days Warranty</p>
          </div>
          <div>
            <img src={works3} />
            <p>Affordable Price</p>
          </div>
        </div>
      </div>

      <div id={style.userSayDiv} ref={reviews}>
        <p>What Car Owners in Hyderabad Say</p>
        <Reviews />
      </div>

      <Footer />
    </div>
  );
};

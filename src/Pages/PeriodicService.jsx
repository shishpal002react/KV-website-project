import Navbar from "../Routes/Navbar";
import Product from "../Components/Product";
import style from "../Styles/PeriodicService.module.css";
import blog1 from "../Images/Blog1.png";
import blog2 from "../Images/Blog2.png";
import blog3 from "../Images/Blog3.png";
import Footer from "../Components/Footer";
import Reviews from "../Components/Reviews";
import cart from "../Images/Cart.png";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Routes/AuthContext";
import { CheckCircleIcon, SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import {
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
//import FixedDivPeriodicService from "../Componentfeaturess/FixedDivPeriodicService";
import { FaIndianRupeeSign } from "react-icons/fa6";
// import { AiOutlinePlus } from "react-icons/ai";

const PeriodicService = () => {
  const [services, setServices] = useState([]);

  const [allServices, setAllServices] = useState([]);
  //services id is static
  const [serviceId, setServiceId] = useState("6545e48c34fe11dac3a90482");
  const [serviceName, setServiceName] = useState([]);
  // const [serviceNameId, setServiceID] = useState("");

  const [category, setCategory] = useState([]);

  //const [brakeMaintenance, setBrakeMaintenance] = useState([]);
  //const [acService, setACService] = useState([])
  console.log("category id golu", serviceId);

  //all data
  const [allManufacturer, setAllManufacturer] = useState([]);
  const [allCarModel, setAllCarModel] = useState([]);
  const [allFuel, setAllFuel] = useState([]);

  const { token, carDetails, setCarDetails } = useContext(AuthContext);
  const { manufacturer, model, fuelType, name } = carDetails;

  const changeCarDetails = () => {
    setCarDetails({
      ...carDetails,
      manufacturer: "",
      model: "",
      fuelType: "",
      name: "",
    });
    setServices([]);
  };
  /* const getServiceByDetails = () => {
    //navigate("/periodicService");
    fetchServices();
  } */
  const fetchCategory = async () => {
    await axios
      .get("https://kv-varlu.vercel.app/api/v1/category/all")
      .then((res) => {
        // console.log(res.data)
        setCategory(res.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const serviceCategory = async () => {
    await axios
      .get(`https://kv-varlu.vercel.app/api/v1/service/category/${serviceId}`)
      .then((res) => {
        // console.log(res.data)
        setServiceName(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    serviceCategory();
  }, [serviceId]);

  console.log("service Category name", serviceName);

  const fetchManufacturer = async () => {
    await axios
      .get("https://kv-varlu.vercel.app/api/v1/manufacturer")
      .then((res) => {
        // console.log(res.data)
        setAllManufacturer(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCarModels = async () => {
    await axios
      .get("https://kv-varlu.vercel.app/api/v1/model")
      .then((res) => {
        //console.log(res.data);
        setAllCarModel(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchFuelType = async () => {
    await axios
      .get("https://kv-varlu.vercel.app/api/v1/fuelType")
      .then((res) => {
        //console.log(res.data);
        setAllFuel(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* const fetchServices = async () => {
    await axios.get(`https://kv-varlu.vercel.app/api/v1/car/service/price/${manufacturer}/${model}/${fuelType}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log(res.data.serviceTypes)
        setServices(res.data.serviceTypes)
        setAllServices([])
      })
      .catch((err) => {
        console.log(services);
        //fetchAllServices();
        //fetchBrakeMaintenance();
        console.log(manufacturer, model, fuelType);
        console.log(err);
      })
  } */

  const fetchAllServices = async () => {
    if (manufacturer && model && fuelType) {
      //setAllServices([])
      await axios
        .get(
          `https://kv-varlu.vercel.app/api/v1/car/service/price/${manufacturer}/${model}/${fuelType}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data.serviceTypes);
          setServices(res.data.serviceTypes);
          setAllServices([]);
        })
        .catch((err) => {
          console.log(services);
          //fetchAllServices();
          //fetchBrakeMaintenance();
          console.log(manufacturer, model, fuelType);
          console.log(err);
        });
    } else {
      //setServices([])
      await axios
        .get(
          `https://kv-varlu.vercel.app/api/v1/serviceType/service/${serviceId}`
        )
        .then((res) => {
          console.log(res.data.serviceTypes);
          setAllServices(res.data.serviceTypes);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  /* const fetchBrakeMaintenance = async () => {
    await axios.get('https://kv-varlu.vercel.app/api/v1/serviceType/service/6545e5ca699db3195a165240')
      .then((res) => {
        console.log(res.data.serviceTypes);
        setBrakeMaintenance(res.data.serviceTypes)
      })
  } */

  /* const fetchACServices = async () => {
    await axios.get('https://kv-varlu.vercel.app/api/v1/serviceType/service/654616de32942fe9b2503086')
      .then((res) => {
        console.log(res.data)
        setACService(res.data.serviceTypes)
      })
      .catch((err) => {
        console.log(err);
      })
  } */

  useEffect(() => {
    fetchAllServices();
    fetchManufacturer();
    fetchCarModels();
    fetchFuelType();
  }, [serviceId, fuelType]);

  return (
    <div>
      <Navbar />

      {/* fixedDiv */}
      <div>
        {/* <FixedDivPeriodicService setServices={setServices} fetchServices={fetchServices}/> */}
        {fuelType ? (
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
                {manufacturer
                  ? model
                    ? "Select Fuel Type"
                    : "Select Car Model"
                  : "Select your car"}
              </MenuButton>
              {manufacturer ? (
                model ? (
                  //map fuel
                  <MenuList style={{ color: "black" }}>
                    <Heading as="h5" size="sm">
                      Select Fuel Type
                    </Heading>
                    <hr />
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <SearchIcon color="gray.300" />
                      </InputLeftElement>
                      <Input type="text" placeholder="Search" />
                    </InputGroup>
                    {allFuel?.map((ele, i) => {
                      return (
                        <MenuItem
                          key={i}
                          onClick={() => {
                            setCarDetails({
                              ...carDetails,
                              fuelType: "64f57403ed0e2af1aea0c632",
                            });
                          }}
                        >
                          {ele.name}
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                ) : (
                  //map carmodels
                  <MenuList style={{ color: "black" }}>
                    <Heading as="h5" size="sm">
                      Select Car Model
                    </Heading>
                    <hr />
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <SearchIcon color="gray.300" />
                      </InputLeftElement>
                      <Input type="text" placeholder="Search" />
                    </InputGroup>
                    {allCarModel?.map((ele, i) => {
                      return (
                        <MenuItem
                          key={i}
                          onClick={() =>
                            setCarDetails({
                              ...carDetails,
                              model: "64dcd45e78988a5b661cdd91",
                              name: ele.name,
                            })
                          }
                        >
                          {ele.name}
                        </MenuItem> //
                      );
                    })}
                  </MenuList>
                )
              ) : (
                //map manufacturer
                <MenuList style={{ color: "black" }}>
                  <Heading as="h5" size="sm">
                    Select Car Manufacturer
                  </Heading>
                  <hr />
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <SearchIcon color="gray.300" />
                    </InputLeftElement>
                    <Input type="text" placeholder="Search" />
                  </InputGroup>
                  {allManufacturer?.map((ele, i) => {
                    return (
                      <MenuItem
                        onClick={() =>
                          setCarDetails({
                            ...carDetails,
                            manufacturer: "64d62d3bd4f60b74f55fb826",
                          })
                        }
                        key={i}
                      >
                        {ele.name}
                      </MenuItem> //
                    );
                  })}
                </MenuList>
              )}
            </Menu>
          </div>
        )}
      </div>

      <div className={style.container}>
        <div className={style.topBar}>
          {category &&
            category.map((item, i) => (
              <p
                onClick={() => {
                  setServices([]);
                  changeCarDetails();
                  // setServiceId("6545e48c34fe11dac3a90482");
                  setServiceId(item._id);
                }}
                key={i}
                // onChange={(e) => setServiceId(e.target.value)}
              >
                {item.name}
              </p>
            ))}
          {/* <p
            onClick={() => {
              setServices([]);
              changeCarDetails();
              setServiceId("6545e48c34fe11dac3a90482");
            }}
          >
            Periodic Service
          </p>

          <p
            onClick={() => {
              setServiceId("654616de32942fe9b2503086");
            }}
          >
            AC Service & Repair
          </p>

          <p
            onClick={() => {
              setServiceId("");
            }}
          >
            Batteries
          </p>

          <p
            onClick={() => {
              setServiceId("");
            }}
          >
            Tyres & Wheel
          </p>

          <p
            onClick={() => {
              setServiceId("");
            }}
          >
            Denting & Painting
          </p> */}
        </div>
        {services?.map((ele, i) => {
          return (
            <div key={i}>
              <p className={style.heading}></p>
              <Product {...ele} />
              <hr style={{ width: "50%" }} />
            </div>
          );
        })}
        {serviceName &&
          serviceName.map((item, i) => (
            <div key={i} className={style.serviceTypes}>
              <strong>{item.name}</strong>

              {allServices?.map((ele, i) => {
                return (
                  <div key={i}>
                    {/* className={style.serviceTypes} */}
                    <div className={style.serviceTypesTop}>
                      <div>
                        <img src={ele.images[0]} alt="serviceType" />
                      </div>
                      <div className={style.serviceTypesData}>
                        <div className={style.title}>
                          <p>{ele.name}</p>
                          <p>4 HRS TAKEN</p>
                        </div>
                        <div className={style.warranty}>
                          {ele.warranty.map((e, i) => {
                            return <p key={i}>• {e}</p>;
                          })}
                        </div>
                        <div className={style.features}>
                          {ele.features.map((e, i) => (
                            <p key={i}>
                              <CheckCircleIcon />
                              <spam> {e}</spam>
                            </p>
                          ))}
                        </div>
                      </div>
                      {/* {ele.price} */}
                    </div>
                    <div className={style.serviceTypesBottom}>
                      <div className={style.serviceTypesPrice}>
                        <p>
                          <FaIndianRupeeSign /> <strong>{ele.price}</strong>
                        </p>
                      </div>
                      <button>
                        {/* <AiOutlinePlus /> ADD TO CART */}
                        SELECT CAR
                      </button>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
          ))}
      </div>

      <p className={style.heading}>Related Blogs</p>
      <div className={style.relatedBlogs}>
        <img src={blog1} alt="blog1" />
        <img src={blog2} alt="blog2" />
        <img src={blog3} alt="blog3" />
      </div>

      <div style={{ padding: "20px" }}>
        <p style={{ color: "#001B39", fontSize: "20px", fontWeight: "700" }}>
          Recent Review & Rating on Periodic Services
        </p>
        <Reviews />
      </div>

      <Footer />
    </div>
  );
};

export default PeriodicService;

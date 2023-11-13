import { Button, useToast } from "@chakra-ui/react";
import style from "../Styles/Product.module.css";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Product = ({ _id, name, price, feature }) => {
  const toast = useToast();
  const token = localStorage.getItem("token");

  //api/v1/cart
  console.log("product services data", price);
  console.log("product services data", name);
  console.log("product services data", _id);
  console.log("product services data", feature);

  const handleAddtoCart = async () => {
    if (!token) {
      toast({
        title: "Please Login First",
        description: "You haven't logged in yet!",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    await axios
      .post(
        "https://kv-varlu.vercel.app/api/v1/cart",
        {
          serviceType: "64faf8f3cf7ee53957a86569",
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast({
          title: "Added to Cart",
          description: "Item successfully added to cart!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error adding to Cart",
          description: "Item not added to cart!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <div className={style.mainDiv}>
      <div className={style.upper}>
        <div>
          
          <img src="" alt="img" />
        </div>
        <div className={style.desc}>
          <div className={style.heading}>
            <p>{name}</p>
            <p>4 Hrs Taken</p>
          </div>
          <div className=""></div>
          <div className={style.features}>
            <p>{feature}</p>
          </div>
        </div>
      </div>
      <div className={style.lower}>
        <div>
          <p>₹{price}</p>
        </div>
        <div>
          <Button
            colorScheme="black"
            variant="outline"
            onClick={() => handleAddtoCart(_id)}
          >
            + ADD TO CART
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;

import { useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Routes/Navbar";
import style from "../Styles/Contact.module.css";
import axios from "axios";
import building from "../Images/Building (1).png";
import locator from "../Images/Locator.png";
import location from "../Images/location.png";
import { useToast, Button } from "@chakra-ui/react";

import { CalendarIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";

const ContactUs = () => {
  const [message, setMessage] = useState("");
  const toast = useToast();

  async function postMessage() {
    if (message === "") {
      alert("Enter valid message!");
      return;
    }

    await axios
      .post("https://kv-varlu.vercel.app/api/v1/contact")
      .then((res) => {
        console.log(res.data);
        toast({
          title: "Message Sent",
          description: "Thankyou for contacting us!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setMessage("");
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error sending message",
          description: "Message not sent!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }
  return (
    <div>
      <Navbar />
      <div id={style.heading}>
        <p>Contact Us</p>
        <PhoneIcon />
      </div>
      <div id={style.body}>
        <div>
          <p className={style.title}>Need any Assistance?Leave Us a Message</p>
          <textarea
            name=""
            id=""
            cols="80"
            rows="5"
            value={message}
            placeholder="Write your message here......"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <br />
          <Button onClick={postMessage} colorScheme="blue">
            Send
          </Button>
        </div>

        <div>
          <p className={style.title}>More Information</p>
          <div>
            <EmailIcon />
            <p>info@carservice.in</p>
          </div>
          <div>
            <PhoneIcon />
            <p>9388893888</p>
          </div>
          <div>
            <CalendarIcon />
            <p>Monday - Saturday</p>
          </div>
        </div>
      </div>

      <div id={style.addressContainer}>
        <p className={style.title}>Our Office Address</p>
        <div id={style.address}>
          <div>
            <img src={building} alt="office" />
          </div>

          <div>
            <div>
              <img src={location} alt="location"></img>
              <p>DLF STREET, NEW AVENUE, HYDERABAD, INDIA</p>
            </div>

            <div>
              <img src={locator} alt="locator" />
              <p>LOCATE US ON GOOGLE MAPS</p>
            </div>
          </div>
        </div>
      </div>

      {/* <div id={style.container}>
        {
          contact?.map((ele, i) => {
            return (
              <div key={i}>
                <h5>{ele.message}</h5>
              </div>
            )
          })
        }
      </div> */}
      <Footer />
    </div>
  );
};

export default ContactUs;

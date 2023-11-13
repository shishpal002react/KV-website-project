/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import Footer from "../Components/Footer"
import Navbar from "../Routes/Navbar"
import axios from "axios";
import style from '../Styles/Privacy.module.css'

const Privacy = () => {
  const [privacy, setPrivacy] = useState("");

  useEffect(() => {
    axios.get('https://kv-varlu.vercel.app/api/v1/privacy')
      .then((res) => {
        console.log(res.data);
        setPrivacy(res.data.privacy[6].privacy)
      })
      .catch((err) => {
        console.log(err);
        alert('Something went wrong')
      })
  }, []);

  return (
    <div>
      <Navbar />

      <div id={style.container}>
        <h1>Privacy Policy</h1>
        {/* {
          privacy?.map((ele, i) => {
            return (
              <div key={i}>
                <p>{ele.privacy}</p>
              </div>
            )
          })
        } */
        }
        <div className="terms_content">
          <p className={style.subTitle}>INTELLECTUAL PROPERTY RIGHTS</p>
          <p className="sub-pag">{privacy}</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Privacy
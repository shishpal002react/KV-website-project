/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Routes/Navbar";
import style from "../Styles/Terms.module.css";
import axios from "axios";

const Terms = () => {
  const [terms, setTerms] = useState([]);

  async function fetchTerms() {
    await axios
      .get("https://kv-varlu.vercel.app/api/v1/terms")
      .then((res) => {
        console.log(res.data);
        setTerms(res.data.terms);
        console.log(res.data.terms);
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong!");
      });
  }

  useEffect(() => {
    fetchTerms();
  }, []);

  return (
    <div>
      <Navbar />
      <div>{<h5>{terms.terms}</h5>}</div>
      <div className={style.terms_content}>
        <h1>Terms & Conditions</h1>
        <p className={style.subtitle}>CONTRACTUAL RELATIONSHIP</p>
        <p className={style.para}></p>
        <p className={style.subtitle}>DEFINITIONS</p>
        <p className={style.para}></p>
        <p className={style.subtitle}>SERVICES</p>
        <p className={style.para}></p>
        <p className={style.subtitle}>ELIGIBILITY</p>
        <p className={style.para}></p>
        <p className={style.subtitle}>USE OF SERVICES</p>
        <p className={style.para}></p>
        <p className={style.subtitle}>SUPPORT</p>
        <p className={style.para}></p>
        <p className={style.subtitle}>PROHIBITED USAGE OF THE PLATFORM</p>
        <p className={style.para}></p>
        <p className={style.subtitle}>
          USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS
        </p>
        <p className={style.para}></p>
        <p className={style.subtitle}>USER DATA</p>
        <p className={style.para}></p>
        <p className={style.subtitle}>INTELLECTUAL PROPERTY RIGHTS</p>
        <p className={style.para}></p>
        <p className={style.subtitle}>LICENSE</p>
        <p className={style.para}></p>
        <p className={style.subtitle}>LIMITATION OF LIABILITY</p>
        <p className={style.para}></p>
        <p className={style.subtitle}>EXEMPTIONS TO LIABILITY OF COMPANY</p>
        <p className={style.para}></p>
        <p className={style.subtitle}>BILLING/CHARGES</p>
        <p className={style.para}></p>
        <p className={style.subtitle}>CANCELLATION AND REFUND</p>
        <p className={style.para}></p>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;

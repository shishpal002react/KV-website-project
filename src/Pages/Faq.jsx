import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Routes/Navbar";
import axios from "axios";
import style from "../Styles/Faqs.module.css";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
} from "@chakra-ui/react";

const Faq = () => {
  const [questions, setQuestions] = useState([]);

  async function fetchFaq() {
    await axios
      .get("https://kv-varlu.vercel.app/api/v1/faq")
      .then((res) => {
        console.log(res.data.faqs);
        setQuestions(res.data.faqs);
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching FAQs");
      });
  }

  useEffect(() => {
    fetchFaq();
  }, []);

  return (
    <div>
      <Navbar />
      <div id={style.heading}>
        <Heading>Frequently Asked Questions</Heading>
      </div>
      <Accordion allowMultiple id={style.accordion}>
        {questions?.map((ele, i) => {
          return (
            <AccordionItem key={i} className={style.accordionItem}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {ele.question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>{ele.answer}</AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
      <Footer />
    </div>
  );
};

export default Faq;

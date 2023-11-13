import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Heading, Box } from '@chakra-ui/react'
import style from "../Styles/Faqs.module.css"
import axios from 'axios'
import { useEffect, useState } from 'react'

const FaqComp = () => {
    const [questions, setQuestions] = useState([])

    async function fetchFaq() {
        await axios.get('https://kv-varlu.vercel.app/api/v1/faq')
            .then((res) => {
                console.log(res.data.faqs)
                setQuestions(res.data.faqs)
            })
            .catch((err) => {
                console.log(err);
                alert('Error fetching FAQs');
            })
    }

    useEffect(() => {
        fetchFaq()
    }, [])
    return (
        <div>
            <div id={style.heading}>
                <Heading >Frequently Asked Questions</Heading>
            </div>
            <Accordion allowMultiple id={style.accordion}>
                {
                    questions?.map((ele, i) => {
                        return (
                            <AccordionItem key={i} className={style.accordionItem}>
                                <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left'>
                                            {ele.question}
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    {ele.answer}
                                </AccordionPanel>
                            </AccordionItem>
                        )
                    })
                }
            </Accordion>
        </div>
    )
}

export default FaqComp
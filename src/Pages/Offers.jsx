import Footer from "../Components/Footer"
import Navbar from "../Routes/Navbar"
import offers1 from "../Images/OFFERS1.png"
import offers2 from "../Images/OFFERS2.png"
import style from '../Styles/Offers.module.css'
import FaqComp from "../Components/FaqComp"
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons"

const Offers = () => {
  return (
    <div>
      <Navbar />
      <div id={style.mainDiv}>
        <h1>Claim Our Current Offers! HURRY!!</h1>
        <div id={style.images}>
          <img src={offers1} alt="" /><img src={offers2} alt="" />
        </div>
        <div id={style.carousal}>
          <div className={style.arrows}>
            <ArrowLeftIcon />
          </div>
          <div className={style.arrows}>
            <ArrowRightIcon />
          </div>
        </div>
      </div>
      <FaqComp />
      <Footer />
    </div>
  )
}

export default Offers
import style from "../Styles/Footer.module.css";
import { Link } from 'react-router-dom';
import facebook from "../Images/Linkfb.png";
import insta from "../Images/Linkinsta.png";
import wa from "../Images/Linkwa.png";
import yt from "../Images/Linkyt.png";
import twitter from "../Images/Linktwitter.png";
import mail from '../Images/mail.png';
import phone from "../Images/phone.png";
import calendar from "../Images/calendar.png";
import watch from "../Images/watch.png";
import playstore from "../Images/Playstore.png";
import applestore from "../Images/Applestore.png";

const Footer = () => {
    return (
        <div id={style.footer}>
            <div id={style.footer_top}>
                <div>
                    <h5>ABOUT US</h5>
                    <Link to="/faq"><p>FAQs</p></Link>
                    <Link to="/contact"><p>Contact Us</p></Link>
                    <p>Careers</p>
                    <Link to="/terms"><p>Terms and Conditions</p></Link>
                    <Link to="/privacy"><p>Privacy Policy</p></Link>
                    <p>Car Service Partners</p>
                    <p>Workshop Locator</p>
                    <Link to="/offers"><p>Offers</p></Link>
                    <Link to="/reviews"><p>Reviews</p></Link>
                    <p>Directory</p>
                </div>
                <div>
                    <h5>OUR SERVICES</h5>
                    <p>Scheduled Services</p>
                    <p>AC Services</p>
                    <p>Cleaning & Detailing</p>
                    <p>Lights & Fitments</p>
                    <p>Denting Painting</p>
                    <p>Insurance Services</p>
                    <p>Custom Repair</p>
                    <p>Batteries</p>
                    <p>Tyres</p>
                    <p>Detailing Services</p>
                    <p>Windshields & Glass</p>
                </div>
                <div>
                    <h5>LUXURY BRANDS</h5>
                    <p>Mercedes</p>
                    <p>BMW</p>
                    <p>Audi</p>
                    <p>Volvo</p>
                    <p>Mitsubishi</p>
                    <p>Jaguar</p>
                    <p>Porsche</p>
                    <p>Rolls Royce</p>
                    <p>Ferrari</p>
                    <p>Land Rover</p>
                </div>
                <div>
                    <h5>POPULAR BRANDS</h5>
                    <p>Maruti Suzuki</p>
                    <p>Hyundai</p>
                    <p>Honda</p>
                    <p>Toyota</p>
                    <p>Tata</p>
                    <p>Mahindra</p>
                    <p>Chevrolet</p>
                    <p>Fiat</p>
                    <p>Renault</p>
                    <p>Kia</p>
                    <p>Skoda</p>
                    <p>Volkswagen</p>
                </div>
            </div>

            <div id={style.footer_bottom}>
                <div>
                    <p>F-212, DLF NEW TOWN HEIGHTS,</p>
                    <p>SECTOR 91, Garhi Harsaru, Gurugram, Haryana, 122505</p>
                    <div id={style.footer_icons}>
                        <img src={facebook} />
                        <img src={twitter} />
                        <img src={insta} />
                        <img src={wa} />
                        <img src={yt} />
                    </div>
                </div>
                <div id={style.contact}>
                    <div>
                        <img src={mail} /><p>Email</p>
                    </div>
                    <div>
                        <img src={phone} /><p>Phone Number</p>
                    </div><div>
                        <img src={calendar} /><p>Working Days</p>
                    </div><div>
                        <img src={watch} /><p>Working hours</p>
                    </div>
                </div>
                <div>
                    <p>Info@Carservice.in</p>
                    <p>9388893888</p>
                    <p>Monday - Sunday</p>
                    <p>7:00AM - 9:00PM(IST)</p>
                </div>
                <div id={style.storeicons}>
                    <img src={playstore} alt="googleplay" />
                    <img src={applestore} alt="applestore" />
                </div>
            </div>

        </div>
    )
}

export default Footer
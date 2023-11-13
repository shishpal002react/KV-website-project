import { useEffect, useState } from "react";

import stars from "../Images/Stars.png";
/*import userSay1 from "../Images/userSay1.jpg";
import userSay2 from "../Images/userSay2.jpg";
 import userSay3 from "../Images/userSay3.jpg";
import userSay4 from "../Images/userSay4.jpg";
import userSay5 from "../Images/userSay5.jpg";
import userSay6 from "../Images/userSay6.jpg"; */

import style from "../Styles/Reviews.module.css";
import axios from "axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    await axios
      .get("https://kv-varlu.vercel.app/api/v1/review")
      .then((res) => {
        console.log(res.data);
        setReviews(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div>
      {/* <div id={style.userSay}>
        <img src={userSay1} alt="" />
        <img src={userSay2} alt="" />
        {<img src={userSay3} alt="" />
        <img src={userSay4} alt="" />
        <img src={userSay5} alt="" />
        <img src={userSay6} alt="" />}
      </div> */}

      <div id={style.fetchedReviews}>
        {reviews?.map((ele, i) => {
          return (
            <div key={i}>
              <div className={style.top}>
                <div>
                  <img src={ele.image} alt="img" />
                </div>
                <div>
                  <p>{ele.name}</p>
                  <div className={style.rating}>
                    <div id="stars">
                      <img src={stars} alt="rating" />
                    </div>
                    <p>3 WEEKS AGO</p>
                  </div>
                </div>
              </div>
              <div className={style.bottom}>{ele.review}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reviews;

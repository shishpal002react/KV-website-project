import Reviews from "../Components/Reviews";
import Footer from "../Components/Footer";
import Navbar from "../Routes/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

const ReviewsPage = () => {
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
      <Navbar />
      <Reviews />
      <div
        id="fetchedReviews"
        style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
      >
        {reviews?.map((ele, i) => {
          return (
            <div
              key={i}
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
                width: "80%",
                margin: "10px",
              }}
            >
              <p>{ele.userId}</p>
              <p>{ele.review}</p>
              <p>{ele.rating}</p>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default ReviewsPage;

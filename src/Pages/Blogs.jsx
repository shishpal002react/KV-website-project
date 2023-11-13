import { useState, useEffect } from "react";
import Navbar from "../Routes/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import style from "../Styles/Blogs.module.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    await axios
      .get("https://kv-varlu.vercel.app/api/v1/blog")
      .then((res) => {
        console.log(res.data);
        setBlogs(res.data.blogs);
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching the blogs");
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={style.parentDiv}>
        <p id={style.heading}>Today & Article</p>
        <div id={style.body}>
          <div id={style.allBlogs}>
            {blogs?.map((ele, i) => {
              return (
                <div key={i}>
                  <div className={style.imageDiv}>
                    <img src={ele.image} alt="" />
                  </div>
                  <div className={style.descDiv}>
                    <h5>{ele.name}</h5>
                    <p>{ele.description}</p>
                    <button>Read More</button>
                  </div>
                </div>
              );
            })}
          </div>
          <div id={style.sidePanel}>
            <p id={style.heading}>Today & Article</p>
            <div id={style.allArticles}>
              {blogs.map((ele, i) => {
                return (
                  <div key={i} id={style.article}>
                    <div>
                      <img src="" alt="img" />
                    </div>
                    <div>
                      <h5>{ele.name}</h5>
                      <p>{ele.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;

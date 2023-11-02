import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import InnerHeader from "./InnerHeader";
import Footer from "./Footer";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";

const NewListingPage = (props) => {
  const [villa, setVilla] = useState([]);
  const [wishdata, setwishdata] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const { location } = useParams();
  useEffect(() => {
    fetch(`http://localhost:8081/listingNew`)
      .then((response) => response.json())
      .then((data) => {
        setVilla(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [location]);

  async function getwishdata() {
    const data = {
      user_id: localStorage.getItem("userId"),
    };
    axios
      .post("http://localhost:8081/wish_data", data)
      .then((res) => {
        setwishdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getwishdata();
  }, []);

  const onhandleClick = async (id) => {
    console.log(id);
    const data = {
      property_id: id,
      user_id: localStorage.getItem("userId"),
    };

    if (localStorage.getItem("userId") === null) {
      navigate("/loginpage");
    } else {
      if (wishdata.some((item) => item.property_id === id)) {
        await axios.post("http://localhost:8081/wish_delete", data);
      } else {
        await axios.post("http://localhost:8081/wishlist", data);
      }
    }

    getwishdata();
  };


  console.log(villa, "dataaa");
  return (
    <div>
      <div>
        <InnerHeader />
      </div>

      <div style={{ marginTop: "80px" }}>
        {loading ? (
          <div>
            <LinearProgress />
          </div>
        ) : (
          villa
            .filter((item) => {
              return item.city === location;
            })
            .map((item, index) => (
              <div key={index}>
                <div style={{ position: "relative" }}>
                  <i
                    className={
                      wishdata.some(
                        (ele) => ele.property_id === item.property_id
                      )
                        ? "bi bi-heart-fill heartbtn heartred"
                        : "bi bi-heart-fill heartbtn"
                    }
                    onClick={() => onhandleClick(item.property_id)}
                  ></i>
                </div>
                <Link
                  to={`/hotelmenu/${item.property_id}/${item.property_price}`}
                  key={item.id}
                >
                  <div className="item card my-3 overflow-hidden" key={item.id}>
                    <div className="img-fit">
                      <img
                        src={
                          "https://staybindass.com/upload/property_thumbnail/" +
                          item?.uploadimage
                        }
                        alt=""
                      />
                      <p className="night-label ">{item.night} </p>
                    </div>

                    <div className="info-part">
                      <h4>{item?.title} </h4>
                      <p className="dest-text">
                        {item?.city} , {item?.name} , India
                      </p>
                      <p className="dest-text">
                        {item?.minguest} Guest | {item?.r_type} Bedrooms |{" "}
                        {item?.pool}
                      </p>
                      <p className="dest-text">
                        <b>
                          {item.property_price === 0 ? (
                            <span className="fs-5">On Request</span>
                          ) : (
                            <span className="fs-5">
                              ₹{item.property_price} /night
                            </span>
                          )}
                        </b>
                      </p>
                      <p className="extra-text">(exc. taxes & charges)</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
        )}
        {!loading && villa.filter((item) => item.city === location).length === 0 && <h2 style={{textAlign:"center"}}>No villas available at {location}</h2>}
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};
export default NewListingPage;

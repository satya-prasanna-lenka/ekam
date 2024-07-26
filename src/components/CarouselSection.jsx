import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";

const CarouselSection = ({ chunks }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Reset active index when chunks change
    setActiveIndex(0);
  }, [chunks]);

  const goToPrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? chunks.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === chunks.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="carousel_sec ">
      <div
        id="carouselExampleAutoplaying1"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div
          className="carousel-inner"
          style={{ paddingRight: "15px", paddingLeft: "15px" }}
        >
          {chunks?.map((chunk, index) => {
            return (
              <div
                className={`carousel-item${
                  index === activeIndex ? "active" : ""
                }`}
                key={index}
              >
                <div className="cards-wrapper">
                  {chunk?.map((item, i) => {
                    return (
                      <div className="card text-center" key={i}>
                        <img
                          src={item.image} // Replace with your image field
                          className="card-img-top mt-2"
                          alt={`Person${i + 1}`}
                          loading="lazy"
                        />
                        <div className="card-body">
                          <h5 className="card-title">{item.title}</h5>
                          <p className="card-text">{item.description}</p>
                          <span className="card-text">
                            Date:{" "}
                            {moment.unix(item.date).format("MMMM DD, YYYY")}
                          </span>
                          <span className="card-text">
                            Location: {item.location}
                          </span>
                          <span className="card-text">
                            Price: ${item.price}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        {chunks?.length > 1 && (
          <div className="myBtnSec">
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleAutoplaying1"
              data-bs-slide="prev"
              onClick={goToPrev}
            >
              {/* <span
              className="carousel-control-prev-icon myBtn"
              aria-hidden="true"
            ></span> */}
              <span>Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleAutoplaying1"
              data-bs-slide="next"
              onClick={goToNext}
            >
              <span>Next</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarouselSection;

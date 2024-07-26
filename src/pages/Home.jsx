import { useEffect, useState } from "react";
import "../assets/css/home.css";
import banner from "../assets/images/banner.jpg";
import CarouselSection from "../components/CarouselSection";
import { endPoints } from "../config/appConfig";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Home = ({ setProgress }) => {
  const params = useParams();
  const [errorShown, setErrorShown] = useState(true);
  const [FilterIs, setFilterIs] = useState({
    byDate: params.date ? params.date : "",
    byType: params.filter ? params.filter : "",
  });
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState("");
  const navigate = useNavigate();

  const fetchSearchData = () => {
    setProgress(70);

    const controller = new AbortController();
    const url = endPoints().allDataUrl + `?search=${inputData}`;
    axios
      .get(url, { signal: controller.signal })
      .then((res) => {
        setProgress(100);
        if (FilterIs.byDate) {
          const [startYear, endYear] = FilterIs.byDate
            .split("-")
            .map((year) => parseInt(year, 10));

          const startDate = new Date(`${startYear}-01-01`).getTime() / 1000; // January 1, 2023
          const endDate = new Date(`${endYear - 1}-12-31`).getTime() / 1000; // December 31, 2024

          const filteredData = res.data.filter((item) => {
            return item.date >= startDate && item.date <= endDate;
          });
          setData(chunkArray(filteredData, 3));
        } else {
          setData(chunkArray(res.data, 3));
        }
      })
      .catch((error) => {
        if (errorShown) {
          if (error.response) {
            toast.warn(error.response.data);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          setErrorShown(false);
        }
        setProgress(100);
      });
  };

  useEffect(() => {
    if (!errorShown) {
      const timer = setTimeout(() => {
        setErrorShown(true);
      }, 5000); // Reset after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [errorShown]);

  const fetchData = (url, byDate) => {
    setProgress(70);
    axios
      .get(url)
      .then((response) => {
        setProgress(100);

        if (byDate) {
          const [startYear, endYear] = FilterIs.byDate
            .split("-")
            .map((year) => parseInt(year, 10));

          const startDate = new Date(`${startYear}-01-01`).getTime() / 1000; // January 1, 2023
          const endDate = new Date(`${endYear - 1}-12-31`).getTime() / 1000; // December 31, 2024

          const filteredData = response.data.filter((item) => {
            return item.date >= startDate && item.date <= endDate;
          });
          setData(chunkArray(filteredData, 3));
        } else {
          setData(chunkArray(response.data, 3));
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        setProgress(100);
      });
  };

  useEffect(() => {
    if (inputData.length > 0) {
      fetchSearchData();
    }
  }, [inputData]);

  useEffect(() => {
    let url;
    if (FilterIs.byType && FilterIs.byDate) {
      navigate(`/${FilterIs.byType}/${FilterIs.byDate}`);
      url =
        endPoints().allDataUrl +
        `?filter=${FilterIs.byType == "default" ? "" : FilterIs.byType}`;
      fetchData(url, "byDate");
    } else if (FilterIs.byDate) {
      navigate(`/default/${FilterIs.byDate}`);
      url = endPoints().allDataUrl;
      fetchData(url, "byDate");
    } else if (FilterIs.byType) {
      navigate(`/${FilterIs.byType}`);
      url =
        endPoints().allDataUrl +
        `?filter=${FilterIs.byType == "default" ? "" : FilterIs.byType}`;
      fetchData(url);
    } else {
      navigate("/");
      url = endPoints().allDataUrl;
      fetchData(url);
    }
  }, [FilterIs]);

  // Utility function to chunk data into groups of three
  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  // const chunks = chunkArray(data, 3);
  return (
    <>
      <div className="banner_section">
        <div className="banner_image">
          <img src={banner} alt="Banner Image" />
        </div>
        <h4>Discover Your Inner Peace</h4>
        <p>
          Join us for a series of wellness retreats designed to help you find
          tranquility and rejuvenation.
        </p>
      </div>
      <div className="filterButtons">
        <div className="left_buttons">
          <select
            className="filter_by_date"
            aria-label="Default select example"
            defaultValue={FilterIs.byDate}
            onChange={(e) =>
              setFilterIs({ ...FilterIs, byDate: e.target.value })
            }
          >
            <option value="">Filter by Date</option>
            <option value="2023-2024">2023-2024</option>
            <option value="2024-2025">2024-2025</option>
          </select>
          <select
            defaultValue={FilterIs.byType}
            className="filter_by_type"
            aria-label="Default select example"
            onChange={(e) =>
              setFilterIs({ ...FilterIs, byType: e.target.value })
            }
          >
            <option value="">Filter by Type</option>
            <option value="Yoga">Yoga</option>
            <option value="Meditation">Meditation</option>
            <option value="Detox">Detox</option>
          </select>
        </div>
        <div className="right_searcgbar">
          <input
            placeholder="Search retreats by title"
            type="text"
            className="search_bar"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          ></input>
        </div>
      </div>
      <CarouselSection chunks={data} />
    </>
  );
};

export default Home;

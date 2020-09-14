import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import Axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";

function App() {
  const [isDay, setDay] = useState(-1);
  const [loc, setLoc] = useState("");
  const [data, setData] = useState({ zone: "", network: true });
  const [isLoading, setLoading] = useState(false);
  const API_KEY = "78d2c8394b2e4a3b8a9f9ed2dfe89e54";

  const searchHandler = (e) => {
    setLoading(true);
    Axios.get(
      `https://api.ipgeolocation.io/timezone?apiKey=${API_KEY}&location=${loc}`
    )
      .then(({ data }) => {
        setLoading(false);
        console.log(data);

        let zoneCity = data.timezone.substring(data.timezone.indexOf("/") + 1);
        if (zoneCity.indexOf("_") !== -1) {
          zoneCity =
            zoneCity.substring(0, zoneCity.indexOf("_")) +
            " " +
            zoneCity.substring(zoneCity.indexOf("_") + 1);
        }
        const zoneRegion = data.timezone.substring(
          0,
          data.timezone.indexOf("/")
        );
        const zone = `${zoneCity}, ${zoneRegion}`;
        const time = data.time_12.substring(0, data.time_12.lastIndexOf(":"));
        const time_12 = data.time_12
          .substring(data.time_12.lastIndexOf(" "))
          .toLowerCase();
        const date = data.date_time_txt.substring(
          0,
          data.date_time_txt.lastIndexOf(" ")
        );

        setData({ zone, time, time_12, date, network: true });

        const hour = parseInt(
          data.time_24.substring(0, data.time_24.indexOf(":"))
        );

        hour >= 6 && hour <= 18 ? setDay(1) : setDay(0);
      })
      .catch((err) => {
        setLoading(false);
        if (err.message === "Network Error")
          setData({ zone: "", network: false });
      });
  };
  return (
    <div className="App h-screen flex flex-col">
      {/* Header */}
      <Header />
      {/* Content */}
      <div className="flex flex-1 flex-col justify-center items-center bg-gray-400">
        <div className="relative text-gray-800">
          <input
            type="text"
            className="p-2 bg-transparent border-b border-gray-600 outline-none focus:border-gray-700 transition-all duration-300"
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
            onKeyUp={(e) => {
              if (e.keyCode === 13) searchHandler(e);
            }}
          />
          <button
            className="pt-3 pr-2 absolute right-0 top-0 focus:outline-none hover:text-gray-700"
            onClick={searchHandler}
          >
            <BsSearch />
          </button>
        </div>

        <Card isDay={isDay} data={data} isLoading={isLoading} />
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
}

export default App;

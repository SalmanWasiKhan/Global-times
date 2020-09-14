import React from "react";
import day from "../img/s-bg-day.jpg";
import night from "../img/s-bg-night.jpg";
import { PuffLoader } from "react-spinners";

function Card({ isDay, data, isLoading }) {
  return (
    <div
      className={`${
        isLoading
          ? "py-10 px-20"
          : data.zone !== ""
          ? "pb-8 pt-10 pl-8 pr-16"
          : " p-8"
      } mt-8 text-left ${
        data.network !== true
          ? "text-gray-800"
          : isDay
          ? "text-gray-800"
          : "text-blue-100"
      } shadow-lg rounded-md border-gray-400 border bg-gray-300 bg-right-top bg-cover bg-no-repeat select-none`}
      style={{
        backgroundImage: `url(${
          isLoading
            ? null
            : data.network !== true
            ? null
            : isDay === 1
            ? day
            : isDay === 0
            ? night
            : null
        })`,
      }}
    >
      {isLoading === true ? (
        <PuffLoader size={80} />
      ) : data.network !== true ? (
        <>
          <h1 className="text-xl text-center">
            <span className="text-2xl font-semibold">OOPS!</span> Network Lost.
          </h1>
          <h2 className="mt-4 text-xs text-center text-gray-600 italic">
            *Please check your network and try again.
          </h2>
        </>
      ) : data.zone !== "" ? (
        <>
          <h4 className="pl-1 text-lg">{data.zone}</h4>
          <h1 className="mt-2 text-5xl font-semibold ">
            {data.time} <span className="text-4xl">{data.time_12}</span>
          </h1>
          <h2 className="-mt-2 pl-1 text-sm">{data.date}</h2>
        </>
      ) : (
        <>
          <h1 className="text-xl text-center">
            Search for a city name to
            <br /> get its current time!
          </h1>
          <h2 className="mt-6 text-xs text-center text-gray-600 italic">
            *Search empty field to get current location time.
          </h2>
        </>
      )}
    </div>
  );
}

export default Card;

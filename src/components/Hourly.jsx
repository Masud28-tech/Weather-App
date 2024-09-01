import React, { useState, useEffect, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import AppContext from "../provider/appContext";
import Temperature from "./Temperature";
import Card from "./Card";
import Loader from "./Loader";
import { getForecast } from "../services/weatherService";

function Hourly() {
  const { app } = useContext(AppContext);
  const { geoCoords } = app;
  const [forecast, setForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchForecast() {
      if (!geoCoords) return;

      setIsLoading(true);
      try {
        const data = await getForecast(geoCoords.lon, geoCoords.lat);
        setForecast(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching forecast:", err);
        setError("Failed to fetch forecast data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchForecast();
  }, [geoCoords]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!forecast) {
    return <div>No forecast data available.</div>;
  }

  const { list } = forecast;

  return (
    <div>
      <Swiper
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          700: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {list.map((hWeather, index) => {
          const date = new Date(hWeather.dt * 1000);
          const formatter = new Intl.DateTimeFormat([], {
            hour12: true,
            hour: "numeric",
            minute: "2-digit",
            timeZone: "Asia/Calcutta",
          });
          const dayFormatter = new Intl.DateTimeFormat([], {
            weekday: "long",
            timeZone: "Asia/Calcutta",
          });
          return (
            <SwiperSlide key={`${index}-${hWeather.dt}`}>
              <Card className="forecast-card">
                <div className="forecast-day">
                  {dayFormatter.format(date)},{" "}
                  <span>{formatter.format(date)}</span>
                </div>
                <img
                  src={`/weather_icons/${hWeather.weather[0].icon}.png`}
                  alt={hWeather.weather[0].description}
                  width={100}
                />
                <div className="forecast-description">
                  {hWeather.weather[0].description}
                </div>
                <div className="minmax-temp">
                  <Temperature temperature={hWeather.main.temp} />°
                </div>
              </Card>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Hourly;

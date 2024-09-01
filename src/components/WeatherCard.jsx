import React, { useState, useEffect, useContext } from "react";
import AppContext from "../provider/appContext";
import { Card } from "semantic-ui-react";

const WeatherCardData = ({ weatherData, type }) => {
  let message = "";

  if (type === "normal") {
    // For Normal People
    if (weatherData.main.temp > 25) {
      message +=
        "It will be a hot day today, so stay hydrated and wear light clothes. ";
    } else if (weatherData.main.temp < 15) {
      message +=
        "It will be a cold day today, so wear warm clothes and stay indoors. ";
    } else {
      message +=
        "It will be a moderate day today, perfect for outdoor activities. ";
    }

    if (weatherData.rain) {
      message += "It is likely to rain today, so carry an umbrella. ";
    }
  } else if (type === "farmer") {
    // For Farmers
    if (weatherData.main.temp > 25 && weatherData.rain) {
      message +=
        "The hot and rainy weather today is suitable for crop growth. ";
    } else if (weatherData.main.temp < 15 && !weatherData.rain) {
      message += "The cold and dry weather today may affect crop growth. ";
    } else {
      message +=
        "The clear weather today is perfect for traveling, enjoy your trip! ";
    }
  } else if (type === "traveler") {
    // For Travelers
    if (weatherData.weather[0].main === "Clouds") {
      message +=
        "The cloudy weather today may affect your travel plans, so check the latest updates before heading out. ";
    } else if (weatherData.weather[0].main === "Rain") {
      message +=
        "The rainy weather today may cause delays, so plan your travel accordingly. ";
    } else {
      message +=
        "The moderate weather today is suitable for crop maintenance. ";
    }
  }

  return (
    <Card style={{ width: "300px", margin: "20px" }}>
      <Card.Content>
        <Card.Header className="header">
          {type.charAt(0).toUpperCase() + type.slice(1)} Weather Forecast
        </Card.Header>
        <p style={{ fontSize: "1.5em" }}>{message}</p>
      </Card.Content>
    </Card>
  );
};

const WeatherCard = () => {
  const {
    app: { weather },
  } = useContext(AppContext);

  const [currentIndex, setCurrentIndex] = useState(0);
  const types = ["normal", "traveler", "farmer"];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % types.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [types.length]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "40px",
        backgroundColor: "black",
        borderRadius: "20px",
      }}
    >
      <WeatherCardData weatherData={weather} type={types[currentIndex]} />
    </div>
  );
};

export default WeatherCard;

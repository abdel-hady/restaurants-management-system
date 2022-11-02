import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/login";
import ForgetPassword from "./Pages/forgetPassword";
import ResetPassword from "./Pages/resetPassword";
import Home from "./Pages/Admin/home";
import HomePage from "./Pages";
import PrivateRoutes from "./PrivateRoutes";
import { languages } from "./language";
import { getLocation } from "graphql";

function App() {
  const currentLanguagesCode = localStorage.getItem("i18nextLng") || "en";
  const currenLanguage = languages.find((l) => l.code === currentLanguagesCode);
  // const { t } = useTranslation();
  useEffect(() => {
    // console.log(currenLanguage.dir);
    if (currenLanguage.dir) document.body.dir = currenLanguage.dir || "ltr";
  }, [currenLanguage]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [usetAddress, setUsetAddress] = useState(null);
  const [api, setApi] = useState("AIzaSyBaUm4oRXqujhh-espBxdlpRHWiJRcAY2w");
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        getCoordinates,
        handleLocationError
      );
    } else {
      console.log("support");
    }
  }
  function getCoordinates(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }
  function handleLocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
      default:
        console.log("An unknown error occurred.");
    }
  }
  return (
    <Router>
      {/* {t("welcome_message")}
      {t("days_since_release", { number_of_days: 10 })}
      <ul>
        {languages.map(({ code, name, country_code }) => (
          <li key={country_code}>
            <button onClick={()=>i18next.changeLanguage(code)}>{name}</button>
          </li>
        ))}
      </ul> */}
      {/* <button onClick={getLocation}>getCoordinates</button>
        {latitude && longitude? 
        // <img src={`https://maps.googleapis.com/maps/api/js?center=${latitude},${longitude}&zoom=14&size=400×300&key=${api}&callback=initMap`} alt=''/>:
        <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400&sensor=false&markers=color:red%7C${latitude},${longitude}&key=${api}`} alt=''/>:
        null} */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reset-password/:id" element={<ResetPassword />} />
        <Route path="/" element={<HomePage />} />
        <Route element={<PrivateRoutes />}></Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

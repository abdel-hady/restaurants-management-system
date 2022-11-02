import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { languages } from "../language";
const HomePage = () => {
  const { t } = useTranslation();
  const [theme, settheme] = useState(localStorage.getItem("mode") || false);
  const handleDark = () => {
    // document.body.classList.toggle("dark-theme")
    if (theme) {
      console.log(theme);
      localStorage.setItem("mode", "");
      settheme(false);
    } else {
      settheme(true);
      console.log(theme);
      localStorage.setItem("mode", "dark-theme");
    }
  };
  return (
    <div>
      Home Page
      {t("welcome_message")}
      {t("days_since_release", { number_of_days: 10 })}
      <ul>
        {
        languages.map(({ code, name, country_code }) => (
          <li key={country_code}>
            <button onClick={() => i18next.changeLanguage(code)}>{name}</button>
          </li>
        ))
        }
      </ul>
      <button onClick={handleDark}>dark</button>
    </div>
  );
};

export default HomePage;

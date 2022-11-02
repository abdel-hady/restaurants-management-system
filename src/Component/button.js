import React from "react";
import "./style.css";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
// import { languages } from '../Pages/language';
const LoadingButton = () => {
  const { t } = useTranslation();
  return <button className="loading">{t("wait")}</button>;
};

export default LoadingButton;

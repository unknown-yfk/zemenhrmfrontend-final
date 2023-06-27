import PageTitle from "../page-header/PageHeader";

import { Navigate } from "react-router-dom";
import GetAllTransaction from "./getAllTransaction";
import {  useTranslation } from "react-i18next";

const Transaction = (props) => {
	const {t} = useTranslation();

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }

  return (
    <div>
      <PageTitle title={t('back')} />
      <br />
      <GetAllTransaction />
    </div>
  );
};

export default Transaction;

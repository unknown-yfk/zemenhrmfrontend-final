import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";
import AddRole from "./AddRole";
import {  useTranslation } from "react-i18next";

const RoleList = (props) => {
	const {t} = useTranslation();

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }
  return (
    <div>
      <PageTitle title={t('back')} />
      <AddRole />
    </div>
  );
};

export default RoleList;

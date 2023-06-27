import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";

import AddLeave from "./AddLeave";
import {  useTranslation } from "react-i18next";


const Leave = (props) => {
	const {t} = useTranslation();

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}
	return (
		<div>
			<PageTitle title={t('back')} />
			<AddLeave />
		</div>
	);
};

export default Leave;

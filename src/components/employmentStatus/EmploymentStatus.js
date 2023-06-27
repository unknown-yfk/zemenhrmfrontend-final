import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";

import AddEmploymentStatus from "./AddEmploymentStatus";
import {  useTranslation } from "react-i18next";


const EmploymentStatus = (props) => {
	const {t} = useTranslation();

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}
	return (
		<div>
			<PageTitle title={t('back')} />
			<AddEmploymentStatus />
		</div>
	);
};

export default EmploymentStatus;

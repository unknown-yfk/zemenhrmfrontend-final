import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";
import AddDepartment from "./AddDepartment";
import {  useTranslation } from "react-i18next";

const Department = (props) => {

	const {t} = useTranslation();

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}
	return (
		<div>
			<PageTitle title={t('back')} />
			<AddDepartment />
		</div>
	);
};

export default Department;

import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";
import AddDesignation from "./addDesignation";
import GetAllDesignation from "./getAllDesignation";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import {  useTranslation } from "react-i18next";

const Designation = (props) => {

	const {t} = useTranslation();

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}

	return (
		<div>
			<PageTitle title={t('back')} />
			<UserPrivateComponent permission={"create-designation"}>
				<AddDesignation />
			</UserPrivateComponent>

			<UserPrivateComponent permission={"read-designation"}>
				<GetAllDesignation />
			</UserPrivateComponent>
		</div>
	);
};

export default Designation;

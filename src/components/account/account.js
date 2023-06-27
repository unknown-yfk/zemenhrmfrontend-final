import PageTitle from "../page-header/PageHeader";

import { Navigate } from "react-router-dom";

import AddAccount from "./AddAccount";
import GetAllAccount from "./getAllAccount";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import {  useTranslation } from "react-i18next";

const Account = (props) => {
	const {t} = useTranslation();

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}

	return (
		<div>
			<PageTitle title={t('back')} />
			<UserPrivateComponent permission='create-account'>
				<AddAccount />
			</UserPrivateComponent>

			<UserPrivateComponent permission='read-account'>
				<GetAllAccount />
			</UserPrivateComponent>
		</div>
	);
};

export default Account;

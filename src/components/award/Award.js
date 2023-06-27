import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";

import AddAward from "./AddAward";
import {  useTranslation } from "react-i18next";


const Award = (props) => {
	const {t} = useTranslation();

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}
	return (
		<div>
			<PageTitle title={t('back')} />

			<AddAward />
		</div>
	);
};

export default Award;

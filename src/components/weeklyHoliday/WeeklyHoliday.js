import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";

import AddWeeklyHoliday from "./AddWeeklyHoliday";
import {  useTranslation } from "react-i18next";

const WeeklyHoliday = (props) => {
	const {t} = useTranslation();

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}
	return (
		<div>
			<PageTitle title={t('back')} />
			<AddWeeklyHoliday />
		</div>
	);
};

export default WeeklyHoliday;

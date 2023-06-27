import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";
import AddAnnouncement from "./AddAnnouncement";
import GetAllAnnouncement from "./GetAllAnnouncement";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import {  useTranslation } from "react-i18next";

const Announcement = (props) => {
	const {t} = useTranslation();

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}
	return (
		<div>
			<PageTitle title={t('back')} />
			<UserPrivateComponent permission='create-announcement'>
				<AddAnnouncement />
			</UserPrivateComponent>
			<UserPrivateComponent permission='read-announcement'>
				<GetAllAnnouncement />
			</UserPrivateComponent>
		</div>
	);
};

export default Announcement;

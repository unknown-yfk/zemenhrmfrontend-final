import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";
import AddUser from "./addUser";
import {  useTranslation } from "react-i18next";


const UserList = (props) => {

	const {t} = useTranslation();

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}
	return (
		<div>
			<PageTitle title={t('back')} />

			<h1 className='m-2 text-center text-2xl font-semibold mt-5 txt-color'>
				{/* Add New Employee */}
				{t('add_new_employee')}
			</h1>
			<AddUser />
		</div>
	);
};

export default UserList;

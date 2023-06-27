import { Button, Card, Popover, Table } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";
import BtnDeleteSvg from "../UI/Button/btnDeleteSvg";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";
import { CSVLink } from "react-csv";
import ViewBtn from "../Buttons/ViewBtn";
import moment from "moment";
import DepartmentEditPopup from "../UI/PopUp/DepartmentEditPopup";
import ShifDelete from "./EmploymentStatusDelete";
import ShiftEditPopup from "../UI/PopUp/ShiftEditPopup";
import { loadSingelEmploymentStatus } from "../../redux/rtk/features/employemntStatus/employmentStatusSlice";
import EmploymentStatusEditPopup from "../UI/PopUp/EmploymentStatusEditPopup";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import EmploymentStatusDelete from "./EmploymentStatusDelete";
import {  useTranslation } from "react-i18next";


//PopUp

const CustomTable = ({ list }) => {

	const {t} = useTranslation();

	const [columnsToShow, setColumnsToShow] = useState([]);

	const columns = [
		{
			id: 1,
			title: t('id'),
			dataIndex: "id",
			key: "id",
		},

		{
			id: 2,
			title: t('name'),
			key: "firstName",
			render: ({ firstName, lastName }) => firstName + " " + lastName,
		},

		{
			id: 6,
			title: t('user_name'),
			dataIndex: "userName",
			key: "userName",
		},
		{
			id: 7,
			title: t('start_time'),
			dataIndex: "startTime",
			key: "startTime",
			render: (startTime) => moment(startTime).format("hh:mm A"),
		},
		{
			id: 8,
			title: t('end_time'),
			dataIndex: "endTime",
			key: "endTime",
			render: (endTime) => moment(endTime).format("hh:mm A"),
		},
		{
			id: 4,
			title: t('action'),
			dataIndex: "id",
			key: "action",
			render: (id) => <ViewBtn path={`/admin/hr/staffs/${id}/`} />,
		},
	];

	useEffect(() => {
		setColumnsToShow(columns);
	}, []);

	const columnsToShowHandler = (val) => {
		setColumnsToShow(val);
	};

	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	return (
		<div>
			<div className='text-center my-2 flex justify-between'>
				<h5 className='department-list-title text-color-2 text-xl mb-2'>
					{t('employee_list')}
				</h5>

				{list && (
					<div>
						<CsvLinkBtn>
							<CSVLink data={list} filename='user_department'>
							{t('download_csv')}
							</CSVLink>
						</CsvLinkBtn>
					</div>
				)}
			</div>
			{list && (
				<div style={{ marginBottom: "30px" }}>
					<ColVisibilityDropdown
						options={columns}
						columns={columns}
						columnsToShowHandler={columnsToShowHandler}
					/>
				</div>
			)}
			<Table
				loading={!list}
				columns={columnsToShow}
				dataSource={addKeys(list)}
				pagination={{ pageSize: 5 }}
				scroll={{ x: 720 }}
			/>
		</div>
	);
};

const DetailEmploymentStatus = () => {
	const {t} = useTranslation();

	const { id } = useParams();

	//dispatch
	const dispatch = useDispatch();
	const employmentStatus = useSelector(
		(state) => state.employmentStatus.employmentStatus
	);
	//Delete Supplier

	useEffect(() => {
		dispatch(loadSingelEmploymentStatus(id));
	}, []);

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}

	return (
		<div>
			<PageTitle title={t('back')} />
			<UserPrivateComponent permission={"read-employmentStatus"}>
				<Card className='mr-top mt-5'>
					{employmentStatus ? (
						<Fragment key={employmentStatus.id}>
							<div>
								<div className='flex justify-between '>
									<h3 className={"text-xl"}>
										{t('id')} : {employmentStatus.id} | {employmentStatus.name}
									</h3>
									<div className='flex justify-end'>
										<UserPrivateComponent
											permission={"update-employmentStatus"}>
											<EmploymentStatusEditPopup data={employmentStatus} />
										</UserPrivateComponent>

										<UserPrivateComponent
											permission={"delete-employmentStatus"}>
											<EmploymentStatusDelete id={id} />
										</UserPrivateComponent>
									</div>
								</div>
								<CustomTable list={employmentStatus.user} />
							</div>
						</Fragment>
					) : (
						<Loader />
					)}
				</Card>
			</UserPrivateComponent>
		</div>
	);
};

export default DetailEmploymentStatus;

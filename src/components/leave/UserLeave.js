import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { Table, Tag } from "antd";
import { useEffect } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";

import moment from "moment";
import BtnViewSvg from "../UI/Button/btnViewSvg";
import ViewBtn from "../Buttons/ViewBtn";
import { loadSingleLeaveHistory } from "../../redux/rtk/features/leave/leaveSlice";
import { useParams } from "react-router-dom";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import {  useTranslation } from "react-i18next";

function CustomTable({ list, loading }) {

	const {t} = useTranslation();

	const [columnsToShow, setColumnsToShow] = useState([]);

	console.log(list);

	const columns = [
		{
			id: 1,
			title: t('id'),
			dataIndex: "id",
			key: "id",
		},

		{
			id: 3,
			title: t('leave_type'),
			dataIndex: "leaveType",
			key: "leaveType",
		},
		{
			id: 4,
			title: t('leave_from'),
			dataIndex: "leaveFrom",
			key: "leaveFrom",
			render: (leaveFrom) => moment(leaveFrom).format("DD-MM-YYYY"),
		},
		{
			id: 5,
			title: t('leave_to'),
			dataIndex: "leaveTo",
			key: "leaveTo",
			render: (leaveTo) => moment(leaveTo).format("DD-MM-YYYY"),
		},
		{
			id: 6,
			title: t('leave_duration'),
			dataIndex: "leaveDuration",
			key: "leaveDuration",
			render: (leaveDuration) => {
				if (leaveDuration > 1) {
					return <span>{leaveDuration} days</span>;
				} else {
					return <span>{leaveDuration} day</span>;
				}
			},
		},

		{
			id: 7,
			title: t('status'),
			dataIndex: "status",
			key: "status",
			render: (status) => {
				if (status === "ACCEPTED") {
					return <Tag color='green'>{status.toUpperCase()}</Tag>;
				} else if (status === "REJECTED") {
					return <Tag color='red'>{status.toUpperCase()}</Tag>;
				} else {
					return <Tag color='orange'>{status.toUpperCase()}</Tag>;
				}
			},
		},

		{
			id: 7,
			title:  t('applied_on'),
			dataIndex: "createdAt",
			render: (createdAt) => moment(createdAt).format("DD-MM-YYYY"),
		},

		{
			id: 7,
			title: t('action'),
			key: "action",
			render: ({ id }) => (
				<ViewBtn
					path={`/admin/leave/${id}`}
					text='View'
					icon={<BtnViewSvg />}
				/>
			),
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
		<div className='ant-card p-4 rounded mt-5'>
			<div className='flex my-2 justify-between'>
				<div className='w-50'>
					<h4 className='text-2xl mb-2'> {t('my_leave_app')}</h4>
				</div>
				{list && (
					<div className='flex justify-end mr-4'>
						<div className='mt-0.5'>
							<CsvLinkBtn>
								<CSVLink
									data={list}
									className='btn btn-dark btn-sm'
									style={{ marginTop: "5px" }}
									filename='leave_applications'>
									Download CSV
								</CSVLink>
							</CsvLinkBtn>
						</div>
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
				className='text-center'
				scroll={{ x: true }}
				loading={loading}
				columns={columnsToShow}
				dataSource={list ? addKeys(list) : []}
			/>
		</div>
	);
}

const UserLeave = (props) => {
	const { id } = useParams("id");
	const dispatch = useDispatch();
	const list = useSelector((state) => state.leave.leaveHistory);
	const loading = useSelector((state) => state.leave.loading);

	useEffect(() => {
		dispatch(loadSingleLeaveHistory(id));
	}, []);

	return (
		<UserPrivateComponent permission={"read-leaveApplication"}>
			<div className='card'>
				<div className='card-body'>
					<CustomTable list={list?.singleLeave} loading={loading} />
				</div>
			</div>
		</UserPrivateComponent>
	);
};

export default UserLeave;

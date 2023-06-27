import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { Segmented, Table, Tag } from "antd";
import { useEffect } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";
import { GreenLinkBtn } from "../UI/AllLinkBtn";
import BtnAllSvg from "../UI/Button/btnAllSvg";
import {
	countLeaveApplication,
	loadAllLeaveApplication,
	loadLeaveApplicationByStatus,
} from "../../redux/rtk/features/leave/leaveSlice";
import moment from "moment";
import BtnViewSvg from "../UI/Button/btnViewSvg";
import ViewBtn from "../Buttons/ViewBtn";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import {  useTranslation } from "react-i18next";

function CustomTable({ list, total }) {
	const {t} = useTranslation();

	const dispatch = useDispatch();
	const [status, setStatus] = useState("true");
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
			key: "name",
			dataIndex: "user",
			render: ({ firstName, lastName }) => firstName + " " + lastName,
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
			title:  t('status'),
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
	//make a onChange function
	const onChange = (value) => {
		setStatus(value);
		dispatch(
			loadLeaveApplicationByStatus({ page: 1, limit: 20, status: value })
		);
	};

	useEffect(() => {
		setColumnsToShow(columns);
	}, []);

	const columnsToShowHandler = (val) => {
		setColumnsToShow(val);
	};

	const onAllClick = () => {
		dispatch(loadAllLeaveApplication());
		setStatus("all");
	};

	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	return (
		<div className='ant-card p-4 rounded mt-5'>
			<div className='flex my-2 justify-between'>
				<div className='w-50'>
					<h4 className='text-2xl mb-2'> {t('app_leave')}</h4>
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
									{t('download_csv')}
								</CSVLink>
							</CsvLinkBtn>
						</div>

						<div className='ml-2 mt-0.5'>
							<GreenLinkBtn>
								<button onClick={onAllClick}>
									<BtnAllSvg size={15} title={t('all')} />
								</button>
							</GreenLinkBtn>
						</div>

						<div>
							<Segmented
								className='text-center rounded text-red-500'
								size='middle'
								defaultValue={"accepted"}
								options={[
									{
										label: (
											<span>
												<i className='bi bi-person-lines-fill'></i> {t('accepted')} 
											</span>
										),
										value: "accepted",
									},
									{
										label: (
											<span>
												<i className='bi bi-person-dash-fill'></i> {t('pending')} 
											</span>
										),
										value: "pending",
									},
								]}
								value={status}
								onChange={onChange}
							/>
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
				loading={!list}
				pagination={{
					defaultPageSize: 20,
					pageSizeOptions: [10, 20, 50, 100, 200],
					showSizeChanger: true,
					total: total ? total : 100,
					onChange: (page, limit) => {
						dispatch(loadLeaveApplicationByStatus({ page, limit, status }));
					},
				}}
				columns={columnsToShow}
				dataSource={list ? addKeys(list) : []}
			/>
		</div>
	);
}

const GetAllLeaves = (props) => {
	const dispatch = useDispatch();
	const list = useSelector((state) => state.leave.list);
	const total = useSelector((state) => state.leave.total);

	useEffect(() => {
		dispatch(loadAllLeaveApplication());
		dispatch(countLeaveApplication());
	}, []);

	// useEffect(() => {
	//   deleteHandler(list, deletedId);
	// }, [deletedId, list]);

	return (
		<UserPrivateComponent permission={"read-leaveApplication"}>
			<div className='card card-custom'>
				<div className='card-body'>
					<CustomTable list={list} total={total} />
				</div>
			</div>
		</UserPrivateComponent>
	);
};

export default GetAllLeaves;

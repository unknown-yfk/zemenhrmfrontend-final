import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Popover, Table } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
	clearDesignation,
	deleteDesignation,
	loadAllDesignationByEmployee,
	loadSingleDesignation,
} from "../../redux/rtk/features/designation/designationSlice";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";
// import UserListCard from "./List/UserListCard";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import ViewBtn from "../Buttons/ViewBtn";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";
import { CSVLink } from "react-csv";

import BtnEditSvg from "../UI/Button/btnEditSvg";
import BtnDeleteSvg from "../UI/Button/btnDeleteSvg";
import {  useTranslation } from "react-i18next";



//PopUp

const CustomTable = ({ list }) => {
	const {t} = useTranslation();

	const [columnsToShow, setColumnsToShow] = useState([]);

	const columns = [
		{
			id: 1,
			title: t('id'),
			dataIndex: "user",
			key: "user",
			render: (user) => user?.id,
			
		},

		{
			id: 2,
			title: t('name'),
			key: "user",
			dataIndex: "user",
			render: (user) => user?.firstName + " " + user?.lastName,
		},

		{
			id: 3,
			title: t('action'),
			dataIndex: "user",
			key: "user",
			render: (user) => <ViewBtn path={`/admin/hr/staffs/${user?.id}/`} />,
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
				<h5 className='award-list-title text-color-2 text-xl mb-2'>
					Employee List
				</h5>

				{list && (
					<div>
						<CsvLinkBtn>
							<CSVLink data={list} filename='user_designation'>
								Download CSV
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
				dataSource={list ? addKeys(list) : []}
				pagination={{ pageSize: 5 }}
				scroll={{ x: 720 }}
			/>
		</div>
	);
};





const DetailDesignation = () => {
	
	const { id } = useParams();
	let navigate = useNavigate();

	//dispatch
	const dispatch = useDispatch();
	const { designation, loading } = useSelector((state) => state.designations);

	//Delete Supplier
	const onDelete = () => {
		try {
			dispatch(deleteDesignation(id));

			setVisible(false);
			toast.warning(`Designation : ${designation.name} is removed `);
			return navigate("/admin/designation");
		} catch (error) {
			console.log(error.message);
		}
	};

	// Delete Supplier PopUp
	const [visible, setVisible] = useState(false);

	const handleVisibleChange = (newVisible) => {
		setVisible(newVisible);
	};

	useEffect(() => {
		dispatch(loadSingleDesignation(id));
		return () => {
			dispatch(clearDesignation());
		};
	}, []);

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}

	return (
		<div>
			<PageTitle title=' Back ' subtitle=' ' />

			<div className='mr-top'>
				<UserPrivateComponent permission={"read-designation"}>
					{designation ? (
						<Fragment key={designation.id}>
							<Card bordered={false} style={{}}>
								<div className='flex justify-between' style={{ padding: 0 }}>
									<div className='w-50'>
										<h5>
											<i className='bi bi-person-lines-fill'></i>
											<span className='mr-left text-xl'>
												ID : {designation.id} | {designation.name}
											</span>
										</h5>
									</div>
									<div className='text-end w-50'>
										<UserPrivateComponent permission={"update-designation"}>
											<Link
												className='mr-3 d-inline-block'
												to={`/admin/designation/${designation.id}/update`}
												state={{ data: designation }}>
												
													<button>
													<BtnEditSvg size={30} />
												</button>
											</Link>
										</UserPrivateComponent>
										<UserPrivateComponent permission={"delete-designation"}>
											<Popover
												content={
													<a onClick={onDelete}>
														<Button type='primary' danger>
															Yes Please !
														</Button>
													</a>
												}
												title='Are you sure you want to delete ?'
												trigger='click'
												visible={visible}
												onVisibleChange={handleVisibleChange}>
													<button>
													<BtnDeleteSvg size={30} />
												</button>
											</Popover>
										</UserPrivateComponent>
									</div>
								</div>

								<CustomTable list={designation?.designationHistory} loading={loading} />
							</Card>
						</Fragment>
					) : (
						<Loader />
					)}
				</UserPrivateComponent>
			</div>
		</div>
	);
};

export default DetailDesignation;

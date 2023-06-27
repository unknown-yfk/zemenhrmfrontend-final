import {
	Button,
	Card,
	Col,
	Form,
	Input,
	InputNumber,
	Row,
	Table,
	Typography,
} from "antd";

import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import ViewBtn from "../Buttons/ViewBtn";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";
import { useDispatch, useSelector } from "react-redux";
import {
	addSingleLeavePolicy,
	loadAllLeavePolicy,
} from "../../redux/rtk/features/leavePolicy/leavePolicySlice";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import {  useTranslation } from "react-i18next";

function CustomTable({ list, loading }) {
	const {t} = useTranslation();

	const [columnsToShow, setColumnsToShow] = useState([]);

	const columns = [
		{
			id: 1,
			title: t("id"),
			dataIndex: "id",
			key: "id",
		},
		{
			id: 2,
			title: t("name"),
			dataIndex: "name",
			key: "name",
		},

		{
			id: 3,
			title: t("paid"),
			dataIndex: "paidLeaveCount",
			key: "paidLeaveCount",
		},

		{
			id: 3,
			title: t("unpaid"),
			dataIndex: "unpaidLeaveCount",
			key: "unpaidLeaveCount",
		},
		{
			id: 4,
			title: t("action"),
			dataIndex: "id",
			key: "action",
			render: (id) => <ViewBtn path={`/admin/leave-policy/${id}/`} />,
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
		<Card>
			<div className='text-center my-2 flex justify-between'>
				<h5 className='department-list-title text-color-2 text-xl mb-2'>
					{t('leave_policy_list')}
				</h5>
				{list && (
					<div>
						<CsvLinkBtn>
							<CSVLink
								data={list}
								className='btn btn-dark btn-sm mb-1'
								filename='leave-policy'>
							
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
				scroll={{ x: true }}
				loading={!list || loading}
				columns={columnsToShow}
				dataSource={list ? addKeys(list) : []}
			/>
		</Card>
	);
}

const AddLeavePolicy = ({ drawer }) => {
	const {t} = useTranslation();

	const { list, loading } = useSelector((state) => state.leavePolicy);
	const [loader, setLoader] = useState(false);
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadAllLeavePolicy());
	}, []);

	const { Title } = Typography;

	const onFinish = async (values) => {
		const FormData = {
			...values,
			paidLeaveCount: parseInt(values.paidLeaveCount),
			unpaidLeaveCount: parseInt(values.unpaidLeaveCount),
		};
		setLoader(true);
		const resp = await dispatch(addSingleLeavePolicy(FormData));

		if (resp.payload.message === "success") {
			setLoader(false);
			form.resetFields();
			dispatch(loadAllLeavePolicy());
		} else {
			setLoader(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding department");
		setLoader(false);
	};
	return (
		<Fragment bordered={false}>
			<UserPrivateComponent permission={"create-leavePolicy"}>
				<Row className='mr-top' justify={drawer ? "center" : "space-between"}>
					<Col
						xs={24}
						sm={24}
						md={24}
						lg={drawer ? 22 : 12}
						xl={drawer ? 22 : 12}
						className='column-design border rounded card-custom'>
						<Title level={4} className='m-2 mt-5 mb-5 text-center'>
					
							{t('add_leave_policy')}

						</Title>
						<Form
							style={{ marginBottom: "40px" }}
							form={form}
							eventKey='department-form'
							name='basic'
							labelCol={{
								span: 6,
							}}
							wrapperCol={{
								span: 12,
							}}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete='off'>
							<div>
								<Form.Item
									style={{ marginBottom: "10px" }}
									label={t('name')}
									name='name'
									rules={[
										{
											required: true,
											message: "Please input your leave-policy name!",
										},
									]}>
									<Input placeholder='Policy 10-12' />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label={t('paid')}
									name='paidLeaveCount'
									rules={[
										{
											required: true,
											message: "Please input your paid leave!",
										},
									]}>
									<Input placeholder='20' />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label={t('unpaid')}
									name='unpaidLeaveCount'
									rules={[
										{
											required: true,
											message: "Please input your unpaid Leave !",
										},
									]}>
									<Input placeholder='10' />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									wrapperCol={{
										offset: 6,
										span: 12,
									}}>
									<Button
										onClick={() => setLoader(true)}
										type='primary'
										size='large'
										htmlType='submit'
										block
										loading={loader}>

										{t('add_new')}


									</Button>
								</Form.Item>
							</div>
						</Form>
					</Col>
				</Row>
			</UserPrivateComponent>
			<hr />
			<UserPrivateComponent permission={"read-leavePolicy"}>
				{drawer || <CustomTable list={list} loading={loading} />}
			</UserPrivateComponent>
		</Fragment>
	);
};

export default AddLeavePolicy;

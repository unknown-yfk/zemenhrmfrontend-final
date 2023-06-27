import { Button, Card, Col, Form, Input, Row, Table, Typography } from "antd";

import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ViewBtn from "../Buttons/ViewBtn";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import { addRole, getRoles } from "./roleApis";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import {  useTranslation } from "react-i18next";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";


function CustomTable({ list }) {

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
			title: t("created_at"),
			dataIndex: "createdAt",
			key: "addrcreatedAtess",
			render: (createdAt) => moment(createdAt).format("YYYY-MM-DD"),
		},
		{
			id: 4,
			title: t("action"),
			dataIndex: "id",
			key: "action",
			render: (id) => <ViewBtn path={`/admin/role/${id}/`} />,
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
					{t('role_list')}
				</h5>
				{list && (
					<div>
					
						<CsvLinkBtn>
							<CSVLink
								data={list}
								className='btn btn-dark btn-sm mb-1'
								filename='roles'>
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
				loading={!list}
				columns={columnsToShow}
				dataSource={list ? addKeys(list) : []}
			/>
		</Card>
	);
}

const AddRole = ({ drawer }) => {
	const {t} = useTranslation();

	const [list, setList] = useState(null);
	const [loader, setLoader] = useState(false);

	useEffect(() => {
		getRoles()
			.then((d) => setList(d))
			.catch((error) => console.log(error));
	}, []);

	const { Title } = Typography;

	const onFinish = async (values) => {
		setLoader(true);
		const resp = await addRole(values);

		if (resp.message === "success") {
			setLoader(false);
			const newList = [...list];
			newList.push(resp.data);
			setList(newList);
		}
	};

	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding role");
		setLoader(false);
	};
	return (
		<Fragment bordered={false}>
			<UserPrivateComponent permission={"create-role"}>
				<Row className='mr-top' justify={drawer ? "center" : "space-between"}>
					<Col
						xs={24}
						sm={24}
						md={24}
						lg={drawer ? 22 : 16}
						xl={drawer ? 22 : 12}
						className='column-design border rounded card-custom'>
						<Title level={4} className='mt-10 m-2 text-center'>
							
							{t('add_new_role')}
						</Title>
						<Form
							style={{ marginBottom: "100px" }}
							eventKey='role-form'
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
									style={{ marginBottom: "20px" }}
									label=	{t('name')}
						

									name='name'
									rules={[
										{
											required: true,
											message: "Please input your username!",
										},
									]}>
									<Input />
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
											{t('add_new_role')}
										
									</Button>
								</Form.Item>
							</div>
						</Form>
					</Col>
				</Row>
			</UserPrivateComponent>
			<hr />
			<UserPrivateComponent permission={"read-role"}>
				{drawer || <CustomTable list={list} />}
			</UserPrivateComponent>
		</Fragment>
	);
};

export default AddRole;

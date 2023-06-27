import {
	Button,
	Card,
	Col,
	DatePicker,
	Form,
	Input,
	Row,
	Table,
	Typography,
} from "antd";

import React, { Fragment, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import ViewBtn from "../Buttons/ViewBtn";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";
import { useDispatch, useSelector } from "react-redux";
import {
	addSinglePublicHoliday,
	loadAllPublicHoliday,
} from "../../redux/rtk/features/publicHoliday/publicHolidaySlice";
import moment from "moment";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import {  useTranslation } from "react-i18next";

function CustomTable({ list, loading }) {
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
			dataIndex: "name",
			key: "name",
		},

		{
			id: 3,
			title: t('date'),
			dataIndex: "date",
			key: "date",
			render: (date) => moment(date).format("ll"),
		},

		{
			id: 3,
			title: t('created_at'),
			dataIndex: "createdAt",
			key: "createdAt",
			render: (createdAt) => moment(createdAt).format("ll"),
		},
		{
			id: 4,
			title: t('action'),
			dataIndex: "id",
			key: "action",
			render: (id) => <ViewBtn path={`/admin/holiday/public/${id}/`} />,
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
					{t('public_holiday_list')}
				</h5>
				{list && (
					<div>
						<CsvLinkBtn>
							<CSVLink
								data={list}
								className='btn btn-dark btn-sm mb-1'
								filename='public-holiday'>
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

const AddPublicHoliday = ({ drawer }) => {
	const {t} = useTranslation();

	const { list, loading } = useSelector((state) => state.publicHoliday);
	const [loader, setLoader] = useState(false);
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadAllPublicHoliday());
	}, []);

	const { Title } = Typography;

	const onFinish = async (values) => {
		setLoader(true);
		const resp = await dispatch(addSinglePublicHoliday(values));

		if (resp.payload.message === "success") {
			setLoader(false);
			form.resetFields();
			dispatch(loadAllPublicHoliday());
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
			<UserPrivateComponent permission={"create-publicHoliday"}>
				<Row className='mr-top' justify={drawer ? "center" : "space-between"}>
					<Col
						xs={24}
						sm={24}
						md={24}
						lg={drawer ? 22 : 12}
						xl={drawer ? 22 : 12}
						className='column-design border rounded card-custom'>
						<Title level={4} className='m-2 mt-5 mb-5 text-center'>
							{t('add_public_holiday')}
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
									label={t('name_holidaye')}
									name='name'
									rules={[
										{
											required: true,
											message: "Please input name!",
										},
									]}>
									<Input placeholder={t('new_year')} />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "20px" }}
									label={t('date')}
									name='date'
									rules={[
										{
											required: true,
											message: "Please input date!",
										},
									]}>
									<DatePicker placeholder={t('select')} />
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
										
										{t('add_public_holiday')}
									</Button>
								</Form.Item>
							</div>
						</Form>
					</Col>
				</Row>
			</UserPrivateComponent>
			<hr />
			<UserPrivateComponent permission={"read-publicHoliday"}>
				{drawer || <CustomTable list={list} loading={loading} />}
			</UserPrivateComponent>
		</Fragment>
	);
};

export default AddPublicHoliday;

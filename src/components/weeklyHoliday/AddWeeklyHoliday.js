import {
	Button,
	Card,
	Col,
	Form,
	Input,
	InputNumber,
	Row,
	Select,
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
	addSingleWeeklyHoliday,
	loadAllWeeklyHoliday,
} from "../../redux/rtk/features/weeklyHoliday/weeklyHolidaySlice";
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
			title: t("s_date"),
			dataIndex: "startDay",
			key: "startDay",
		},

		{
			id: 3,
			title: t("end_date"),
			dataIndex: "endDay",
			key: "endDay",
		},
		{
			id: 4,
			title: t("action"),
			dataIndex: "id",
			key: "action",
			render: (id) => <ViewBtn path={`/admin/holiday/week/${id}/`} />,
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
					
					{t('weekly_holiday_list')}
				</h5>
				{list && (
					<div>
						<CsvLinkBtn>
							<CSVLink
								data={list}
								className='btn btn-dark btn-sm mb-1'
								filename='weekly-holiday'>
								
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

const AddWeeklyHoliday = ({ drawer }) => {

	const {t} = useTranslation();

	const { list, loading } = useSelector((state) => state.weeklyHoliday);
	const [loader, setLoader] = useState(false);
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadAllWeeklyHoliday());
	}, []);

	const { Title } = Typography;

	const onFinish = async (values) => {
		setLoader(true);
		const resp = await dispatch(addSingleWeeklyHoliday(values));

		if (resp.payload.message === "success") {
			setLoader(false);
			form.resetFields();
			dispatch(loadAllWeeklyHoliday());
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
			<UserPrivateComponent permission={"create-weeklyHoliday"}>
				<Row className='mr-top' justify={drawer ? "center" : "space-between"}>
					<Col
						xs={24}
						sm={24}
						md={24}
						lg={drawer ? 22 : 12}
						xl={drawer ? 22 : 12}
						className='column-design border rounded card-custom'>
						<Title level={4} className='m-2 mt-5 mb-5 text-center'>
							
							{t('add_weekly_holiday')}
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
											message: "Please input name!",
										},
									]}>
									<Input placeholder='Saturday-Friday' />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label={t('s_date')}
									name='startDay'
									rules={[
										{
											required: true,
											message: "Please input start day!",
										},
									]}>
									<Select placeholder='Select Start Day'>
										<Select.Option value='Saturday'>Saturday</Select.Option>
										<Select.Option value='Sunday'>Sunday</Select.Option>
										<Select.Option value='Monday'>Monday</Select.Option>
										<Select.Option value='Tuesday'>Tuesday</Select.Option>
										<Select.Option value='Wednesday'>Wednesday</Select.Option>
										<Select.Option value='Thursday'>Thursday</Select.Option>
										<Select.Option value='Friday'>Friday</Select.Option>
									</Select>
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label={t('end_date')}
									name='endDay'
									rules={[
										{
											required: true,
											message: "Please input End day!",
										},
									]}>
									<Select placeholder='Select Start Day'>
										<Select.Option value='Saturday'>Saturday</Select.Option>
										<Select.Option value='Sunday'>Sunday</Select.Option>
										<Select.Option value='Monday'>Monday</Select.Option>
										<Select.Option value='Tuesday'>Tuesday</Select.Option>
										<Select.Option value='Wednesday'>Wednesday</Select.Option>
										<Select.Option value='Thursday'>Thursday</Select.Option>
										<Select.Option value='Friday'>Friday</Select.Option>
									</Select>
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
										{t('add_weekly_holiday')}
									</Button>
								</Form.Item>
							</div>
						</Form>
					</Col>
				</Row>
			</UserPrivateComponent>
			<hr />
			<UserPrivateComponent permission={"read-weeklyHoliday"}>
				{drawer || <CustomTable list={list} loading={loading} />}
			</UserPrivateComponent>
		</Fragment>
	);
};

export default AddWeeklyHoliday;

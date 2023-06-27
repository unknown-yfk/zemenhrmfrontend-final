import {
	Button,
	Card,
	Col,
	Form,
	Input,
	Row,
	Table,
	TimePicker,
	Typography,
} from "antd";

import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ViewBtn from "../Buttons/ViewBtn";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";
import { useDispatch, useSelector } from "react-redux";
import {
	addShift,
	loadAllShift,
} from "../../redux/rtk/features/shift/shiftSlice";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import {  useTranslation } from "react-i18next";


function CustomTable({ list }) {

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
			title: t('start_time'),
			dataIndex: "startTime",
			key: "startTime",
			render: (startTime) => moment(startTime).format("hh:mm A"),
		},

		{
			id: 4,
			title: t('end_time'),
			dataIndex: "endTime",
			key: "endTime",
			render: (endTime) => moment(endTime).format("hh:mm A"),
		},
		{
			id: 5,
			title: t('action'),
			dataIndex: "id",
			key: "action",
			render: (id) => <ViewBtn path={`/admin/shift/${id}/`} />,
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
			
					{t('shift_list')}
				</h5>
				{list && (
					<div>
						<CsvLinkBtn>
							<CSVLink
								data={list}
								className='btn btn-dark btn-sm mb-1'
								filename='shift'>
								
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

const AddShift = ({ drawer }) => {
	const {t} = useTranslation();

	const [loader, setLoader] = useState(false);
	const shift = useSelector((state) => state.shift.list);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadAllShift());
	}, []);

	const { Title } = Typography;
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		const shiftData = {
			name: values.name,
			startTime: moment(values.startTime).format(),
			endTime: moment(values.endTime).format(),
		};

		setLoader(true);
		const resp = await dispatch(addShift(values));

		if (resp.payload.message === "success") {
			setLoader(false);
			form.resetFields();
			dispatch(loadAllShift());
		} else {
			setLoader(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding shift");
		setLoader(false);
	};
	return (
		<Fragment bordered={false}>
			<UserPrivateComponent permission={"create-shift"}>
				<Row className='mr-top' justify={drawer ? "center" : "space-between"}>
					<Col
						xs={24}
						sm={24}
						md={24}
						lg={drawer ? 22 : 16}
						xl={drawer ? 22 : 12}
						className='column-design border rounded card-custom'>
						<Title level={4} className='m-2 mt-5 mb-5 text-center'>
							
							{t('add_shift')}
						</Title>
						<Form
							form={form}
							style={{ marginBottom: "40px" }}
							eventKey='shift-form'
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
									label={t('shift_name')}
									name='name'
									rules={[
										{
											required: true,
											message: "Please input your shift!",
										},
									]}>
									<Input />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label={t('shift_start_time')}
									name='startTime'
									rules={[
										{
											required: true,
											message: "Please input your shift!",
										},
									]}>
									<TimePicker placeholder={t('select')} />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "20px" }}
									label={t('shift_end_time')}
									name='endTime'
									rules={[
										{
											required: true,
											message: "Please input your shift!",
										},
									]}>
									<TimePicker placeholder={t('select')} />
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
										{t('add_new_shift')}

									</Button>
								</Form.Item>
							</div>
						</Form>
					</Col>
				</Row>
			</UserPrivateComponent>
			<hr />
			<UserPrivateComponent permission={"read-shift"}>
				{drawer || <CustomTable list={shift} />}
			</UserPrivateComponent>
		</Fragment>
	);
};

export default AddShift;

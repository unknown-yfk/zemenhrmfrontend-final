import { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
	Button,
	Col,
	Input,
	Row,
	Typography,
	Form,
	Select,
	DatePicker,
	TimePicker,
} from "antd";
import moment from "moment";
import { toast } from "react-toastify";
import { loadAllStaff } from "../../redux/rtk/features/user/userSlice";
import {
	addManualAttendance,
	loadAllAttendance,
} from "../../redux/rtk/features/attendance/attendanceSlice";
import GetAllAttendance from "./GetAllAttendance";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import {  useTranslation } from "react-i18next";

const Attendance = ({ drawer }) => {

	const {t} = useTranslation();

	const [loader, setLoader] = useState(false);
	const users = useSelector((state) => state.users?.list);
	const dispatch = useDispatch();
	const { Title } = Typography;
	const [form] = Form.useForm();

	const [inTimeDate, setInTimeDate] = useState({
		time: null,
		date: null,
	});
	const [outTimeDate, setOutTimeDate] = useState({
		time: null,
		date: null,
	});

	// make a new date variable from inTimeDate state which will contain date and time
	const inTimeDateNew = new Date(inTimeDate.date + " " + inTimeDate.time);

	const outTimeDateNew = new Date(outTimeDate.date + " " + outTimeDate.time);

	useEffect(() => {
		dispatch(loadAllStaff({ status: true }));
	}, []);

	const onFinish = async (values) => {
		const FormData = {
			...values,
			inTime: inTimeDateNew == "Invalid Date" ? null : inTimeDateNew,
			outTime: outTimeDateNew == "Invalid Date" ? null : outTimeDateNew,
		};
		setLoader(true);
		const resp = await dispatch(addManualAttendance(FormData));
		if (resp.payload.message === "success") {
			setLoader(false);
			form.resetFields();
			setInTimeDate({});
			setOutTimeDate({});
			dispatch(loadAllAttendance());
		} else {
			setLoader(false);
		}
	};
	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding shift");
		setLoader(false);
	};

	return (
		<Fragment>
			<UserPrivateComponent permission={"create-attendance"}>
				<Row className='mr-top' justify={drawer ? "center" : "space-between"}>
					<Col
						xs={24}
						sm={24}
						md={24}
						lg={drawer ? 22 : 12}
						xl={drawer ? 22 : 12}
						className='column-design border rounded card-custom'>
						<Title level={4} className='m-2 mt-5 mb-5 text-center'>
							{t('add_manual_attendance')}							
						</Title>
						{inTimeDate.time === null ||
						inTimeDate.date === null ||
						outTimeDate.time === null ||
						outTimeDate.date === null ? (
							<p className='text-center text-rose-500 text-sm font-medium mb-4'>
								{" "}
								{t('please_fill')}
								</p>
						) : (
							""
						)}
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
									label={t('emp_name')}
									name='userId'
									rules={[
										{
											required: true,
											message: "Please input your user!",
										},
									]}>
									<Select placeholder={t('select')}>
										{users?.map((user) => (
											<Select.Option key={user.id} value={user.id}>
												{user.userName}
											</Select.Option>
										))}
									</Select>
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label={t('start_time')}
									rules={[
										{
											required: true,
											message: "Please input your start time!",
										},
									]}>
									<div className='flex justify-between'>
										<DatePicker
											format={"YYYY-MM-DD"}
											onChange={(date, dateString) =>
												setInTimeDate({ ...inTimeDate, date: dateString })
											}

											placeholder={t('select_date')}
										/>
										<TimePicker
											className='ml-4'
											format={"HH:mm:s"}
											onChange={(time, timeString) =>
												setInTimeDate({ ...inTimeDate, time: timeString })
											}
											placeholder={t('select_time')}
										/>
									</div>
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label={t('end_time')}
									rules={[
										{
											required: true,
											message: "Please input your start time!",
										},
									]}>
									<div className='flex justify-between'>
										<DatePicker
											format={"YYYY-MM-DD"}
											onChange={(date, dateString) =>
												setOutTimeDate({ ...outTimeDate, date: dateString })
											}
												placeholder={t('select_date')}
										/>
										<TimePicker
											className='ml-4'
											format={"HH:mm:s"}
											onChange={(time, timeString) =>
												setOutTimeDate({ ...outTimeDate, time: timeString })
											}
											placeholder={t('select_time')}
										/>
									</div>
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
								
									label={t('comment')}

									name='comment'>
									<Input placeholder={t('comment')} />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label={t('ip_ddress')}
									name='ip'>
									<Input placeholder='127.0.0.1' />
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
										disabled={
											inTimeDate.time === null ||
											inTimeDate.date === null ||
											outTimeDate.time === null ||
											outTimeDate.date === null
										}
										htmlType='submit'
										block
										loading={loader}>
										{t('add_attendance')}
										
									</Button>
								</Form.Item>
							</div>
						</Form>
					</Col>
				</Row>
			</UserPrivateComponent>
			<UserPrivateComponent permission={"read-attendance"}>
				<GetAllAttendance />
			</UserPrivateComponent>
		</Fragment>
	);
};

export default Attendance;

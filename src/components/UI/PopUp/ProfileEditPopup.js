import { useState } from "react";
import {
	Button,
	DatePicker,
	Form,
	Input,
	Select,
	Space,
	Modal,
	Typography,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRoles } from "../../role/roleApis";
import BtnEditSvg from "../Button/btnEditSvg";
import moment from "moment";
import {
	clearUser,
	loadSingleStaff,
	updateUser,
} from "../../../redux/rtk/features/user/userSlice";
import { toast } from "react-toastify";
import { getDepartments } from "../../department/departmentApis";
import { loadAllShift } from "../../../redux/rtk/features/shift/shiftSlice";
import { loadAllLeavePolicy } from "../../../redux/rtk/features/leavePolicy/leavePolicySlice";
import { loadAllWeeklyHoliday } from "../../../redux/rtk/features/weeklyHoliday/weeklyHolidaySlice";
import { useParams } from "react-router-dom";
import {  useTranslation } from "react-i18next";


const ProfileEditPopup = ({ data }) => {

	const {t} = useTranslation();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [loader, setLoader] = useState(false);
	const leavePolicy = useSelector((state) => state.leavePolicy?.list);
	const weeklyHoliday = useSelector((state) => state.weeklyHoliday?.list);
	const shift = useSelector((state) => state.shift?.list);
	const user = useSelector((state) => state.users?.user);

	const { id } = useParams("id");

	const dispatch = useDispatch();
	const { Title } = Typography;
	const { Option } = Select;
	const [list, setList] = useState(null);

	const [department, setDepartment] = useState(null);

	const [initialValues, setInitialValues] = useState({});

	const [roleId, setRoleId] = useState("");
	const [departmentId, setDepartmentId] = useState("");
	const [shiftId, setShiftId] = useState("");
	const [leavePolicyId, setLeavePolicyId] = useState("");
	const [weeklyHolidayId, setWeeklyHolidayId] = useState("");

	useEffect(() => {
		getRoles()
			.then((d) => setList(d))
			.catch((error) => console.log(error));
	}, []);

	useEffect(() => {
		dispatch(loadAllShift());
		dispatch(loadAllLeavePolicy());
		dispatch(loadAllWeeklyHoliday());
	}, []);

	useEffect(() => {
		dispatch(loadSingleStaff(id));
		setInitialValues({
			firstName: user.firstName ? user.firstName : "",
			lastName: user.lastName ? user.lastName : "",
			userName: user.userName ? user.userName : "",
			email: user.email ? user.email : "",
			phone: user.phone ? user.phone : "",
			street: user.street ? user.street : "",
			city: user.city ? user.city : "",
			state: user.state ? user.state : "",
			zipCode: user.zipCode ? user.zipCode : "",
			country: user.country ? user.country : "",
			joinDate: moment(user.joinDate),
			leaveDate: user.leaveDate ? moment(user.leaveDate) : null,
			employeeId: user.employeeId ? user.employeeId : "",
			bloodGroup: user.bloodGroup ? user.bloodGroup : "",
			image: user.image ? user.image : "",
			roleId: user.roleId ? user.roleId : "",
			departmentId: user.departmentId ? user.departmentId : "",
			shiftId: user.shiftId ? user.shiftId : "",
			leavePolicyId: user.leavePolicyId ? user.leavePolicyId : "",
			weeklyHolidayId: user.weeklyHolidayId ? user.weeklyHolidayId : "",
		});
	}, [id]);

	useEffect(() => {
		getDepartments()
			.then((d) => setDepartment(d))
			.catch((error) => console.log(error));
	}, []);

	const [form] = Form.useForm();

	const onFinish = async (values) => {
		try {
			const resp = await dispatch(
				updateUser({
					id: id,
					values: {
						...values,
						roleId: roleId ? roleId : data.roleId,
						departmentId: departmentId ? departmentId : data.departmentId,
						shiftId: shiftId ? shiftId : data.shiftId,
						leavePolicyId: leavePolicyId ? leavePolicyId : data.leavePolicyId,
						weeklyHolidayId: weeklyHolidayId
							? weeklyHolidayId
							: data.weeklyHolidayId,
					},
				})
			);

			setLoader(true);
			if (resp.payload.message === "success") {
				setLoader(false);
				dispatch(clearUser());
				dispatch(loadSingleStaff(id));
				setIsModalOpen(false);
			} else {
				setLoader(false);
			}

			// form.resetFields();
		} catch (error) {
			console.log(error.message);
			setLoader(false);
			toast.error("Something went wrong");
		}
	};

	const onFinishFailed = (errorInfo) => {
		setLoader(false);
		console.log("Failed:", errorInfo);
	};

	const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]; // blood groups

	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<button onClick={showModal}>
				<BtnEditSvg size={30} />
			</button>
			<Modal
				width={"50%"}
				title={t('update_employee')}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				<Form
					size='small'
					form={form}
					name='basic'
					labelCol={{
						span: 5,
					}}
					wrapperCol={{
						span: 14,
					}}
					initialValues={initialValues}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='off'>
					<h2 className='text-center text-xl mt-3 mb-3 txt-color'>
						{t('user_info')}
					</h2>
					<Form.Item
						style={{ marginBottom: "10px" }}
						label={t('first_name')}
						name='firstName'
						rules={[
							{
								required: true,
								message: "Please input First Name!",
							},
						]}>
						<Input placeholder='John' />
					</Form.Item>
					<Form.Item
						style={{ marginBottom: "10px" }}
						label={t('last_name')}
						name='lastName'
						rules={[
							{
								required: true,
								message: "Please input Last Name!",
							},
						]}>
						<Input placeholder='Doe' />
					</Form.Item>
					<Form.Item
						style={{ marginBottom: "10px" }}
						label={t('user_name')}
						name='userName'
						rules={[
							{
								required: true,
								message: "Please input User Name!",
							},
						]}>
						<Input placeholder='john_doe' />
					</Form.Item>
					<Form.Item
						style={{ marginBottom: "10px" }}
						label={t('password')}

						name='password'
						rules={[
							{
								required: true,
								message: "Please input your password !",
							},
						]}>
						<Input placeholder={t('strong_pass')} />
					</Form.Item>
					<Form.Item
						style={{ marginBottom: "10px" }}
						label={t('email')}

						name='email'
						rules={[
							{
								required: false,
								message: "Please input email!",
							},
						]}>
						<Input placeholder='johndoe2@example.com' />
					</Form.Item>

					<Form.Item
						style={{ marginBottom: "10px" }}
						label={t('phone')}
						name='phone'
						rules={[
							{
								required: false,
								message: "Please input phone!",
							},
						]}>
						<Input placeholder='0911121314' />
					</Form.Item>

					<h2 className='text-center text-xl mt-3 mb-3 txt-color'>
						{t('addres_info')}
					</h2>
					<Form.Item
						style={{ marginBottom: "10px" }}
						label={t('city')}
						name='street'
						rules={[
							{
								required: true,
								message: "Please input city!",
							},
						]}>
						<Input 	placeholder={t('addis_ababa')} style={{ width: "100%" }} />
					</Form.Item>
					<Form.Item
						style={{ marginBottom: "10px" }}
						label={t('k_ketema')}
						name='city'
						rules={[{ required: true, message: "Please input Kifle Ketema!" }]}>
						<Input placeholder={t('yeka')} />
					</Form.Item>
					<Form.Item
						style={{ marginBottom: "10px" }}
						label={t('woreda')}
						name='state'
						rules={[{ required: true, message: "Please input Woreda!" }]}>
						<Input placeholder='22' />
					</Form.Item>
					<Form.Item
						style={{ marginBottom: "10px" }}
						label={t('kebele')}
						name='zipCode'
						rules={[
							{ required: false, message: "Please input Kebele!" },
						]}>
							<Input placeholder='9' />
					</Form.Item>
					<Form.Item
						style={{ marginBottom: "10px" }}
						label={t('region')}
						name='country'
						rules={[
							{ required: true, message: "Please input Region!" },
						]}>
				<Input placeholder={t('region_name')} />
					</Form.Item>

					<h2 className='text-center text-xl mt-3 mb-3 txt-color'>
						{" "}
						{t('employee_info')}{" "}
					</h2>
					<Form.Item
						style={{ marginBottom: "10px" }}
						label={t('join_date')}
						name='joinDate'
						valuePropName='date'
						rules={[
							{
								required: true,
								message: "Please input joining date!",
							},
						]}>
						<DatePicker
							className='date-picker hr-staffs-date-picker'
							defaultValue={initialValues.joinDate}
						/>
					</Form.Item>
					<Form.Item
						style={{ marginBottom: "10px" }}
						label={t('leave_date')}
						name='leaveDate'
						valuePropName='leaveDate'>
						<DatePicker
							className='date-picker hr-staffs-date-picker'
							defaultValue={initialValues.leaveDate}
						/>
					</Form.Item>
					<Form.Item
						style={{ marginBottom: "10px" }}
						label={t('emp_id')}
						name='employeeId'
						rules={[
							{
								required: true,
								message: "Please input Employee ID!",
							},
						]}>
						<Input placeholder='OE-012' />
					</Form.Item>
					<Form.Item
						style={{ marginBottom: "10px" }}
						label={t('blood_t')}
						name='bloodGroup'
						rules={[
							{
								required: false,
								message: "Please input Blood Group!",
							},
						]}>
						<Select
							placeholder='Select Blood Group'
							allowClear
							defaultValue={initialValues.bloodGroup}
							mode='single'
							size='middle'
							style={{
								width: "100%",
							}}>
							{bloodGroups.map((bloodGroup) => (
								<Option key={bloodGroup} value={bloodGroup}>
									{bloodGroup}
								</Option>
							))}
						</Select>
					</Form.Item>
					{/* TODO: Add a Upload Seciton for Image */}

					<Form.Item
						name={"departmentId"}
						style={{ marginBottom: "10px" }}
						label={t('department')}

						rules={[{ required: true, message: "Please input Department!" }]}>
						<Select
							onChange={(value) => setDepartmentId(value)}
							placeholder={t('department_select')}
							allowClear
							size={"middle"}
							defaultValue={initialValues.departmentId}>
							{department &&
								department.map((department) => (
									<Option key={department.id} value={department.id}>
										{department.name}
									</Option>
								))}
						</Select>
					</Form.Item>
					<Form.Item
						rules={[
							{
								required: true,
								message: "Pleases Select Type!",
							},
						]}
						label={t('role')}
						name={"roleId"}
						style={{ marginBottom: "10px" }}>
						<Select
							onChange={(value) => setRoleId(value)}
							defaultValue={initialValues.roleId}
							loading={!list}
							size='middle'
							mode='single'
							allowClear
							style={{
								width: "100%",
							}}
							placeholder='Please select Role'>
							{list &&
								list.map((role) => (
									<Option key={role.id} value={role.id}>
										{role.name}
									</Option>
								))}
						</Select>
					</Form.Item>

					<Form.Item
						rules={[
							{
								required: true,
								message: "Pleases Select Type!",
							},
						]}
						label={t('role')}
						name={"shiftId"}
						style={{ marginBottom: "10px" }}>
						<Select
							onChange={(value) => setShiftId(value)}
							defaultValue={initialValues.shiftId}
							loading={!shift}
							size='middle'
							mode='single'
							allowClear
							style={{
								width: "100%",
							}}
							placeholder='Please select shift'>
							{shift &&
								shift.map((shift) => (
									<Option key={shift.id} value={shift.id}>
										{shift.name}
									</Option>
								))}
						</Select>
					</Form.Item>

					<Form.Item
						rules={[
							{
								required: true,
								message: "Pleases Select Type!",
							},
						]}
						label={t('leave_policy')}
						name={"leavePolicyId"}
						style={{ marginBottom: "10px" }}>
						<Select
							onChange={(value) => setLeavePolicyId(value)}
							defaultValue={initialValues.leavePolicyId}
							loading={!leavePolicy}
							size='middle'
							mode='single'
							allowClear
							style={{
								width: "100%",
							}}
							placeholder='Please select leavePolicy'>
							{leavePolicy &&
								leavePolicy.map((leavePolicy) => (
									<Option key={leavePolicy.id} value={leavePolicy.id}>
										{leavePolicy.name}
									</Option>
								))}
						</Select>
					</Form.Item>

					<Form.Item
						rules={[
							{
								required: true,
								message: "Pleases Select Type!",
							},
						]}
						label={t('weekly_holiday')}
						name={"weeklyHolidayId"}
						style={{ marginBottom: "10px" }}>
						<Select
							onChange={(value) => setWeeklyHolidayId(value)}
							defaultValue={initialValues.weeklyHolidayId}
							loading={!weeklyHoliday}
							size='middle'
							mode='single'
							allowClear
							style={{
								width: "100%",
							}}
							placeholder='Please select weeklyHoliday'>
							{weeklyHoliday &&
								weeklyHoliday.map((weeklyHoliday) => (
									<Option key={weeklyHoliday.id} value={weeklyHoliday.id}>
										{weeklyHoliday.name}
									</Option>
								))}
						</Select>
					</Form.Item>

					<Form.Item
						style={{ marginBottom: "10px", marginTop: "10px" }}
						wrapperCol={{
							offset: 4,
							span: 16,
						}}>
						<Button
							className='mt-5'
							block
							onClick={() => setLoader(true)}
							type='primary'
							shape='round'
							htmlType='submit'
							loading={loader}>
							{t('update_emp')}
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
export default ProfileEditPopup;

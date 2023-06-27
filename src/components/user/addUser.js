import {
	Alert,
	Button,
	Card,
	Col,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Row,
	Select,
	Space,
	Switch,
	Typography,
} from "antd";

import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllDesignation } from "../../redux/rtk/features/designation/designationSlice";
import BigDrawer from "../Drawer/BigDrawer";
import AddRole from "../role/AddRole";
import { getRoles } from "../role/roleApis";
import EmployeeEducationForm from "./EmployeeEducationForm";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";


import { getDepartments } from "../department/departmentApis";

import { getDesignation } from "../designation/designationApis";







import { loadAllEmploymentStatus } from "../../redux/rtk/features/employemntStatus/employmentStatusSlice";
import { loadAllShift } from "../../redux/rtk/features/shift/shiftSlice";
import { addStaff } from "../../redux/rtk/features/user/userSlice";
import { loadAllWeeklyHoliday } from "../../redux/rtk/features/weeklyHoliday/weeklyHolidaySlice";
import { loadAllLeavePolicy } from "../../redux/rtk/features/leavePolicy/leavePolicySlice";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import {  useTranslation } from "react-i18next";


const AddUser = () => {

	const {t} = useTranslation();


	const [loader, setLoader] = useState(false);
	const dispatch = useDispatch();
	const { Title } = Typography;
	const { Option } = Select;
	const [list, setList] = useState(null);
	const [department, setDepartment] = useState(null);

	const [designation, setDesignation] = useState(null);


	const [education, setEducation] = useState([
		{
			degree: "",
			institution: "",
			fieldOfStudy: "",
			result: "",
			studyStartDate: "",
			studyEndDate: "",
		},
	]);

	// const [j_date, setJ_date] = useState(moment());
	// const [l_date, setL_date] = useState(moment());

	// useseletor to get designations from redux
	// const designation = useSelector((state) => state.designations?.list);
	const employmentStatus = useSelector((state) => state.employmentStatus?.list);
	const shift = useSelector((state) => state.shift?.list);
	const weeklyHoliday = useSelector((state) => state.weeklyHoliday?.list);
	const leavePolicy = useSelector((state) => state.leavePolicy?.list);

	useEffect(() => {
		getRoles()
			.then((d) => setList(d))
			.catch((error) => console.log(error));
	}, []);

	useEffect(() => {
		getDepartments()
			.then((d) => setDepartment(d))
			.catch((error) => console.log(error));
	}, []);


	useEffect(() => {
		getDesignation()
			.then((d) => setDesignation(d))
			.catch((error) => console.log(error));
	}, []);





	useEffect(() => {
		dispatch(loadAllDesignation());
		dispatch(loadAllEmploymentStatus());
		dispatch(loadAllShift());
		dispatch(loadAllWeeklyHoliday());
		dispatch(loadAllLeavePolicy());
	}, []);

	const [form] = Form.useForm();

	const onFinish = async (values) => {
		const FormData = {
			...values,

			educations: values.educations || education,
		};
		try {
			const resp = await dispatch(addStaff(FormData));
			setLoader(true);

			if (resp.payload.message === "success") {
				form.resetFields();
				setLoader(false);
			} else if (resp.payload.message === "error") {
				setLoader(false);
			} else {
				setLoader(false);
			}
		} catch (error) {
			console.log(error.message);
			setLoader(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		setLoader(false);
		console.log("Failed:", errorInfo);
	};

	const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]; // blood groups

	return (
		<Fragment bordered={false}>
			<UserPrivateComponent permission={"create-user"}>
				<div className='mr-top mt-5 p-5 ant-card ' style={{ maxWidth: "100%" }}>
					<Form
						size='small'
						form={form}
						name='basic'
						labelCol={{
							span: 7,
						}}
						wrapperCol={{
							span: 22,
						}}
						initialValues={{
							remember: true,
						}}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete='off'>
						<Row
							gutter={{
								xs: 8,
								sm: 16,
								md: 24,
								lg: 32,
							}}>
							<Col span={12} className='gutter-row form-color'>
								<h2 className='text-center text-xl mt-3 mb-3 txt-color'>
									{/* User Information */}
									{t('add_new_employee')}

								</h2>
								<Form.Item
									style={{ marginBottom: "10px" }}
									// label='First Name'
									// label='First Name'
									label = {t('first_name')}
									name='firstName'
									rules={[
										{
											required: true,
											message: "Please input First Name!",
										},
									]}>
									<Input placeholder={t('abebe')} />
								</Form.Item>
								<Form.Item
									style={{ marginBottom: "10px" }}
									// label='Father Name'
									label = {t('last_name')}
									name='lastName'
									rules={[
										{
											required: true,
											message: "Please input Father Name!",
										},
									]}>
									<Input placeholder={t('kebede')} />
								</Form.Item>
								<Form.Item
									style={{ marginBottom: "10px" }}
									// label='User Name'
									label = {t('user_name')}
									name='userName'
									rules={[
										{
											required: true,
											message: "Please input User Name!",
										},
									]}>
									<Input placeholder={t('abe_kebe')} />
								</Form.Item>
								<Form.Item
									style={{ marginBottom: "10px" }}
									// label='Password'
									label = {t('password')}
									name='password'
									rules={[
										{
											required: true,
											message: "Please input your password !",
										},
									]}>
									<Input placeholder={t('strong_pass')}  />
								</Form.Item>
								<Form.Item
									style={{ marginBottom: "10px" }}
									// label='Email'
									label = {t('email')}
									name='email'
									rules={[
										{
											required: false,
											message: "Please input email!",
										},
									]}>
									<Input placeholder='abebe@example.com' />
								</Form.Item>
							</Col>
							<Col span={12} className='gutter-row'>
								<h2 className='text-center text-xl mt-3 mb-3 txt-color'>
									{/* Address Information */}
									{t('addres_info')}

									
								</h2>
								<Form.Item
									style={{ marginBottom: "10px" }}
									// label='City'
									label = {t('city')}
									name='street'
									rules={[
										{
											required: true,
											message: "Please input city!",
										},
									]}>
									<Input
										placeholder={t('addis_ababa')}
										style={{ width: "100%" }}
									/>
								</Form.Item>
								<Form.Item
									style={{ marginBottom: "10px" }}
									// label='Kifle Ketema'
									label = {t('k_ketema')}
									name='city'
									rules={[{ required: true, message: "Please input Kifle Ketema!" }]}>
									<Input placeholder={t('yeka')} />
								</Form.Item>
								<Form.Item
									style={{ marginBottom: "10px" }}
									// label='Woreda'
									label = {t('woreda')}

									name='state'
									rules={[{ required: true, message: "Please input Woreda!" }]}>
									<Input placeholder='22' />
								</Form.Item>
								<Form.Item
									style={{ marginBottom: "10px" }}
									// label='Kebele'
									label = {t('Kebele')}
									name='zipCode'
									rules={[
										{ required: false, message: "Please input Kebele!" },
									]}>
									<Input placeholder='9' />
								</Form.Item>
								<Form.Item
									style={{ marginBottom: "10px" }}
									// label='Region'
									label = {t('region')}
									name='country'
									rules={[
										{ required: true, message: "Please input Region!" },
									]}>
									<Input placeholder={t('region_name')} />
								</Form.Item>
							</Col>
						</Row>

						<Row
							gutter={{
								xs: 8,
								sm: 16,
								md: 24,
								lg: 32,
							}}>
							<Col span={12} className='gutter-row'>
								<h2 className='text-center text-xl mt-3 mb-3 txt-color'>
									{" "}
									{/* Employee Information{" "} */}
									{t('employee_info')}

								</h2>
								<Form.Item
									style={{ marginBottom: "10px" }}
									// label='Joining Date'
									label = {t('join_date')}
									name='joinDate'
									rules={[
										{
											required: true,
											message: "Please input joining date!",
										},
									]}>
									<DatePicker placeholder={t('join_date')} className='date-picker hr-staffs-date-picker' />
								</Form.Item>
								<Form.Item
									style={{ marginBottom: "10px" }}
									// label='Leave Date'
									label = {t('leave_date')}
									name='leaveDate'>
									<DatePicker placeholder={t('leave_date')}  className='date-picker hr-staffs-date-picker' />
								</Form.Item>
								<Form.Item
									style={{ marginBottom: "10px" }}
									// label='Employee ID'
									label = {t('emp_id')}

									name='employeeId'
									rules={[
										{
											required: false,
											message: "Please input Employee ID!",
										},
									]}>
									<Input placeholder='OE-012' />
								</Form.Item>
								<Form.Item
									style={{ marginBottom: "10px" }}
									// label='Blood Group'
									label = {t('blood_t')}

									name='bloodGroup'
									rules={[
										{
											required: false,
											message: "Please input Blood Group!",
										},
									]}>
									<Select
										placeholder={t('select')}
										allowClear
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
									name={"employmentStatusId"}
									style={{ marginBottom: "10px" }}
									rules={[
										{
											required: true,
											message: "Please input Employment Status!",
										},
									]}
									// label='Employee Status'
									label = {t('emp_status')}
									
									>
									<Select
										placeholder={t('emp_status_select')}
										
										allowClear
										size={"middle"}>
										{employmentStatus &&
											employmentStatus.map((employmentStatus) => (
												<Option
													key={employmentStatus.id}
													value={employmentStatus.id}>
													{employmentStatus.name}
												</Option>
											))}
									</Select>
								</Form.Item>
								<Form.Item
									name={"departmentId"}
									style={{ marginBottom: "10px" }}
									// label='Department'
									label = {t('department')}

									rules={[
										{ required: true, message: "Please input Department!" },
									]}>
									<Select
										loading={!department}
										placeholder= {t('department_select')}
										
										allowClear
										size={"middle"}>
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
										{ required: true, message: "Please input Department!" },
									]}
									// label='Role'
									label = {t('role')}

									name={"roleId"}
									style={{ marginBottom: "10px" }}>
									<Select
										loading={!list}
										size='middle'
										mode='single'
										allowClear
										style={{
											width: "100%",
										}}
										placeholder= {t('select')}>
										{list &&
											list.map((role) => (
												<Option key={role.id} value={role.id}>
													{role.name}
												</Option>
											))}
									</Select>
									{/*<BigDrawer
										title={"new Role"}
										btnTitle={"Role"}
										children={<AddRole drawer={true} />}
											/> */}
								</Form.Item>

								<Form.Item
									rules={[
										{ required: true, message: "Please input Department!" },
									]}
									// label='Shift'
									label = {t('shift')}

									name={"shiftId"}
									style={{ marginBottom: "10px" }}>
									<Select
										loading={!shift}
										size='middle'
										mode='single'
										allowClear
										style={{
											width: "100%",
										}}
										placeholder={t('select')}>
										{shift &&
											shift.map((shift) => (
												<Option key={shift.id} value={shift.id}>
													{shift.name}
												</Option>
											))}
									</Select>
									{/*<BigDrawer
										title={"new Role"}
										btnTitle={"Role"}
										children={<AddRole drawer={true} />}
											/> */}
								</Form.Item>

								<Form.Item
									rules={[
										{ required: true, message: "Please input Department!" },
									]}
									// label='Leave Policy'
									label = {t('leave_policy')}
									name={"leavePolicyId"}
									style={{ marginBottom: "10px" }}>
									<Select
										loading={!leavePolicy}
										size='middle'
										mode='single'
										allowClear
										style={{
											width: "100%",
										}}
										placeholder={t('select')}>
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
										{ required: true, message: "Please input Department!" },
									]}
									// label='WeekLy Holiday'
									label = {t('weekly_holiday')}

									name={"weeklyHolidayId"}
									style={{ marginBottom: "10px" }}>
									<Select
										loading={!weeklyHoliday}
										size='middle'
										mode='single'
										allowClear
										style={{
											width: "100%",
										}}
										placeholder={t('select')}>
										{weeklyHoliday &&
											weeklyHoliday.map((weeklyHoliday) => (
												<Option key={weeklyHoliday.id} value={weeklyHoliday.id}>
													{weeklyHoliday.name}
												</Option>
											))}
									</Select>
								</Form.Item>
							</Col>
							<Col span={12} className='gutter-row'>
								<h2 className='text-center text-xl mt-3 mb-3 txt-color'>
									{/* Designation & Salary Information */}
									{t('designation_info')}
									
								</h2>

								<Form.Item
									rules={[
										{ required: false, message: "Please input Designation!" },
									]}
									// label='Designation'
									label = {t('designation')}

									name={"designationId"}
									style={{ marginBottom: "10px" }}>
									<Select
										loading={!shift}
										size='middle'
										mode='single'
										allowClear
										style={{
											width: "100%",
										}}
										placeholder={t('designation_select')}>
										{designation &&
											designation.map((designation) => (
												<Option key={designation.id} value={designation.id}>
													{designation.name}
												</Option>
											))}
									</Select>
									{/*<BigDrawer
									title={"new Role"}
									btnTitle={"Role"}
									children={<AddRole drawer={true} />}
										/> */}
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									// label='Designation Start Date'
									label = {t('designation_s_date')}

									rules={[{ required: true, message: "Please input date!" }]}
									name='designationStartDate'>
									<DatePicker placeholder={t('select')} className='date-picker hr-staffs-date-picker' />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									// label='Designation End Date'
									label = {t('designation_e_date')}

									name='designationEndDate'>
									<DatePicker placeholder={t('select')} className='date-picker hr-staffs-date-picker' />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									// label='Salary'
									label = {t('salary')}

									name='salary'
									rules={[
										{
											required: true,
											message: "Please input salary",
										},
									]}>
									<InputNumber style={{ width: "100%" }} />
								</Form.Item>

								<Form.Item
									// label='Salary Start Date'
									label = {t('salary_s_date')}

									name='salaryStartDate'
									style={{ marginBottom: "10px" }}
									rules={[
										{
											required: true,
											message: "Please input date!",
										},
									]}>
									<DatePicker placeholder={t('select')} className='date-picker hr-staffs-date-picker' />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									// label='Salary End Date'
									label = {t('salary_e_date')}

									name='salaryEndDate'>
									<DatePicker placeholder={t('select')} className='date-picker hr-staffs-date-picker' />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									// label='Salary Comment'
									label = {t('salary_comment')}
									name='salaryComment'>
									<Input />
								</Form.Item>
							</Col>
						</Row>

						<h2 className='text-center text-xl mt-3 mb-5 txt-color'>
							{/* Education Information */}
							{t('educ_info')}

						</h2>

						<div className='text-center'>
							<p className='text-red-500 text-base mb-4'>

							{t('select_educ_info')}
								
								{/* Please add education information using the button below */}
							</p>
						</div>

						<Form.List name='educations'>
							{(fields, { add, remove }) => (
								<>
									{fields.map(({ key, name, ...restField }) => (
										<EmployeeEducationForm
											key={key}
											name={name}
											remove={remove}
											restField={restField}
										/>
									))}
									<Form.Item
										style={{ marginBottom: "10px" }}
										wrapperCol={{
											offset: 4,
											span: 16,
										}}>
										<Button
											type='dashed'
											size='middle'
											style={{ color: "#fff", backgroundColor: "#2c3e50" }}
											onClick={() => add()}
											block
											icon={<PlusOutlined />}>

											{t('add_edu')}
											{/* Add Education Information */}
										</Button>
									</Form.Item>
								</>
							)}
						</Form.List>

						<Form.Item
							style={{ marginBottom: "10px", marginTop: "10px" }}
							wrapperCol={{
								offset: 4,
								span: 16,
							}}>
							<Button
								className='mt-5'
								size='large'
								onClick={() => setLoader(true)}
								block
								type='primary'
								htmlType='submit'
								shape='round'
								loading={loader}>
								{/* Add New Staff */}
								{t('add_new_employe')}

							</Button>
						</Form.Item>
					</Form>
				</div>
			</UserPrivateComponent>
		</Fragment>
	);
};

export default AddUser;

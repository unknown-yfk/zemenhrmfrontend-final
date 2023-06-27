import {
	MailOutlined,
	PhoneOutlined,
	ThunderboltOutlined,
	TeamOutlined,
	TrophyOutlined,
	UserOutlined,
	CalendarOutlined,
	ClockCircleOutlined,
	HomeOutlined,
} from "@ant-design/icons";
import { Col, Row, Alert } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import tw from "tailwind-styled-components";
import {
	clearUser,
	deleteStaff,
	loadSingleStaff,
} from "../../redux/rtk/features/user/userSlice";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";
import BtnDeleteSvg from "../UI/Button/btnDeleteSvg";

import EmployeeDesignation from "../UI/EmployeeDesignation";
import EmployeeTimeline from "../UI/EmployeeTimeline";
import DesignationEditPopup from "../UI/PopUp/DesignationEditPopup";
import EducaitonEditPopup from "../UI/PopUp/EducaitonEditPopup";
import ProfileEditPopup from "../UI/PopUp/ProfileEditPopup";

import SalaryEditPopup from "../UI/PopUp/SalaryEditPopup";
import EmployeeSalary from "../UI/EmployeeSalary";

import EmployeeAward from "../UI/EmployeeAward";

import AwardHistoryEditPopup from "../UI/PopUp/AwardHistoryEditPopup";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import { loadAllDesignation } from "../../redux/rtk/features/designation/designationSlice";
import {  useTranslation } from "react-i18next";

//PopUp

const DetailStaff = () => {

	const {t} = useTranslation();

	const { id } = useParams();
	let navigate = useNavigate();

	//dispatch
	const dispatch = useDispatch();
	const user = useSelector((state) => state.users.user);
	const designation = useSelector((state) => state.designations.list);

	console.log(designation, "designation");

	//Delete Supplier
	const onDelete = () => {
		try {
			dispatch(deleteStaff(id));

			setVisible(false);
			toast.warning(`User Name : ${user.id} is removed `);
			return navigate("/admin/hr/staffs");
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
		dispatch(loadSingleStaff(id));
		return () => {
			dispatch(clearUser());
		};
	}, [id]);

	useEffect(() => {
		dispatch(loadAllDesignation());
	}, [dispatch]);

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}

	return (
		<div>
			<UserPrivateComponent permission={"read-user"}>
				<PageTitle title={t('back')} />

				{user ? (
					<div className='mr-top'>
						<section>
							<div className='flex justify-between ant-card rounded h-auto mr-8'>
								{/* Profile Card */}

								<div className='flex justify-start'>
									{/*	<img
										src='https://cdn-icons-png.flaticon.com/512/2202/2202112.png'
										alt='profile'
										className='rounded-full h-40 w-40 m-5'
									/> */}
									<div class='flex justify-center py-8 px-4 mt-4 ml-4'>
										<div class='flex flex-col items-around'>
											<h1 class='text-2xl font-bold txt-color-2 mb-1'>
												{(user?.firstName + " " + user?.lastName).toUpperCase()}
											</h1>
											<h2 class='text-base font-medium txt-color-secondary mb-1'>
												{user?.designationHistory[0]?.designation?.name ||
													t('no_designation')}
											</h2>
											<h3 class='text-base font-medium txt-color-secondary'>
												{user?.department?.name || t('department')}
											</h3>
											<h3 class='text-base font-medium txt-color-secondary'>
												{user?.employeeId || t('no_id')}
											</h3>
										</div>
									</div>
								</div>

								{/* Leave Status */}
								<div className=''>
									<div className='flex justify-center py-8 px-4 mt-4'>
										<div className='flex flex-col items-around'>
											<h1 className='text-2xl font-bold txt-color-2 mb-1'>
												
												{t('leave_satus')}
											</h1>

											<h3 className='text-base font-medium txt-color-secondary'>
												{t('leave')} :{" "}
												<span className='text-base font-medium txt-color-2'>
													{t('paid')} - {user?.leavePolicy.paidLeaveCount} | {t('unpaid')}  -{" "}
													{user?.leavePolicy.unpaidLeaveCount}
												</span>
											</h3>
											<h3 className='text-base font-medium txt-color-secondary'>
												{t('taken')} :{" "}
												<span className='text-base font-medium txt-color-2'>
												{t('paid')} -{" "}
													{user?.leavePolicy.paidLeaveCount -
														user?.leftPaidLeaveDays}{" "}
													| {t('unpaid')} -{" "}
													{user?.leavePolicy.unpaidLeaveCount -
														user?.leftUnpaidLeaveDays}
												</span>
											</h3>
											<h3 className='text-base font-medium txt-color-secondary'>
											{t('balance')} :{" "}
												<span className='text-base font-medium txt-color-2'>
												{t('paid')} - {user?.leftPaidLeaveDays} | {t('unpaid')} -{" "}
													{user?.leftUnpaidLeaveDays}
												</span>
											</h3>
										</div>
									</div>
								</div>

								{/*Clock In and Out Time*/}

								<div className='flex justify-center py-8 px-4 mt-4'>
									<div className='flex flex-col items-around'>
										<h1 className='text-2xl font-bold txt-color-2 mb-1'>
											
											{t('clock_in_out')}
										</h1>

										<h3 className='text-base font-medium txt-color-secondary'>
											{t('in_time')} :{" "}
											<span className='text-base font-medium txt-color-2'>
												{moment(user?.attendance.inTime).format("hh:mm A")}
											</span>
										</h3>

										<h3 className='text-base font-medium txt-color-secondary'>
										{t('out_time')}  :{" "}
											<span className='text-base font-medium txt-color-2'>
												{moment(user?.attendance.outTime).format("hh:mm A")}
											</span>
										</h3>
									</div>
								</div>

								{/* Action Buttons */}

								<div className=''>
									<div className='flex justify-center py-8 px-4 mt-10 mr-4'>
										<UserPrivateComponent permission='update-user'>
											<button className='mr-2 mt-2'>
												{user && <ProfileEditPopup data={user} />}
											</button>
										</UserPrivateComponent>
										<UserPrivateComponent permission='delete-user'>
											<button onClick={onDelete}>
												<BtnDeleteSvg size={30} />
											</button>
										</UserPrivateComponent>
									</div>
								</div>
							</div>
						</section>
						<Row
							className='mt-5'
							gutter={{
								xs: 8,
								sm: 16,
								md: 24,
								lg: 32,
								xl: 32,
							}}>
							<Col
								xs={24}
								sm={12}
								md={12}
								lg={11}
								xl={11}
								className='new-card rounded h-auto m-2'>
								<ProfileCardText className='text-start'>
								
									{t('personal_info')}
								</ProfileCardText>

								<Hr />

								<div className='m-5'>
									<ul className='space-y-4'>
										<li className='flex items-center'>
											<TeamOutlined
												className='mr-3'
												style={{ fontSize: "15px" }}
											/>
											<span className='txt-color-2 font-medium'>
												{t('department')}:
											</span>
											<p className='txt-color-secondary ml-2'>
												{user?.department?.name}
											</p>
										</li>
										<li className='flex items-center'>
											<TrophyOutlined
												className='mr-3'
												style={{ fontSize: "15px" }}
											/>
											<span className='txt-color-2 font-medium'>
												{t('emp_status')}:
											</span>
											<p className='txt-color-secondary ml-2'>
												{user?.employmentStatus?.name}
											</p>
										</li>

										<li className='flex items-center'>
											<CalendarOutlined
												className='mr-3'
												style={{ fontSize: "15px" }}
											/>
											<span className='txt-color-2 font-medium'>
												{t('join_date')} :
											</span>
											<p className='txt-color-secondary ml-2'>
												{moment(user?.joinDate).format("ll")}
											</p>
										</li>

										<li className='flex items-center'>
											<CalendarOutlined
												className='mr-3'
												style={{ fontSize: "15px" }}
											/>
											<span className='txt-color-2 font-medium'>
											{t('leave_date')} :
											</span>
											<p className='txt-color-secondary ml-2'>
												{user?.leaveDate
													? moment(user?.leaveDate).format("ll")
													: "PRESENT"}
											</p>
										</li>

										<li className='flex items-center'>
											<UserOutlined
												className='mr-3'
												style={{ fontSize: "15px" }}
											/>
											<span className='txt-color-2 font-medium'>{t('role')} :</span>
											<p className='txt-color-secondary ml-2'>
												{user?.role?.name || t('no')}
											</p>
										</li>

										<li className='flex items-center'>
											<CalendarOutlined
												className='mr-3'
												style={{ fontSize: "15px" }}
											/>
											<span className='txt-color-2 font-medium'>
											{t('leave_policy')} :
											</span>
											<p className='txt-color-secondary ml-2'>
												{user?.leavePolicy.name}
											</p>
										</li>

										<li className='flex items-center'>
											<CalendarOutlined
												className='mr-3'
												style={{ fontSize: "15px" }}
											/>
											<span className='txt-color-2 font-medium'>
											
											{t('weekly_holiday')} :
											</span>
											<p className='txt-color-secondary ml-2'>
												{user?.weeklyHoliday.name}
											</p>
										</li>

										<li className='flex items-center'>
											<ClockCircleOutlined
												className='mr-3'
												style={{ fontSize: "15px" }}
											/>
											<span className='txt-color-2 font-medium'>{t('shift')} :</span>
											<p className='txt-color-secondary ml-2'>
												{user?.shift?.name ||  t('no')} (
												{moment(user?.shift?.startTime).format("LT")} -{" "}
												{moment(user?.shift?.endTime).format("LT")})
											</p>
										</li>
									</ul>
								</div>
							</Col>
							<Col
								xs={24}
								sm={12}
								md={12}
								lg={12}
								xl={12}
								className='new-card rounded h-auto m-2'>
								<ProfileCardText className='text-start'>
								{t('contact_info')}
								</ProfileCardText>

								<Hr />
								<div className='m-5'>
									<ul className='space-y-4'>
										<li className='flex items-center'>
											<MailOutlined
												className='mr-3'
												style={{ fontSize: "15px" }}
											/>
											<span className='txt-color-2 font-medium'>
												{t('email')}
												:  </span>
											<p className='txt-color-secondary  ml-2'>
												{user?.email || t('no')}
											</p>
										</li>
										<li className='flex items-center'>
											<PhoneOutlined
												className='mr-3'
												style={{ fontSize: "15px" }}
											/>
											<span className='txt-color-2 font-medium'>
											{t('phone')}
												   :</span>
											<p className='txt-color-secondary ml-2'>
												{user?.phone || t('no')}
											</p>
										</li>

										<li className='flex items-start'>
											<HomeOutlined
												className='mr-3'
												style={{ fontSize: "15px" }}
											/>
											<span className='txt-color-2 font-medium'>{t('አድራሻ')}:

											</span>
											<div className=''>
												<li className='txt-color-secondary ml-2'>
													{" "}
													{t('city')}: {user?.street ||  t('no')}
												</li>
												<li className='txt-color-secondary ml-2'>
													{" "}
													{t('k_ketema')} : {user?.city ||  t('no')}
												</li>
												<li className='txt-color-secondary ml-2'>
													{" "}
													{t('woreda')} : {user?.state ||  t('no')}
												</li>
												<li className='txt-color-secondary ml-2'>
													{" "}
													{t('region')} : {user?.country ||  t('no')}
												</li>

												<li className='txt-color-secondary ml-2'>
													{" "}
													{t('Kebele')} : {user?.zipCode ||  t('no')}
												</li>
											</div>
										</li>

										<li className='flex items-center'>
											<ThunderboltOutlined
												className='mr-3'
												style={{ fontSize: "15px" }}
											/>
											<span className='txt-color-2 font-medium'>
												{t('blood_t')}:
											</span>
											<p className='txt-color-secondary ml-2'>
												{user?.bloodGroup ||  t('no')}
											</p>
										</li>
									</ul>
								</div>
							</Col>
							<Col
								xs={24}
								sm={12}
								md={12}
								lg={11}
								xl={11}
								className='new-card rounded h-auto m-2'>
								<div className='flex justify-between'>
									<ProfileCardText className='text-start'>
										{t('designation_hist')}
									</ProfileCardText>

									<UserPrivateComponent
										permission={"update-designationHistory"}>
										{user?.designationHistory && (
											<DesignationEditPopup data={user?.designationHistory} />
										)}
									</UserPrivateComponent>
								</div>
								<Hr />
								<div className='flex justify-start ml-10'>
									{user?.designationHistory.length !== 0 ? (
										<EmployeeDesignation list={user?.designationHistory} />
									) : (
										<div className='mb-10'>
											<p className='text-center mt-3 mb-3'>
											{t('no_designation')}
											</p>
											<Alert
												message={t('not_found')}
												type='info'
												showIcon
											/>
										</div>
									)}
								</div>
							</Col>

							<Col
								xs={24}
								sm={12}
								md={12}
								lg={11}
								xl={12}
								className='new-card rounded h-auto m-2 '>
								<div className='flex justify-between'>
									<ProfileCardText className='text-start'>
										
										{t('educ_hist')}
									</ProfileCardText>
									<UserPrivateComponent permission={"update-education"}>
										{user?.educations && (
											<EducaitonEditPopup data={user?.educations} />
										)}
									</UserPrivateComponent>
								</div>
								<Hr />
								<div className='flex justify-start ml-10'>
									{user?.educations.length !== 0 ? (
										<EmployeeTimeline list={user?.educations} />
									) : (
										<div className='mb-10'>
											<p className='text-center mt-3 mb-3'>
											
												{t('no_educ')}
											</p>
											<Alert
												message={t('not_found')}
												type='info'
												showIcon
											/>
										</div>
									)}
								</div>
							</Col>

							<Col
								xs={24}
								sm={12}
								md={12}
								lg={11}
								xl={11}
								className='new-card rounded h-auto m-2 '>
								<div className='flex justify-between'>
									<ProfileCardText className='text-start'>
									
										{t('salary_hist')}
									</ProfileCardText>
									<UserPrivateComponent permission={"update-salaryHistory"}>
										{user?.salaryHistory && (
											<SalaryEditPopup data={user?.salaryHistory} />
										)}
									</UserPrivateComponent>
								</div>
								<Hr />
								<div className='flex justify-start ml-10'>
									{user?.salaryHistory.length !== 0 ? (
										<EmployeeSalary list={user?.salaryHistory} />
									) : (
										<div className='mb-10'>
											<p className='text-center mt-3 mb-3 '>
												
												{t('no_sala')}
											</p>
											<Alert
											    message={t('not_found')}
												type='info'
												showIcon
											/>
										</div>
									)}
								</div>
							</Col>

							<Col
								xs={24}
								sm={12}
								md={12}
								lg={11}
								xl={12}
								className='new-card rounded h-auto m-2 '>
								<div className='flex justify-between'>
									<ProfileCardText className='text-start'>
									
										{t('award_hist')}
									</ProfileCardText>

									<UserPrivateComponent permission={"update-awardHistory"}>
										{user?.awardHistory && (
											<AwardHistoryEditPopup data={user?.awardHistory} />
										)}
									</UserPrivateComponent>
								</div>
								<Hr />
								<div className='flex justify-start ml-10'>
									{user?.awardHistory.length !== 0 ? (
										<EmployeeAward list={user?.awardHistory} />
									) : (
										<div className='mb-10'>
											<p className='text-center mt-3 mb-3 '>
											{t('no_award')}
											</p>
											<Alert
												message={t('not_found')}
												type='info'
												showIcon
											/>
										</div>
									)}
								</div>
							</Col>
						</Row>
					</div>
				) : (
					<div className='mt-10'>
						<Loader />
					</div>
				)}
			</UserPrivateComponent>
		</div>
	);
};

const ProfileCardText = tw.div`
txt-color-2
text-xl
 text-center
  mt-5 `;

const Hr = tw.hr`
mt-3
mb-3
new-hr

`;

const Information = tw.div`
m-5
`;

export default DetailStaff;

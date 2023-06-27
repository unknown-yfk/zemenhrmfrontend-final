import {
	ClockCircleOutlined,
	CheckOutlined,
	UsergroupDeleteOutlined,
	RocketOutlined,
	NotificationFilled,
	TrophyFilled,
	SubnodeOutlined,
	CalendarOutlined,
	FileDoneOutlined,
	PieChartFilled,
	FileOutlined,
	FlagFilled,
	HomeOutlined,
	SettingOutlined,
	UnorderedListOutlined,
	UsergroupAddOutlined,
	UserOutlined,
	UserSwitchOutlined,
	WalletOutlined,
	FileSyncOutlined,
	FlagOutlined,
	FormOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { disable } from "workbox-navigation-preload";
import getPermissions from "../../utils/getPermissions";
import getUserFromToken from "../../utils/getUserFromToken";
import styles from "./Sidenav.module.css";
import {  useTranslation } from "react-i18next";
import i18next from "i18next";
import Languageoption from "../language-dropdown";

const Sidenav = ({ color, sideNavOpenKeys }) => {


	const {t} = useTranslation();

	const user = getUserFromToken();
	const permissions = getPermissions();
	const hasPermission = (item) => {
		return permissions.includes(item);
	};
	// console.log("haspermission", hasPermission("create-user"));
	const menu = [
		{
			label: (
				<NavLink to='/admin/dashboard'>
					<span> {t('dashboard')}</span>		
				</NavLink>
			),
			key: "dashboard",
			icon: <HomeOutlined />,
		},

		(hasPermission("create-user") ||
			hasPermission("read-user") ||
			hasPermission("read-role") ||
			hasPermission("read-designation") ||
			hasPermission("read-department")) && {
			label: (
				<span> {t('hr')}</span>		
			),
			key: "hr",
			icon: <UserOutlined />,
			children: [
				hasPermission("create-user") && {
					label: (
						<NavLink to='/admin/hr/staffs/new'>
					
					<span> {t('new_employee')}</span>		

						</NavLink>
					),

					key: "staffs",
					icon: <UsergroupAddOutlined />,
				},
				hasPermission("read-user") && {
					label: (
						<NavLink to='/admin/hr/staffs'>
						
					<span> {t('employee_list')}</span>		

						</NavLink>
					),
					key: "users",
					icon: <UsergroupAddOutlined />,
				},
				hasPermission("read-role") && {
					label: (
						<NavLink to='/admin/role'>
						
					<span> {t('role_permission')}</span>		
							
						</NavLink>
					),
					key: "roleAndPermissions",
					icon: <UserSwitchOutlined />,
				},
				hasPermission("read-designation") && {
					label: (
						<NavLink to='/admin/designation/'>
							
					<span> {t('designation')}</span>		

						</NavLink>
					),
					key: "designation",
					icon: <UserSwitchOutlined />,
				},
				hasPermission("read-department") && {
					label: (
						<NavLink to='/admin/department'>
					<span> {t('department')}</span>		

						</NavLink>
					),
					key: "department",
					icon: <UserSwitchOutlined />,
				},
			],
		},

		(hasPermission("create-attendance") ||
			hasPermission("read-attendance")) && {
			label: (
				<span> {t('attendance')}</span>		
			),

			key: "attendance",
			icon: <ClockCircleOutlined />,
			children: [
				hasPermission("create-attendance") && {
					label: (
						<NavLink to='/admin/attendance'>
							<span> {t('attendance')}</span>		
						</NavLink>
					),
					key: "attendance",
					icon: <FileDoneOutlined />,
				},
				hasPermission("read-attendance") && {
					label: (
						<NavLink to={`/admin/attendance/user/${user}`}>
							
							<span> {t('my_attendance')}</span>		
						</NavLink>
					),
					key: "myAttendance",
					icon: <FileDoneOutlined />,
				},
			],
		},

		
		(hasPermission("create-payroll") || hasPermission("read-payroll")) && {
			label:(


				t('payroll')
				
				),
			key: "payroll",
			icon: <WalletOutlined />,
			children: [
				hasPermission("create-payroll") && {
					label: (
						// <NavLink to='http://localhost:3001/' >
						<NavLink to='#' >


							<span> {t('payroll')}</span>		
			
						</NavLink>
					),
					key: "calculatePayroll",
					icon: <FileDoneOutlined />,
				},
				
			],
		},

		hasPermission("read-shift") && {
			label: (

				<span> {t('shift')}</span>		

			),
			key: "shift",
			icon: <ClockCircleOutlined />,
			children: [
				hasPermission("read-shift") && {
					label: (
						<NavLink to='/admin/shift'>
						
							<span> {t('shift')}</span>		

						</NavLink>
					),
					key: "newShift",
					icon: <FileDoneOutlined />,
				},
			],
		},

		hasPermission("read-employmentStatus") && {
			label: (

				<span> {t('employment')}</span>		

			),
			key: "employementStatus",
			icon: <RocketOutlined />,
			children: [
				hasPermission("read-employmentStatus") && {
					label: (
						<NavLink to='/admin/employment-status'>
						
							<span> {t('status')}</span>		
				
						</NavLink>
					),
					key: "employementStatus",
					icon: <FileDoneOutlined />,
				},
			],
		},

		(hasPermission("create-leaveApplication") ||
			hasPermission("read-leaveApplication")) && {
			 label: (

				<span> {t('leave')}</span>		

			),
			key: "leave",
			icon: <UsergroupDeleteOutlined />,
			children: [
				hasPermission("create-leaveApplication") && {
					label: (
						<NavLink to='/admin/leave/new'>

								<span> {t('new_leave')}</span>	
							
						</NavLink>
					),
					key: "newLeave",
					icon: <SubnodeOutlined />,
				},
				hasPermission("read-leaveApplication") && {
					label: (
						<NavLink to='/admin/leave'>
						
							<span> {t('leave_satus')}</span>
						</NavLink>
					),
					key: "leaveStatus",
					icon: <FileDoneOutlined />,
				},
				hasPermission("read-leaveApplication") && {
					label: (
						<NavLink to={`/admin/leave/user/${user}`}>
							
							<span> {t('my_leaves')}</span>

						</NavLink>
					),
					key: "myLeaves",
					icon: <FileDoneOutlined />,
				},
			],
		},

		(hasPermission("read-weeklyHoliday") ||
			hasPermission("read-publicHoliday")) && {
				label: (

					<span> {t('holiday')}</span>		
	
				),
			key: "holiday",
			icon: <CalendarOutlined />,
			children: [
				hasPermission("read-weeklyHoliday") && {
					label: (
						<NavLink to='/admin/holiday/week'>
						
					<span> {t('weekly_holiday')}</span>		

						</NavLink>
					),
					key: "weeklyHoliday",
					icon: <PieChartFilled />,
				},
				hasPermission("read-publicHoliday") && {
					label: (
						<NavLink to='/admin/holiday/public'>
					<span> {t('public_holiday')}</span>		

						</NavLink>
					),
					key: "publicHoliday",
					icon: <PieChartFilled />,
				},
			],
		},

		hasPermission("read-leavePolicy") && {
			label: (

				<span> {t('leave_policy')}</span>		

			),
			key: "leavePolicy",
			icon: <CalendarOutlined />,
			children: [
				hasPermission("read-leavePolicy") && {
					label: (
						<NavLink to='/admin/leave-policy'>
				<span> {t('leave_policy')}</span>		

						</NavLink>
					),
					key: "leavePolicy",
					icon: <PieChartFilled />,
				},
			],
		},

		hasPermission("read-announcement") && {
			label: (

				<span> {t('anouncement')}</span>		

			),
			key: "announcement",
			icon: <NotificationFilled />,
			children: [
				hasPermission("read-announcement") && {
					label: (
						<NavLink to='/admin/announcement'>
						
							<span> {t('anouncement')}</span>
						</NavLink>
					),
					key: "newLeave",
					icon: <FlagFilled />,
				},
			],
		},

		// (hasPermission("read-account") ||
		// 	hasPermission("read-transaction") ||
		// 	hasPermission("create-transaction")) && {
		// 		label: (

		// 			<span> {t('accounts')}</span>		
	
		// 		),
		// 	key: "accounts",
		// 	icon: <WalletOutlined />,
		// 	children: [
		// 		hasPermission("read-account") && {
		// 			label: (
		// 				<NavLink to='/admin/account/'>
		// 					<span> {t('acoount')}</span>		
		// 				</NavLink>
		// 			),
		// 			key: "accountList",
		// 			icon: <UnorderedListOutlined />,
		// 		},
		// 		hasPermission("create-transaction") && {
		// 			label: (
		// 				<NavLink to='/admin/transaction/create'>
		// 					<span> {t('new_transaction')}</span>	
		// 				</NavLink>
		// 			),
		// 			key: "newTransaction",
		// 			icon: <CheckOutlined />,
		// 		},
		// 		hasPermission("read-transaction") && {
		// 			label: (
		// 				<NavLink to='/admin/transaction/'>

		// 					<span> {t('transaction_list')}</span>	

		// 				</NavLink>
		// 			),
		// 			key: "transactionList",
		// 			icon: <UnorderedListOutlined />,
		// 		},
		// 	],
		// },

		// hasPermission("read-account") && {
		// 	label: (

		// 		<span> {t('finance_report')}</span>		

		// 	),
		// 	key: "report",
		// 	icon: <FlagOutlined />,
		// 	children: [
		// 		hasPermission("read-account") && {
		// 			label: (
		// 				<NavLink to='/admin/account/trial-balance'>
					
		// 					<span> {t('trail_balance')}</span>		

		// 				</NavLink>
		// 			),
		// 			key: "trialBalance",
		// 			icon: <FileDoneOutlined />,
		// 		},
		// 		hasPermission("read-account") && {
		// 			label: (
		// 				<NavLink to='/admin/account/balance-sheet'>
						
		// 					<span> {t('balance_sheet')}</span>		

		// 				</NavLink>
		// 			),
		// 			key: "balanceSheet",
		// 			icon: <FileOutlined />,
		// 		},
		// 		hasPermission("read-account") && {
		// 			label: (
		// 				<NavLink to='/admin/account/income'>
						
		// 					<span> {t('income_statement')}</span>		

		// 				</NavLink>
		// 			),
		// 			key: "incomeStatement",
		// 			icon: <FileSyncOutlined />,
		// 		},
		// 	],
		// },

		(hasPermission("crate-award") || hasPermission("read-award")) && {
			label: (

				<span> {t('performance_award')}</span>		

			),
			key: "award",
			icon: <TrophyFilled />,
			children: [
				hasPermission("create-award") && {
					label: (
						<NavLink to='/admin/award/new'>
					
							<span> {t('new_performance')}</span>	
						</NavLink>
					),
					key: "newAward",
					icon: <TrophyFilled />,
				},

				hasPermission("read-award") && {
					label: (
						<NavLink to='/admin/award'>
						
						<span> {t('performance_award')}</span>		

						</NavLink>
					),
					key: "award",
					icon: <TrophyFilled />,
				},
			],
		},

		hasPermission("create-user") && {
			label: (

				t('letters')
			),
			key: "settings",
			icon: <FormOutlined />,
			
			children: [
				hasPermission("create-user") && {
					label: (
						// <NavLink to='http://localhost:3001/letters/' >
								<NavLink to='#' >
							<span>{t('letter')}</span>
						</NavLink>
					),
					key: "invoiceSetting",
					icon: <FormOutlined />
					
				},
			],
		},

		hasPermission("read-setting") && {
			label: (

				<span> {t('settings')}</span>		

			),
			key: "settings",
			icon: <SettingOutlined />,
			children: [
				hasPermission("read-setting") && {
					label: (
						<NavLink to='/admin/company-setting'>
					
				<span> {t('comapny_settings')}</span>		

						</NavLink>
					),
					key: "invoiceSetting",
					icon: <SettingOutlined />,
				},
			],
		},
	];

	return (
		<div className="side-bar">
			<Menu
				theme='dark'
				mode='inline'
				items={menu}
				className='sidenav-menu'
				// openKeys={[sideNavOpenKeys]}
				// style={{ backgroundColor: "transparent" }}
			/>
		</div>
	);
};

export default Sidenav;

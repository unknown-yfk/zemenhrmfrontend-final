import { Button, Card, Col, Form, Input, Row, Typography, Select } from "antd";
import React, { useState } from "react";
import styles from "./Login.module.css";

import { useDispatch } from "react-redux";
import { addUser } from "../../redux/rtk/features/user/userSlice";

import { toast } from "react-toastify";
import LoginTable from "../Card/LoginTable";
import {  useTranslation } from "react-i18next";


const Login = () => {
	const {t} = useTranslation();

	const dispatch = useDispatch();
	const [loader, setLoader] = useState(false);
	const { Title } = Typography;

	const onFinish = async (values) => {
		const resp = await dispatch(addUser(values));
		if (resp.payload.message === "success") {
			setLoader(false);
			window.location.href = "/admin/dashboard";
		} else {
			setLoader(false);
		}
	};
	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
		setLoader(false);
		toast.error("Error at login Please try again");
	};

	return (
		<>
			<Row className='card-row '>
			{/* drop-shadow-sm appearance-none text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 */}
				<Col span={24}>
					<Card bordered={true}  className={styles.card}>
						<Title level={3} className='m-3 text-center'>
							{/* Login */}
							{t('login')}

						</Title>
						<Form
							name='basic'
							labelCol={{
								span: 6,
							}}
							wrapperCol={{
								span: 16,
							}}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete='off'>
							<Form.Item
								className='mb-5'
								label={t('user_name')}
								name='userName'
								rules={[
									{
										required: true,
										message: "Please input your userName!",
									},
								]}>
								<Input />
							</Form.Item>

							<Form.Item
								className='mb-5'
								label={t('password')}
								name='password'
								rules={[
									{
										required: true,
										message: "Please input your password!",
									},
								]}>
								<Input.Password />
							</Form.Item>

							<Form.Item className={styles.submitBtnContainer}>
								<Button
									type='primary'
									htmlType='submit'
									loading={loader}
									onClick={() => setLoader(true)}>
									{t('submit')}
								</Button>
							</Form.Item>
							<Form.Item className={styles.loginTableContainer}>
								<Row>
									<Col span={24}>
									</Col>
								</Row>
							</Form.Item>
						</Form>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default Login;

import { Button, Col, Form, Input, Row, Typography } from "antd";

import React, { Fragment, useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import {
	addAnnouncement,
	loadAllAnnouncement,
} from "../../redux/rtk/features/announcement/announcementSlice";
import {  useTranslation } from "react-i18next";

const AddAnnouncement = ({ drawer }) => {
	const {t} = useTranslation();

	const { loading } = useSelector((state) => state.announcement);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadAllAnnouncement());
	}, []);

	const { Title } = Typography;
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		const resp = await dispatch(addAnnouncement(values));

		if (resp.payload.message === "success") {
			form.resetFields();
			dispatch(loadAllAnnouncement());
		}
	};

	const onFinishFailed = (errorInfo) => {
		toast.warning("Failed at adding shift");
	};

	return (
		<Fragment>
			<Row className='mr-top' justify={drawer ? "center" : "space-between"}>
				<Col
					xs={24}
					sm={24}
					md={24}
					lg={drawer ? 22 : 16}
					xl={drawer ? 22 : 12}
					className='column-design border rounded card-custom'>
					<Title level={4} className='m-2 mt-5 mb-5 text-center'>
						{t('add_anouncement')}
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
								label={t('title')}
								name='title'
								rules={[
									{
										required: true,
										message: "Please input your title!",
									},
								]}>
								<Input placeholder='Meeting at 00:00' />
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "20px" }}
								label={t('description')}
								name={"description"}>
								<Input.TextArea placeholder={t('description')} />
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "10px" }}
								wrapperCol={{
									offset: 6,
									span: 12,
								}}>
								<Button
									type='primary'
									size='large'
									block
									htmlType='submit'
									loading={loading}>
									
									{t('add_anouncement')}
								</Button>
							</Form.Item>
						</div>
					</Form>
				</Col>
			</Row>
			<hr />
		</Fragment>
	);
};

export default AddAnnouncement;

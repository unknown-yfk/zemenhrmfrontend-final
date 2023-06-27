import { Button, DatePicker, Form, Input, Space } from "antd";
import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import {  useTranslation } from "react-i18next";


const EmployeeEducationForm = ({ key, restField, remove, name }) => {

	const {t} = useTranslation();

	return (
		<div>
			<Space
				key={key}
				style={{
					display: "flex",

					justifyContent: "space-between",
					marginBottom: 8,
				}}
				align='baseline'>
				<Form.Item
					{...restField}
					name={[name, "degree"]}
					rules={[
						{
							required: true,
							message: "Missing  degree",
						},
					]}>
					<Input placeholder={t('degree')} />
				</Form.Item>
				<Form.Item
					{...restField}
					name={[name, "institution"]}
					rules={[
						{
							required: true,
							message: "Missing institution",
						},
					]}>
					<Input placeholder={t('inst')} />
				</Form.Item>
				<Form.Item
					{...restField}
					name={[name, "result"]}
					rules={[{ required: true, message: "Missing result" }]}>
					<Input placeholder={t('result')} />
				</Form.Item>

				<Form.Item
					{...restField}
					name={[name, "studyStartDate"]}
					rules={[{ required: true, message: "Missing studyStartDate" }]}>
					<DatePicker placeholder={t('educ_st_d')}  />
				</Form.Item>

				<Form.Item
					{...restField}
					name={[name, "studyEndDate"]}
					rules={[{ required: true, message: "Missing studyEndDate" }]}>
					<DatePicker placeholder={t('educ_en_d')} />
				</Form.Item>

				<Form.Item
					{...restField}
					name={[name, "fieldOfStudy"]}
					rules={[{ required: true, message: "Missing fieldOfStudy" }]}>
					<Input placeholder={t('educ_field')} />
				</Form.Item>
				<MinusCircleOutlined
					className='txt-color'
					style={{ fontSize: "150%" }}
					onClick={() => remove(name)}
				/>
			</Space>
		</div>
	);
};

export default EmployeeEducationForm;

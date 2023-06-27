import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { loadSingleStaff } from "../../../redux/rtk/features/user/userSlice";
import { addDesHistory } from "../../designationHistory/designationHistoryApis";
import AddAwardHistory from "../../awardHistory/AddAwardHistory";
import {  useTranslation } from "react-i18next";


const AwardAddSinglePopup = ({ data, setLoading }) => {

	const {t} = useTranslation();

	const [isModalOpen, setIsModalOpen] = useState(false);

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
			<div className='text-center'>
				<Button type='primary' onClick={showModal}>
					
					{t('add_new')}
				</Button>
			</div>
			<Modal
				title={t('add_award')}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				<AddAwardHistory setLoading={setLoading} />
			</Modal>
		</>
	);
};
export default AwardAddSinglePopup;

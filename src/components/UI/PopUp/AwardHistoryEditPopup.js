import { Button, Modal } from "antd";
import { useState } from "react";
import BtnEditSvg from "../Button/btnEditSvg";
import Loader from "../../loader/loader";

import EmployeeAward from "../EmployeeAward";
import AwardAddSinglePopup from "./AwardHistoryAddSinglePopup";
import {  useTranslation } from "react-i18next";

const AwardHistoryEditPopup = ({ data }) => {
	const {t} = useTranslation();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);

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
			<button onClick={showModal} className='mt-4 mr-2'>
				<BtnEditSvg size={25} />
			</button>
			<Modal
				title={t('edit_awa')}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				{!loading ? (
					<>
						<EmployeeAward list={data} edit={true} setLoading={setLoading} />
						<AwardAddSinglePopup setLoading={setLoading} />
					</>
				) : (
					<Loader />
				)}
			</Modal>
		</>
	);
};
export default AwardHistoryEditPopup;

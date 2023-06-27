import { Button, Modal } from "antd";
import { useState } from "react";
import BtnEditSvg from "../Button/btnEditSvg";
import EmployeeTimeline from "../EmployeeTimeline";
import EducaitonAddSinglePopup from "./EducaitonAddSinglePopup";
import Loader from "../../loader/loader";
import {  useTranslation } from "react-i18next";

const EducaitonEditPopup = ({ data }) => {

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
			<button onClick={showModal} className='mt-4'>
				<BtnEditSvg size={25} />
			</button>
			<Modal
					title={t('edit_educ')}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				{!loading ? (
					<>
						<EmployeeTimeline list={data} edit={true} setLoading={setLoading} />
						<EducaitonAddSinglePopup setLoading={setLoading} />
					</>
				) : (
					<Loader />
				)}
			</Modal>
		</>
	);
};
export default EducaitonEditPopup;

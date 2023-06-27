import { Spin } from "antd";
import React from "react";
import {  useTranslation } from "react-i18next";


function Loader(props) {
	const {t} = useTranslation();

	return (
		<div className='text-center'>
			<div className='loading'>
				<h5 className='text-xl mb-3'> {t('load')}</h5>
				<Spin size={"large"} />
			</div>
		</div>
	);
}

export default Loader;

import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import "./designtaion.css";

import { Table } from "antd";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import {
	loadAllDesignation,
	loadAllDesignationByEmployee,
} from "../../redux/rtk/features/designation/designationSlice";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import ViewBtn from "../Buttons/ViewBtn";
import { CsvLinkBtn } from "../UI/CsvLinkBtn";
import {  useTranslation } from "react-i18next";

function CustomTable({ list, loading ,total}) {
	const {t} = useTranslation();

	const dispatch = useDispatch();

	const [columnsToShow, setColumnsToShow] = useState([]);

	const columns = [
		{
			id: 1,
			title: t('id'),
			dataIndex: "id",
			key: "id",
		},
		{
			id: 2,
			title: t('name'),
			dataIndex: "name",
			key: "name",
			render: (name, { id }) => (
				<Link to={`/admin/designation/${id}`}>{name}</Link>
			),
		},

		{
			id: 3,
			title: t('action'),
			key: "action",
			render: ({ id }) => <ViewBtn path={`/admin/designation/${id}/`} />,
			
			
		},
	];

	useEffect(() => {
		setColumnsToShow(columns);
	}, []);

	const columnsToShowHandler = (val) => {
		setColumnsToShow(val);
	};

	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	return (
		<div className='mt-4'>
			<div className='text-center my-2 flex justify-between'>
				<h5 className='text-xl ml-4'>
					{t('designation_list')}
					</h5>
				{list && (
					<div>
						<CsvLinkBtn>
							<CSVLink
								data={list}
								className='btn btn-dark btn-sm mb-1'
								filename='designation'>
								{t('download_csv')}
							</CSVLink>
						</CsvLinkBtn>
					</div>
				)}
			</div>

			{list && (
				<div style={{ marginBottom: "30px" }} className='ml-4 mt-3'>
					<ColVisibilityDropdown
						options={columns}
						columns={columns}
						columnsToShowHandler={columnsToShowHandler}
					/>
				</div>
			)}



			<Table
				scroll={{ x: true }}
				loading={!list}
				pagination={{
					defaultPageSize: 10,
					showSizeChanger: true,
					total: total ? total : 20,

					onChange: (page, limit) => {
						dispatch(
							loadAllDesignation({ page, limit})
						);
					},
				}}
				columns={columnsToShow}
				dataSource={list ? addKeys(list) : []}
			/>	



		</div>
	);
}

const GetAllDesignation = (props) => {
	const dispatch = useDispatch();
	const { list, loading } = useSelector((state) => state.designations);

	useEffect(() => {
		dispatch(loadAllDesignation({
				page: 1,
				limit: 30,
		}));
	}, []);


	// useEffect(() => {
	//   deleteHandler(list, deletedId);
	// }, [deletedId, list]);

	return (
		<div className='card column-design'>
			<div className='card-body'>
				<CustomTable list={list} loading={loading} />
			</div>
		</div>
	);
};

export default GetAllDesignation;



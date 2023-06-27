import { Table } from "antd";
import moment from "moment";
import React from "react";
import ViewBtn from "../../Buttons/ViewBtn";

const SalaryHistoryTable = ({ list }) => {
	const columns = [
		{
			title: "Salary",
			dataIndex: "salary",
			key: "salary",
		},
		{
			title: "Start Date",
			dataIndex: "startDate",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.startDate - b.startDate,
			render: (date) => (date ? moment(date).format("ll") : "N/A"),
		},
		{
			title: "End Date",
			dataIndex: "endDate",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.endDate - b.endDate,
			render: (date) => (date ? moment(date).format("ll") : "N/A"),
		},
		{
			title: "Comment",
			dataIndex: "comment",
			key: "comment",
		},

		{
			title: "Action",
			dataIndex: "id",
			key: "action",
			render: (id) => <ViewBtn path={`/admin/hr/staffs/${id}/`} />,
		},
	];
	return (
		<div className='m-10'>
			<Table columns={columns} dataSource={list} pagination />
		</div>
	);
};

export default SalaryHistoryTable;

import { Card, Col, Row, Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import ViewBtn from "../../Buttons/ViewBtn";

const UserListCard = ({ list, loading }) => {
	
	const columns = [
		{
			id: 1,
			title: "ID",
			dataIndex: "id",
			key: "id",

		},

		{
			id: 2,
			title: " Name",
			key: "user",
			dataIndex: "user",
			render: (user) => user?.firstName + " " + user?.lastName,	
		},


		{
			id: 3,
			title: "Action",
			dataIndex: "id",
			key: "action",
			render: (user) => <ViewBtn path={`/admin/hr/staffs/${id}/`
		
		} 
			/>,
			
		},
	];




	

	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	return (
		<Row>
			<Col span={24}>
				<Card
					className='header-solid h-full'
					bordered={false}
					title={[
						<h5 className='font-semibold m-0 text-center'>
							Staffs Information
						</h5>,
					]}
					bodyStyle={{ padding: "0" }}>
					<div className='col-info'>
						<Table
							scroll={{ x: true }}
							loading={loading}
							columns={columns}
							dataSource={list ? addKeys(list) : []}
						/>
					</div>
				</Card>
			</Col>
		</Row>
	);
};

export default UserListCard;

import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Popover, Typography } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";

import { toast } from "react-toastify";
import "./transaction.css";

import moment from "moment";
import {
	clearTransaction,
	loadTransaction,
} from "../../redux/rtk/features/transaction/transactionSlice.js";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

//PopUp

const DetailTransaction = () => {
	const { id } = useParams();
	let navigate = useNavigate();

	//dispatch
	const dispatch = useDispatch();
	const payment = useSelector((state) => state.transactions.transaction);

	//Delete Supplier
	const onDelete = () => {
		try {
			// dispatch(deleteSupplierPayment(id));

			setVisible(false);
			toast.warning(`Transaction : ${payment.id} is removed `);
			return navigate("/admin/payment");
		} catch (error) {
			console.log(error.message);
		}
	};
	// Delete Supplier PopUp
	const [visible, setVisible] = useState(false);

	const handleVisibleChange = (newVisible) => {
		setVisible(newVisible);
	};

	useEffect(() => {
		dispatch(loadTransaction(id));
		return () => {
			dispatch(clearTransaction());
		};
	}, [id]);

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}

	return (
		<div>
			<PageTitle title=' Back ' subtitle={`Payment ${id} information`} />

			<UserPrivateComponent permission={"read-transaction"}>
				<div className='mr-top'>
					{payment ? (
						<Fragment key={payment.id}>
							<Card bordered={false} className='card-custom'>
								<div
									className='card-header d-flex justify-content-between mb-2'
									style={{ padding: 0 }}>
									<h5>
										<i className='bi bi-person-lines-fill'></i>
										<span className='mr-left'>
											ID : {payment.id} | {payment.date}
										</span>
									</h5>
									<div className='text-end'>
										<Popover
											content={
												<a onClick={onDelete}>
													<Button type='primary' danger>
														Yes Please !
													</Button>
												</a>
											}
											title='Are you sure you want to delete ?'
											trigger='click'
											visible={visible}
											onVisibleChange={handleVisibleChange}>
											<Button
												type='danger'
												shape='round'
												icon={<DeleteOutlined />}></Button>
										</Popover>
									</div>
								</div>
								<div>
									<p>
										<Typography.Text className='font-semibold'>
											Date :
										</Typography.Text>{" "}
										{moment(payment.date).format("YYYY-MM-DD")}
									</p>

									<p>
										<Typography.Text strong>Amount :</Typography.Text>{" "}
										{payment.amount}
									</p>

									<p>
										<Typography.Text strong>Particulars :</Typography.Text>{" "}
										{payment.particulars}
									</p>
									<p>
										<Typography.Text strong>Type :</Typography.Text>{" "}
										{payment.type}
									</p>
								</div>
							</Card>
						</Fragment>
					) : (
						<Loader />
					)}
				</div>
			</UserPrivateComponent>
		</div>
	);
};

export default DetailTransaction;

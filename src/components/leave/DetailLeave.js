import { Card } from "antd";
import Loader from "../loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
	clearLeaveApplication,
	loadSingelLeaveApplication,
} from "../../redux/rtk/features/leave/leaveSlice";
import tw from "tailwind-styled-components";
import { useParams } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";
import moment from "moment";
import ReviewLeavePopup from "../UI/PopUp/ReviewLeavePopup";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import {  useTranslation } from "react-i18next";

const DetailLeave = () => {
	const {t} = useTranslation();

	const { id } = useParams("id");
	const leave = useSelector((state) => state.leave.leave);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadSingelLeaveApplication(id));

		return () => {
			dispatch(clearLeaveApplication());
		};
	}, []);

	return (
		<div>
			<PageTitle title={t('back')} />
			<UserPrivateComponent permission={"read-leaveApplication"}>
				<Card className='mt-4'>
					<div className='text-center mb-4'>
						{" "}
						<h2 className='text-2xl font-semibold text-gray-600'>
							{t('app_leave')} #{leave?.id}{" "}
						</h2>
					</div>
					{leave ? (
						<div className='flex justify-center '>
							<ul className='list-inside list-none border-2 border-inherit rounded px-5 py-5 '>
								<ListItem>
								{t('name')} :{" "}
									<TextInside>
										{(
											leave?.user.firstName +
											" " +
											leave?.user.lastName
										).toUpperCase()}{" "}
									</TextInside>
								</ListItem>
								<ListItem>
								{t('leave_type')} : <TextInside>{leave.leaveType}</TextInside>
								</ListItem>
								<ListItem>
								{t('leave_from')} :{" "}
									<TextInside>
										{moment(leave.leaveFrom).format("DD-MM-YYYY")}
									</TextInside>
								</ListItem>

								<ListItem>
								{t('leave_to')} :{" "}
									<TextInside>
										{moment(leave.leaveTo).format("DD-MM-YYYY")}
									</TextInside>
								</ListItem>

								<ListItem>
								{t('leave_duration')} :{" "}
									<TextInside className='text-red-500'>
										{leave.leaveDuration}
									</TextInside>
								</ListItem>

								<ListItem>
								{t('leave_reason')} :{" "}
									<TextInside>{leave.reason || t('no_reason')}</TextInside>
								</ListItem>

								<ListItem>
								{t('leave_satus')} :{" "}
									<TextInside>
										{leave.status === t('pending') ? (
											<span className='text-yellow-500'>
												{leave.status.toUpperCase()}
											</span>
										) : leave.status === t('accepted') ? (
											<span className='text-green-500'>
												{leave.status.toUpperCase()}
											</span>
										) : (
											<span className='text-red-500'>
												{leave.status.toUpperCase()}
											</span>
										)}
									</TextInside>
								</ListItem>

								<ListItem>
									{t('s_date')}:{" "}
									<TextInside>
										{leave.acceptLeaveFrom
											? moment(leave.acceptLeaveFrom).format("DD-MM-YYYY")
											: t('on_review')}
									</TextInside>
								</ListItem>

								<ListItem>
								{t('end_date')} :{" "}
									<TextInside>
										{leave.acceptLeaveTo
											? moment(leave.acceptLeaveTo).format("DD-MM-YYY")
											: t('on_review')}
									</TextInside>
								</ListItem>

								<ListItem>
								{t('puched_by')} :{" "}
									<TextInside className='text-green-500'>
										{
											(leave.acceptLeaveBy?.lastName || t('on_review'))}
									</TextInside>
								</ListItem>

								<ListItem>
								{t('comment')} :{" "}
									<TextInside>{leave.reviewComment ||  t('no_comment')}</TextInside>
								</ListItem>

								<ListItem>
								{t('attachment')} :{" "}
									<TextInside>
										{leave.attachment ? (
											<a
												href={leave.attachment}
												target='_blank'
												rel='noreferrer'
												className='text-blue-500'>
												{t('	download')}
											</a>
										) : (
											t('no_attachment')
										)}
									</TextInside>
								</ListItem>
							</ul>
						</div>
					) : (
						<Loader />
					)}
					<UserPrivateComponent permission={"update-leaveApplication"}>
						{leave?.status === "PENDING" && (
							<div className='flex justify-center items-center'>
								<ReviewLeavePopup />
							</div>
						)}
						{leave?.status === "REJECTED" && (
							<div className='flex justify-center items-center'>
								<ReviewLeavePopup />
							</div>
						)}
					</UserPrivateComponent>
				</Card>
			</UserPrivateComponent>
		</div>
	);

	// "reviewComment": null,
	// "attachment": null,
};

const ListItem = tw.li`
text-sm
text-gray-600
font-semibold
py-2
px-4
bg-gray-100
mb-1.5
rounded
w-96
flex
justify-start
`;

const TextInside = tw.p`
ml-2
text-sm
text-gray-900
`;
export default DetailLeave;

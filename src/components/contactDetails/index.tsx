// Contact Details
import React from 'react';
import { useDispatch } from 'react-redux';

import Modal from 'components/utils/modal';
import { setSelectedContact } from 'redux/features/contactsSlice';
import { getFullName } from 'lib';
import { IContact } from 'models/interface';

type Props = {
  data: IContact;
}

const ContactDeatils = ({ data }: Props) => {

	const dispatch = useDispatch();

	const CloseSelectedModal = () => {
		dispatch(setSelectedContact({ isSelected: false, data: null }));
	}

	return (
		<>
			<Modal
				onHide={CloseSelectedModal}
				title="Modal C - contact details"
				footer={
					<button className="btn btn-danger" onClick={CloseSelectedModal}>
						Close
					</button>
				}
			>
				<h2 className="mb-3">Contact Details</h2>
				<ul className="list-group">
					<li className="list-group-item">
						<strong>ID:</strong> {data?.id || '-'}
					</li>
					<li className="list-group-item">
						<strong>Name:</strong> {getFullName(data?.first_name, data?.last_name)}
					</li>
					<li className="list-group-item">
						<strong>Email:</strong> {data?.email || '-'}
					</li>
					<li className="list-group-item">
						<strong>Phone Number:</strong> {data?.phone_number || '-'}
					</li>
				</ul>

			</Modal>
		</>
	)
}

export default ContactDeatils;
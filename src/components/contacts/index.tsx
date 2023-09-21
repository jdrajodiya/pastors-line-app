// Contacts
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import Table from 'react-bootstrap/Table';

import { getFullName } from 'lib/helper';
import { setSelectedContact } from 'redux/features/contactsSlice';
import { IContact } from 'models/interface';
import ContactDeatils from 'components/contactDetails';

type Props = {
  allContacts: IContact[];
  evenValue: boolean;
  isLoading: boolean;
  handleContactsScrolling: (scrollingHeight: number, scrollingTop: number, clientHeight:number) => void;
}

const Contacts = ({ handleContactsScrolling, isLoading, evenValue, allContacts }: Props) => {

	const dispatch = useDispatch();
	const { selectedContact } = useSelector((state: any) => state?.contacts);
	const scrollingRef = useRef<any>(null);

	const contactsDataScrolling = () => {
		const scrollingHeight = scrollingRef.current.getScrollHeight();
		const scrollingTop = scrollingRef.current.getScrollTop();
		const clientHeight = scrollingRef.current.getClientHeight();

		handleContactsScrolling(scrollingHeight, scrollingTop, clientHeight);
	}

	const handleSelected = (contact: IContact) => {
		dispatch(setSelectedContact({ isSelected: true, data: contact }));
	}

	return (
		<>
			<Scrollbars
				ref={scrollingRef}
				style={{ height: 500, width: '100%' }}
				onScrollStop={contactsDataScrolling}
			>
				<Table striped>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Email</th>
							<th>Phone Number</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{
							!isLoading ?
								<>
									{
										allContacts?.length > 0 ?
											allContacts?.map((contact: IContact) => {
												return (
													(evenValue ? contact?.id % 2 === 0 : true) &&
													<tr key={contact?.id}>
														<td className="align-middle"> {contact?.id} </td>
														<td className="align-middle">
															{getFullName(contact?.first_name, contact?.last_name) || '-'}
														</td>
														<td className="align-middle"> {contact?.email} </td>
														<td className="align-middle"> {contact?.phone_number} </td>
														<td className="align-middle">
															<button className="btn btn-primary" onClick={() => handleSelected(contact)}>
																View
															</button>
														</td>
													</tr>
												)
											}) :
											<tr>
												<td colSpan={5} className="text-center">
													No Data Found.
												</td>
											</tr>
									}
								</>
								:
								<tr>
									<td colSpan={5}>
										<div className="loader-position">
											<div className="loader-border text-dark loader-sm"> </div>
										</div>
									</td>
								</tr>
						}
					</tbody>
				</Table>
			</Scrollbars>

			{/* Contact Details modal */}
			{
				selectedContact?.isSelected && <ContactDeatils data={selectedContact?.data} />
			}
		</>
	)
}

export default Contacts;

// US Contacts
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

import Modal from 'components/utils/modal';
import { getAllContactsData, setPagination, setIsMoreLoading } from 'redux/features/contactsSlice';
import { PARAMS } from 'lib/constants';
import { ISearch } from 'models/interface';
import Contacts from 'components/contacts';
import Input from 'forms/input';
import { KeyType } from 'lib/helper/enums';
import Checkbox from 'forms/checkbox';

type Props = {
  handleModalA: () => void;
  closeModal: () => void;
}

const USCountryContacts = ({ closeModal, handleModalA }: Props) => {

	const dispatch = useDispatch();
	const { allContacts, pagination, isLoading, isMoreLoading } = useSelector((state: any) => state.contacts);
	const [searchValues, setSearchValues] = useState<ISearch>({
		isEven: false,
		search: ''
	});

	useEffect(() => {
		if (pagination?.page) {
			dispatch(getAllContactsData({ ...pagination, companyId: PARAMS.companyId, countryId: PARAMS.countryId }));
		}
		// eslint-disable-next-line 
	}, [pagination]);

	//  Scrolling pagination
	const handleContactsScrolling = (scrollingHeight: number, scrollingTop: number, clientHeight: number) => {
		const nextPage = pagination?.page + 1;

		if (((scrollingTop + clientHeight) === scrollingHeight) && pagination.page !== nextPage) {
			dispatch(setIsMoreLoading(true));
			dispatch(setPagination({ ...pagination, page: nextPage }));
		}
	}	

	const searchHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValues({ ...searchValues, search: e?.target?.value });
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === KeyType.ENTER) {
			if ((e.target as HTMLInputElement).value.length === 0) {
				dispatch(setPagination({ page: 1, companyId: PARAMS.companyId, countryId: PARAMS.countryId }));
			} else {
				dispatch(setPagination({ ...pagination, page: 1, query: (e.target as HTMLInputElement).value }));
			}
		}
	}

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValues({ ...searchValues, isEven: e?.target?.checked });
	}

	return (
		<>
			<Modal
				onHide={closeModal}
				title="Modal B"
				size="lg"
				footer={
					<div className="d-flex align-items-center justify-content-between w-100">
						<Checkbox  onChange={handleCheckboxChange} value={searchValues?.isEven} label="show even"/>
						<button type="button" className="btn btn-danger" onClick={closeModal}>Close</button>
					</div>
				}
			>

				<Row className="pb-3">
					<Col xs={6} md={9}>
						<div className="form-group mb-0 w-100">
							<Input
								type="text"
								placeholder="Search..."
								onChange={searchHandleChange}
								value={searchValues?.search}
								onKeyDown={handleKeyDown}
							/>
						</div>
					</Col>
					<Col xs={6} md={3}>
						<button className="btn primary w-100 mb-2" onClick={handleModalA}>
							All Contacts
						</button>
					</Col>
				</Row>

				{/* Contact List */}
				<Contacts
					handleContactsScrolling={handleContactsScrolling}
					allContacts={allContacts}
					evenValue={searchValues?.isEven}
					isLoading={isLoading}
				/>

				{/* Loader for scrolling */}
				{
					(isMoreLoading && allContacts.length > 0) &&
					<div className="d-flex align-items-center justify-content-center my-2">
						<div className="loader-border text-primary loader-sm"> </div>
						<h6 className="ml-3 mb-0">Loading...</h6>
					</div>
				}
			</Modal>
		</>
	)
}

export default USCountryContacts;

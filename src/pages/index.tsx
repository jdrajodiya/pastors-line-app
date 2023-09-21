// App
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AllCountryContacts from 'components/countryContacts/allCountryContacts';
import UsCountryContacts from 'components/countryContacts/usCountryContacts';
import { setPagination, setAllContacts } from 'redux/features/contactsSlice';
import { PARAMS } from 'lib/constants';
import { IModalState } from 'models/interface';
import { ContactType } from 'lib/helper/enums';

const PastorsLine = () => {

	const { pagination } = useSelector((state: any) => state.contacts);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [searchParams] = useSearchParams();
	const [toggleModal, setToggleModal] = useState<IModalState | null>({
		isOpen: false,
		type: ContactType.ALL,
	});

	// Open Modal as per URL
	useEffect(() => {
		const openModal = searchParams.get('modal');
		if (openModal) {
			setToggleModal({ isOpen: true, type: openModal });
		}
	}, [searchParams]);

	const openModal = (type: string) => {
		navigate({ search: `?${createSearchParams({ modal: type })}` });
		setToggleModal({ isOpen: true, type });
	}

	const closeModal = () => {
		navigate({ search: '' });
		setToggleModal(null);
		dispatch(setAllContacts([]));
		dispatch(setPagination({ page: 1 }));
	}

	const handleModalA = () => {
		openModal(ContactType.ALL);
		const newPagination = { ...pagination };
		if (newPagination.countryId) delete newPagination.countryId;
			dispatch(setPagination({ page: 1, companyId: PARAMS.companyId }));
	}

	const handleModalB = () => {
		openModal(ContactType.US);
		dispatch(setPagination({ page: 1, companyId: PARAMS.companyId, countryId: PARAMS.countryId }));
	}

	return (
		<>
			<div className="home d-flex justify-content-center align-items-center">

				<div>
					<button className="btn primary " onClick={handleModalA} >Button A</button>

					<button className="btn secondary ml-4" onClick={handleModalB}>Button B</button>
				</div>

				{
					toggleModal?.isOpen &&
					<>
					{
						toggleModal?.type === ContactType.ALL && <AllCountryContacts closeModal={closeModal} handleModalB={handleModalB}/>
					}
					{
						toggleModal?.type === ContactType.US && <UsCountryContacts closeModal={closeModal} handleModalA={handleModalA}/>
					}
					</>
				}

			</div>
		</>
	)
}

export default PastorsLine;

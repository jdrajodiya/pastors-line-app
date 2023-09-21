import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PAGINATION } from 'lib/constants';
import { api } from 'lib/api';
import { IContact, IPagination, ISelectedContact } from 'models/interface';
import { getAllContactsDetails } from 'redux/helper/contactsSliceHelper';

export interface IContactsState {
	isLoading: boolean;
	isError: boolean;
	isMoreLoading: boolean;
	allContacts: IContact[];
	pagination: IPagination;
	selectedContact: ISelectedContact;
};

const initialState: IContactsState = {
	isLoading: false,
	isError: false,
	isMoreLoading: false,
	allContacts: [],
	selectedContact: {
		isSelected: false,
		data: null
	},
	pagination: {
		page: PAGINATION.page,
	}
}


// API call using createAsyncThunk
export const getAllContactsData: any = createAsyncThunk('getAllContactsData', async (params: IPagination) => {
	const response = await api('contacts.json', { params: params });
	return response?.data;
})

export const contactsSlice = createSlice({
	name: 'Contacts',
	initialState,
	reducers: {
		setPagination: (state, action) => {
			state.pagination = action.payload;
		},
		setIsMoreLoading: (state, action) => {
			state.isMoreLoading = action.payload;
		},
		setSelectedContact: (state, action) => {
			state.selectedContact = action.payload;
		},
		setAllContacts: (state, action) => {
			state.allContacts = action.payload;
		}
	},

	// extraReducers

	extraReducers: (builder) => {
		builder.addCase(getAllContactsData.pending, (state) => {
			if(state.pagination.page > 1 && state.allContacts.length > 0){
				state.isMoreLoading = true;
			} else {
				state.isLoading = true;
				state.isMoreLoading = false;
			}
		});
		builder.addCase(getAllContactsData.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isMoreLoading = false;
			if (state.pagination?.page !== 1) {
				const newContacts = getAllContactsDetails(action.payload?.contacts);
				state.allContacts = [...state.allContacts, ...newContacts];
			} else {
				state.allContacts = getAllContactsDetails(action.payload?.contacts);
			}
		});
		builder.addCase(getAllContactsData.rejected, (state) => {
			state.isError = true;
			state.isMoreLoading = false;
		});
	}
});

export const { setPagination, setIsMoreLoading, setSelectedContact, setAllContacts } = contactsSlice.actions;

export default contactsSlice.reducer;
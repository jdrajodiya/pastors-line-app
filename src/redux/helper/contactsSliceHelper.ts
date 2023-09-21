import { IContact } from 'models/interface';

export const getAllContactsDetails = (contacts: IContact[]) => {
  const contactsList: IContact[] = [];
  
  Object.values(contacts)?.map((contact: IContact) => {
    contactsList.push({
      id: contact?.id,
      first_name: contact?.first_name,
      last_name: contact?.last_name,
      email: contact?.email,
      phone_number: contact?.phone_number
    });

    return contact;
  });
  return contactsList;
}
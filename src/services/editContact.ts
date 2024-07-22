import { useContactsStore } from "@/stores/contacts"

export const editContact = async (editContact) => {
    try {
        let contacts = useContactsStore().getContacts()
        let editedContact = contacts.find((contact) => contact.id === editContact.id)
        editedContact = Object.assign(editedContact, editContact)
        localStorage.setItem('contacts', JSON.stringify(contacts))

        // Тут по идее асинхронный запрос
    } catch (error) {
        console.error('editContact', error)
    }
}
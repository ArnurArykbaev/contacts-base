import { useContactsStore } from "@/stores/contacts"

export const createContact = async (newContact) => {
    try {
        newContact.id = Math.floor(Math.random() * 100000000000 )
        let contacts = useContactsStore().getContacts()
        if(contacts) {
            contacts.push(newContact)
            localStorage.setItem('contacts', JSON.stringify(contacts))
        } else {
            localStorage.setItem('contacts', JSON.stringify([newContact]))
        }

        // Тут по идее асинхронный запрос
    } catch (error) {
        console.error('createContact', error)
    }
}
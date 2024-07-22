import { ContactModel } from "@/models/ContactModel";
import {defineStore} from "pinia";
import {ref, Ref} from "vue";


export const useContactsStore = defineStore("contactsStore", () => {
/* state */
    const contacts = ref([
        {
          id: 1,
          key: '1',
          name: 'Mike',
          phone: 87771111111,
          email: 'mike@mail.com',
        },
        {
          id: 2,
          key: '2',
          name: 'John',
          phone: 87772222222,
          email: 'john@mail.com',
        },
      ]);

/* getters */
    const getContacts = () => contacts.value
 
/* actions */
    const setContacts = (contactsData) => {
        if(contactsData && contactsData.length) {
            contacts.value = contactsData
        }
    }

    const clearContacts = () => {
        contacts.value = []
    }

    return { getContacts, setContacts, clearContacts };
})
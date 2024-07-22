export const getContacts = async () => {
    try {
        const contactStorage = localStorage.getItem('contacts')

        if(contactStorage) {
            return JSON.parse(contactStorage)
        }

        return []
    } catch (error) {
        console.error('getContacts', error)
    }
}
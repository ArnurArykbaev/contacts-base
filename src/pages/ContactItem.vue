<template>
    <a-card :title="getTitle()" :bordered="false" style="width: 300px; height: fit-content">
        <div class="contact-form">
            <div class="contact-form__body">
                <p>{{ contactDefault.name }}</p>
                <p>{{ contactDefault.phone }}</p>
                <p>{{ contactDefault.email }}</p>
            </div>
            <router-link to="/">
                <a-button type="primary">Back</a-button>
            </router-link>
        </div>
    </a-card>
</template>

<script setup lang="ts">
import {reactive, onMounted} from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useContactsStore } from '@/stores/contacts';

import {ContactModel} from '@/models/ContactModel'

const route = useRoute()
const contactsStore = useContactsStore()

const contactDefault: ContactModel = reactive({
    name: '',
    phone: '',
    email: ''
    
})

const getTitle = () => {
    return route.name === 'ContactFormCreate' ? 'New contact' : contactDefault.name
}

onMounted(() => {
        const contactId = route.params.id
        const contact = contactsStore.getContacts().find(contact => contact.id === +contactId)
        Object.assign(contactDefault, contact);
})
</script>

<style lang="scss">
.contact-form {
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    &__body {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }
}
</style>
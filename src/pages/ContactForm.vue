<template>
    <a-card :title="getTitle()" :bordered="false" style="width: 300px; height: fit-content">
        <div class="contact-form">
            <div class="contact-form__body">
                <div>
                    <a-input v-model:value="contactDefault.name" placeholder="Name"></a-input>
                    <span v-for="(error, index) in v$.name.$errors" :key="index" class="error-text">{{ error.$message }}</span>
                </div>
                <div>
                    <a-input v-model:value="contactDefault.phone" placeholder="Phone"
                    v-maska
                    data-maska="+7 (###) ###-##-##"></a-input>
                    <span v-for="(error, index) in v$.phone.$errors" :key="index" class="error-text">{{ error.$message }}</span>
                </div>
                <div>
                    <a-input v-model:value="contactDefault.email" placeholder="Email"></a-input>
                    <span v-for="(error, index) in v$.email.$errors" :key="index" class="error-text">{{ error.$message }}</span>
                </div>
            </div>
            <a-button @click="save" type="success">Save</a-button>
        </div>
    </a-card>
</template>

<script setup lang="ts">
import {reactive, onMounted} from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useContactsStore } from '@/stores/contacts';
import { vMaska } from "maska/vue";
import useVuelidate from '@vuelidate/core'
import {required, email, helpers, minLength, maxLength} from '@vuelidate/validators'

import {ContactModel} from '@/models/ContactModel'

import {createContact} from '@/services/createContact'
import {editContact} from '@/services/editContact'

const route = useRoute()
const router = useRouter()
const contactsStore = useContactsStore()

const contactDefault: ContactModel = reactive({
    name: '',
    phone: null,
    email: ''
    
})
const requiredMessage = helpers.withMessage(
    'Поле обязательно для заполнения',
    required
)
const rules = {
    name: {
        required: requiredMessage,
        minLength: helpers.withMessage(
            ({$params}) => `Имя не должно быть короче ${$params.min} букв`,
            minLength(2)
        ),
        pattern: helpers.withMessage(
            'Имя не должно содержать пробелы или символы',
            (value: string) => /^[A-Za-zА-Яа-я]+$/.test(value)
        )
    },
    phone: {
        required: requiredMessage,
        minLength: helpers.withMessage(({$params}) => `Номер телефона не должен быть короче 11 символов`, minLength(18)),
        maxLength: helpers.withMessage(({$params}) => `Номер телефона не должен быть длиннее 11 символов`, maxLength(18))
    },
    email: {
        required: requiredMessage,
        email: helpers.withMessage(() => 'Проверьте корректность написания email', email),
        pattern: helpers.withMessage('Email не должен содержать пробелы', (value: string) => /^\S+@\S+\.\S+$/.test(value))
    }
}
const v$ = useVuelidate(rules, contactDefault)


const getTitle = () => {
    return route.name === 'ContactFormCreate' ? 'New contact' : contactDefault.name
}

const save = async () => {
    const isValid = await v$.value.$validate();
    if (!isValid) {
        return;
    }

    try {
        if (route.name === 'ContactFormCreate') {
            await createContact(contactDefault);
        } else if (route.name === 'ContactFormEdit') {
            await editContact(contactDefault);
        }
    } catch (error) {
        console.error('save', error);
    } finally {
        router.push('/');
    }

}

onMounted(() => {
    if(route.name === 'ContactFormEdit') {
        const contactId = route.params.id
        const contact = contactsStore.getContacts().find(contact => contact.id === +contactId)
        Object.assign(contactDefault, contact);
    }
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

    .error-text {
        color: red;
        font-size: 10px;
    }
}
</style>
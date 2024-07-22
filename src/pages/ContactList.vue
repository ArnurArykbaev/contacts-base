<template>
    <div id="search-list">
        <div class="search-block">
            <SearchBar v-model="searchValue" />
             <a-table :dataSource="filteredContacts" :columns="columns"> 
                <template  #bodyCell="{ column, record }">
                    <a-row  @click="handleRowClick(record)">
                        <template v-if="column.key === 'name'">
                            {{ record.name }}
                        </template>
                        <template v-if="column.key === 'phone'">
                            {{ record.phone }}
                        </template>
                        <template v-if="column.key === 'email'">
                            {{ record.email }}
                        </template>
                        <template v-if="column.key === 'edit'">
                            <router-link @click.stop="" :to="`/edit/${record.id}`">Edit</router-link>
                        </template>
                    </a-row>
                </template>
            </a-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref, onMounted, watch, computed} from 'vue'
import { useRouter } from 'vue-router';
import {useContactsStore} from '@/stores/contacts'

import {getContacts} from '@/services/getContacts'
import SearchBar from '@/components/SearchBar.vue'

const router = useRouter()
const contactsStore = useContactsStore()
const contactsData = computed(() => contactsStore.getContacts())
const contactsList = ref([])

const searchValue = ref('')

const columns = [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
          },
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
          },
          {
            title: '',
            dataIndex: 'edit',
            key: 'edit',
          },
        ]

const handleRowClick = (contact) => {
    router.push(`/contact/${contact.id}`)
}


const filteredContacts = computed(() => {
  const search = searchValue.value.toLowerCase()
  return contactsData.value.filter(contact => {
    return (
      contact.name.toLowerCase().includes(search) ||
      (contact.phone + '').includes(search) ||
      contact.email.toLowerCase().includes(search)
    )
  })
})

onMounted(async() => {
    const contacts = await getContacts()
    contactsStore.setContacts(contacts)
    contactsList.value = contacts
})
</script>

<style lang="scss">
#search-list {
    .search-block {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }
}
</style>

import { emit } from 'process';
<template>
    <div id="search-bar">
        <a-input class="search-input" :value="modelValue" @input="onInput" @blur="onInputBlur" placeholder="Search" />
        <div>
            <a-button v-if="isSearchActive" @click="clear">Clear</a-button>
            <router-link v-else to="/create/">
                <a-button>New User</a-button>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const emit = defineEmits(['update:modelValue', 'clear'])
const props = defineProps({
    modelValue: String,
})
const isSearchActive = ref(false)

const onInput = (e) => {
    console.log('e', isSearchActive.value, props.modelValue.length)
    if(isSearchActive.value === false && e.target.value.length >= 1) {
        isSearchActive.value = true
    } else if (isSearchActive.value === true && e.target.value.length === 0) {
        isSearchActive.value = false
    }

    emit('update:modelValue', e.target.value)
}

const clear = () => {
    isSearchActive.value = false
    emit('update:modelValue', '')
}

const onInputBlur = () => {
    if(isSearchActive.value === true && props.modelValue.length === 0) {
        isSearchActive.value = false
    }
}
</script>

<style lang="scss">
#search-bar {
    display: flex;
    flex-direction: row;
    width: 100%;
    column-gap: 10px;

    .search-input {
        width: 100%;
    }
}
</style>
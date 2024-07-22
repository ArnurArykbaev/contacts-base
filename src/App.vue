<template>
  <router-view />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
</script>

<style lang="scss">
body {
  background-color: rgba(240, 242, 245, 1);
}
.app {
  display: flex;
  flex-direction: row;
  margin-top: 60px;
  justify-content: center;
  height: 100vh;
}
</style>

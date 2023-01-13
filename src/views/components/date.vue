<template>{{ nowTime }}</template>

<script setup>
import { formatTime } from "@/utils/formatTime";
import { ref, onMounted } from "vue";
const nowTime = ref("");
onMounted(() => {
  setInterval(() => {
    nowTime.value = formatTime(new Date(), false);
  }, 1000);
});
</script>
<style scoped></style>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <transition name="page" mode="out-in">
    <div class="card shadow" :key="$route.fullPath">
      <RouterView />
    </div>
  </transition>
</template>

<style scoped>
.card {
  width: 600px;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  background: white;
  border-radius: 10px;
  position: relative;
  transition: border-radius 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.shadow {
  box-shadow: inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(190, 190, 190), 0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0
}
</style>

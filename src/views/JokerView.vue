<template>
  <div class="flex flex-col items-center justify-center h-screen text-center">
    <h1 class="text-2xl font-bold p-3">Before we continue...</h1>
    <p v-if="joke" class="mt-4 text-lg p-3">{{ joke }}</p>
    <p v-else class="mt-4 text-lg">Loading a joke...</p>
    <p class="mt-6 text-xl font-semibold p-3">Redirecting in {{ countdown }}s...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const joke = ref<string | null>(null);
const countdown = ref(5);
let timer: number;

onMounted(async () => {
  try {
    const response = await fetch("https://api.api-ninjas.com/v1/dadjokes", {
      headers: { "X-Api-Key": "5KNAbr5ZeqSvEAWpTg6rBg==wkQS56Vz3i65HjaI" },
    });
    const data = await response.json();
    joke.value = data[0]?.joke || "No joke today :(";
  } catch (error) {
    joke.value = "Failed to load a joke.";
    console.error("Error fetching joke:", error);
  }

  timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer);
      router.push({ name: "finish" });
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

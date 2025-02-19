<template>
  <h1 class="font-bold text-[4vw]">Guess the Hand</h1>
  <Button @click="startGame">
    PLAY
  </Button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Button from "@/components/Button/Button.vue"


const router = useRouter();
const name = ref("");

const startGame = () => {
  router.push({ name: "game" });
};

</script>

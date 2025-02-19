<template>
  <h1 class="font-bold text-[5vw]">Leatherboard</h1>
  <ul>
    <li v-for="game in gameStore.gameHistory" :key="game.game">
      attempt {{ game.game }} - {{ game.answers }} answers
    </li>
  </ul>
  <Button @click="startGame">
    Play again
  </Button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import Button from "@/components/Button/Button.vue"
import { useGameStore } from "@/stores/gameStore";
const router = useRouter();
const gameStore = useGameStore();


const startGame = () => {
  router.push({ name: "game" });
};

</script>

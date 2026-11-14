<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <h1 class="font-bold text-[4vw]">Guess the Hand</h1>

    <!-- Input pro jméno hráče -->
    <input
      v-model="playerName"
      placeholder="Enter your name"
      class="border-2 border-gray-300 p-2 rounded-lg text-xl"
    />

    <div v-for="(hand, index) in hands">
      <input type="checkbox" :id="hand" :name="hand" :value="hand" @click="iWantthis(hand)">
      <label for="vehicle1">{{hand}}</label><br>
    </div>

    <Button @click="startGame">
      PLAY
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useGameStore } from "@/stores/gameStore";
import Button from "@/components/Button/Button.vue";
import hands from "@/components/data/hands";

const router = useRouter();
const gameStore = useGameStore();
const playerName = ref(localStorage.getItem("playerName") || ""); // ✅ Načtení jména z localStorage
const playHands = ref([]);

const iWantthis = (hand) => {
  console.log(hand);
  playHands.value.push(hand)
  console.log(playHands.value)
  gameStore.rangeCards = playHands.value
}


const startGame = () => {
  if (!playerName.value.trim()) {
    alert("Please enter your name!"); // ✅ Zabráníme startu bez jména
    return;
  }

  localStorage.setItem("playerName", playerName.value); // ✅ Uložíme jméno do localStorage
  gameStore.setPlayerName(playerName.value); // ✅ Uložíme jméno do store
  router.push({ name: "game" }); // ✅ Přesměrování do hry
};

onMounted(() => {
  // ✅ Při načtení stránky se zkusí načíst jméno z localStorage
  if (playerName.value) {
    gameStore.setPlayerName(playerName.value);
  }
});
</script>

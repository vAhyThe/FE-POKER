<template>
  <div class="p-4 h-full w-full flex flex-col justify-between">
    <nav class="text-right text-2xl">
      <strong>Life Points: <span class="w-[39px] inline-block">{{ gameStore.lifePoints }}</span></strong>
    </nav>
    <div class="field">
      <Card v-for="(card, index) in cards" :key="index" :value="card.value" :seed="card.seed" />
    </div>

    <div>
      <h3>Which hand is this?</h3>
      <div class="flex gap-2 justify-center flex-col">
        <button v-for="(option, index) in handOptions" @click="checkAnswer(option)" :key="index"
          class="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
          <span
            class="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

          <span class="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
            <div class="relative z-10 flex items-center space-x-2">
              <span class="transition-all duration-500 group-hover:translate-x-1">{{ option }}</span>
            </div>
          </span>
        </button>
      </div>
      <Transition name="fade">
        <div v-if="selectedHand"
          class="absolute top-0 right-0 left-0 h-full w-full flex justify-center items-center z-10 rounded-[10px]"
          :class="isCorrect ? 'bg-green-200' : 'bg-red-200'">
          <div class="text-6xl font-bold text-center flex gap-14 justify-center flex-wrap flex-col">
            <span>{{ isCorrect ? "✅ Correct!" : "❌ Wrong!" }}</span>
            <span>{{ isCorrect ? "You gain 5s" : "You lose 5s" }}</span>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useGameStore } from "@/stores/gameStore";
import { useHandGenerator } from "@/composables/useHandGenerator";
import Card from "@/components/Cards/Cards.vue";

const router = useRouter();
const gameStore = useGameStore();
const { chosenHand, cards, handOptions, generateHand } = useHandGenerator();

const selectedHand = ref<string | null>(null);
const isCorrect = ref<boolean>(false);
const gameStarted = ref<boolean>(false);
let timer: number | null = null;

const startGame = () => {
  gameStore.resetGame();
  gameStarted.value = true;
  generateHand();
  startTimer();
};

const startTimer = () => {
  if (timer !== null) return;
  timer = setInterval(() => {
    if (gameStore.lifePoints > 0) {
      gameStore.lifePoints -= 1;
    } else {
      clearInterval(timer!);
      timer = null;
      gameStore.endGame();
      router.push({ name: "joke" });
    }
  }, 1000);
};

const updateTitle = () => {
  document.title = `Life Points: ${gameStore.lifePoints} | Poker Game`;
};

const checkAnswer = (answer: string) => {
  selectedHand.value = answer;
  isCorrect.value = answer === chosenHand.value;

  if (isCorrect.value) {
    gameStore.correctAnswers++;
    gameStore.lifePoints += 5;
  } else {
    gameStore.lifePoints -= 5;
  }

  setTimeout(() => {
    selectedHand.value = null;
    generateHand();
  }, 1000);
};

watch(() => gameStore.lifePoints, updateTitle);

onMounted(() => {
  gameStore.resetGame();
  startGame();
  updateTitle();
});
</script>


<style scoped>
.field {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding: 20px;
  background: #f0f0f0;
  border-radius: 10px;
  justify-content: center;
}

.correct {
  background-color: green;
}

.incorrect {
  background-color: red;
}
</style>

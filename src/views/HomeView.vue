<template>
  <div class="w-[50%] m-auto">
    <nav>
      <div>Name</div>
      <div>Life Points : 100</div>
    </nav>
    <div class="field">
      <Card v-for="(card, index) in cards" :key="index" :value="card.value" :seed="card.seed" />
    </div>
    <div>
      Selected Hand: {{ chosenHand }}
      <div class="flex gap-4 flex-wrap flex-col">
        <button @click="generateHand">Generate New Hand</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import hands from "@/components/data/hands";
import Card from "@/components/Cards/Cards.vue";

const chosenHand = ref<string>("");
const cards = ref<{ value: string; seed: string }[]>([]);

const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const suits = ["heart", "spade", "diamond", "club"];

const generateHand = () => {
  // Náhodně vybereme jednu kombinaci z hands.ts
  chosenHand.value = hands[Math.floor(Math.random() * hands.length)];

  // Generujeme odpovídající pětici karet podle zvolené kombinace
  switch (chosenHand.value) {
    case "High Card":
      cards.value = getRandomCards(5, false, false);
      break;
    case "One Pair":
      cards.value = getPair();
      break;
    case "Two Pairs":
      cards.value = getTwoPairs();
      break;
    case "Three of a Kind":
      cards.value = getThreeOfAKind();
      break;
    case "Straight":
      cards.value = getStraight();
      break;
    case "Flush":
      cards.value = getFlush();
      break;
    case "Full House":
      cards.value = getFullHouse();
      break;
    case "Four of a Kind":
      cards.value = getFourOfAKind();
      break;
    case "Straight Flush":
      cards.value = getStraightFlush();
      break;
    case "Royal Flush":
      cards.value = getRoyalFlush();
      break;
  }
};

// Funkce na generování náhodných karet (bez duplicit)
const getRandomCards = (count: number, sameSuit: boolean, sameValue: boolean) => {
  const generated: { value: string; seed: string }[] = [];
  while (generated.length < count) {
    let value = cardValues[Math.floor(Math.random() * cardValues.length)];
    const seed = sameSuit ? suits[0] : suits[Math.floor(Math.random() * suits.length)];

    if (sameValue) {
      value = generated[0]?.value || value;
    }

    if (!generated.some((c) => c.value === value && c.seed === seed)) {
      generated.push({ value, seed });
    }
  }
  return generated;
};

const getPair = () => {
  const pairValue = cardValues[Math.floor(Math.random() * cardValues.length)]; // Náhodná hodnota pro pár

  // Dva různé symboly pro pár
  const pairSuits = suits.slice().sort(() => 0.5 - Math.random()).slice(0, 2);
  const pairCards = pairSuits.map((suit) => ({ value: pairValue, seed: suit }));

  // Tři zbývající karty s jinými hodnotami
  const remainingValues = cardValues.filter((v) => v !== pairValue);
  const otherCards = remainingValues
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map((value) => ({ value, seed: suits[Math.floor(Math.random() * suits.length)] }));

  return [...pairCards, ...otherCards];
};


const getTwoPairs = () => {
  const firstPair = getPair();
  const secondPair = getPair();
  const kicker = getRandomCards(1, false, false);
  return [...firstPair.slice(0, 2), ...secondPair.slice(0, 2), ...kicker];
};

const getThreeOfAKind = () => {
  const threeValue = cardValues[Math.floor(Math.random() * cardValues.length)];
  const threeCards = suits.slice(0, 3).map((suit) => ({ value: threeValue, seed: suit }));
  const otherCards = getRandomCards(2, false, false);
  return [...threeCards, ...otherCards];
};

const getStraight = () => {
  const startIdx = Math.floor(Math.random() * (cardValues.length - 5));
  const straightValues = cardValues.slice(startIdx, startIdx + 5);
  const straightCards = straightValues.map((value, i) => ({
    value,
    seed: suits[i % suits.length],
  }));
  return straightCards;
};

const getFlush = () => {
  const suit = suits[Math.floor(Math.random() * suits.length)];
  return getRandomCards(5, true, false).map((card) => ({ ...card, seed: suit }));
};

const getFullHouse = () => {
  const threeValue = cardValues[Math.floor(Math.random() * cardValues.length)];
  const threeCards = suits.slice(0, 3).map((suit) => ({ value: threeValue, seed: suit }));

  const pairValue = cardValues.find((v) => v !== threeValue) || "2"; // Zajistí jinou hodnotu než trojice
  const pairCards = suits.slice(0, 2).map((suit) => ({ value: pairValue, seed: suit }));

  return [...threeCards, ...pairCards];
};


const getFourOfAKind = () => {
  const fourValue = cardValues[Math.floor(Math.random() * cardValues.length)];
  const fourCards = suits.slice(0, 4).map((suit) => ({ value: fourValue, seed: suit }));
  const kicker = getRandomCards(1, false, false);
  return [...fourCards, ...kicker];
};

const getStraightFlush = () => {
  const suit = suits[Math.floor(Math.random() * suits.length)];
  const startIdx = Math.floor(Math.random() * (cardValues.length - 5));
  const straightValues = cardValues.slice(startIdx, startIdx + 5);
  const straightFlush = straightValues.map((value) => ({ value, seed: suit }));
  return straightFlush;
};

const getRoyalFlush = () => {
  const suit = suits[Math.floor(Math.random() * suits.length)];
  const royalFlushValues = ["10", "J", "Q", "K", "A"];
  return royalFlushValues.map((value) => ({ value, seed: suit }));
};

// Načtení první kombinace při načtení komponenty
onMounted(() => {
  generateHand();
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
}
</style>

import { ref } from 'vue'
import hands from '@/components/data/hands'
import suits from '@/components/data/suits'
import cardValues from '@/components/data/cardValues'

export function useHandGenerator() {
  const chosenHand = ref<string>('')
  const cards = ref<{ value: string; seed: (typeof suits)[number] }[]>([])
  const handOptions = ref<string[]>([])

  const generateHand = () => {
    chosenHand.value = hands[Math.floor(Math.random() * hands.length)]

    switch (chosenHand.value) {
      case 'High Card':
        cards.value = getRandomCards(5, false, false)
        break
      case 'One Pair':
        cards.value = getPair()
        break
      case 'Two Pairs':
        cards.value = getTwoPairs()
        break
      case 'Three of a Kind':
        cards.value = getThreeOfAKind()
        break
      case 'Straight':
        cards.value = getStraight()
        break
      case 'Flush':
        cards.value = getFlush()
        break
      case 'Full House':
        cards.value = getFullHouse()
        break
      case 'Four of a Kind':
        cards.value = getFourOfAKind()
        break
      case 'Straight Flush':
        cards.value = getStraightFlush()
        break
      case 'Royal Flush':
        cards.value = getRoyalFlush()
        break
    }

    let wrongAnswers = hands.filter((hand) => hand !== chosenHand.value)
    wrongAnswers = wrongAnswers.sort(() => 0.5 - Math.random()).slice(0, 2)

    handOptions.value = [chosenHand.value, ...wrongAnswers].sort(() => 0.5 - Math.random())
  }

  return { chosenHand, cards, handOptions, generateHand }
}

const getRandomCards = (count: number, sameSuit: boolean, sameValue: boolean) => {
  const generated: { value: string; seed: (typeof suits)[number] }[] = [] // ✅ Opravený typ

  while (generated.length < count) {
    let value = cardValues[Math.floor(Math.random() * cardValues.length)]
    const seed = sameSuit ? suits[0] : suits[Math.floor(Math.random() * suits.length)]

    if (sameValue) value = generated[0]?.value || value
    if (!generated.some((c) => c.value === value && c.seed === seed)) {
      generated.push({ value, seed })
    }
  }
  return generated
}

const getPair = () => {
  const pairValue = cardValues[Math.floor(Math.random() * cardValues.length)]

  const pairSuits = suits
    .slice()
    .sort(() => 0.5 - Math.random())
    .slice(0, 2)
  const pairCards = pairSuits.map((suit) => ({ value: pairValue, seed: suit }))

  const remainingValues = cardValues.filter((v) => v !== pairValue)
  const otherCards = remainingValues
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map((value) => ({ value, seed: suits[Math.floor(Math.random() * suits.length)] }))

  return [...pairCards, ...otherCards]
}

const getTwoPairs = () => {
  const firstPair = getPair()
  const secondPair = getPair()
  const kicker = getRandomCards(1, false, false)
  return [...firstPair.slice(0, 2), ...secondPair.slice(0, 2), ...kicker]
}

const getThreeOfAKind = () => {
  const threeValue = cardValues[Math.floor(Math.random() * cardValues.length)]
  const threeCards = suits.slice(0, 3).map((suit) => ({ value: threeValue, seed: suit }))
  const otherCards = getRandomCards(2, false, false)
  return [...threeCards, ...otherCards]
}

const getStraight = () => {
  const startIdx = Math.floor(Math.random() * (cardValues.length - 5))
  const straightValues = cardValues.slice(startIdx, startIdx + 5)
  const straightCards = straightValues.map((value, i) => ({
    value,
    seed: suits[i % suits.length],
  }))
  return straightCards
}

const getFlush = () => {
  const suit = suits[Math.floor(Math.random() * suits.length)]
  return getRandomCards(5, true, false).map((card) => ({ ...card, seed: suit }))
}

const getFullHouse = () => {
  const threeValue = cardValues[Math.floor(Math.random() * cardValues.length)]
  const threeCards = suits.slice(0, 3).map((suit) => ({ value: threeValue, seed: suit }))

  const pairValue = cardValues.find((v) => v !== threeValue) || '2'
  const pairCards = suits.slice(0, 2).map((suit) => ({ value: pairValue, seed: suit }))

  return [...threeCards, ...pairCards]
}

const getFourOfAKind = () => {
  const fourValue = cardValues[Math.floor(Math.random() * cardValues.length)]
  const fourCards = suits.slice(0, 4).map((suit) => ({ value: fourValue, seed: suit }))
  const kicker = getRandomCards(1, false, false)
  return [...fourCards, ...kicker]
}

const getStraightFlush = () => {
  const suit = suits[Math.floor(Math.random() * suits.length)]
  const startIdx = Math.floor(Math.random() * (cardValues.length - 5))
  const straightValues = cardValues.slice(startIdx, startIdx + 5)
  const straightFlush = straightValues.map((value) => ({ value, seed: suit }))
  return straightFlush
}

const getRoyalFlush = () => {
  const suit = suits[Math.floor(Math.random() * suits.length)]
  const royalFlushValues = ['10', 'J', 'Q', 'K', 'A']
  return royalFlushValues.map((value) => ({ value, seed: suit }))
}

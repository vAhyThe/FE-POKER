import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useGameStore = defineStore('gameStore', () => {
  const lifePoints = ref<number>(parseInt(localStorage.getItem('lifePoints') || '100'))
  const correctAnswers = ref<number>(parseInt(localStorage.getItem('correctAnswers') || '0'))
  const totalGames = ref<number>(parseInt(localStorage.getItem('totalGames') || '0'))
  const gameHistory = ref<{ game: number; answers: number }[]>(
    JSON.parse(localStorage.getItem('gameHistory') || '[]'),
  )
  const gameFinished = ref<boolean>(localStorage.getItem('gameFinished') === 'true')

  watch([lifePoints, correctAnswers, totalGames, gameFinished, gameHistory], () => {
    localStorage.setItem('lifePoints', lifePoints.value.toString())
    localStorage.setItem('correctAnswers', correctAnswers.value.toString())
    localStorage.setItem('totalGames', totalGames.value.toString())
    localStorage.setItem('gameFinished', gameFinished.value.toString())
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory.value))
  })

  const endGame = () => {
    if (!gameFinished.value) {
      gameHistory.value.push({ game: totalGames.value + 1, answers: correctAnswers.value })
      totalGames.value++
      gameFinished.value = true
    }
  }

  const resetGame = () => {
    const storedLifePoints = parseInt(localStorage.getItem('lifePoints') || '100')
    lifePoints.value = storedLifePoints > 0 ? storedLifePoints : 100
    correctAnswers.value = 0
    gameFinished.value = false

    const savedHistory = localStorage.getItem('gameHistory')
    gameHistory.value = savedHistory ? JSON.parse(savedHistory) : []
  }

  return { lifePoints, correctAnswers, totalGames, gameHistory, gameFinished, resetGame, endGame }
})

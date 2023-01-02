<template>
  <div>
    <v-card class="w-full h-full" elevation="2">
      <v-card-title class="text-emerald-800">Next red sox tickets</v-card-title>
      <v-card-text class="mx-4">
        {{ nextSoxGameText }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'NextSoxGame',
  props: {},
  data() {
    return {
      allSoxGames: [
        { month: 6, day: 5 },
        { month: 6, day: 29 },
        { month: 7, day: 9 },
        { month: 7, day: 12 },
        { month: 8, day: 2 },
        { month: 9, day: 4 },
      ],
    }
  },
  computed: {
    nextSoxGameText() {
      if (this.daysTillNextSoxGame === null) {
        return 'Games start up again in early April'
      } else if (this.daysTillNextSoxGame === 0) {
        return 'Today!'
      } else if (this.daysTillNextSoxGame === 1) {
        return 'Tomorrow!'
      } else {
        return this.daysTillNextSoxGame + ' days til next game.'
      }
    },
    daysTillNextSoxGame() {
      const today = new Date()
      let daysTil = null
      let nextGameFound = false
      this.allSoxGames.forEach((game) => {
        const gameDate = new Date(2022, game.month, game.day, 20, 0, 0) // Most games are at 7, but give some buffer time
        if (!nextGameFound && gameDate > today) {
          const diff = gameDate - today
          const oneDay = 1000 * 60 * 60 * 24
          nextGameFound = true
          daysTil = Math.ceil(diff / oneDay)
        }
      })
      return daysTil
    },
  },
}
</script>

<template>
  <div>
    <v-card class="w-full h-full" elevation="2">
      <v-card-title class="text-emerald-800"
        >Upcoming submissions needed...</v-card-title
      >
      <v-card-text class="mx-4">
        <div class="text-lg">
          <strong>College Picks:</strong> {{ collegePicksText }}
        </div>
        <div class="text-lg">
          <strong>Survivor Pool:</strong> {{ survivorPoolText }}
        </div>
        <div class="text-lg">
          <strong>FACT Fantasy:</strong> {{ factFantasyText }}
        </div>
      </v-card-text>
      <v-card-actions
        ><a
          href="https://www.runyourpool.com/dashboard/my-pools"
          target="_blank"
          ><v-btn class="mx-4">Survivor League</v-btn></a
        ><a
          href="https://fantasy.espn.com/football/league?leagueId=1308690"
          target="_blank"
          ><v-btn class="mx-4">FACT League</v-btn></a
        ></v-card-actions
      >
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'GamingDeadlines',
  props: {},
  data() {
    return {
      survivorPoolDay: 0,
      survivorPoolTimeHours: 13,
      collegePoolDay: 6,
      collegePoolTimeHours: 12,
    }
  },
  computed: {
    currentDayOfWeek() {
      return this.currentNow.getDay()
    },
    survivorPoolText() {
      if (this.currentNow.getMonth() < 8) {
        return 'First picks due Sunday, 9/11'
      } else if (
        this.currentNow.getMonth() === 8 &&
        this.currentNow.getDate() < 4
      ) {
        return (
          'First picks due Sunday, 9/11 in ' +
          (11 - this.currentNow.getDate()) +
          ' days'
        )
      }
      return this.getText(this.survivorPoolDay, this.survivorPoolTimeHours)
    },
    collegePicksText() {
      return this.getText(this.collegePoolDay, this.collegePoolTimeHours)
    },
    factFantasyText() {
      const dayOfWeek = this.currentNow.getDay()
      if (dayOfWeek === 2) {
        return 'Make waiver pickups.'
      }
      if (
        dayOfWeek === 3 ||
        (dayOfWeek === 4 && this.currentNow.getHours() < 20)
      ) {
        return 'Review waiver pickups, make more pickups and set initial lineup!'
      }
      if (
        dayOfWeek === 5 ||
        dayOfWeek === 6 ||
        (dayOfWeek === 4 && this.currentNow.getHours() >= 20)
      ) {
        return 'Continue picking up players and setting lineup'
      }
      if (dayOfWeek === 0) {
        if (this.currentNow.getHours() < 13) {
          return 'Set lineup by 1PM!'
        } else if (this.currentNow.getHours() < 20) {
          // 8PM
          return 'Continue setting lineup...'
        } else {
          return 'Check again tomorrow!'
        }
      }
      if (dayOfWeek === 1) {
        if (this.currentNow.getHours() < 20) {
          return 'Make any changes for tonights game, if applicable'
        } else {
          return 'Research for next week!'
        }
      }

      return false
    },
  },
  created() {
    this.currentNow = this.getNow()
  },
  methods: {
    getNow() {
      return new Date()
    },
    getText(day, timeHours) {
      let daysTil = day - this.currentDayOfWeek
      if (daysTil < 0) {
        daysTil += 7
      }
      const hoursWord = timeHours === 12 ? 'noon' : '1pm' // TODO: Handle other times
      const dayWord = day === 6 ? 'Saturday' : 'Sunday' // TODO: handle other days

      if (daysTil === 0) {
        if (this.currentNow.getHours() >= timeHours) {
          // Noon
          return `Deadline today passed at ${hoursWord}`
        }
        return `Update by ${hoursWord} today!`
      } else if (daysTil === 1) {
        return `Update by ${hoursWord} tomorrow!`
      } else {
        return (
          daysTil +
          ' days until deadline on ' +
          dayWord +
          (daysTil < 2 ? ' at ' + hoursWord : '')
        )
      }
    },
  },
}
</script>

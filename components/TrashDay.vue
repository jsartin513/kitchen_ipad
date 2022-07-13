<template>
  <div>
    <v-card class="w-full h-full" elevation="2">
      <v-card-title class="text-emerald-800">Next trash day</v-card-title>
      <v-card-text v-if="showNumberDays">
        <div class="grid gap-2 grid-cols-2 px-2">
          <div>Days til trash night:</div>
          <div class="text-6xl text-center">
            {{ daysTil }}
          </div>
        </div>
      </v-card-text>
      <v-card-text v-else>
        <div class="text-center text-xl">
          {{ todayText }}
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'TrashDay',
  props: {},
  data() {
    return {
      currentNow: null,
    }
  },
  computed: {
    showNumberDays() {
      return this.daysTil > 1
    },
    todayText() {
      const dayWord = this.daysTil === 0 ? 'tonight!' : 'tomorrow night!'
      return `Put the trash out ${dayWord}`
    },
    currentDayOfWeek() {
      return this.currentNow.getDay()
    },
    isHolidayWeek() {
      const pastSunday = new Date(
        this.currentNow - this.currentDayOfWeek * 24 * 60 * 60 * 1000
      )
      const sundayHolidayDates = [
        { month: 8, day: 4 },
        { month: 9, day: 9 },
        { month: 10, day: 20 },
        { month: 11, day: 25 },
      ]
      if (
        sundayHolidayDates.some((holiday) => {
          return (
            holiday.month === pastSunday.getMonth() &&
            holiday.day === pastSunday.getDate()
          )
        })
      ) {
        return true
      } else {
        return false
      }
    },
    daysTil() {
      // TODO: Fix holiday weeks, probably by checking a sunday
      const trashDay = this.isHolidayWeek ? 5 : 4 // thursday, unless it's a holiday week
      let daysTil = trashDay - this.currentDayOfWeek
      if (daysTil < 0) {
        daysTil += 7
      }
      return daysTil
    },
  },
  created() {
    this.currentNow = this.getNow()
  },
  methods: {
    getNow() {
      return new Date()
    },
  },
}
</script>

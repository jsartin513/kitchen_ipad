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
        <div :class="`${showNumberDays ? 'text-center' : ''} text-xl`">
          {{ todayText }}
        </div>
        <div v-if="showYardWaste" class="text-xl">
          {{ yardWasteText }}
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
    showYardWaste() {
      return this.currentDayOfWeek < 5 // This checks the past sunday, so only show between sun and thurs
    },
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
    pastSunday() {
      return new Date(
        this.currentNow - this.currentDayOfWeek * 24 * 60 * 60 * 1000
      )
    },
    isYardWasteWeek() {
      const sundayMonth = this.pastSunday.getMonth()
      const sundayDate = this.pastSunday.getDate()
      if (sundayMonth === 6) {
        return sundayDate === 17 || sundayDate === 31 // includes first week in august
      } else if (sundayMonth === 7) {
        return sundayDate === 14 || sundayDate === 28
      } else if (sundayMonth === 8) {
        return sundayDate === 11 || sundayDate === 25
      } else if (sundayMonth === 9) {
        return sundayDate !== 2 // All but the first week
      } else if (sundayMonth === 10) {
        // all of november
        return true
      } else if (sundayMonth === 11) {
        return sundayDate === 4 // week of december 4
      }
      return false
    },
    yardWasteText() {
      return this.isYardWasteWeek
        ? 'Includes yard waste'
        : 'Does not include yard waste'
    },
    isHolidayWeek() {
      const sundayHolidayDates = [
        { month: 8, day: 4 },
        { month: 9, day: 9 },
        { month: 10, day: 20 },
        { month: 11, day: 25 },
      ]
      if (
        sundayHolidayDates.some((holiday) => {
          return (
            holiday.month === this.pastSunday.getMonth() &&
            holiday.day === this.pastSunday.getDate()
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

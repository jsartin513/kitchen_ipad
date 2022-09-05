<template>
  <div>
    <div v-if="dueToday">{{ dueText }}</div>
    <div v-else>
      {{ `${thingAtThatTime} needs to be ${actionToTake} in ` }}
      <span :class="dueClass + ` text-4xl`">{{ daysUntilDue }}</span
      ><span> days</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DueDate',
  props: {
    dueDay: {
      type: Number,
      default: 0,
    },
    dueHours: {
      type: Number,
      default: 24, // Technically, just into the next day
    },
    thingAtThatTime: {
      type: String,
      default: '',
    },
    actionToTake: {
      type: String,
      default: 'finished',
    },
  },
  computed: {
    currentDayOfWeek() {
      return this.currentNow.getDay()
    },
    daysUntilDue() {
      const daysTil = this.dueDay - this.currentDayOfWeek
      return daysTil < 0 ? daysTil + 7 : daysTil
    },
    dueToday() {
      return this.daysUntilDue === 0
    },
    isPastDueToday() {
      // Only valid if the due day is today!! No error handling
      return this.currentNow.getHours() > this.dueHours
    },
    userFriendlyDueHours() {
      return this.dueHours < 12
        ? `${this.dueHours} AM`
        : `${this.dueHours - 12} PM`
    },
    dueClass() {
      // TODO: figure this out to be clean
      if (this.daysUntilDue === 0) {
        return this.isPastDueToday ? `color-blue` : `color-red`
      } else if (this.daysUntilDue === 1) {
        return 'color-red'
      } else if (this.daysUntilDue <= 3) {
        return 'color-yellow'
      } else {
        return 'text-blue-800'
      }
    },
    dueText() {
      if (this.daysUntilDue === 0) {
        if (this.isPastDueToday) {
          return `${this.thingAtThatTime} deadline passed today at ${this.userFriendlyDueHours}!`
        } else {
          return `${this.thingAtThatTime} is due today at ${this.userFriendlyDueHours}!`
        }
      } else {
        return `${this.thingAtThatTime} needs to be ${this.actionToTake} in ${this.daysUntilDue} days`
      }
    },
    dueDaysText() {
      return ``
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

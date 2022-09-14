<template>
  <div>
    <v-card :class="`w-full {{ collapsed ? 'h-8' : 'h-full' }}`" elevation="2">
      <v-card-title class="text-emerald-800"
        >Upcoming Grocery Deliveries</v-card-title
      >
      <v-card-text v-if="!collapsed">
        <h3 class="text-lg mx-4">Imperfect Foods</h3>
        <p class="text-base mx-4">{{ imperfectFoodsText }}</p>
      </v-card-text>
      <v-card-actions v-if="buttonText && !collapsed">
        <a href="https://www.imperfectfoods.com/shopping?" target="_blank">
          <v-btn class="mx-4">{{ buttonText }}</v-btn></a
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'UpcomingDeliveries',
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentNow: null,
    }
  },
  computed: {
    buttonText() {
      if (this.canUpdateImperfectFoods) {
        return 'Update Current Order'
      } else if (this.isUpcomingImperfectFoods) {
        return 'View Current Order'
      }
      return null
    },
    imperfectFoodsText() {
      if (this.canUpdateImperfectFoods) {
        return 'The current order can be updated until Wednesday.'
      } else if (this.isUpcomingImperfectFoods) {
        return 'The next order is coming on Friday.'
      } else {
        return 'Next order can be edited on Monday.'
      }
    },
    canUpdateImperfectFoods() {
      const dayOfWeek = this.currentNow.getDay()
      if (dayOfWeek === 2) {
        return true
      }
      if (dayOfWeek === 3) {
        return this.currentNow.getHours() <= 11 // 11:59am
      }
      if (dayOfWeek === 1) {
        return this.currentNow.getHours() >= 13 // 1:00pm
      }

      return false
    },
    isUpcomingImperfectFoods() {
      const dayOfWeek = this.currentNow.getDay()
      if (dayOfWeek === 4) {
        return true
      }
      if (dayOfWeek === 3) {
        return this.currentNow.getHours() >= 12 // 12:00pm
      }
      if (dayOfWeek === 5) {
        return this.currentNow.getHours() <= 17 // 5:59pm, but should find a way to manunally update this. Maybe a button? and persistent state
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
  },
}
</script>

<template>
  <div>
    <v-card class="w-full h-full" elevation="2">
      <v-card-title class="text-emerald-800">Upcoming Groceries</v-card-title>
      <v-card-text>
        <h3 class="text-lg mx-4">Imperfect Foods</h3>
        <p class="text-base mx-4">{{ imperfectFoodsText }}</p>
      </v-card-text>
      <v-card-actions v-if="buttonText">
        <a href="https://www.imperfectfoods.com/shopping?"
          ><v-btn>{{ buttonText }}</v-btn></a
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'UpcomingDeliveries',
  props: {},
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
        return 'Check Current Order'
      }
      return null
    },
    imperfectFoodsText() {
      if (this.canUpdateImperfectFoods) {
        return 'The current order can be updated until Wednesday.'
      } else if (this.isUpcomingImperfectFoods) {
        return 'The next order is coming on Friday.'
      } else {
        return 'No upcoming order.'
      }
    },
    canUpdateImperfectFoods() {
      const dayOfWeek = this.currentNow.getDay()
      if (dayOfWeek === 2) {
        return true
      }
      if (dayOfWeek === 3) {
        return this.currentNow.getHours() <= 12
      }
      if (dayOfWeek === 1) {
        return this.currentNow.getHours() >= 13
      }

      return false
    },
    isUpcomingImperfectFoods() {
      const dayOfWeek = this.currentNow.getDay()
      if (dayOfWeek === 4) {
        return true
      }
      if (dayOfWeek === 3) {
        return this.currentNow.getHours() >= 12
      }
      if (dayOfWeek === 5) {
        return this.currentNow.getHours() <= 17
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

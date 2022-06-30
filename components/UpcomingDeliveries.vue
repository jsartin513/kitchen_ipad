<template>
  <div>
    <v-card elevation="2">
      <v-card-title>Imperfect Foods</v-card-title>
      <div v-if="canUpdateImperfectFoods">
        <v-card-text
          >The current order can be updated until Wednesday.</v-card-text
        >
        <v-card-actions>
          <a href="https://www.imperfectfoods.com/shopping?"
            >Update Current Order</a
          >
        </v-card-actions>
      </div>
      <div v-else-if="isUpcomingImperfectFoods">
        <v-card-text>The next order is coming on Friday</v-card-text>
        <v-card-actions>
          <a href="https://www.imperfectfoods.com/shopping?"
            ><v-btn>See Upcoming Order</v-btn></a
          >
        </v-card-actions>
      </div>
      <div v-else><v-card-text>No upcoming order</v-card-text></div>
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

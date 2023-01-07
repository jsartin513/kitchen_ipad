<template>
  <div>
    <v-card class="w-full h-full" elevation="2">
      <v-card-title class="text-emerald-800">Important Dates</v-card-title>
      <v-card-text>
        <div v-for="countdown in countdowns" :key="countdown.id">
          <div class="grid gap-2 grid-cols-3 px-2">
            <div>{{ countdown.name }}</div>
            <div>{{ countdown.dateString }}</div>
            <div>{{ countdown.days }} days</div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ImportantDates',
  props: {},
  computed: {
    countdowns() {
      const today = new Date()
      const dates = [
        { id: 1, name: "Mike's Wedding", date: new Date(2023, 5, 17) },
        { id: 2, name: 'Hootiefest', date: new Date(2023, 3, 25) },
        { id: 3, name: "Jess's girls trip", date: new Date(2023, 2, 10) },
        { id: 4, name: 'NFG concert', date: new Date(2023, 2, 16) },
      ]
      const countdowns = dates.map((date) => {
        const diff = date.date - today
        const oneDay = 1000 * 60 * 60 * 24
        const days = Math.floor(diff / oneDay)
        const dateString = date.date.toLocaleDateString()
        return { id: date.id, name: date.name, days, dateString }
      })
      return countdowns.sort((a, b) => a.days - b.days)
    },
  },
}
</script>

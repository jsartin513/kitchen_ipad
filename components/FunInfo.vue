<template>
  <div>
    <v-card class="w-full h-full" elevation="2">
      <v-card-title>Fun Facts</v-card-title>
      <v-card-text>
        <div class="text-xl">
          Days since we were asked if we went to college together
        </div>
        <div class="text-6xl">{{ daysSince }}</div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'FunInfo',
  props: {},
  computed: {
    daysSince() {
      const today = new Date()
      const date = new Date(2022, 6, 2)
      const diff = today - date
      const oneDay = 1000 * 60 * 60 * 24
      const daysSince = Math.floor(diff / oneDay)
      return daysSince
    },
  },
}
</script>

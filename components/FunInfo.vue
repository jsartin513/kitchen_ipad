<template>
  <div>
    <v-card class="w-full h-full" elevation="2">
      <v-card-title class="text-emerald-800">Fun Facts</v-card-title>
      <v-card-text>
        <div class="grid gap-2 grid-cols-2 px-2">
          <div>Days since we were asked if we went to college together</div>
          <div class="text-6xl text-center">
            {{ daysSince }}
          </div>
        </div>
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

<template>
  <v-main>
    <div class="bg-indigo-200 h-full">
      <h1 class="px-16 py-8 text-3xl text-center text-emerald-800">
        What's going on?
      </h1>
      <div class="grid gap-4 grid-cols-2 px-8">
        <UpcomingDeliveries />
        <TodaysWeather />
        <TrashDay />
        <FoodInFridge />
        <NextSoxGame />
        <FunInfo />
      </div>
    </div>
  </v-main>
</template>

<script>
import UpcomingDeliveries from '~/components/UpcomingDeliveries.vue'
import TodaysWeather from '~/components/TodaysWeather.vue'
import FunInfo from '~/components/FunInfo.vue'
import FoodInFridge from '~/components/FoodInFridge.vue'
import NextSoxGame from '~/components/NextSoxGame.vue'
import TrashDay from '~/components/TrashDay.vue'

export default {
  name: 'IndexPage',
  components: {
    UpcomingDeliveries,
    TodaysWeather,
    FunInfo,
    FoodInFridge,
    NextSoxGame,
    TrashDay,
  },
}
</script>

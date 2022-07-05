<template>
  <div>
    <h1 class="px-16 py-8 text-3xl text-center">What's going on?</h1>
    <div class="grid gap-4 grid-cols-2 px-8">
      <UpcomingDeliveries />
      <TodaysWeather />
      <FoodInFridge />
      <FunInfo />
    </div>
  </div>
</template>

<script>
import UpcomingDeliveries from '~/components/UpcomingDeliveries.vue'
import TodaysWeather from '~/components/TodaysWeather.vue'
import FunInfo from '~/components/FunInfo.vue'
import FoodInFridge from '~/components/FoodInFridge.vue'

export default {
  name: 'IndexPage',
  components: { UpcomingDeliveries, TodaysWeather, FunInfo, FoodInFridge },
}
</script>

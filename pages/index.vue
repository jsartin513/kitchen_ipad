<template>
  <div>
    <UpcomingDeliveries />
    <TodaysWeather />
  </div>
</template>

<script>
import UpcomingDeliveries from '~/components/UpcomingDeliveries.vue'
import TodaysWeather from '~/components/TodaysWeather.vue'

export default {
  name: 'IndexPage',
  components: { UpcomingDeliveries, TodaysWeather },
}
</script>

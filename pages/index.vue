<template>
  <v-main>
    <div class="bg-indigo-200 h-full">
      <h1 class="px-16 py-8 text-3xl text-center text-emerald-800">
        What's going on?
      </h1>
      <div :class="`grid gap-4 ${colClass} px-8`">
        <UpcomingDeliveries v-if="showUpcomingDeliveries" />
        <TodaysWeather v-if="showTodaysWeather" />
        <TrashDay v-if="showTrashDay" />
        <FoodInFridge
          v-if="showFoodInFridge"
          :total-panels="selectedPanels.length"
          @expand="clickIntoPanel('FOOD')"
          @collapse="clickOutOfPanel()"
        />
        <NextSoxGame v-if="showNextSoxGame" />
        <FunInfo v-if="showFunInfo" />
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
  data() {
    return {
      selectedPanels: ['DELIVERIES', 'WEATHER', 'FUN', 'FOOD', 'SOX', 'TRASH'],
    }
  },
  computed: {
    colClass() {
      const columns = this.selectedPanels.length > 1 ? 2 : 1
      return `grid-cols-${columns}`
    },
    showUpcomingDeliveries() {
      return this.selectedPanels.includes('DELIVERIES')
    },
    showTodaysWeather() {
      return this.selectedPanels.includes('WEATHER')
    },
    showFunInfo() {
      return this.selectedPanels.includes('FUN')
    },
    showFoodInFridge() {
      return this.selectedPanels.includes('FOOD')
    },
    showNextSoxGame() {
      return this.selectedPanels.includes('SOX')
    },
    showTrashDay() {
      return this.selectedPanels.includes('TRASH')
    },
  },
  methods: {
    clickIntoPanel(panelName) {
      setTimeout(() => {
        this.selectedPanels = [panelName]
      }, 300)
    },
    clickOutOfPanel() {
      setTimeout(() => {
        this.selectedPanels = [
          'DELIVERIES',
          'WEATHER',
          'FUN',
          'FOOD',
          'SOX',
          'TRASH',
        ]
      })
    },
  },
}
</script>

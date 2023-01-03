<template>
  <v-main>
    <div class="bg-indigo-200 h-full">
      <h1
        :class="`grid grid-cols-2 px-8 mx-8 py-4 mb-4 text-3xl text-emerald-800 border-b`"
      >
        <div>What's going on?</div>
        <div class="text-right">{{ todaysDate }}</div>
      </h1>
      <div :class="`grid ${colClass} gap-4 $ px-8`">
        <div :v-if="selectedPanels.length > 1" class="left-col col-span-1">
          <h2 class="text-xl text-center pb-4 text-gray-800">Upcoming stuff</h2>
          <div class="flex flex-col gap-y-2">
            <TrashDay v-if="showTrashDay" />
            <UpcomingDeliveries v-if="showUpcomingDeliveries" />
            <ThreeDPrinter v-if="show3DPrinter" />
            <NextSoxGame v-if="showNextSoxGame" />
            <FunInfo v-if="showFunInfo" />
            <GamingDeadlines v-if="showGamingDeadlines" />
          </div>
        </div>
        <div class="right-col col-span-2">
          <h2 class="text-xl text-center pb-4 text-gray-800">
            Ideas and stuff
          </h2>
          <div class="flex flex-col gap-y-4">
            <TodaysWeather v-if="showTodaysWeather" />
            <MealIdeas
              v-if="showMealIdeas"
              :total-panels="selectedPanels.length"
              @expand="clickIntoPanel('MEALS')"
              @collapse="clickOutOfPanel()"
            /><FoodInFridge
              v-if="showFoodInFridge"
              :total-panels="selectedPanels.length"
              @expand="clickIntoPanel('FOOD')"
              @collapse="clickOutOfPanel()"
            />
            <FoodSlideshow
              v-if="showFoodSlideshow"
              :total-panels="selectedPanels.length"
              @expand="clickIntoPanel('FOODSLIDESHOW')"
              @collapse="clickOutOfPanel()"
            />
          </div>
        </div>
      </div>
    </div>
  </v-main>
</template>

<script>
import ThreeDPrinter from '~/components/3DPrinter'
import UpcomingDeliveries from '~/components/UpcomingDeliveries.vue'
import TodaysWeather from '~/components/TodaysWeather.vue'
import FunInfo from '~/components/FunInfo.vue'
import FoodInFridge from '~/components/FoodInFridge.vue'
import FoodSlideshow from '~/components/FoodSlideshow.vue'
import NextSoxGame from '~/components/NextSoxGame.vue'
import TrashDay from '~/components/TrashDay.vue'
import GamingDeadlines from '~/components/GamingDeadlines.vue'
import MealIdeas from '~/components/MealIdeas.vue'

export default {
  name: 'IndexPage',
  components: {
    UpcomingDeliveries,
    TodaysWeather,
    FunInfo,
    FoodInFridge,
    FoodSlideshow,
    NextSoxGame,
    TrashDay,
    ThreeDPrinter,
    GamingDeadlines,
    MealIdeas,
  },
  data() {
    return {
      selectedPanels: [
        'DELIVERIES',
        'WEATHER',
        'TRASH',
        'SOX',
        '3DPRINTER',
        'FUN',
        'FOODSLIDESHOW',
      ],
      panelState: {
        deliveries: 'COLLAPSED',
        weather: 'OPEN',
        deadlines: 'COLLAPSED',
        trash: 'OPEN',
        sox: 'OPEN',
        printer: 'COLLAPSED',
        fun: 'COLLAPSED',
        meals: 'COLLAPSED',
        foodSlideshow: 'OPEN',
      },
    }
  },
  computed: {
    colClass() {
      const columns = this.selectedPanels.length > 1 ? 3 : 1
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
    showFoodSlideshow() {
      return this.selectedPanels.includes('FOODSLIDESHOW')
    },
    showNextSoxGame() {
      return this.selectedPanels.includes('SOX')
    },
    showTrashDay() {
      return this.selectedPanels.includes('TRASH')
    },
    show3DPrinter() {
      return this.selectedPanels.includes('3DPRINTER')
    },
    showGamingDeadlines() {
      return this.selectedPanels.includes('DEADLINES')
    },
    showMealIdeas() {
      return this.selectedPanels.includes('MEALS')
    },
    todaysDate() {
      return new Date().toDateString()
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
          'SOX',
          'TRASH',
          '3DPRINTER',
          'FOODSLIDESHOW',
        ]
        this.panelState = {
          deliveries: 'OPEN',
          weather: 'OPEN',
          deadlines: 'COLLAPSED',
          trash: 'OPEN',
          sox: 'OPEN',
          printer: 'COLLAPSED',
          fun: 'COLLAPSED',
          meals: 'COLLAPSED',
          foodSlideshow: 'OPEN',
        }
      })
    },
  },
}
</script>

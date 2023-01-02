<template>
  <div>
    <v-card class="w-full h-full" elevation="2">
      <v-card-title class="text-emerald-800"
        ><div class="grid grid-cols-8 w-full">
          <div class="col-span-7">Need a dinner idea?</div>
          <div class="text-right">
            <v-icon
              v-if="!expanded"
              aria-label="Expand"
              role="img"
              aria-hidden="false"
              @click="$emit('expand')"
            >
              mdi-arrow-expand-all
            </v-icon>
            <v-icon
              v-if="expanded"
              aria-label="Collapse"
              role="img"
              aria-hidden="false"
              @click="$emit('collapse')"
              >mdi-arrow-collapse-all</v-icon
            >
          </div>
        </div></v-card-title
      >

      <v-card-text :class="`mx-2 ${expanded ? 'text-lg' : 'text-sm'}`">
        <div :class="`grid grid-cols-2`">
          <div v-for="meal in fullMeals" :key="meal.name">
            <div
              :class="`mx-1 font-semibold ${
                expanded ? 'text-xl' : 'text-base'
              }`"
            >
              {{ meal.name }}
            </div>
            <v-img
              :max-width="148"
              :max-height="60"
              :src="imageSource(meal.img)"
              :contain="true"
              :alt="`Picture of {{ meal.name }}`"
            />
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useFoodStore } from '~/store/foodInHouse'

export default {
  name: 'MealIdeas',
  props: {
    totalPanels: {
      type: Number,
      default: 6,
    },
  },
  data() {
    return {}
  },
  computed: {
    expanded() {
      // Why isn't this a prop? I might have more use for the total number of panels later
      return this.totalPanels === 1
    },
    listClass() {
      if (this.expanded) {
        return 'text-xl list-none'
      } else {
        return 'text-sm list-disc'
      }
    },
    fullMeals() {
      return this.foodStore.fullMeals
    },
    foodToAddBackIn() {
      const allMealFood = [...this.foodStore.fullMeals]
      return allMealFood.filter(
        (food) => !this.foodStore.foodInHouse.includes(food)
      )
    },
    ...mapStores(useFoodStore),
  },
  methods: {
    imageSource(src) {
      return '/food/' + src + '.png'
    },
  },
}
</script>

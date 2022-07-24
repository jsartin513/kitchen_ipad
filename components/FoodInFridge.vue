<template>
  <div>
    <v-card class="w-full h-full" elevation="2">
      <v-card-title class="text-emerald-800"
        ><div class="grid grid-cols-8 w-full">
          <div class="col-span-7">Make effort to eat...</div>
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
      <v-card-text :class="`mx-4 ${expanded ? 'text-xl' : 'text-sm'}`">
        <ul :class="`list-disc ${expanded ? 'text-xl' : 'text-sm'}`">
          <li v-for="foodItem in foodStore.foodList" :key="foodItem">
            {{ foodItem }}
          </li>
        </ul>
        <v-combobox
          v-if="expanded"
          :items="foodNotInList"
          hide-selected
          @change="addFoodToList"
        >
        </v-combobox>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useFoodStore } from '~/store/foodInHouse'

export default {
  name: 'FoodInFridge',
  props: {
    totalPanels: {
      type: Number,
      default: 6,
    },
  },
  computed: {
    expanded() {
      // Why isn't this a prop? I might have more use for the total number of panels later
      return this.totalPanels === 1
    },
    foodNotInList() {
      return this.foodStore.allFoods.filter(
        (food) => !this.foodStore.foodList.includes(food)
      )
    },
    ...mapStores(useFoodStore),
  },
  methods: {
    addFoodToList(food) {
      console.log('starting to add food to list')
      console.log(food)
      this.foodStore.addFoodToList(food, this.foodStore.foodList)
      console.log('ending to add food to list from component')
    },
  },
}
</script>

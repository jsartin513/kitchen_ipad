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

      <v-card-text :class="`mx-4 ${expanded ? 'text-lg' : 'text-sm'}`">
        <div class="grid grid-cols-3">
          <div>
            <div
              :class="`mx-2 font-semibold ${expanded ? 'text-xl' : 'text-med'}`"
            >
              Protein
            </div>
            <ul :class="listClass">
              <li v-for="protein in proteinInHouse" :key="protein">
                {{ protein }}
                <v-icon
                  v-if="expanded"
                  aria-label="Remove"
                  role="img"
                  aria-hidden="false"
                  @click="removeItem(protein)"
                  >mdi-delete</v-icon
                >
              </li>
            </ul>
          </div>
          <div>
            <div
              :class="`mx-2 font-semibold ${expanded ? 'text-xl' : 'text-med'}`"
            >
              Starch
            </div>
            <ul :class="listClass">
              <li v-for="carb in carbsInHouse" :key="carb">
                {{ carb }}
                <v-icon
                  v-if="expanded"
                  aria-label="Remove"
                  role="img"
                  aria-hidden="false"
                  @click="removeItem(carb)"
                  >mdi-delete</v-icon
                >
              </li>
            </ul>
          </div>
          <div>
            <div
              :class="`mx-2 font-semibold ${expanded ? 'text-xl' : 'text-med'}`"
            >
              Veggie
            </div>
            <ul :class="listClass">
              <li v-for="veggie in veggiesInHouse" :key="veggie">
                {{ veggie }}
                <v-icon
                  v-if="expanded"
                  aria-label="Remove"
                  role="img"
                  aria-hidden="false"
                  @click="removeItem(veggie)"
                  >mdi-delete</v-icon
                >
              </li>
            </ul>
          </div>
        </div>
        <v-combobox
          v-if="expanded"
          v-model="selectItem"
          :items="foodToAddBackIn"
          hide-selected
          @change="addFoodBackIn"
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
  name: 'MealIdeas',
  props: {
    totalPanels: {
      type: Number,
      default: 6,
    },
  },
  data() {
    return {
      selectItem: '',
    }
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
    proteinInHouse() {
      return this.foodStore.foodInHouse.filter((food) =>
        this.foodStore.proteins.includes(food)
      )
    },
    carbsInHouse() {
      return this.foodStore.foodInHouse.filter((food) =>
        this.foodStore.carbs.includes(food)
      )
    },
    veggiesInHouse() {
      return this.foodStore.foodInHouse.filter((food) =>
        this.foodStore.veggies.includes(food)
      )
    },
    foodToAddBackIn() {
      const allMealFood = [
        ...this.foodStore.proteins,
        ...this.foodStore.carbs,
        ...this.foodStore.veggies,
        ...this.foodStore.specialMeals,
      ]
      return allMealFood.filter(
        (food) => !this.foodStore.foodInHouse.includes(food)
      )
    },
    ...mapStores(useFoodStore),
  },
  methods: {
    addFoodBackIn(food) {
      this.foodStore.addFoodToList(food, this.foodStore.foodInHouse)
      setTimeout(() => {
        this.selectItem = ''
      }, 300)
    },
    removeItem(food) {
      this.foodStore.removeFoodFromList(food, this.foodStore.foodInHouse)
    },
  },
}
</script>

import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useFoodStore = defineStore({
  id: 'food',
  state: () => {
    return {
      foodList: useStorage('foodList', ['meat', 'brown rice']),
      allFoods: [
        'pears',
        'apples',
        'peaches',
        'broccoli',
        'meat',
        'canned meat',
        'brown rice',
      ],
      proteins: [
        'white fish',
        'shrimp',
        'salmon',
        'chicken',
        'steak',
        'burgers',
        'pork chops',
        'canned chili',
      ],
      carbs: [
        'brown rice',
        'white rice',
        'sweet potatoes',
        'mashed potatoes',
        'corn',
        'rice with quinoa',
        'pasta',
        'roasted veggie kit',
      ],
      veggies: [
        'broccoli',
        'asparagus',
        'green beans',
        'carrots',
        'zucchini',
        'squash',
      ],
      specialMeals: [
        'cauliflower pizza',
        'chicken and waffles',
        'asian sauced chicken',
        'tacos',
      ],
      foodInHouse: useStorage('foodInHouse', ['brown rice', 'salmon']),
    }
  },
  actions: {
    // TODO: This seems like a funky way to remove the item from the list
    addFoodToList: (food, listInStore) => {
      listInStore.push(food)
    },
    removeFoodFromList: (food, listInStore) => {
      listInStore.splice(listInStore.indexOf(food), 1)
    },
  },
  persist: true,
})

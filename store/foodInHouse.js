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

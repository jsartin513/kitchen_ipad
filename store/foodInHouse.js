import { defineStore } from 'pinia'

export const useFoodStore = defineStore({
  id: 'food',
  state: () => {
    return {
      foodList: ['meat', 'brown rice'],
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
    addFoodToList: (food, listInStore) => {
      console.log(food)
      listInStore.push(food)
    },
  },
  persist: true, // defaults to LocalStorage
})

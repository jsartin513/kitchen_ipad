import { defineStore } from 'pinia'

export const useFoodStore = defineStore({
  id: 'food',
  state: () => {
    return {
      foodList: [
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
  persist: true, // defaults to LocalStorage
})

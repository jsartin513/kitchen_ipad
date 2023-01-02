import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useFoodStore = defineStore({
  id: 'food',
  state: () => {
    const superEasyMeals = [
      { name: 'Cauliflower Pizza', img: 'cauliflower_pizza' },
      { name: 'Frozen Cheeseburger', img: 'frozen_cheeseburger' },
      { name: 'Chicken and Waffles', img: 'chicken_waffle' },
    ]
    // const simpleMeals = ['tacos', 'buffalo chicken mac and cheese']

    const simpleMeals = [
      { name: 'Tacos', img: 'tacos' },
      {
        name: 'Buffalo Chicken Mac and Cheese',
        img: 'buffalo_chicken_mac_and_cheese',
      },
    ]

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
      superEasyMeals: [...superEasyMeals],
      simpleMeals: [...simpleMeals],
      specialMeals: [
        ...superEasyMeals.map((meal) => {
          return meal.name
        }),
        ...simpleMeals.map((meal) => {
          return meal.name
        }),
      ],
      fullMeals: [...superEasyMeals, ...simpleMeals],
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

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
          <li>Fresh fruit (pears! apples! peaches!)</li>
          <li>Broccoli Rice</li>
          <li>Meat in the freezer</li>
          <li>Canned meat</li>
          <li>Brown rice</li>
        </ul></v-card-text
      >
    </v-card>
  </div>
</template>

<script>
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
  },
}
</script>

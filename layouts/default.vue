<template>
  <v-app>
    <Nuxt />
    <v-footer app class="grid grid-cols-2 justify-between"
      ><div class="text-left text-indigo-800">&copy;2022 Jess Sartin</div>
      <div class="text-right">
        <a href="https://github.com/jsartin513/kitchen_ipad">github</a>
      </div></v-footer
    >
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

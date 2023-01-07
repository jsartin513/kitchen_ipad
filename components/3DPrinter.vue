<template>
  <div>
    <v-card class="w-full h-full" elevation="2">
      <v-card-title class="text-emerald-800">3D Printer</v-card-title>
      <v-card-text>
        <div>{{ displayText }}</div>
        <div v-if="printerFlags && printerFlags.length > 0">
          Currently true flags:
        </div>
        <ul>
          <li v-for="flag in printerFlags" :key="flag">{{ flag }}</li>
        </ul>
      </v-card-text>
      <v-card-actions
        ><a href="http://maker.local/" target="_blank"
          ><v-btn class="mx-4">Open print monitor</v-btn></a
        ></v-card-actions
      ></v-card
    >
  </div>
</template>
<script>
export default {
  name: 'ThreeDPrinter',
  props: {},
  data() {
    return {
      printerStatus: null,
      printStatusLoaded: false,
      printStatusLoadFailed: false,
    }
  },
  computed: {
    displayText() {
      if (!this.printStatusLoaded) {
        return 'Loading...'
      }
      if (this.printStatusLoadFailed) {
        return 'Cannot load printer status from deployed website :) '
      }
      return 'Current status: ' + this.printerStatus.text
    },
    printerFlags() {
      if (!this.printStatusLoaded || this.printStatusLoadFailed) {
        return []
      }
      return Object.entries(this.printerStatus.flags)
        .filter(([key, value]) => {
          // eslint-disable-next-line eqeqeq
          return value == true
        })
        .map(([key, value]) => {
          return `${key}: ${value}`
        })
    },
  },
  created() {
    this.getPrinterStatus()
  },
  methods: {
    getPrinterStatus() {
      const printUrl = 'https://maker.local/api/printer'
      const apiKey = this.$config.public.printApiKey
      const apiParams = `?apikey=${apiKey}`
      fetch(printUrl + apiParams)
        .then((response) => response.json())
        .then((data) => {
          this.printerStatus = data.state
          this.printStatusLoaded = true
        })
        .catch((error) => {
          this.printStatusLoadFailed = true
          this.printStatusLoaded = true
          this.printerStatus = {
            status: 'error',
            message: error.message,
          }
        })
    },
  },
}
</script>

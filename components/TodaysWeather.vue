<template>
  <div>
    <v-card class="w-full h-full" elevation="2">
      <v-card-title>Current Weather</v-card-title>
      <v-card-text v-if="showWeather">
        <div class="text-6xl">{{ currentTemperature }}&deg;F</div>
      </v-card-text>
      <v-card-text v-if="showFailureMessage"> Weather Load Failed </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'TodaysWeather',
  props: {},
  data() {
    return {
      weather: null,
      weatherLoaded: false,
      weatherLoadFailed: false,
    }
  },
  computed: {
    currentTemperature() {
      // TODO: put some caching in place and re-enable this
      return this.weather ? Math.trunc(this.weather.temperature) : 89
    },
    showWeather() {
      return this.weatherLoaded && !this.weatherLoadFailed
    },
    showFailureMessage() {
      return this.weatherLoadFailed
    },
  },
  created() {
    this.loadWeather()
  },
  methods: {
    loadWeather() {
      const getTimelineURL = 'https://api.tomorrow.io/v4/timelines'
      const apiKey = 'CpjpjcI1rFh1qtWECG58JE6lzMkAnBVP' // TODO: Get a new key and be secureish. That said, it's a GET request...
      const location = '42.3928182,-71.099294' // TODO: get from browser location
      const units = 'imperial'
      const timesteps = 'current'
      const fields = 'temperature'
      const getTimeLineParameters = `?apikey=${apiKey}&location=${location}&units=${units}&timesteps=${timesteps}&fields=${fields}`
      fetch(getTimelineURL + getTimeLineParameters)
        .then((response) => response.json())
        .then((response) => {
          this.weather = response.data.timelines[0].intervals[0].values
          this.weatherLoaded = true
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
          // TODO: disable this once I can hit the API againn
          this.weatherLoaded = true
        })
    },
  },
}
</script>

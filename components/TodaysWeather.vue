<template>
  <div>
    <v-card class="w-full h-full">
      <v-card-title>Current Weather</v-card-title>
      <v-card-text v-if="showWeather">
        Temperature: {{ currentTemperature }}
      </v-card-text>
      <v-card-text v-if="showFailureMessage"> Weather Load Failed </v-card-text>
    </v-card>
  </div>
</template>

<script>
import apiTokens from '../tokens.js'
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
      return this.weather ? this.weather.temperature : 89
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
      const apiKey = apiTokens.tomorrowWeatherToken
      const location = '42.384481,-71.0880066'
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

<template>
  <div>
    <v-card class="w-full h-full" elevation="2">
      <v-card-title class="text-emerald-800">Current Weather</v-card-title>
      <v-card-text v-if="showWeather">
        <div class="grid gap-2 grid-cols-2 px-2">
          <div>
            <v-img
              :max-width="148"
              :max-height="60"
              :src="conditionIcon"
              :contain="true"
              alt="Weather icon"
            />
            <div class="text-base">{{ currentConditions }}</div>
          </div>
          <div>
            <div class="text-6xl">{{ currentTemperature }}&deg;F</div>
            <div class="text-base">
              Feels like {{ Math.trunc(weather.temperatureApparent) }}&deg;F
            </div>
          </div>
        </div>
      </v-card-text>
      <v-card-text v-if="showFailureMessage"> Weather Load Failed </v-card-text>
      <v-actions
        ><v-btn
          ><a href="https://www.wunderground.com/" target="_blank"
            >Deatiled Forecast (new tab)</a
          ></v-btn
        ></v-actions
      >
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
    conditionIcon() {
      if (this.weather) {
        switch (this.weather.weatherCode) {
          case 1000:
            return 'sun.png'
          case 1101:
          case 1100:
            return 'partly_cloudy.png'
          case 1102:
          case 2100:
          case 2000:
          case 1001:
            return 'cloud.png'
          case 4000:
          case 4200:
          case 4001:
          case 4201:
            return 'raindrop.png'
        }
      }
      return null
    },
    currentConditions() {
      if (this.weather) {
        switch (this.weather.weatherCode) {
          case 1000:
            return 'Clear'
          case 1101:
            return 'Partly Cloudy'
          case 1100:
            return 'Mostly Clear'
          case 1102:
            return 'Mostly Cloudy'
          case 1001:
            return 'Cloudy'
          case 2100:
            return 'Light Fog'
          case 2000:
            return 'Fog'
          case 4000:
            return 'Drizzle'
          case 4200:
            return 'Light Rain'
          case 4001:
            return 'Rain'
          case 4201:
            return 'Heavy Rain'
        }
      }
      return null
    },
  },
  created() {
    this.loadWeather()
  },
  methods: {
    loadWeather() {
      const getTimelineURL = 'https://api.tomorrow.io/v4/timelines'
      const apiKey = 'CpjpjcI1rFh1qtWECG58JE6lzMkAnBVP' // TODO: Get a new key and be secureish. That said, it's a GET request...
      const location = '42.388000,-71.118198' // TODO: get from browser location
      const units = 'imperial'
      const timesteps = 'current'
      const fields = ['temperature', 'temperatureApparent', 'weatherCode']
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
          this.weatherLoadFailed = true
        })
    },
  },
}
</script>

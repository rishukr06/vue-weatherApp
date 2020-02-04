<template>
  <v-app id="App"> 
    <v-content>
      <v-container fluid style="width:400px">
          <div>
            <v-text-field 
            label="Location"
            hide-details="auto"
            v-model="query"
            :loading="loading"
            @keypress="getWeather"
            ></v-text-field>
            
            <div v-if="typeof weather.main != 'undefined'">
              <v-container>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-card
                      class="mx-auto"
                      max-width="400"
                    >
                      <v-list-item two-line>
                        <v-list-item-content>
                          <v-list-item-title class="headline">{{weather.name}}, {{ weather.sys.country  }}</v-list-item-title>
                          <v-list-item-subtitle>{{ dateBuilder() }}</v-list-item-subtitle>
                          <v-list-item-subtitle>{{ weather.weather[0].main }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-card-text>
                        <v-row align="center">
                          <v-col  cols="6">
                            <p class="display-3">{{ Math.round(weather.main.temp) }}°c</p>
                            <p class="display-6">feels like {{ weather.main.feels_like}}</p>

                          </v-col>

                          <v-col cols="6">
                            <v-img
                              :src= "weather.imageUrl"
                              alt="Sunny image"
                              width="92"
                            ></v-img>
                          </v-col>
                        </v-row>
                      </v-card-text>

                        

                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon>mdi-send</v-icon>
                        </v-list-item-icon>
                        <v-list-item-subtitle>{{ weather.wind.speed }} km/h, {{ weather.wind.deg }} deg</v-list-item-subtitle>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon>mdi-cloud-download</v-icon>
                        </v-list-item-icon>
                        <v-list-item-subtitle>{{ weather.main.humidity }}%</v-list-item-subtitle>
                      </v-list-item>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </div>
            <!-- <div v-if="typeof weather.main == 'undefined'"> -->
              <!-- <div class="firstView">
                <img class="ml-n12 pr-12"  
                height="100%"
                src="https://images.vexels.com/media/users/3/141916/isolated/preview/dcd10d362e49a3c161379047a940ba7d-location-pin-stroke-icon-by-vexels.png"/>
              </div> -->
            <!-- </div> -->
            <v-switch
              v-model="$vuetify.theme.dark"
              primary
              class="ma-3"
              label="Dark"
            />
          </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      api_key: '32819bc7251f2ba806061c9d46f6c1d0',
      base_url: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      weather: {},
      loading : false,
      lat: '',
      lon: ''
    }
  },
  methods: {
    getWeather (e) {
      if(e.key=="Enter") {
        this.loading = true
        fetch(`${this.base_url}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
          .then(res => {
            return res.json();
          }).then(this.setResults);
      }
    },
     getCurrentGeoWeather () {
      this.loading = true
      fetch(`${this.base_url}weather?lat=${this.lat}&lon=${this.lon}&units=metric&APPID=${this.api_key}`)
        .then(res => {
          return res.json();
        }).then(this.setResults);
    },
    setResults(results) {
      if(results.cod==404)
      {
        alert('city not found');
      }
      else
      {
        this.weather = results;
        this.weather.imageUrl = "http://openweathermap.org/img/wn/"+results.weather[0].icon+".png";
        this.query=null;
      }
       this.loading = false;
    },

    dateBuilder () {
      let d = new Date();
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${date} ${month} ${year}`;
    }
  },
  mounted(){
    this.loading = true;
    this.$getLocation({
      enableHighAccuracy: true,
      timeout: Infinity,
    }).then(coordinates => {
      this.lat = coordinates.lat;
      this.lon = coordinates.lng;
    }).then(()=>this.getCurrentGeoWeather());
     this.loading = false;
  },
}
</script>

<style scoped>
.container1{
  position: absolute;
  left:50%;
  top:10%;
  transform: translateX(-50%);
  width: 400px;
  height: 600px;
  padding: 5px;
  background: #fff;
  box-shadow: 0px 0px 8px #ddd;
  border-radius: 5px;
}
.firstView{
  height: 100%;
  width: 100%;
  background:rgba(255,0,0,0.3);
  color:#fff;
  text-align: center;
  overflow: hidden;
  justify-content: center
}
</style>
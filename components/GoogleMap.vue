<template>
  <div>
    <label>
      <gmap-autocomplete @place_changed="setPlace">
        <template v-slot:input="slotProps">
          <v-text-field ref="input" label="" placeholder="(예) 서울시 강남구 압구정로 10-16" outlined hide-details v-on:listeners="slotProps.listeners" v-on:attrs="slotProps.attrs"> </v-text-field>
        </template>
      </gmap-autocomplete>
    </label>
    <br/>
    <gmap-map style="width:100%;height:400px;" :zoom="zoom" :center="center">
      <gmap-marker v-if="place" label="★" :position="place" :draggable="true" @dragend="updateCoordinate"/>
    </gmap-map>
  </div>
</template>

<script>
/**
 * https://www.npmjs.com/package/vue2-google-maps -> autocomplete slot not working
 * https://github.com/diegoazh/gmap-vue -> vue2-google-maps fork slot working
 */
export default {
  props: ['coordinate'],
  mounted() {
    if ( this.coordinate ) {
      this.setPlace(this.coordinate)
    }
  },
  data: () => ({
    markers: [],
    place: null,
    zoom: 5,
    center: {lat: 0, lng: 0},
  }),
  methods: {
    /*setDescription(description) {
        this.description = description;
    },
    usePlace(place) {
        if (this.place) {
            this.markers.push({
                position: {lat: this.place.geometry.location.lat(), lng: this.place.geometry.location.lng()}
            })
            this.place = null;
        }
    },*/
    setPlace(place) {
      //console.log(place);
      if (place.geometry) {
        this.place = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}
      } else {
        this.place = place;
      }
      this.center = {lat: this.place.lat, lng: this.place.lng}
      this.zoom = 15;
      this.$emit('update-coordinate', this.place);
    },
    updateCoordinate(location) {
      //console.log(location, location.latLng.lat(), location.latLng.lng());
      this.$emit('update-coordinate', {lat: location.latLng.lat(), lng: location.latLng.lng()})
    },
  }
}
</script>

<style scoped>
#input-63 { opacity: 0 !important; }
</style>

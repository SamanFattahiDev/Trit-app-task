import {LMap, LTileLayer, LMarker} from "leaflet";
import "leaflet/dist/leaflet.css";
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("l-map", LMap)
    nuxtApp.vueApp.component("l-tile-layer", LTileLayer)
    nuxtApp.vueApp.component("l-marker", LMarker)
})




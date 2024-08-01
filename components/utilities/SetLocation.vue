<template>
  <div :id="`map${nodeId}`" class="w-full map relative rounded-lg">
    <div class=" rounded-xl !absolute bg-secondary bottom-5 right-3 z-10 rounded-circle flex items-center justify-center"
         style="width: 40px;height: 40px;z-index: 999;"
         @click.stop="getMyLocation">
      <LazyMainDynamicIcon class="  " icon="gps"
                           style="width: 25px;height: 25px"></LazyMainDynamicIcon>
    </div>

  </div>
</template>
<script lang="ts" setup>
const emits = defineEmits<{
  (e: 'getGeoLocation', lat: number, long: number): void
}>()
const props = defineProps({
  nodeId: {
    type: Number,
    required: true
  },
  defaultViewGeoLoc: {
    type: Array,
    required: false,
  },
  defaultMarkerGeoLoc: {
    type: Array,
    required: false,
  },
})
let map = ref(null)
let marker = ref(null)
let latitude = ref(null)
let longitude = ref(null)
const positionErrors = ref({
  1: 'ابتدا دسترسی به لوکیشن خود را باز کنید',
  2: 'دسترسی به لوکیشن میسر نیست',
  3: 'مشکلی پیش آمده.لطفا بعدا امتحان کنید'
})

watch(() => props.defaultMarkerGeoLoc, async (val) => {
  if (val && val.length > 0) {
    if (val[0] && val[1]) {
      addMarker(val[0], val[1]);
    }
  }
})
watch(() => props.defaultViewGeoLoc, async (val) => {
  if (val && val.length > 0) {
    if (val[0] && val[1]) {
      map.value.setView(val, 11);
    }
  }
})
onMounted(() => {
  if (map.value) {
    return
  } else {
    setTimeout(() => {
      map.value = L.map(`map${props.nodeId}`, {zoomControl: false}).setView([35.751128, 51.418679], 14);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(map.value);
      // Leaflet has a known issue with wrong marker address
      // This section is their own provided solution for fixing this issue
      // Please don't touch it or marker won't be shown on the map
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "/marker-icon-2x.png",
        iconUrl: "/marker-icon.png",
        shadowUrl: "/marker-shadow.png",
      });
      // Solution ends here
      if (props.defaultMarkerGeoLoc) {
        if (props.defaultMarkerGeoLoc[0] && props.defaultMarkerGeoLoc[1]) {
          map.value.setView(props.defaultMarkerGeoLoc, 14);
          marker.value = L.marker(props.defaultMarkerGeoLoc);
          marker.value.addTo(map.value);
        }
      }
      map.value.on("click", handleMapClick);
    }, 1000)
  }

})

function getMyLocation() {
  navigator.geolocation.getCurrentPosition((res) => {
    latitude.value = res.coords.latitude;
    longitude.value = res.coords.longitude;
    addMarker(res.coords.latitude, res.coords.longitude)
    emits("getGeoLocation", res.coords.latitude, res.coords.longitude);

  }, (error) => {
    if (error.code) {
      useToast().toastError(positionErrors.value[error.code])
      console.log(positionErrors.value[error.code])
    }
  })
}

onBeforeUnmount(() => {
  destroyMap()
})

function destroyMap() {
   map.value?.off()
  map.value?.remove()
  map.value = null
}

async function handleMapClick(event) {
  latitude.value = event.latlng.lat;
  longitude.value = event.latlng.lng;
  addMarker(event.latlng.lat, event.latlng.lng)
  emits("getGeoLocation", latitude.value, longitude.value);
}

async function addMarker(lat, long) {
  if (!marker.value) {
    // Check if a marker already exists
    // If not, create a new one
    marker.value = L.marker([lat, long]);
    marker.value.addTo(map.value);
  } else {
    if (map.value) {
      // If a marker already exists, remove it first,
      // Then add new marker
      await marker.value.removeFrom(map.value);
      marker.value = L.marker([lat, long]);
      marker.value.addTo(map.value);
    }
  }
  map.value.setView([lat, long], 14);
}


</script>
<style>
.map {
  height: 300px !important;
}


</style>

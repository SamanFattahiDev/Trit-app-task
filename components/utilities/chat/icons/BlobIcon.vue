<template>
  <div
      class="blob red cursor-pointer"
  ></div>
</template>

<script>

</script>

<style scoped>
.blob {
  background: #ff5252b2;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
  margin: 10px;
  height: 20px;
  width: 20px;
  transform: scale(1);
  animation: pulse-red 2s infinite;
}

@keyframes pulse-red {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
  }
}
</style>
<script setup>
</script>

<template>
  <nav class="fixed-bar">
    <div class="title-futsort">FutSort</div>
    <span class="version">v0.4</span>
  </nav>
</template>

<style scoped>

nav.fixed-bar {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 999;
}

.fixed-bar {
  background-color: #27AE60;
  overflow: hidden;
  box-shadow: 0 0 2px 2px #555;
}

.title-futsort{
  text-align: center;
  font-size: 23px;
  font-weight: bold;
  color: #fff;
  letter-spacing: 0.08em;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);
}

.fixed-bar .version {
  position: fixed;
  top: 8px;
  right: 10px;
  color: #fff;
}
</style>

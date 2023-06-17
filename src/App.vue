<script setup>
import { RouterView } from 'vue-router'
import MenuSliderComponent from './components/MenuSliderComponent.vue'
import FixedBar from './components/FixedBar.vue'

</script>

<template>
  <header>
    <FixedBar></FixedBar>
    <MenuSliderComponent></MenuSliderComponent>
  </header>
  
  <RouterView />
  <!-- <ExemploComponent /> -->

</template>

<style scoped>
header {
  text-align: center;
}

</style>

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
  
  <div class="content">
    <RouterView />
  </div>

</template>

<style scoped>
header {
  margin-top: 40px;
}
</style>

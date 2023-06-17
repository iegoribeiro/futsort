<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import ExemploComponent from './components/ExemploComponent.vue'
import FixedBar from './components/FixedBar.vue'
</script>

<template>
  <header>
    <FixedBar></FixedBar>
  </header>
  <div class="navbar">
    <nav class="menu">
      <RouterLink class="menu-item" to="/admin">Admin</RouterLink>
      <RouterLink class="menu-item" to="/">Jogar</RouterLink>
      <RouterLink class="menu-item" to="/mensalidade">Mensalidade</RouterLink>
      <div class="menu-animation"></div>
    </nav>
  </div>
  
  <!-- <RouterView /> -->
  <!-- <ExemploComponent /> -->

</template>

<style scoped>
header {
  text-align: center;
}

.navbar {
  display: flex;
  justify-content: center;
}

nav.menu {
  position: relative;
  height: 40px;
  text-align: center;
  font-size: 18px;
  background-color: #27AE60;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 400px;
  border-radius: 25px;
}

.menu .menu-item {
  margin: 0 20px;
  text-decoration: none;
  color: black;
}

nav .menu-animation {
  position: absolute;
  height: 100%;
  top: 0;
  z-index: 0;
  background: #fff;
  width: 100px;
  border-radius: 20px;
}

.menu .menu-item span {
  background-color: #fff;
  min-width: 100px;
  padding: 5px;
  border-radius: 4px;
}

/*
nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>

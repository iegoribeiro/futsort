<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="navbar">
    <nav class="menu">
      <RouterLink class="menu-item" to="/admin" >Admin</RouterLink>
      <RouterLink class="menu-item active" to="/">Jogar</RouterLink>
      <RouterLink class="menu-item" to="/financeiro">Financeiro</RouterLink>
      <div class="menu-slide"></div>
    </nav>
  </div>
</template>

<style scoped>

.navbar {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

nav.menu {
  position: relative;
  display: flex;
  align-items: center;
  text-align: center;
  width: 330px;
  min-width: 330px;
  height: 35px;
  margin: 20px;
  background-color: #27AE60;
  border-radius: 30px;
  box-shadow: 0px 0px 1px 2px #555;
  overflow: hidden;
}

.menu .menu-item {
  width: 110px;
  font-weight: 500;
  color: #fff;
  transition: 0.5s;
  text-decoration: none;
  z-index: 2;
  padding-left: 2px;
}

.menu-item.router-link-active {
  color: #262626;
}

.menu-slide {
  position: absolute;
  height: 100%;
  width: 110px;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 1;
  transition: 0.5s;
  opacity: 0;
  border-radius: 20px;
}

.menu-item:nth-child(1).router-link-active ~ .menu-slide {
  left: 0px;
  opacity: 1;
}
.menu-item:nth-child(2).router-link-active ~ .menu-slide {
  left: 110px;
  opacity: 1;
}
.menu-item:nth-child(3).router-link-active ~ .menu-slide {
  left: 220px;
  opacity: 1;
}
</style>

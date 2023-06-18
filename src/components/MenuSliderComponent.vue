<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="navbar">
    <nav class="menu">
      <RouterLink class="menu-item" to="/admin" >Admin</RouterLink>
      <RouterLink class="menu-item active" to="/">Jogar</RouterLink>
      <RouterLink class="menu-item" to="/mensalidade">Mensalidade</RouterLink>
      <div class="menu-slide"></div>
    </nav>
  </div>
</template>

<style scoped>

.navbar {
  display: flex;
  justify-content: center;
}

nav.menu {
  position: relative;
  display: flex;
  align-items: center;
  text-align: center;
  width: 390px;
  min-width: 390px;
  height: 40px;
  margin: 20px;
  background-color: #27AE60;
  border-radius: 30px;
  box-shadow: 0px 0px 1px 2px #555;
  overflow: hidden;
}

.menu .menu-item {
  width: 130px;
  font-weight: 500;
  color: #fff;
  transition: 0.5s;
  text-decoration: none;
  z-index: 2;
}

.menu-item.router-link-active {
  color: #262626;
}

.menu-slide {
  position: absolute;
  height: 100%;
  width: 130px;
  top: 0;
  left: 0;
  background: #f0f0f0da;
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
  left: 130px;
  opacity: 1;
}
.menu-item:nth-child(3).router-link-active ~ .menu-slide {
  left: 260px;
  opacity: 1;
}
</style>

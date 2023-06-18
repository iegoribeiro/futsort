<script setup>
import { reactive, onMounted } from 'vue';

const players = reactive([]);

onMounted(() => {
  players.push(
    {"id":1,"paid":true,"name":"Player1","monthly":true,"level":3,"position":"at", "status":1},
    {"id":2,"paid":true,"name":"Player2","monthly":true,"level":2,"position":"at", "status":1},
    {"id":3,"paid":false,"name":"Player3","monthly":false,"level":4,"position":"mc", "status":1},
    {"id":4,"paid":true,"name":"Player4","monthly":false,"level":1,"position":"mc", "status":1},
    {"id":5,"paid":false,"name":"Player5","monthly":true,"level":1,"position":"zg", "status":1},
    {"id":6,"paid":true,"name":"Player6","monthly":true,"level":3,"position":"zg", "status":1},
    {"id":7,"paid":false,"name":"Player7","monthly":true,"level":1,"position":"zg", "status":-1},
    {"id":8,"paid":true,"name":"Player8","monthly":true,"level":3,"position":"at", "status":0},
  )
})

</script>

<template>
  <main>
    <!-- button add player -->
    <!-- button order players -->

    <!-- list -->
    <div class="container">
      <div class="actions">
        <div class="filters"></div>
        <div class="add-player"></div>
      </div>

      <div class="player-list" v-if="players.length > 0">
        <ul>
          <li v-for="p in players">{{p.name}}</li>
        </ul>
      </div>
    </div>

</main>
</template>

<style scoped>


</style>

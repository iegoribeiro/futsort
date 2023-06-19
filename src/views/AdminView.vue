<script setup>
import { ref, reactive, onMounted } from 'vue';

const players = reactive([]);
const bgPosition = ref('red')

function togglePosition(player) {
  let positions = ["AT", "MC", "ZG"]
  let currentIndex = (positions.indexOf(player.position) + 1) % positions.length;
  player.position = positions[currentIndex];
}

function getBgPosition(position) {
  if (position == "AT") return "#6754DE"
  if (position == "MC") return "#54DE72"
  if (position == "ZG") return "#DE9F54"
}

onMounted(() => {
  players.push(
    {"id":1,"paid":true,"name":"Player1","monthly":true,"level":3,"position":"AT", "status":1},
    {"id":2,"paid":true,"name":"Player2","monthly":true,"level":2,"position":"AT", "status":1},
    {"id":3,"paid":false,"name":"Player3","monthly":false,"level":4,"position":"MC", "status":1},
    {"id":4,"paid":true,"name":"Player4","monthly":false,"level":1,"position":"MC", "status":1},
    {"id":5,"paid":false,"name":"Player5","monthly":true,"level":1,"position":"ZG", "status":1},
    {"id":6,"paid":true,"name":"Player6","monthly":true,"level":3,"position":"ZG", "status":1},
    {"id":7,"paid":false,"name":"Player7","monthly":true,"level":1,"position":"ZG", "status":-1},
    {"id":8,"paid":true,"name":"Player8","monthly":true,"level":3,"position":"AT", "status":0},
  )
})


</script>

<template>
  <main>
    <div class="container">
      <div class="actions">
        <div class="filters"></div>
        <div class="add-player"></div>
      </div>

      <div class="player-list" v-if="players.length > 0">
        <div class="player" v-for="player in players">
          <span class="p-paid" @click="player.paid = !player.paid" :style="{ backgroundColor: player.paid ? '#0E8B48' : '#DF3636' }" >$</span>
          <span class="p-name"><input type="text" v-model="player.name" placeholder="player" /></span>
          <span class="p-monthly" @click="player.monthly = !player.monthly" :style="{ backgroundColor: player.monthly ? '#4E84EC' : '#EC4E4E' }" >{{ player.monthly ? 'MS' : 'AV' }} </span>
          <span class="p-level">
            <input type="radio" name="level" id="lvl1"><label for="lvl1"></label>
            <input type="radio" name="level" id="lvl2"><label for="lvl2"></label>
            <input type="radio" name="level" id="lvl3"><label for="lvl3"></label>
            <input type="radio" name="level" id="lvl4"><label for="lvl4"></label>
          </span>
          <span class="p-position" @click="togglePosition(player)" :style="{ backgroundColor: getBgPosition(player.position) }" >{{ player.position }}</span>
        </div>
      </div>
      <div v-else>Nenhum jogador cadastrado!</div>
    </div>

</main>
</template>

<style scoped>

main {
  display: flex;
  justify-content: center;
  margin: 10px;
}

.container {
  background: #E6E6E6;
  padding: 10px;
  max-width: 360px;
  width: 360px;
}

.actions {
  height: 30px;
  background: #FFF; /* TODO */
  margin-bottom: 10px;
}

/** Listagem de Jogadores **/

.player {
  display: flex;
  justify-content: space-around;
  margin: 3px 0;
  padding: 1px;
  background: #fff;
  border-radius: 4px;
}

.player span {
  margin: 2px;
  cursor: pointer;
}



/** Listagem de Jogadores **/

/** Pagamento */
.p-paid {
  width: 30px;
  color: white;
  font-weight: bold;
  border-radius: 4px;
}

/** Nome */
.p-name {
  width: 150px;
}

.p-name input {
  border: none;
  background-color: #efefef;
  border-radius: 4px;
  height: 20px;
  outline: none;
  width: inherit;
}


/** Mensalista */
.p-monthly {
  width: 30px;
  color: white;
  font-weight: bold;
  border-radius: 4px;
}

/** Posição */
.p-level {
  width: 90px;
}

/** Posição */
.p-position {
  width: 30px;
  border-radius: 4px;
}

</style>

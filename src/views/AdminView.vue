<script setup>
import { ref, reactive, onMounted } from 'vue';
import StarsLevelComponent from '../components/StarsLevelComponent.vue'

const players = reactive([]);

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

function addPlayer() {
  players.push({"id":0,"paid":false,"name":"Jogador","monthly":true,"level":0,"position":"MC", "status":1});
  players.sort((a, b) => a.id - b.id)
}

function removePlayer(index) {
  //TODO ALERT!
  players.splice(index,1);
}

const lastSorted = ref("name");
const isDescending = ref(false);

function orderList(attribute) {
  if (attribute === lastSorted.value) {
    isDescending.value = !isDescending.value;
  } else {
    lastSorted.value = attribute;
    isDescending.value = false;
  }

  let sortOrder = isDescending.value ? -1 : 1;

  return players.sort((a, b) => {
    if (a[attribute] < b[attribute]) {
      return -1 * sortOrder;
    }
    if (a[attribute] > b[attribute]) {
      return 1 * sortOrder;
    }
    return 0;
  });
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
    {"id":8,"paid":true,"name":"Player8","monthly":true,"level":3,"position":"AT", "status":0}
  )
  players.sort((a, b) => b.monthly - a.monthly)
})

</script>

<template>
  <main>
    <div class="container">
      <div class="actions">
        <div class="filters">
          <button @click="orderList('monthly')"><span>⇩</span>MS</button>
          <button @click="orderList('name')"><span>⇩</span>NM</button>
          <button @click="orderList('level')"><span>⇩</span>LV</button>
          <button @click="orderList('position')"><span>⇩</span>PS</button>
        </div>
        <div class="add-player">
          <button @click="addPlayer()"><span>+</span>Jogador</button>
        </div>
      </div>

      <div class="player-list" v-if="players.length > 0">
        <div class="player" v-for="(player, index) in players" :key="player.id">
          <span class="p-monthly" @click="player.monthly = !player.monthly" :style="{ backgroundColor: player.monthly ? '#4E84EC' : '#ecc84e' }" >{{ player.monthly ? 'MS' : 'AV' }} </span>
          <!-- <span class="p-paid" @click="player.paid = !player.paid" :style="{ backgroundColor: player.paid ? '#0E8B48' : '#DF3636' }">$</span> -->
          <span class="p-name"><input type="text" v-model="player.name" placeholder="player" /></span>
          <span class="p-level"><StarsLevelComponent :player="player"></StarsLevelComponent></span>
          <span class="p-position" @click="togglePosition(player)" :style="{ backgroundColor: getBgPosition(player.position) }" >{{ player.position }}</span>
          <span class="p-remove" @click="removePlayer(index)"><img src="../assets/icons/lixeira.png" alt="lixera" width="19"></span>
        </div>
      </div>
      <div v-else>Nenhum jogador cadastrado!</div>
    </div>

</main>
</template>

<style scoped>

/** BODY */
main {
  display: flex;
  justify-content: center;
  margin: -5px 10px 0 10px;
}

.container {
  width: 100%;
  min-width: 300px;
  max-width: 400px;
  padding: 0 5px;
}

/** ADD E FILTROS */
.actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.actions button {
  height: 35px;
  cursor: pointer;
}
.actions button span {
  font-size: 20px;
  padding-right: 3px;
}

.actions .filters button {
  margin-right: 5px;
  border: 1px solid #999;
  border-radius: 4px;
}
.actions .filters button span {
  font-size: 15px;
}

.actions .add-player button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: none;
  font-weight: 500;
  background: white;
  box-shadow: 1px 1px 2px #ababab;
  padding: 0 10px;
}


/** Listagem de Jogadores */

.player {
  display: flex;
  height: 40px;
  margin: 5px 0;
  padding: 3px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 1px 1px 2px #ababab;
}

.player span {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1px 2px;
}

/** Mensalista */
.p-monthly {
  min-width: 30px;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
}


/** Pagamento */
.p-paid {
  min-width: 30px;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
}

/** Nome */
.p-name {
  width: 100%;
  min-width: 100px;
}

.p-name input {
  border: none;
  background-color: #f5f5f5;
  border-radius: 25px;
  outline: none;
  width: inherit;
}

/** Posição */
.p-position {
  min-width: 30px;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
}

/** Nível */
.p-level {
  justify-content: space-evenly !important;
  min-width: 90px;
}

/** Remover */
.p-remove {
  min-width: 10px;
  font-weight: bold;
  background: #f5f5f5;
  padding: 0px 8px;
  border-radius: 4px;
  cursor: pointer;
}

</style>

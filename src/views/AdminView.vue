<script setup>
import { ref, reactive, onMounted } from 'vue';
import StarsLevelComponent from '../components/StarsLevelComponent.vue'
import { findPlayers } from '../services/players.js';

const players = reactive([]);

function getPlayers() {
  players.push(...findPlayers())
  players.sort((a, b) => b.monthly - a.monthly)
}

function addPlayer() {
  players.push({"id":0,"name":"","monthly":true,"level":0,"position":"MC", "status":1});
  players.sort((a, b) => a.id - b.id)
}

function removePlayer(index) {
  //TODO ALERT!
  players.splice(index,1);
}

const lastSorted = ref("monthly");
const isDescending = ref(true);

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

function savePlayers() {
  //TODO :: Acionar API
  console.log(players);
}

onMounted(() => {
  getPlayers()
})

</script>

<template>
  <main class="main-mb" id="admin">
    <div class="container">
      <div class="actions">
        <div class="filters">
          <button @click="orderList('monthly')" :class="{ 'filter-selected': lastSorted === 'monthly' }">
            <span>{{ lastSorted === 'monthly' && isDescending ? '⇓' : '⇑' }}</span>Ms</button>
          <button @click="orderList('name')" :class="{ 'filter-selected': lastSorted === 'name' }">
            <span>{{ lastSorted === 'name' && isDescending ? '⇓' : '⇑' }}</span>Nm</button>
          <button @click="orderList('level')" :class="{ 'filter-selected': lastSorted === 'level' }">
            <span>{{ lastSorted === 'level' && isDescending ? '⇓' : '⇑' }}</span>Lv</button>
          <button @click="orderList('position')" :class="{ 'filter-selected': lastSorted === 'position' }">
            <span>{{ lastSorted === 'position' && isDescending ? '⇓' : '⇑' }}</span>Ps</button>
        </div>
        <div class="add-player">
          <button @click="addPlayer()"><span>+</span>Jogador</button>
        </div>
      </div>

      <div class="player-list">
        <div v-if="players.length > 0">
          <div class="player" v-for="(player, index) in players" :key="player.id">
            <span class="p-toggle-btn" @click="player.monthly = !player.monthly" :style="{ backgroundColor: player.monthly ? '#4E84EC' : '#ecc84e' }" >{{ player.monthly ? 'MS' : 'AV' }} </span>
            <!-- <span class="p-paid" @click="player.paid = !player.paid" :style="{ backgroundColor: player.paid ? '#0E8B48' : '#DF3636' }">$</span> -->
            <span class="p-name"><input type="text" v-model="player.name" placeholder="Jogador" /></span>
            <span class="p-level"><StarsLevelComponent :player="player"></StarsLevelComponent></span>
            <span class="p-toggle-btn" @click="togglePosition(player)" :style="{ backgroundColor: getBgPosition(player.position) }" >{{ player.position }}</span>
            <span class="p-remove" @click="removePlayer(index)"><img src="../assets/icons/lixeira.png" alt="lixera" width="19"></span>
          </div>
        </div>
        <div class="mt-10" v-else>Nenhum jogador cadastrado!</div>
      </div>

      <div class="save" v-if="players.length > 0">
        <button @click="savePlayers()" :disabled="players.filter(p => p.level === 0 || !p.name).length > 0">SALVAR</button>
      </div>
    </div>
</main>
</template>

<style scoped>

/** Filtros e Add Jogador */
.actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.actions button {
  height: 40px;
  cursor: pointer;
}

.actions button span {
  font-size: 20px;
  padding-right: 3px;
  user-select: none;
}

.actions .filters button {
  margin-right: 5px;
  border: 1px solid #999;
  border-radius: 4px;
  font-weight: 500;
}

.actions .filters button span {
  font-size: 15px;
}

.filter-selected {
  border: 2px solid #27ae60 !important;
}

.filter-selected span {
  color: #27ae60;
  font-weight: 600;
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

#admin .p-level svg {
  cursor: pointer;
}

.p-level {
  min-width: 70px;
  flex-wrap: wrap;
  align-items: flex-start;
}

/** Remover Jogador */
.p-remove {
  min-width: 10px;
  font-weight: bold;
  background: #f5f5f5;
  padding: 0px 8px;
  border-radius: 4px;
  cursor: pointer;
}

/** Botão Salvar */
.save button {
  margin-top: 10px;
  padding: 8px 0;
  width: 100%;
  background: #27ae60;
  color: #fff;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 1px 1px 3px #999;
}

.save button[disabled] {
  background-color: #27ae609e;
  cursor: auto;
}

</style>

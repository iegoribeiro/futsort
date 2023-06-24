<script setup>
import { reactive, onMounted, ref } from 'vue';
import StarsLevelComponent from '../components/StarsLevelComponent.vue'

const players = reactive([]);
const confirmIconColor = ref("#999")

function getPlayers() {
  players.push(
    {"id":1,"paid":true,"name":"Player1","monthly":true,"level":3,"position":"AT", "status":-1},
    {"id":2,"paid":true,"name":"Rodrigo Marreta","monthly":true,"level":2,"position":"AT", "status":-1},
    {"id":3,"paid":false,"name":"Player3","monthly":false,"level":4,"position":"MC", "status":-1},
    {"id":4,"paid":true,"name":"Player4","monthly":false,"level":1,"position":"MC", "status":-1},
    {"id":5,"paid":false,"name":"Player5","monthly":true,"level":1,"position":"ZG", "status":-1},
    {"id":6,"paid":true,"name":"Player6","monthly":true,"level":3,"position":"ZG", "status":-1},
    {"id":7,"paid":false,"name":"Player7","monthly":true,"level":1,"position":"ZG", "status":-1},
    {"id":9,"paid":true,"name":"Player8","monthly":true,"level":3,"position":"AT", "status":-1},
    {"id":10,"paid":true,"name":"Player9","monthly":true,"level":3,"position":"MC", "status":-1},
    {"id":11,"paid":true,"name":"Player10","monthly":true,"level":1,"position":"MC", "status":-1},
    {"id":12,"paid":true,"name":"Player11","monthly":true,"level":2,"position":"ZG", "status":-1},
    {"id":13,"paid":true,"name":"Player12","monthly":true,"level":3,"position":"AT", "status":-1},
    {"id":14,"paid":true,"name":"Player13","monthly":true,"level":1,"position":"ZG", "status":-1},
    {"id":15,"paid":true,"name":"Player14","monthly":true,"level":2,"position":"MC", "status":-1},
  )
  players.sort((a, b) => b.name - a.name)
}

function getBgPosition(position) {
  if (position == "AT") return "#6754DE"
  if (position == "MC") return "#54DE72"
  if (position == "ZG") return "#DE9F54"
}

onMounted(() => {
  getPlayers()
})

</script>

<template>
  
  <main class="main-mb" id="jogar">
    <div class="container">
      
      <div class="actions">
        <div class="confirm">
          <button @click="confirm()"><span>⚽</span>Confirmar</button>
        </div>
      </div>

      <div class="player-list">
        <div v-if="players.length > 0">
          <div class="player" v-for="(player) in players" :key="player.id">
            <span class="p-toggle-btn p-confirm" @click="player.status = player.status==1 ? -1 : player.status+1" 
              :style="{ color: player.status >= 0 ? player.status === 1 ? '#27ae60' : '#ae2727' : '#999' }">
              {{ player.status >= 0 ? player.status === 1 ? '✔' : '✘' : "?" }}
            </span>
            <span class="p-name"><input type="text" v-model="player.name" placeholder="Jogador" disabled/></span>
            <span class="p-level"><StarsLevelComponent :player="player" :width="15"></StarsLevelComponent></span>
            <span class="p-toggle-btn" :style="{ backgroundColor: player.monthly ? '#4E84EC' : '#ecc84e' }" >{{ player.monthly ? 'MS' : 'AV' }} </span>
            <span class="p-toggle-btn" :style="{ backgroundColor: getBgPosition(player.position) }" >{{ player.position }}</span>
          </div>
        </div>
        <div class="mt-10" v-else>Nenhum jogador cadastrado!</div>
      </div>
      
      <div class="ruffle" v-if="players.length > 0">
        <button @click="raffle()" :disabled="players.filter(p => p.status === -1).length > 0">SORTEAR</button>
      </div>

    </div>
  </main>
</template>

<style scoped>

/** Botão Confirmar jogar */
.actions {
  display: flex;
  justify-content: end;
  margin-bottom: 10px;
}

.actions button {
  height: 40px;
  cursor: pointer;
}

.actions .confirm button {
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

.player-list .p-confirm {
  background: #f5f5f5;
  border-radius: 25px;
  font-size: 20px;
  border: 2px solid #999;
  color: #27ae60;
}

#jogar .p-level {
  min-width: 40px;
}

#jogar .p-level {
  flex-wrap: wrap;
  align-items: flex-start;
}


/** Botão Sortear */
.ruffle button {
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

.ruffle button[disabled] {
  background-color: #27ae609e;
  cursor: auto;
}


</style>

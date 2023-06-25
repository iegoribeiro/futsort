<script setup>
import { reactive, onMounted, ref } from 'vue';
import StarsLevelComponent from '../components/StarsLevelComponent.vue'

const players = reactive([]);

var sortedTeams = reactive([]);
var sortedTeam1 = reactive([]);
var sortedTeam2 = reactive([]);
var sortedTeam3 = reactive([]);
var sortedTeam4 = reactive([]);

const raffleDone = ref(false)

function getPlayers() {
  players.push(
    {"id":1,"name":"Arlindo","monthly":true,"level":4,"position":"MC", "status":1},
    {"id":2,"name":"Paulo","monthly":true,"level":4,"position":"MC", "status":1},
    {"id":3,"name":"Wendel","monthly":true,"level":4,"position":"ZG", "status":1},
    {"id":4,"name":"Marreta","monthly":true,"level":4,"position":"ZG", "status":1},

    {"id":5,"name":"Nicolas Vini","monthly":true,"level":3,"position":"AT", "status":1},
    {"id":6,"name":"Iego","monthly":true,"level":3,"position":"AT", "status":1},
    {"id":7,"name":"Pr. Marcel","monthly":true,"level":3,"position":"MC", "status":1},
    {"id":8,"name":"Nycolas","monthly":true,"level":3,"position":"MC", "status":1},
    {"id":9,"name":"Vitor","monthly":true,"level":3,"position":"MC", "status":1},
    {"id":10,"name":"Rafael","monthly":true,"level":3,"position":"MC", "status":1},
    {"id":11,"name":"Silvio","monthly":true,"level":3,"position":"ZG", "status":1},
    {"id":12,"name":"Dudu","monthly":true,"level":3,"position":"ZG", "status":1},
    {"id":13,"name":"Kaka","monthly":true,"level":3,"position":"ZG", "status":1},
    
    {"id":14,"name":"Leleco","monthly":true,"level":2,"position":"AT", "status":1},
    {"id":15,"name":"Daniel","monthly":true,"level":2,"position":"AT", "status":1},
    {"id":16,"name":"Wagner","monthly":true,"level":2,"position":"ZG", "status":1},
    {"id":17,"name":"Thiago Campos","monthly":true,"level":2,"position":"ZG", "status":1},
    
    /** DESCONHEÇO */
    {"id":18,"name":"Rodrigo Bonfatti","monthly":true,"level":2,"position":"MC", "status":1},
    {"id":19,"name":"Rodrigo Souza","monthly":true,"level":2,"position":"MC", "status":1},
    {"id":20,"name":"Gustavo","monthly":true,"level":2,"position":"MC", "status":1},
    {"id":21,"name":"Alex","monthly":true,"level":2,"position":"ZG", "status":1},
    
    {"id":22,"name":"Allan","monthly":true,"level":1,"position":"AT", "status":1},
    {"id":23,"name":"Thiago Jr","monthly":true,"level":1,"position":"AT", "status":1},
    {"id":24,"name":"Edinho","monthly":true,"level":1,"position":"ZG", "status":1}    
  )
  players.sort((a, b) => a.name.localeCompare(b.name))
}

function getBgPosition(position) {
  if (position == "AT") return "#6754DE"
  if (position == "MC") return "#54DE72"
  if (position == "ZG") return "#DE9F54"
}

function confirm () {
  //TODO :: API -> UPDATE CONFIRMAÇÃO!
  console.log(players);
}

const raffleTeams = () => {
  console.log("START SORTEIO!!");

  const attackers = players.filter(player => player.position === 'AT');
  const midfielders = players.filter(player => player.position === 'MC');
  const defenders = players.filter(player => player.position === 'ZG');

  attackers.sort((a, b) => b.level - a.level);
  midfielders.sort((a, b) => b.level - a.level);
  defenders.sort((a, b) => b.level - a.level);

  const teams = [[], [], [], []];

  const assignPlayerToTeam = (player) => {
    let minTeamIndex = 0;
    let minTeamWeight = calculateTeamWeight(teams[0]);

    for (let i = 1; i < teams.length; i++) {
      const teamWeight = calculateTeamWeight(teams[i]);
      if (teamWeight < minTeamWeight) {
        minTeamIndex = i;
        minTeamWeight = teamWeight;
      }
    }

    teams[minTeamIndex].push(player);
  };

  while (attackers.length > 0 || midfielders.length > 0 || defenders.length > 0) {
    if (attackers.length >= 1) {
      const player = attackers.shift();
      assignPlayerToTeam(player);
    } else if (midfielders.length >= 1) {
      const player = midfielders.shift();
      assignPlayerToTeam(player);
    } else if (defenders.length >= 1) {
      const player = defenders.shift();
      assignPlayerToTeam(player);
    }
  }

  function calculateTeamWeight(team) {
    const totalLevel = team.reduce((sum, player) => sum + player.level, 0);
    return totalLevel;
  }

  sortedTeams = teams;
  // sortedTeam1 = teams[0]
  // sortedTeam2 = teams[1]
  // sortedTeam3 = teams[2]
  // sortedTeam4 = teams[3]

  console.log(sortedTeams);

  raffleDone.value = true;
  return teams;
}

const saveRuffle = (players) => {
}

onMounted(() => {
  getPlayers()
})

</script>

<template>
  
  <main class="main-mb" id="jogar">
    <div class="container">

      <div class="actions">
        <div class="confirm" v-if="!raffleDone">
          <button @click="confirm()"><span>⚽</span>Confirmar</button>
        </div>
        <div class="after-raffle" v-else>
          <button @click="raffleDone=false"><i></i>Voltar</button>
          <button @click="saveRuffle()"><span>⚽</span>Publicar</button>
        </div>
      </div>
      
      <div class="player-list">
        <div v-if="!raffleDone">
          <div v-if="players.length > 0">
            <div class="player" v-for="(player) in players" :key="player.id">
              <span class="p-confirm" @click="player.status = player.status==1 ? -1 : player.status+1" 
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

        <div v-else>
          <div v-for="(team, index) in sortedTeams">
            <div class="team-title">
              <span>{{ "TIME " + (index+1) + " - " + team.map(obj => obj.level).reduce((acc, val) => acc + val, 0) + " pontos"}}</span>
            </div>
            <div class="player" v-for="(player) in team" :key="player.id">
              <span class="p-name"><input type="text" v-model="player.name" placeholder="Jogador" disabled/></span>
              <span class="p-level"><StarsLevelComponent :player="player" :width="15"></StarsLevelComponent></span>
              <span class="p-toggle-btn" :style="{ backgroundColor: player.monthly ? '#4E84EC' : '#ecc84e' }" >{{ player.monthly ? 'MS' : 'AV' }} </span>
              <span class="p-toggle-btn" :style="{ backgroundColor: getBgPosition(player.position) }" >{{ player.position }}</span>
            </div>
            <hr class="separador">
          </div>
        </div>
      </div>
        
      <div class="ruffle" v-if="players.length > 0 && !raffleDone"> <!-- TODO :: && isAdmin -->
        <button @click="raffleTeams()" :disabled="players.filter(p => p.status === -1).length > 0">SORTEAR</button>
      </div>

    </div>
  </main>
</template>

<style scoped>

.player-list .team-title {
  display: flex;
  justify-content: center;
  height: 25px;
  margin: 8px 0;
  padding: 3px;
  background: #27ae60;
  color: white;
  border-radius: 4px;
  box-shadow: 1px 1px 2px #ababab;
}

.player-list .team-title span {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1px 2px;
  font-weight: 500;
}

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

.actions .confirm button span {
  margin-right: 3px;
}

.actions .after-raffle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.actions .after-raffle button {
  border-radius: 4px;
  border: none;
  font-weight: 500;
  background: white;
  box-shadow: 1px 1px 2px #ababab;
  padding: 0 10px;
}

/** Listagem Jogadores */
#jogar .p-confirm {
  background: #f5f5f5;
  border-radius: 25px;
  font-size: 20px;
  border: 2px solid #999;
  color: #27ae60;
  min-width: 35px;
  cursor: pointer;
}

#jogar .p-level {
  min-width: 40px;
}

#jogar .p-level {
  flex-wrap: wrap;
  align-items: flex-start;
}

#jogar .p-toggle-btn {
  cursor: default;
  pointer-events:none;
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

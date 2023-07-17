<script setup>
import { reactive, onMounted, ref } from 'vue';
import StarsLevelComponent from '../components/StarsLevelComponent.vue'
import PopupComponent from '../components/PopupComponent.vue';
import { findPlayers } from '../services/players.js';

const players = reactive([]);
const sortedTeams = reactive([]);

const raffleDone = ref(false)
const popupShow = ref(false)

function getPlayers() {
  players.push(...findPlayers())
  players.sort((a, b) => a.name.localeCompare(b.name))
}

function getBgPosition(position) {
  if (position == "AT") return "#6754DE"
  if (position == "MC") return "#54DE72"
  if (position == "ZG") return "#DE9F54"
}

function confirmPlayer () {
  //TODO :: API -> UPDATE CONFIRMAÇÃO!
  console.log(players);
  popupShow.value=false
}

/*********** FUNÇÕES AUXILIARES PARA O SORTEIO *************/

function buildSortedTeams(inPlayers) {
  const qtyTeams = Math.floor(inPlayers.length / 6);
  const remainingPlayers = inPlayers.length % 6;

  if (qtyTeams < 2) return null

  let inSortedTeams = Array.from({ length: qtyTeams }, () => Array(6).fill({}));

  if (remainingPlayers > 0) inSortedTeams.push(Array(remainingPlayers).fill({}));
  return inSortedTeams;
}

function sortPlayer(inPlayers, level, team) {
  
  function getOrderedPositionByTeamNeed(currTeam) {
    let positions = ["ZG", "MC", "AT"];
    return positions.sort((a, b) => currTeam.filter(p => p.position === a).length - currTeam.filter(player => player.position === b).length);
  }

  let filteredPlayers = inPlayers.filter(p => p.level === level && !p.selected);
  if (!filteredPlayers || filteredPlayers.length <= 0) return null;

  filteredPlayers.sort(() => Math.random() - 0.5);
  let ordPos = getOrderedPositionByTeamNeed(team)
  filteredPlayers.sort((a, b) => ordPos.indexOf(a.position) - ordPos.indexOf(b.position));

  return filteredPlayers[0];
}

/***********************************************************/

const raffleTeams = () => {
  const playersToPlay = players.filter(p => p.status === 1).map(p => ({...p, selected: false}));
  sortedTeams.push(...buildSortedTeams(playersToPlay))

  if (!sortedTeams) {
    alert("Não foi possível formar 2 times!")
    return
  }

  var iLvl = 5;

  while (iLvl > 0) {

    //Ordenar os times ainda não completos por level
    let weakerTeam = sortedTeams
      .filter(team => team.some(player => Object.keys(player).length === 0))
      .sort((a,b) => (a.reduce((sum, p) => sum + (p.level ? p.level : 0), 0)) - (b.reduce((sum, p) => sum + (p.level ? p.level : 0), 0)))
      [0];

    //buscar jogador por level considerando a posição que o time precisa
    let player = sortPlayer(playersToPlay, iLvl, weakerTeam)

    if (player) {
      let nextEmptyIndex = weakerTeam.findIndex(wt => Object.keys(wt).length === 0); 
      weakerTeam[nextEmptyIndex] = player;
  
      //Tornar jogador selecionado
      playersToPlay[playersToPlay.findIndex(pl => pl == player)].selected = true;
    }
    
    //Reduzir level após todos os jogadores do level atual serem escalados
    if (!player || !playersToPlay.some(p => p.level === iLvl && !p.selected)) {
      iLvl--;
    }
  }

  raffleDone.value = true;
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
          <button @click="popupShow=true"><span>⚽</span>Confirmar</button>
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
              <span class="p-level"><StarsLevelComponent :player="player" :width="15" :disabled="true"></StarsLevelComponent></span>
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
              <span class="p-level"><StarsLevelComponent :player="player" :width="15" :disabled="true"></StarsLevelComponent></span>
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

    <PopupComponent v-if="popupShow"
      @no="popupShow=false" @yes="confirmPlayer()" :title="'Deseja prosseguir?'" :icon="'question'" >
    </PopupComponent>
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
  min-width: 45px;
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

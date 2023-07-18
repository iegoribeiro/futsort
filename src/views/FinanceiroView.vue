<script setup>
import { ref, reactive, onMounted } from 'vue';
import { findPlayers } from '../services/players.js';

const players = reactive([]);
const budget = reactive({});

function getPlayers() {
  players.push(...findPlayers())
  players.sort((a, b) => b.name - a.name)
}

function getBudget() {
  budget.total = 589.45;
  budget.history = [
    { "type":"d","description":"Quadra 07/23","date":"05/07/2023","value":1000.00 },
    { "type":"c","description":"Mensalidade 07/23","date":"04/07/2023","value":1440.00 },
    { "type":"d","description":"bola nova","date":"02/07/2023","value":200.55 },
    { "type":"d","description":"Churrasco","date":"28/06/2023","value":300.00 },
    { "type":"d","description":"Quadra 06/23","date":"05/06/2023","value":1000.00 },
    { "type":"c","description":"Mensalidade 06/23","date":"04/06/2023","value":1500.00 },
    { "type":"c","description":"Saldo","date":"04/06/2023","value":150.00 },
  ];
}

onMounted(() => {
  getPlayers()
  getBudget()
})

</script>

<template>
  <main class="main-mb" id="financeiro">
    <div class="container">
      
      <div class="balance">
        <span>Saldo Total: </span><span>{{ budget.total }}</span>
      </div>

      <div class="transactions">
        <div class="t-add">
          <span id="t-type">+</span>
          <input type="number" id="t-value" name="valor">
          <input type="textarea" id="t-info" name="info">
        </div>

        <div class="history">
          <div class="transaction">
            <span>+</span>
            <span>15/07/2023</span>
            <span>Mensalidade junho</span>
            <span>R$ 1.750,00</span>
          </div>
        </div>
      </div>

      <div class="monthly-list">
        <div class="montly-player">
          <span>name</span>
          <span>valor</span>
        </div>
      </div>

    </div>
  </main>
</template>

<style scoped>

.balance, .transactions, .history {
  background-color: white;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
}

/** BALANCE */

.balance {
  display: flex;
  padding-left: 10px;
}

.balance span {
  font-weight: 700;
  letter-spacing: 1px;
  font-size: 16px;
}

.balance span:first-child {
  padding-right: 3px;
  color: rgb(83, 83, 83);
}

.balance span:nth-child(2) {
  color: green;
}

/** TRANSACTIONS */

.transactions .t-add input {
  border: 1px solid #213;
  margin: 0 2px;
  border-radius: 5px;
}

.transactions .t-add {
  width: 100%;
}
.transactions #t-type {
  width: 10%;
}
.transactions #t-value {
  width: 30%;
}
.transactions #t-info {
  width: 60%;
}



</style>
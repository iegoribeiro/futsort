<script setup>

defineProps({
  title: {
    type: String,
    required: true
  },
  msg: {
    type: String,
    required: false
  },
})

defineEmits(["no","yes"]);

</script>

<template>
  <teleport to="body">
    <div class="popup-bg">
      <div class="popup">
        <div class="title">{{ title }}</div>
        <div class="msg">{{ msg }}</div>
        <div class="popup-btns">
          <button @click="$emit('no')">Não</button>
          <button @click="$emit('yes')">Sim</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.popup-bg {
  background: #6e6e6e73;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 9999;
  justify-content: center;
  align-items: center;
}
.popup {
  background: white;
  padding: 20px;
  border-radius: 15px;
  border: 3px solid #27ae60;
  box-shadow: 3px 3px 3px #999;
  min-width: 30vw;
  min-height: 20vh;
  max-width: 80vw;
}

.popup .title {
  font-size: 25px;
  font-weight: 700;
} 

.popup .msg {
  font-weight: 400;
}

.popup-btns {
  margin-top: 30px;
}

.popup-btns button {
  padding: 8px 25px;
  margin: 0 5px;
  border-radius: 5px;
  font-weight: 500;
  border: 1px solid #d3d3d3;
  cursor: pointer;
  background-color: white;
}

</style>
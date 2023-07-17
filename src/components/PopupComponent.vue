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
  icon: {
    type: String,
    required: false
  }
})

defineEmits(["no","yes"]);

function getIcon(icon) {
  switch (icon) {
    case "question":
      return '?'
  
    default:
      break;
  }
}

</script>

<template>
  <teleport to="body">
    <div class="popup-bg">
      <div class="popup">
        <div v-if="icon" class="icon" :class="icon">
          <div>{{ getIcon(icon) }}</div>
        </div>
        
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

.popup .icon {
  display: flex;
  margin: 0 auto 10px auto;
  position: relative;
  box-sizing: content-box;
  justify-content: center;
  width: 5em;
  height: 5em;
  border: 0.25em solid rgba(0,0,0,0);
  border-radius: 50%;
  line-height: 5em;
  cursor: default;
  user-select: none;
}

.popup .icon div {
  display: flex;
  align-items: center;
  font-size: 3.75em;
}

.popup .icon.question {
  border-color: #d7d7d7;
  color: #555;
}

.popup .title {
  font-size: 23px;
  font-weight: 700;
  color: #555;
} 

.popup .msg {
  color: #999;
  font-weight: 400;
}

.popup-btns {
  margin-top: 20px;
}
.popup-btns button {
  padding: 8px 25px;
  margin: 0 5px;
  border-radius: 5px;
  font-weight: 500;
  border: 1px solid #d3d3d3;
  cursor: pointer;
  background-color: white;
  box-shadow: 2px 2px 3px #555;
}

</style>
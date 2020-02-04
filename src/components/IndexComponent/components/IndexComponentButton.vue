<template>
  <div class="index-component-button">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: ["text"],
  name: "IndexComponentButton"
};
</script>

<style scoped lang="scss">
.index-component-button {
  background: #fe5c19;
  border: 2px solid #fe5c19;
  box-sizing: border-box;
  box-shadow: 0px 20px 30px #feded0;
  border-radius: 45px;
  font-weight: bold;
  font-size: 17px;
  line-height: 20px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 244px;
  height: 55px;
  cursor: pointer;
  transition: 0.3s;
  font-family: "h-b", serif;
  &:hover {
    opacity: 0.8;
  }
}
</style>

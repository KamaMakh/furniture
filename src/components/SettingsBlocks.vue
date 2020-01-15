<template>
  <div class="settings-blocks">
    <div v-for="(item, key) in tariffs" :key="key" class="block">
      <div class="photo">
        <img :src="item.ico" />
      </div>
      <div class="options">
        <div v-for="(option, k) in item.options" :key="k" class="option">
          {{ option }}
        </div>
      </div>
      <div class="btn">
        <b-button variant="success">{{ item.button_text }}</b-button>
      </div>
      <div v-if="item.flag" class="flag">
        {{ item.flag }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingsBlocks",
  data() {
    return {
      tariffs: [
        {
          ico:
            "data:image/png;base64,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",
          flag: "",
          options: [
            "Lorem Ipsum is simply dummy",
            "Lorem Ipsum has been the",
            "It is a long established fact",
            "that a reader will be distracted",
            "when looking at its",
            "as opposed to using",
            "Content here, content here"
          ],
          button_text: "Премиум на год"
        },
        {
          ico:
            "data:image/png;base64,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",
          flag: "Годовой",
          options: [
            "Lorem Ipsum is simply dummy",
            "Lorem Ipsum has been the",
            "It is a long established fact",
            "that a reader will be distracted",
            "when looking at its",
            "as opposed to using",
            "Content here, content here"
          ],
          button_text: "Премиум на год"
        },
        {
          ico:
            "data:image/png;base64,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",
          flag: "ЕЖЕМЕСЯЧНЫЙ",
          options: [
            "Lorem Ipsum is simply dummy",
            "Lorem Ipsum has been the",
            "It is a long established fact",
            "that a reader will be distracted",
            "when looking at its",
            "as opposed to using",
            "Content here, content here"
          ],
          button_text: "Премиум на месяц"
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.settings-blocks {
  display: flex;
  flex-flow: wrap row;
  justify-content: space-around;
  background: #cad7cf;
  padding: 35px;
  margin: 0 auto;
  .block {
    background: #fff;
    padding: 80px 30px 40px;
    display: flex;
    flex-direction: column;
    margin: 10px;
    position: relative;
    .photo {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 auto 10px;
      img {
        max-width: 100%;
      }
    }
    .options {
      display: flex;
      flex-direction: column;
      .option {
        color: #2d2d2d;
        font-size: 14px;
        text-align: left;
        padding-left: 25px;
        margin-bottom: 12px;
        position: relative;
        display: flex;
        align-items: center;
        &:before {
          content: "";
          display: block;
          position: absolute;
          width: 18px;
          height: 13px;
          left: 0;
          top: 50%;
          margin-top: -6px;
          background: url("../assets/settings_ico.png") 0 0 no-repeat;
        }
      }
    }
    .btn {
      margin-top: 20px;
      button {
        background: #688e74;
        border-radius: 7px;
        font-size: 14px;
        font-weight: bold;
        color: #fff;
        border: 2px solid transparent;
        &:hover {
          background: none;
          color: #364b3c;
          border: 2px solid #364b3c;
        }
      }
    }
    .flag {
      position: absolute;
      background: #364b3c;
      left: 0;
      top: 36px;
      font-size: 14px;
      font-weight: bold;
      color: #fff;
      padding: 5px 16px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      height: 30px;
      min-width: 140px;
      text-align: left;
      &:before {
        position: absolute;
        content: "";
        display: block;
        top: 0;
        left: auto;
        right: 0;
        bottom: 0;
        width: 9px;
        background: url("../assets/settings_flag.png") 0 0 no-repeat;
      }
    }
  }
}
@media all and(max-width: 960px) {
  .settings-blocks {
    .block {
      flex: 0 1 45%;
    }
  }
}

@media all and(max-width: 768px) {
  .settings-blocks {
    padding: 15px;
  }
}

@media all and(max-width: 640px) {
  .settings-blocks {
    .block {
      flex: 1 1 auto;
    }
  }
}
</style>

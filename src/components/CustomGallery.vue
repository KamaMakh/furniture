<template>
  <div class="custom-gallery">
    <div class="main-pic">
      <viewer :images="images">
        <img :src="mainPicSrc.src" alt="" />
      </viewer>
    </div>
    <div class="thumbs">
      <div
        v-for="(item, key) in images"
        :key="key"
        class="thumb-item"
        @click="setMainPic(item, $event)"
        :class="{ active: item.id === mainPicSrc.id }"
      >
        <!--<img-->
        <!--:src="-->
        <!--item.isNew ? item.src : serverUrl + item.pathUrl + '&type=200px'-->
        <!--"-->
        <!--/>-->
        <v-img
          :src="
            item.isNew ? item.src : serverUrl + item.pathUrl + '&type=200px'
          "
          contain
          class="grey lighten-2"
          max-width="95"
          light
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <span
          v-if="isCreator || !nomenclature.id"
          class="delete-icon"
          @click="deletePic(item)"
        >
          <svg
            version="1.1"
            id="IconsRepoEditor"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 60.167 60.167"
            style="enable-background:new 0 0 60.167 60.167;"
            xml:space="preserve"
            width="18px"
            height="18px"
            fill="lightblue"
            stroke="lightblue"
            stroke-width="3px"
          >
            <g id="IconsRepo_bgCarrier"></g>
            <path
              d="M54.5,11.667H39.88V3.91c0-2.156-1.754-3.91-3.91-3.91H24.196c-2.156,0-3.91,1.754-3.91,3.91v7.756H5.667 c-0.552,0-1,0.448-1,1s0.448,1,1,1h2.042v40.5c0,3.309,2.691,6,6,6h32.75c3.309,0,6-2.691,6-6v-40.5H54.5c0.552,0,1-0.448,1-1 S55.052,11.667,54.5,11.667z M22.286,3.91c0-1.053,0.857-1.91,1.91-1.91H35.97c1.053,0,1.91,0.857,1.91,1.91v7.756H22.286V3.91z M50.458,54.167c0,2.206-1.794,4-4,4h-32.75c-2.206,0-4-1.794-4-4v-40.5h40.75V54.167z M38.255,46.153V22.847c0-0.552,0.448-1,1-1 s1,0.448,1,1v23.306c0,0.552-0.448,1-1,1S38.255,46.706,38.255,46.153z M29.083,46.153V22.847c0-0.552,0.448-1,1-1s1,0.448,1,1 v23.306c0,0.552-0.448,1-1,1S29.083,46.706,29.083,46.153z M19.911,46.153V22.847c0-0.552,0.448-1,1-1s1,0.448,1,1v23.306 c0,0.552-0.448,1-1,1S19.911,46.706,19.911,46.153z"
            ></path>
          </svg>
        </span>
      </div>
      <div
        v-if="
          ((isCreator && images && images.length < 3) || !nomenclature.id) &&
            !files.length
        "
        class="add-file custom-file-input"
      >
        <v-file-input
          accept="image/jpeg, image/png, image/gif"
          single-line
          solo
          hide-details
          v-model="newFile"
        ></v-file-input>
      </div>
    </div>
  </div>
</template>

<script>
import { serverUrl } from "@/store/urls";
export default {
  props: ["images", "isCreator", "files", "nomenclature"],
  name: "CustomGallery",
  data() {
    return {
      mainPicSrc: {},
      newFile: [],
      serverUrl: serverUrl
    };
  },
  methods: {
    setMainPic(thumb, event) {
      if (event.target.tagName === "DIV") {
        this.mainPicSrc = {
          src: thumb.isNew
            ? thumb.src
            : this.serverUrl + thumb.pathUrl + "&type=1000px",
          id: thumb.id
        };
      }
    },
    deletePic(image) {
      if (image.isNew) {
        this.$emit("on-delete-new", image);
      } else {
        this.$emit("on-delete", image);
      }
    }
  },
  watch: {
    newFile(value) {
      if (value.size) {
        this.$emit("on-add-file", this.newFile);
      }
    },
    images(value) {
      if (value && value[0]) {
        this.mainPicSrc = {
          src: this.serverUrl + this.images[0].pathUrl + "&type=1000px",
          id: this.images[0]["id"]
        };
      } else {
        this.mainPicSrc = {};
      }
    }
  },
  created() {
    if (this.images && this.images[0]) {
      this.mainPicSrc = {
        src: this.serverUrl + this.images[0].pathUrl + "&type=1000px",
        id: this.images[0]["id"]
      };
    }
  }
};
</script>

<style lang="scss">
.custom-gallery {
  display: flex;
  flex-direction: column;
  .main-pic {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 350px;
    max-width: 100%;
    max-height: 350px;
    margin: 0 auto 5px;
  }
  .thumbs {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
    .thumb-item {
      width: 95px;
      margin: 0 5px;
      border: 2px solid transparent;
      cursor: pointer;
      position: relative;
      .delete-icon {
        width: 20px;
        height: 25px;
        cursor: pointer;
        position: absolute;
        top: auto;
        left: 50%;
        margin-left: -10px;
        bottom: -25px;
      }
      &.active {
        border-color: lightblue;
      }
    }
  }
  .add-file {
    position: relative;
    margin-left: 9px;
    margin-top: 9px;
    width: 77px;
    height: 77px;
    border: 1px solid #d9d9d9;
    &:before {
      content: " ";
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      background-color: #d9d9d9;
      width: 2px;
      height: 39.5px;
    }
    &:after {
      content: " ";
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      background-color: #d9d9d9;
      width: 39.5px;
      height: 2px;
    }
    input {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 77px;
      opacity: 0;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      cursor: pointer;
    }
    label {
      display: none !important;
    }
  }
  img {
    max-width: 100%;
    max-height: 350px;
  }
}
</style>

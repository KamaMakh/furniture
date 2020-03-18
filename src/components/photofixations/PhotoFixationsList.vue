<template>
  <div v-if="construction && construction.id" class="photofixations-list">
    <v-skeleton-loader
      ref="skeleton"
      :loading="listLoading"
      transition="scale-transition"
      type="list-item-avatar-three-line"
      class="mx-auto"
    >
      <span>
        <v-card
          v-for="(fixation, key) in photoList"
          :key="key + fixation"
          class="mb-6"
          style="position: relative"
        >
          <v-container fluid>
            <v-row>
              <v-col
                v-if="construction.creatorId === user.id"
                class="d-flex child-flex flex-wrap flex-column"
                cols="2"
              >
                <v-btn
                  outlined
                  style="border: none; font-size: 13px;"
                  :color="color"
                  :disabled="fixation.photos.length >= 5"
                  class="fotofixations-btn"
                  @click="
                    showAddPhotoForm = true;
                    photoFixation = fixation;
                  "
                >
                  <v-icon left>mdi-image-plus</v-icon>
                  {{ $t("add").toLowerCase() }}
                </v-btn>
                <v-btn
                  outlined
                  style="border: none; font-size: 13px;"
                  :color="'#999'"
                  class="fotofixations-btn"
                  @click="
                    showEditFixationForm = true;
                    photoFixation = fixation;
                  "
                >
                  <v-icon left>mdi-pencil</v-icon>
                  {{ $t("edit").toLowerCase() }}
                </v-btn>
              </v-col>
              <v-col cols="10">
                <v-row>
                  <v-col cols="12">
                    <v-row>
                      <v-col xs="10" class="text-left" style="color: #999;">
                        {{ $t("creationDate") }}:
                        {{ formatDate(fixation.dateCreate) }}
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col
                    v-for="(photo, photoKey) in fixation.photos"
                    :key="photoKey + photo"
                    class="d-flex child-flex"
                    cols="6"
                    sm="4"
                    md="2"
                    style="position: relative"
                  >
                    <v-menu
                      v-if="construction.creatorId === user.id"
                      v-model="photo.showMenu"
                      absolute
                      offset-y
                      style="max-width: 600px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-card flat tile class="d-flex" v-on="on">
                          <v-img
                            :src="`${serverUrl}${photo.url}&type=200px`"
                            :lazy-src="`${serverUrl}${photo.url}`"
                            aspect-ratio="1"
                            class="grey lighten-2"
                          >
                            <template v-slot:placeholder>
                              <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                              >
                                <v-progress-circular
                                  indeterminate
                                  color="grey lighten-5"
                                ></v-progress-circular>
                              </v-row>
                            </template>
                          </v-img>
                        </v-card>
                      </template>
                      <v-list>
                        <v-list-item v-if="construction.creatorId === user.id">
                          <v-list-item-title>
                            <v-btn
                              icon
                              @click="
                                currPhoto = photo;
                                showRemovePhotoForm = true;
                                photoFixation = fixation;
                              "
                            >
                              <v-icon color="red">mdi-trash-can</v-icon>
                            </v-btn>
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>
                            <v-btn
                              icon
                              @click="
                                toggleClickViewer(photoKey, fixation.photos)
                              "
                            >
                              <v-icon :color="color">mdi-overscan</v-icon>
                            </v-btn>
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                    <v-card v-else flat tile class="d-flex">
                      <v-img
                        :src="`${serverUrl}${photo.url}&type=200px`"
                        :lazy-src="`${serverUrl}${photo.url}`"
                        aspect-ratio="1"
                        class="grey lighten-2"
                        style="cursor: pointer;"
                        @click="toggleClickViewer(photoKey, fixation.photos)"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col
                    v-if="construction.creatorId === user.id"
                    cols="2"
                  ></v-col>
                  <v-col sm="10" class="text-left" style="color: #999;">
                    {{ $t("author") }}: {{ fixation.photoCreatorName }}
                  </v-col>
                </v-row>
              </v-col>
              <v-col v-if="fixation.comment" cols="12" class="pb-0">
                <v-divider class="pb-0"></v-divider>
              </v-col>
              <v-col v-if="fixation.comment" cols="12" class="pt-0">
                <v-card-text
                  class="text-comment text-left mt-2"
                  style="color: #999; width: 100%;"
                >
                  {{ fixation.comment }}
                </v-card-text>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </span>
    </v-skeleton-loader>
    <div v-if="photoList && photoList.length" class="text-center">
      <v-pagination
        v-model="page"
        :color="color"
        :length="pagesCount"
      ></v-pagination>
    </div>

    <v-btn
      :color="color"
      dark
      fixed
      top
      right
      fab
      style="top: 60px;"
      @click="showAddFixationForm = true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <!--viewer-->
    <viewer v-show="false" v-if="viewerImages.length" :images="viewerImages">
      <img
        v-for="(imageUrl, key) in viewerImages"
        :key="key"
        :src="imageUrl"
        :id="`viewer${key}`"
      />
    </viewer>

    <!--modals-->
    <v-dialog v-model="showAddFixationForm" width="600">
      <v-card>
        <v-card-text>
          <v-form
            ref="addFixationForm"
            v-model="photoFixationValid"
            @submit.prevent="createPhotoFixation"
            lazy-validation
          >
            <v-row>
              <v-col>
                <v-file-input
                  prepend-icon=""
                  v-model="files"
                  small-chips
                  multiple
                  counter
                  error-count="5"
                  :label="$t('chooseFile')"
                  :rules="[
                    rules.requiredMultipleFiles,
                    rules.maxCount,
                    rules.multipleMax
                  ]"
                  show-size
                  :color="color"
                  :hint="$t('maxSize', { size: 5 })"
                  accept="image/tiff, image/jpeg, image/gif, image/png, application/pdf"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row class="justify-end">
              <v-col>
                <v-textarea
                  :color="color"
                  v-model="photoFixation.comment"
                  :label="$t('info')"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :loading="loading"
            :color="color"
            dark
            @click="createPhotoFixation"
          >
            {{ $t("ok") }}
          </v-btn>
          <v-btn :color="'#999'" dark @click="showAddFixationForm = false">
            {{ $t("close") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showEditFixationForm" width="500">
      <v-card>
        <v-card-title>
          {{ $t("edit") }}
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="editPhotoFixation">
            <v-row class="justify-end">
              <v-col>
                <v-textarea
                  :color="color"
                  v-model="photoFixation.comment"
                  :label="$t('info')"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card-actions>
                  <v-btn
                    :loading="loading"
                    :color="color"
                    dark
                    @click="editPhotoFixation"
                  >
                    {{ $t("ok") }}
                  </v-btn>
                  <v-btn
                    :color="'#999'"
                    dark
                    @click="showEditFixationForm = false"
                  >
                    {{ $t("cancel") }}
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showAddPhotoForm" width="500">
      <v-card>
        <v-card-title>
          {{ $t("add") }}
        </v-card-title>
        <v-card-text>
          <v-form
            ref="addPhotoForm"
            v-model="photoValid"
            @submit.prevent="addPhoto"
            lazy-validation
          >
            <v-row>
              <v-col>
                <v-file-input
                  v-model="file"
                  :label="$t('chooseFile')"
                  :rules="[rules.required, rules.max]"
                  show-size
                  :color="color"
                  :hint="$t('maxSize', { size: 5 })"
                  accept="image/tiff, image/jpeg, image/gif, image/png, application/pdf"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn :loading="loading" :color="color" dark @click="addPhoto">
            {{ $t("ok") }}
          </v-btn>
          <v-btn :color="'#999'" dark @click="showAddPhotoForm = false">
            {{ $t("cancel") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showRemovePhotoForm" width="500">
      <v-card>
        <v-card-title> {{ $t("delete") }}? </v-card-title>
        <v-card-actions>
          <v-btn :loading="loading" :color="color" dark @click="removePhoto">
            {{ $t("ok") }}
          </v-btn>
          <v-btn :color="'#999'" dark @click="showRemovePhotoForm = false">
            {{ $t("cancel") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <div
    v-else-if="empty"
    class="d-flex align-center justify-center"
    style="height: 300px"
  >
    <v-btn outlined large class="ma-auto" @click="createConstruction">
      <v-icon left>
        mdi-plus
      </v-icon>
      {{ $t("add_constr") }}
    </v-btn>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { serverUrl } from "@/store/urls";
import {
  required,
  fileMaxSize,
  fileMaxCount,
  fileMultipleSize,
  requiredMultipleFiles
} from "@/shared/validator";
export default {
  name: "PhotoFixationsList",
  components: {},
  data() {
    return {
      page: 1,
      bigImgUrl: null,
      showMenu: false,
      serverUrl: serverUrl,
      color: "#688e74",
      photoFixationValid: true,
      photoValid: true,
      loading: false,
      showAddFixationForm: false,
      showEditFixationForm: false,
      showAddPhotoForm: false,
      showRemovePhotoForm: false,
      photoFixation: {},
      currPhoto: {},
      viewerImages: [],
      files: [],
      file: null,
      loadingSkeleton: true,
      rules: {
        requiredMultipleFiles: value =>
          requiredMultipleFiles(value) || this.$t("required"),
        required: value => required(value) || this.$t("required"),
        max: value =>
          fileMaxSize(value, 5000000) || this.$t("maxSize", { size: 5 }),
        maxCount: value =>
          fileMaxCount(value, 5) || this.$t("maxCount", { count: 5 }),
        multipleMax: value =>
          fileMultipleSize(value, 5000000) || this.$t("maxSize", { size: 5 })
      }
    };
  },
  methods: {
    createPhotoFixation() {
      if (!this.$refs.addFixationForm.validate()) {
        this.loading = false;
        return;
      }
      this.loading = true;
      let formData = new FormData();

      formData.append(`projectId`, this.construction.id);
      for (let i = 0; i < this.files.length; i++) {
        formData.append(`photos`, this.files[i]);
      }
      if (this.photoFixation.comment) {
        formData.append(`comment`, this.photoFixation.comment);
      }
      this.$store
        .dispatch("photofixations/addFixation", formData)
        .then(() => {
          this.showAddFixationForm = false;
          if (this.$refs.addFixationForm) {
            this.$refs.addFixationForm.reset();
            this.$refs.addFixationForm.resetValidation();
          }
          if (this.photoList && this.photoList.length > 10) {
            this.$store.commit("photofixations/setLoadingStatus", true);
            this.$store
              .dispatch("photofixations/getAllPhotos", {
                projectId: this.construction.id,
                page: this.page - 1
              })
              .then(() => {
                this.$store.commit("photofixations/setLoadingStatus", false);
              });
          }
        })
        .catch(error => {
          this.$notify({
            group: "warn",
            type: "error",
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: error
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    editPhotoFixation() {
      this.loading = true;
      let formData = new FormData();

      formData.append(`photofixationId`, this.photoFixation.id);
      if (this.photoFixation.comment) {
        formData.append(`comment`, this.photoFixation.comment);
      } else {
        formData.append(`comment`, ``);
      }

      this.$store
        .dispatch("photofixations/updateFixation", formData)
        .then(() => {
          this.showEditFixationForm = false;
          this.photoFixation = {};
        })
        .catch(error => {
          this.$notify({
            group: "warn",
            type: "error",
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: error
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    addPhoto() {
      if (!this.$refs.addPhotoForm.validate()) {
        this.loading = false;
        return;
      }
      this.loading = true;
      let formData = new FormData();

      formData.append(`photofixationId`, this.photoFixation.id);
      formData.append(`photos`, this.file);

      this.$store
        .dispatch("photofixations/addPhoto", formData)
        .then(() => {
          this.showAddPhotoForm = false;
          if (this.$refs.addPhotoForm) {
            this.$refs.addPhotoForm.reset();
            this.$refs.addPhotoForm.resetValidation();
          }
        })
        .catch(error => {
          this.$notify({
            group: "warn",
            type: "error",
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: error
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    removePhoto() {
      this.loading = true;

      let formData = new FormData();
      formData.append("photoId", this.currPhoto.id);
      this.$store
        .dispatch("photofixations/deletePhoto", {
          data: formData,
          fixation: this.photoFixation
        })
        .then(() => {
          this.showRemovePhotoForm = false;
          this.photoFixation = {};
          this.currPhoto = {};
        })
        .catch(error => {
          this.$notify({
            group: "warn",
            type: "error",
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: error
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    toggleClickViewer(key, photos) {
      this.viewerImages = [];
      if (photos && photos.length) {
        photos.forEach(item => {
          this.viewerImages.push(this.serverUrl + item.url + "&type=1024px");
        });
      }
      let refName = `viewer${key}`;
      setTimeout(() => {
        document.getElementById(refName).click();
      }, 500);
    },
    formatDate(date) {
      let d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [day, month, year].join(".");
    },
    createConstruction() {
      this.$emit("createConstruction");
    }
  },
  computed: {
    ...mapState({
      construction: state => state.photofixations.construction,
      photoList: state => state.photofixations.photoList,
      listLoading: state => state.photofixations.listLoading,
      empty: state => state.emptyConstructions,
      user: state => state.user.user,
      lang: state => state.lang,
      pagesCount: state => Math.ceil(state.photofixations.total / 10)
    })
  },
  watch: {
    page(value) {
      this.$store.commit("photofixations/setLoadingStatus", true);
      this.$store
        .dispatch("photofixations/getAllPhotos", {
          projectId: this.construction.id,
          page: parseInt(value) - 1
        })
        .then(() => {
          this.$store.commit("photofixations/setLoadingStatus", false);
          let scrollElement = document.querySelector(".content__body.ps");
          setTimeout(() => {
            scrollElement.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth"
            });
          }, 500);
        });
    },
    construction() {
      this.page = 1;
      let scrollElement = document.querySelector(".content__body.ps");
      setTimeout(() => {
        scrollElement.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      }, 500);
    }
  }
};
</script>

<style scoped lang="scss">
.fotofixations-btn {
  @media all and(max-width: 960px) {
    font-size: 0 !important;
    padding: 0 !important;
    max-width: 100%;
  }
}
</style>

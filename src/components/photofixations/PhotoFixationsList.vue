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
          class="mb-12 fixation-card"
          style="position: relative"
        >
          <v-container fluid>
            <v-row v-if="windowWidth <= 1280">
              <v-col class="text-left">
                <v-btn
                  outlined
                  :color="color"
                  :disabled="fixation.photos.length >= 5"
                  class="fotofixations-btn add ml-0 mr-2 pl-2 pr-2"
                  @click="
                    showAddPhotoForm = true;
                    photoFixation = fixation;
                  "
                >
                  <v-icon>mdi-plus</v-icon>
                  {{ $t("add").toLowerCase() }}
                </v-btn>

                <v-btn
                  outlined
                  :color="'rgba(36, 109, 87, 0.3)'"
                  class="fotofixations-btn edit pl-2 pr-2"
                  @click="showEditForm(fixation)"
                >
                  <v-icon>mdi-pencil</v-icon>
                  {{ $t("edit").toLowerCase() }}
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                v-if="construction.creatorId === user.id && windowWidth > 1280"
                class="text-left fotofixation-actions-wrap"
                cols="1"
              >
                <div>
                  <v-btn
                    v-if="windowWidth > 1280"
                    outlined
                    :color="color"
                    :disabled="fixation.photos.length >= 5"
                    class="fotofixations-btn add"
                    @click="
                      showAddPhotoForm = true;
                      photoFixation = fixation;
                    "
                  >
                    <v-icon>mdi-plus</v-icon>
                    {{ $t("add").toLowerCase() }}
                  </v-btn>
                </div>
                <div>
                  <v-btn
                    v-if="windowWidth > 1280"
                    outlined
                    :color="'rgba(36, 109, 87, 0.3)'"
                    class="fotofixations-btn edit"
                    @click="showEditForm(fixation)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                    {{ $t("edit").toLowerCase() }}
                  </v-btn>
                </div>
                <div v-if="windowWidth > 1280">
                  <span class="fotofixation-date">
                    {{ formatDate(fixation.dateCreate) }}
                  </span>
                </div>
                <div
                  v-if="windowWidth > 1280"
                  class="fotofixation-comment-title"
                >
                  {{ $t("comment") }}:
                </div>
                <perfect-scrollbar
                  style="max-height: 300px"
                  v-if="windowWidth > 1280"
                  class="fotofixation-comment"
                >
                  {{ fixation.comment }}
                </perfect-scrollbar>
              </v-col>
              <v-col class="fotofixation-img-wrap">
                <v-row>
                  <v-col
                    v-for="(photo, photoKey) in fixation.photos"
                    :key="photoKey + photo"
                    class="d-flex child-flex fotofixation-img"
                    style="position: relative;"
                    xl="3"
                    lg="4"
                    md="4"
                    sm="6"
                    cols="12"
                  >
                    <div
                      v-if="construction.creatorId === user.id"
                      class="fotofixation-img-actions"
                    >
                      <v-btn
                        icon
                        @click="
                          currPhoto = photo;
                          showRemovePhotoForm = true;
                          photoFixation = fixation;
                        "
                      >
                        <IconBasket width="20" height="20" />
                      </v-btn>
                      <v-btn
                        icon
                        @click="toggleClickViewer(photoKey, fixation.photos)"
                      >
                        <v-icon :color="'#F25A33'">mdi-overscan</v-icon>
                      </v-btn>
                    </div>

                    <v-card flat tile class="d-flex">
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
                  <div
                    v-if="
                      (fixation.photos.length === 2 ||
                        fixation.photos.length === 5) &&
                        windowWidth > 1280
                    "
                    class="d-flex child-flex fotofixation-img"
                  ></div>
                </v-row>
              </v-col>
            </v-row>
            <v-row class="mt-4" v-if="windowWidth <= 1280">
              <v-col>
                <div class="fotofixation-comment-title">
                  {{ $t("comment") }}:
                </div>
                <div class="fotofixation-comment">
                  {{ fixation.comment }}
                </div>
              </v-col>
            </v-row>
            <v-row v-if="windowWidth <= 1280">
              <v-col>
                <div class="fotofixation-date">
                  {{ formatDate(fixation.dateCreate) }}
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="10" class="text-left fotofixation-creator">
                {{ $t("author") }}: {{ fixation.photoCreatorName }}
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </span>
    </v-skeleton-loader>
    <span class="empty-block">
      <v-btn
        :color="color"
        dark
        class="empty-block__btn"
        @click="
          showAddFixationForm = true;
          photoFixation = {};
        "
      >
        <v-icon left>
          mdi-plus
        </v-icon>
        {{ $t("add") }}
      </v-btn>
    </span>
    <div v-if="photoList && photoList.length" class="text-center">
      <v-pagination
        v-model="page"
        :color="color"
        :length="pagesCount"
      ></v-pagination>
    </div>

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
        <v-card-actions class="text-center justify-center">
          <v-btn
            :loading="loading"
            :color="colorExtra"
            dark
            @click="createPhotoFixation"
          >
            {{ $t("ok") }}
          </v-btn>
          <v-btn
            :color="colorExtraHover"
            dark
            @click="showAddFixationForm = false"
          >
            {{ $t("cancel") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showEditFixationForm" width="500">
      <v-card>
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
                <v-card-actions class="text-center justify-center">
                  <v-btn
                    :loading="loading"
                    :color="colorExtra"
                    dark
                    @click="editPhotoFixation"
                  >
                    {{ $t("ok") }}
                  </v-btn>
                  <v-btn
                    :color="colorExtraHover"
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
        <v-card-actions class="text-center justify-center">
          <v-btn :loading="loading" :color="colorExtra" dark @click="addPhoto">
            {{ $t("ok") }}
          </v-btn>
          <v-btn
            :color="colorExtraHover"
            dark
            @click="showAddPhotoForm = false"
          >
            {{ $t("cancel") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showRemovePhotoForm" width="500">
      <v-card>
        <v-card-title> {{ $t("delete") }}? </v-card-title>
        <v-card-actions class="text-center justify-center">
          <v-btn
            :loading="loading"
            :color="colorExtra"
            dark
            @click="removePhoto"
          >
            {{ $t("ok") }}
          </v-btn>
          <v-btn
            :color="colorExtraHover"
            dark
            @click="showRemovePhotoForm = false"
          >
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
import IconBasket from "@/components/common/icons/IconBasket";
import {
  required,
  fileMaxSize,
  fileMaxCount,
  fileMultipleSize,
  requiredMultipleFiles
} from "@/shared/validator";
export default {
  name: "PhotoFixationsList",
  components: {
    IconBasket
  },
  data() {
    return {
      page: 1,
      bigImgUrl: null,
      showMenu: false,
      serverUrl: serverUrl,
      color: this.$store.state.theme.main,
      colorExtra: this.$store.state.theme.extra,
      colorExtraHover: this.$store.state.theme.extraHover,
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
    showEditForm(fixation) {
      this.showEditFixationForm = true;
      this.photoFixation = Object.assign({}, fixation);
    },
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
          this.snackBar.value = true;
          this.snackBar.text = this.$t("messages.success.save");
          this.snackBar.color = "success";
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
          this.snackBar.value = true;
          this.snackBar.text = this.$t("messages.success.save");
          this.snackBar.color = "success";
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
          this.snackBar.value = true;
          this.snackBar.text = this.$t("messages.success.save");
          this.snackBar.color = "success";
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
          this.snackBar.value = true;
          this.snackBar.text = this.$t("messages.success.removePhoto");
          this.snackBar.color = "success";
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
      snackBar: state => state.snackBar,
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
@import "assets/css/photofixation.css";
</style>

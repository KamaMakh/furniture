<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <td v-for="(item, key) in [this.construction.name, $t('count_sh'), $t('unit_sh'), $t('price'), $t('magazine'), $t('deadlines'), $t('status'), $t('sum_price'), $t('link')]" :key="key" :width="tdWidths[key]+'%'">
            <span v-if="key === 0" @click="showModal" class="icon" style="cursor: pointer">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM16 16H2V2.00001H16V16ZM10 14H8V10H4V8.00001H8V4.00001H10V8.00001H14V10H10V14Z" fill="#C4C4C4"/>
              </svg>
            </span>
            {{ item }}
            <span v-if="key === 0" class="setting-icon">
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.877 9.99998C15.877 10.3116 15.8495 10.605 15.8129 10.8983L17.747 12.4108C17.9212 12.5483 17.967 12.7958 17.857 12.9975L16.0237 16.1691C15.9412 16.3158 15.7854 16.3983 15.6295 16.3983C15.5745 16.3983 15.5195 16.3891 15.4645 16.3708L13.182 15.4541C12.7054 15.8116 12.192 16.1233 11.6329 16.3525L11.2845 18.7816C11.257 19.0016 11.0645 19.1666 10.8354 19.1666H7.16872C6.93955 19.1666 6.74705 19.0016 6.71955 18.7816L6.37122 16.3525C5.81205 16.1233 5.29872 15.8208 4.82205 15.4541L2.53955 16.3708C2.49372 16.3891 2.43872 16.3983 2.38372 16.3983C2.21872 16.3983 2.06288 16.3158 1.98038 16.1691L0.14705 12.9975C0.0370501 12.7958 0.0828834 12.5483 0.25705 12.4108L2.19122 10.8983C2.15455 10.605 2.12705 10.3025 2.12705 9.99998C2.12705 9.69748 2.15455 9.39498 2.19122 9.10165L0.25705 7.58915C0.0828834 7.45165 0.0278834 7.20415 0.14705 7.00248L1.98038 3.83081C2.06288 3.68415 2.21872 3.60165 2.37455 3.60165C2.42955 3.60165 2.48455 3.61081 2.53955 3.62915L4.82205 4.54581C5.29872 4.18831 5.81205 3.87665 6.37122 3.64748L6.71955 1.21831C6.74705 0.998313 6.93955 0.833313 7.16872 0.833313H10.8354C11.0645 0.833313 11.257 0.998313 11.2845 1.21831L11.6329 3.64748C12.192 3.87665 12.7054 4.17915 13.182 4.54581L15.4645 3.62915C15.5104 3.61081 15.5654 3.60165 15.6204 3.60165C15.7854 3.60165 15.9412 3.68415 16.0237 3.83081L17.857 7.00248C17.967 7.20415 17.9212 7.45165 17.747 7.58915L15.8129 9.10165C15.8495 9.39498 15.877 9.68831 15.877 9.99998ZM14.0437 9.99998C14.0437 9.80748 14.0346 9.61498 13.9979 9.33081L13.8696 8.29498L14.6854 7.65331L15.6662 6.87415L15.0246 5.76498L13.8604 6.23248L12.8887 6.62665L12.0546 5.98498C11.6879 5.70998 11.3212 5.49915 10.9271 5.33415L9.95538 4.93998L9.80872 3.90415L9.63455 2.66665H8.36038L8.17705 3.90415L8.03038 4.93998L7.05872 5.33415C6.68288 5.48998 6.30705 5.70998 5.91288 6.00331L5.08788 6.62665L4.13455 6.24165L2.97038 5.77415L2.32872 6.88331L3.31872 7.65331L4.13455 8.29498L4.00622 9.33081C3.97872 9.60581 3.96038 9.81665 3.96038 9.99998C3.96038 10.1833 3.97872 10.3941 4.00622 10.6783L4.13455 11.7141L3.31872 12.3558L2.32872 13.1258L2.97038 14.235L4.13455 13.7675L5.10622 13.3733L5.94038 14.015C6.30705 14.29 6.67372 14.5008 7.06788 14.6658L8.03955 15.06L8.18622 16.0958L8.36038 17.3333H9.64372L9.82705 16.0958L9.97372 15.06L10.9454 14.6658C11.3212 14.51 11.6971 14.29 12.0912 13.9966L12.9162 13.3733L13.8696 13.7583L15.0337 14.2258L15.6754 13.1166L14.6854 12.3466L13.8696 11.705L13.9979 10.6691C14.0254 10.3941 14.0437 10.1925 14.0437 9.99998ZM9.00204 6.33331C6.97621 6.33331 5.33537 7.97415 5.33537 9.99998C5.33537 12.0258 6.97621 13.6666 9.00204 13.6666C11.0279 13.6666 12.6687 12.0258 12.6687 9.99998C12.6687 7.97415 11.0279 6.33331 9.00204 6.33331ZM7.16872 9.99998C7.16872 11.0083 7.99372 11.8333 9.00205 11.8333C10.0104 11.8333 10.8354 11.0083 10.8354 9.99998C10.8354 8.99165 10.0104 8.16665 9.00205 8.16665C7.99372 8.16665 7.16872 8.99165 7.16872 9.99998Z" fill="#DADADA"/>
              </svg>
            </span>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr style="cursor: pointer" v-for="(item, key) in rows" :key="key" :class="{odd: key%2 === 0 || key === 0}">
          <td v-if="!item.price" colspan="9" class="d-table-cell border-right" @click="toggleGroupRows(item, $event)" :child="enabledGroups[item.id]">
            <span class="d-flex align-items-center justify-content-start">
              <span v-if="!item.price" @click="showModal(item)" class="setting-icon">
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.877 9.99998C15.877 10.3116 15.8495 10.605 15.8129 10.8983L17.747 12.4108C17.9212 12.5483 17.967 12.7958 17.857 12.9975L16.0237 16.1691C15.9412 16.3158 15.7854 16.3983 15.6295 16.3983C15.5745 16.3983 15.5195 16.3891 15.4645 16.3708L13.182 15.4541C12.7054 15.8116 12.192 16.1233 11.6329 16.3525L11.2845 18.7816C11.257 19.0016 11.0645 19.1666 10.8354 19.1666H7.16872C6.93955 19.1666 6.74705 19.0016 6.71955 18.7816L6.37122 16.3525C5.81205 16.1233 5.29872 15.8208 4.82205 15.4541L2.53955 16.3708C2.49372 16.3891 2.43872 16.3983 2.38372 16.3983C2.21872 16.3983 2.06288 16.3158 1.98038 16.1691L0.14705 12.9975C0.0370501 12.7958 0.0828834 12.5483 0.25705 12.4108L2.19122 10.8983C2.15455 10.605 2.12705 10.3025 2.12705 9.99998C2.12705 9.69748 2.15455 9.39498 2.19122 9.10165L0.25705 7.58915C0.0828834 7.45165 0.0278834 7.20415 0.14705 7.00248L1.98038 3.83081C2.06288 3.68415 2.21872 3.60165 2.37455 3.60165C2.42955 3.60165 2.48455 3.61081 2.53955 3.62915L4.82205 4.54581C5.29872 4.18831 5.81205 3.87665 6.37122 3.64748L6.71955 1.21831C6.74705 0.998313 6.93955 0.833313 7.16872 0.833313H10.8354C11.0645 0.833313 11.257 0.998313 11.2845 1.21831L11.6329 3.64748C12.192 3.87665 12.7054 4.17915 13.182 4.54581L15.4645 3.62915C15.5104 3.61081 15.5654 3.60165 15.6204 3.60165C15.7854 3.60165 15.9412 3.68415 16.0237 3.83081L17.857 7.00248C17.967 7.20415 17.9212 7.45165 17.747 7.58915L15.8129 9.10165C15.8495 9.39498 15.877 9.68831 15.877 9.99998ZM14.0437 9.99998C14.0437 9.80748 14.0346 9.61498 13.9979 9.33081L13.8696 8.29498L14.6854 7.65331L15.6662 6.87415L15.0246 5.76498L13.8604 6.23248L12.8887 6.62665L12.0546 5.98498C11.6879 5.70998 11.3212 5.49915 10.9271 5.33415L9.95538 4.93998L9.80872 3.90415L9.63455 2.66665H8.36038L8.17705 3.90415L8.03038 4.93998L7.05872 5.33415C6.68288 5.48998 6.30705 5.70998 5.91288 6.00331L5.08788 6.62665L4.13455 6.24165L2.97038 5.77415L2.32872 6.88331L3.31872 7.65331L4.13455 8.29498L4.00622 9.33081C3.97872 9.60581 3.96038 9.81665 3.96038 9.99998C3.96038 10.1833 3.97872 10.3941 4.00622 10.6783L4.13455 11.7141L3.31872 12.3558L2.32872 13.1258L2.97038 14.235L4.13455 13.7675L5.10622 13.3733L5.94038 14.015C6.30705 14.29 6.67372 14.5008 7.06788 14.6658L8.03955 15.06L8.18622 16.0958L8.36038 17.3333H9.64372L9.82705 16.0958L9.97372 15.06L10.9454 14.6658C11.3212 14.51 11.6971 14.29 12.0912 13.9966L12.9162 13.3733L13.8696 13.7583L15.0337 14.2258L15.6754 13.1166L14.6854 12.3466L13.8696 11.705L13.9979 10.6691C14.0254 10.3941 14.0437 10.1925 14.0437 9.99998ZM9.00204 6.33331C6.97621 6.33331 5.33537 7.97415 5.33537 9.99998C5.33537 12.0258 6.97621 13.6666 9.00204 13.6666C11.0279 13.6666 12.6687 12.0258 12.6687 9.99998C12.6687 7.97415 11.0279 6.33331 9.00204 6.33331ZM7.16872 9.99998C7.16872 11.0083 7.99372 11.8333 9.00205 11.8333C10.0104 11.8333 10.8354 11.0083 10.8354 9.99998C10.8354 8.99165 10.0104 8.16665 9.00205 8.16665C7.99372 8.16665 7.16872 8.99165 7.16872 9.99998Z" fill="#DADADA"/>
                </svg>
              </span>
              <span class="icon" style="cursor: pointer" @click="showNomenclature(item)">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM16 16H2V2.00001H16V16ZM10 14H8V10H4V8.00001H8V4.00001H10V8.00001H14V10H10V14Z" fill="#C4C4C4"/>
                </svg>
              </span>
              {{ item.name }}
            </span>
          </td>
          <td v-else @click="showEditNomenclature(item)">
            <span v-if="item.photos && item.photos[0]" class="icon">
              <img :src="serverUrl + item.photos[0]['pathUrl']" alt="" />
            </span>
            <span v-else class="icon no-img"></span>
            {{ item.name }}
          </td>
          <td v-if="item.price" width="8%">{{ item.count }}</td>
          <td v-if="item.price"  width="8%">{{ item.units ? item.units.name: "" }}</td>
          <td v-if="item.price"  width="12%">{{ item.price }}</td>
          <td v-if="item.price"  width="8%">{{ item.shop }}</td>
          <td v-if="item.price"  width="8%">{{ item.term }}</td>
          <td v-if="item.price"  width="8%" :style="{color: item.statusType == 1 ? '#FF4081' : item.statusType == 2 ? '#154E85' : item.statusType == 3 ? '#9B51E0' : '#00670A'}">
              <!--{{item.status}}-->
          </td>
          <td v-if="item.price"  width="8%">{{item.price_sum}}</td>
          <td v-if="item.price"  width="20%">{{ item.link }}</td>
        </tr>
      </tbody>
    </table>

    <!--modals-->
    <transition name="fade">
      <div v-if="showAddModal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <form @submit="addGroup">
                    <div class="form-group">
                      <input type="text" class="form-control" v-model="group.name" :placeholder="$t('construct_name')">
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" @click="showAddModal = false">{{ $t("close") }}</button>
                  <button type="button" class="btn btn-custom" @click="addGroup">{{ $t("save") }}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="showNomekModal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog nomenclature-modal" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <form @submit="addNomenclature">
                    <div class="row ml-0 mr-0 nomenclature-column">
                      <div class="body-left col col-lg-6 col-md-12">
                        <div class="form-group row">
                          <uploader v-model="nomenclature.file" limit="3" :title="$t('add_image')" :autoUpload="false" :multiple="true"></uploader>
                          <!--<input type="file" v-model="nomenclature.fileList" multiple>-->
                          <!--<input type="file" id="files" ref="files" multiple v-on:change="handleFileUploads()"/>-->
                        </div>
                        <!--<div class="form-group row ml-0 mr-0 justify-content-center align-self-end">-->
                          <!--<button type="button" class="btn btn-custom" @click="addGroup">{{ $t("save") }}</button>-->
                        <!--</div>-->
                      </div>
                      <div class="body-right col col-lg-6 col-md-12">
                        <div class="form-group row">
                          <div class="col col-12">
                            <input type="text" class="form-control" :class="{ 'is-danger': $v.nomenclature.name.$invalid && (nomenclature.name || showFormErrors)}" v-model="nomenclature.name" :placeholder="$t('construct_name')">
                          </div>
                        </div>
                        <div class="form-group row">
                          <div class="col col-lg-4 col-md-4 col-sm-12">
                            <input type="number" step="1000" class="form-control" :class="{ 'is-danger': $v.nomenclature.price.$invalid && (nomenclature.price || showFormErrors)}" :placeholder="$t('price')" v-model="price">
                          </div>
                          <div class="col col-lg-4 col-md-4 col-sm-12">
                            <input type="text" class="form-control" v-model="nomenclature.magazine" :placeholder="$t('magazine')">
                          </div>
                          <div class="col col-lg-4 col-md-4 col-sm-12 d-flex align-self-end">
                            <v-select
                              class="nomenclature-select w-100"
                              :class="{ 'is-danger': $v.nomenclature.unit.$invalid && (nomenclature.unit || showFormErrors)}"
                              :placeholder="$t('unit_sh')"
                              :options="units"
                              v-model="nomenclature.unit"
                            >
                            </v-select>
                            <!--<input type="text" class="form-control" :placeholder="$t('unit_sh')" v-model="nomenclature.unit">-->
                          </div>
                        </div>
                        <div class="form-group row">
                          <div class="col col-lg-4 col-md-4 col-sm-12">
                            <input type="number" step="1" class="form-control" :class="{ 'is-danger': $v.nomenclature.count.$invalid && (nomenclature.count || showFormErrors)}" :placeholder="$t('count')" v-model="nomenclature.count">
                          </div>
                          <div class="col col-lg-4 col-md-4 col-sm-12">
                            <input type="text" v-mask="'##.##.####'" class="form-control" :class="{ 'is-danger': $v.nomenclature.term.$invalid && (nomenclature.term || showFormErrors)}" :placeholder="$t('term')" v-model="nomenclature.term">
                          </div>
                          <div class="col col-lg-4 col-md-4 col-sm-12">
                            <input type="text" class="form-control" :placeholder="$t('link')" v-model="nomenclature.link">
                          </div>
                        </div>
                        <div class="form-group row">
                          <div class="col col-lg-4 col-md-4 col-sm-12">
                            <input type="number" step="1" class="form-control" :class="{ 'is-danger': $v.nomenclature.nds.$invalid && (nomenclature.nds || showFormErrors)}" :placeholder="$t('nds')" v-model="nomenclature.nds" @change="updatePrices">
                          </div>
                          <div class="col col-lg-4 col-md-4 col-sm-12">
                            <input type="number" disabled step="any" class="form-control" :placeholder="$t('ndsValue')" v-model="nomenclature.ndsValue">
                          </div>
                          <div class="col col-lg-4 col-md-4 col-sm-12">
                            <input type="number" disabled step="any" class="form-control" :placeholder="$t('priceWithoutNds')" v-model="nomenclature.priceWithoutNds">
                          </div>
                        </div>
                        <div class="form-group">
                          <label v-for="(item, key) in nomenclature.status" :key="key" :class="{disabled: roles.indexOf(item.userRole) < 0 || nomenclature.id === updatingId}" @click="updateConfirm(nomenclature)">
                            <p-check class="pretty p-image p-plain text-left" name="test" v-model="nomenclature.status[key]['confirmed']">
                              <img slot="extra" class="image" src="../../assets/policycheck.svg">
                              {{ $t("confirmed") }} {{ $t(item.userRole.split("_")[1].toLowerCase()) }}
                            </p-check>
                          </label>
                        </div>
                        <div class="form-group row justify-content-end pr-3">
                          <button type="button" class="btn btn-secondary btn-close mr-2" @click="showNomekModal = false">{{ $t("close") }}</button>
                          <button v-if="!nomenclature.disabled" type="button" class="btn btn-custom" @click="addNomenclature">{{ $t("save") }}</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
/*eslint-disable */
import Vue from 'vue'
import Uploader from "vux-uploader-component"
import { mapState } from 'vuex';
import VueMask from "v-mask";
import Validations from 'vuelidate'
import { required } from "vuelidate/lib/validators";
import { serverUrl } from "@/store/urls"
Vue.use(VueMask);
Vue.use(Validations);
export default {
  name: "TableFurniture",
  components: {
    Uploader
  },
  data(){
    return{
      hideAllRows: false,
      showAddModal: false,
      showNomekModal: false,
      group: {},
      nomenclature: {},
      showFormErrors: false,
      enabledGroups: [],
      serverUrl: serverUrl,
      tdWidths: [20, 8, 8, 12, 8, 8, 8, 8, 20],
      updatingId: null,
      price: 0
    }
  },
  validations: {
    nomenclature: {
      name: {required},
      unit: {required},
      count: {required},
      price: {required},
      term: {required},
      nds: {required},
    }
  },
  methods:{
    toggleRows(item){
        this.groups[item] = !this.groups[item];
    },
    hideAll(){
        this.hideAllRows = !this.hideAllRows;
    },
    addGroup() {
      if(this.group.id) {
        let formData = new FormData();
        formData.append("groupId", this.group.id);
        formData.append("name", this.group.name);

        this.$store.dispatch("furniture/updateGroup", formData)
          .then(response => {
            this.showAddModal = false;
          })
          .catch(error => {
            this.$notify({
              group: 'warn',
              type: 'error',
              title: this.$i18n.messages[this.$i18n.locale]["attention"],
              text: error
            });
          });
      } else {
        this.$store.dispatch("furniture/addGroup", {
          "furnitureId": this.furniture["id"],
          "name": this.group.name
        })
          .then(response => {
            this.showAddModal = false;
          })
          .catch(error => {
            this.$notify({
              group: 'warn',
              type: 'error',
              title: this.$i18n.messages[this.$i18n.locale]["attention"],
              text: error
            });
          });
      }
    },
    addNomenclature() {
      if(this.$v.nomenclature.$pending || this.$v.nomenclature.$error || this.$v.nomenclature.$invalid){
        Vue.notify({
          group: 'warn',
          title: this.$i18n.messages[this.$i18n.locale]["attention"],
          text: this.$i18n.messages[this.$i18n.locale]["register_invalid"],
          type: 'warn',
          closeOnClick: true,
          duration: 4000
        });
        this.showFormErrors = true;
        return;
      }

      let formData = new FormData();
      formData.append( "groupId", this.nomenclature.groupId );
      formData.append( "name", this.nomenclature.name );
      formData.append( "count", this.nomenclature.count );
      formData.append( "unitId", this.nomenclature.unit.id);
      formData.append( "price", this.nomenclature.price );
      formData.append( "term", this.nomenclature.term );
      formData.append( "nds", this.nomenclature.nds );
      formData.append( "ndsValue", this.nomenclature.ndsValue );
      formData.append( "priceWithoutNds", this.nomenclature.priceWithoutNds );
      if(this.nomenclature.link) {
        formData.append( "link", this.nomenclature.link );
      }
      if(this.nomenclature.magazine) {
        formData.append( "magazine", this.nomenclature.magazine);
      }
      for( let i = 0; i < this.nomenclature.file.length; i++ ){
        formData.append(`file`, this.nomenclature.file[i].blob);
      }
      this.$store.dispatch("furniture/addNomenclature", {data: formData, group: this.nomenclature.group})
        .then((response) => {
          this.showNomekModal = false;
        })
        .catch((error) => {
          this.$notify({
            group: 'warn',
            type: 'error',
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: error.response
          });
        });
    },
    showModal(group) {
      this.showAddModal = true;
      this.group = group || {}
    },
    showNomenclature(item) {
      this.$store.dispatch("furniture/setUnits");
      this.showNomekModal = true;
      this.nomenclature = {
        group: item,
        groupId: item.id,
        nds: this.construction.nds,
        price: 0,
        ndsValue: 0,
        priceWithoutNds: 0
      };
      this.price = 0;
    },
    showEditNomenclature(item) {
      this.showNomekModal = true;
      this.nomenclature = item;
      this.nomenclature["disabled"] = true;
      // this.nomenclature = {
      //   group: item,
      //   groupId: item.id
      // };
    },
    toggleGroupRows(group, event) {
      if(event.target.tagName === "TD" || (event.target.tagName !== "svg" && event.target.tagName !== "path" && !event.target.classList.contains("icon"))) {
        if(!this.enabledGroups[group.id]) {
          this.enabledGroups[group.id] = true;
          this.$store.dispatch("furniture/setNomenclature", group)
        }
      }
    },
    updateConfirm(nomenclature) {
      this.updatingId = nomenclature.id;
      this.$store.dispatch("furniture/statusConfirm", {furnitureNomenclatureId: nomenclature.id})
        .then(() => {
          this.updatingId = null;
        })
        .catch((error) => {
          this.$notify({
            group: 'warn',
            type: 'error',
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: error.response
          });
          this.updatingId = null;
        });
    },
    updatePrices() {
      if(this.nomenclature.price) {
        this.nomenclature["ndsValue"] = (this.nomenclature.price * this.nomenclature.nds)/(100+this.nomenclature.nds);
        this.nomenclature["priceWithoutNds"] = this.nomenclature.price - this.nomenclature["ndsValue"];
      }
    }
  },
  computed: {
    ...mapState({
      rows: state => state.furniture.furniture.groups || [],
      furniture: state => state.furniture.furniture,
      construction: state => state.furniture.construction,
      roles: state => state.user.roles,
      units(state) {
        let unitsList = [];
        state.furniture.units.forEach((item, key, arr) => {
          unitsList.push({
            label: item.name,
            id: item.id
          });
        })
        return unitsList;
      },
      lang: state => state.lang
    })
  },
  watch: {
    furniture() {
      this.enabledGroups = [];
    },
    price(val) {
      this.nomenclature.price = val;
      this.updatePrices();
      // if(this.nomenclature.nds) {
      //   this.nomenclature["ndsValue"] = (val*this.nomenclature.nds)/(100+this.nomenclature.nds);
      //   this.nomenclature["priceWithoutNds"] = val - this.nomenclature["ndsValue"];
      // }
    }
  }
}
</script>

<style scoped lang="scss">
$ffamily: 'Roboto', sans-serif;
.hidden{
    display: none;
}
.table{
  font-family: $ffamily;
  border-collapse: collapse;
  border: 1px solid #C4C4C4;
  img{
      max-width: 100%;
  }
  tr{
      border-top: 1px solid #DADADA;
      background: #fff;
      font-family: $ffamily;
      color: #868686;
      font-size: 14px;
      transition: 0.3s;
      &.odd{
          background: #F5F5F6;
      }
      td:nth-child(1){
        border: none;
        display: flex;
        align-items: center;
        font-weight: bold;
      }
      &.parent{
          border-top: 1px solid #C4C4C4;
      }
      &:hover{
          background: rgba(214, 232, 206, 0.69);
      }
  }
  td,th{
    border-right: 1px solid #DADADA;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 1px 9px;
    border-top: none;
    /*width: 100%;*/
  }
  tbody{
      tr{
          td:last-child{
              font-weight: 500;
          }
      }
  }
  .icon{
      margin-right: 14px;
      width: 30px;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
  }
  .no-img{
      background: #C4C4C4;
  }
  .setting-icon{
      display: flex; align-items: center; justify-content: center; margin-left: 13px; cursor: pointer;
      &:hover{
          path{
              fill: #999;
          }
      }
  }
}
.nomenclature-modal {
  background: #fff;
  border-radius: 18px;
  .modal-content {
    border-radius: 18px;
  }
  .btn-custom {
    background: linear-gradient(98.69deg, #688E74 11.52%, #8AC29C 90.26%) !important;
    border-radius: 14px;
    transition: 0.3s;
    &:hover {
      opacity: 0.8;
    }
  }
  .btn-close {
    border-radius: 14px;
  }
  .modal-body{
    padding: 0;
  }
  .body-left{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 1rem;
  }
  .body-right{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 1rem;
    background: linear-gradient(90deg, #E1E1E1 0%, rgba(236, 232, 232, 0) 20.31%);
  }
  input {
    border: none;
    background: none;
    border-bottom: 1px solid #000;
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
    font-family: $ffamily;
    &::placeholder{
      color: #C4C4C4;
    }
    &.is-danger {
      border-bottom-color: #f04124 !important;
    }
  }
}

@media all and(min-width: 768px) {
  .nomenclature-modal {
    max-width: 850px;
  }
}
@media all and(max-width: 480px) {
  .nomenclature-column {
    flex-direction: column;
  }
}
.disabled {
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: none;
  opacity: 0.6;
}
</style>

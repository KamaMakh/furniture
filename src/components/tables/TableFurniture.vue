<template>
  <div v-if="construction && construction.id">
    <div class="custom-control custom-switch d-flex mb-2">
      <input
        type="checkbox"
        class="custom-control-input"
        :checked="ndsColumns"
        v-model="ndsColumns"
        @change="hideNdsColumns"
        id="customSwitch2"
        style="cursor: pointer"
      />
      <label
        class="custom-control-label"
        for="customSwitch2"
        style="cursor: pointer"
        >{{ $t("nds") }}</label
      >
    </div>
    <table class="table">
      <thead>
        <tr>
          <td
            v-for="(item, key) in titles"
            :key="key"
            :width="tdWidths[key] + '%'"
            :title="item.name"
            @click="sort(item, $event)"
            style="cursor: pointer"
            :class="{ bold: item.code === currentSort }"
          >
            <span
              v-if="key === 0"
              @click="showModal"
              :title="$t('add_group')"
              class="icon"
              style="cursor: pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM16 16H2V2.00001H16V16ZM10 14H8V10H4V8.00001H8V4.00001H10V8.00001H14V10H10V14Z"
                  fill="#C4C4C4"
                />
              </svg>
            </span>
            <span class="ellipsis">
              {{ item.name }}
            </span>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr
          style="cursor: pointer"
          v-for="(item, key) in rows"
          :key="key"
          :class="{ odd: key % 2 === 0 || key === 0 }"
        >
          <td
            v-if="item.price === undefined"
            colspan="12"
            class="d-table-cell border-right"
            @click="toggleGroupRows(item, $event)"
            :child="enabledGroups[item.id]"
          >
            <span class="d-flex align-items-center justify-content-start">
              <span
                v-if="!item.price && item.creatorId === user.id"
                @click="showModal(item)"
                :title="$t('edit_group')"
                class="setting-icon"
              >
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.877 9.99998C15.877 10.3116 15.8495 10.605 15.8129 10.8983L17.747 12.4108C17.9212 12.5483 17.967 12.7958 17.857 12.9975L16.0237 16.1691C15.9412 16.3158 15.7854 16.3983 15.6295 16.3983C15.5745 16.3983 15.5195 16.3891 15.4645 16.3708L13.182 15.4541C12.7054 15.8116 12.192 16.1233 11.6329 16.3525L11.2845 18.7816C11.257 19.0016 11.0645 19.1666 10.8354 19.1666H7.16872C6.93955 19.1666 6.74705 19.0016 6.71955 18.7816L6.37122 16.3525C5.81205 16.1233 5.29872 15.8208 4.82205 15.4541L2.53955 16.3708C2.49372 16.3891 2.43872 16.3983 2.38372 16.3983C2.21872 16.3983 2.06288 16.3158 1.98038 16.1691L0.14705 12.9975C0.0370501 12.7958 0.0828834 12.5483 0.25705 12.4108L2.19122 10.8983C2.15455 10.605 2.12705 10.3025 2.12705 9.99998C2.12705 9.69748 2.15455 9.39498 2.19122 9.10165L0.25705 7.58915C0.0828834 7.45165 0.0278834 7.20415 0.14705 7.00248L1.98038 3.83081C2.06288 3.68415 2.21872 3.60165 2.37455 3.60165C2.42955 3.60165 2.48455 3.61081 2.53955 3.62915L4.82205 4.54581C5.29872 4.18831 5.81205 3.87665 6.37122 3.64748L6.71955 1.21831C6.74705 0.998313 6.93955 0.833313 7.16872 0.833313H10.8354C11.0645 0.833313 11.257 0.998313 11.2845 1.21831L11.6329 3.64748C12.192 3.87665 12.7054 4.17915 13.182 4.54581L15.4645 3.62915C15.5104 3.61081 15.5654 3.60165 15.6204 3.60165C15.7854 3.60165 15.9412 3.68415 16.0237 3.83081L17.857 7.00248C17.967 7.20415 17.9212 7.45165 17.747 7.58915L15.8129 9.10165C15.8495 9.39498 15.877 9.68831 15.877 9.99998ZM14.0437 9.99998C14.0437 9.80748 14.0346 9.61498 13.9979 9.33081L13.8696 8.29498L14.6854 7.65331L15.6662 6.87415L15.0246 5.76498L13.8604 6.23248L12.8887 6.62665L12.0546 5.98498C11.6879 5.70998 11.3212 5.49915 10.9271 5.33415L9.95538 4.93998L9.80872 3.90415L9.63455 2.66665H8.36038L8.17705 3.90415L8.03038 4.93998L7.05872 5.33415C6.68288 5.48998 6.30705 5.70998 5.91288 6.00331L5.08788 6.62665L4.13455 6.24165L2.97038 5.77415L2.32872 6.88331L3.31872 7.65331L4.13455 8.29498L4.00622 9.33081C3.97872 9.60581 3.96038 9.81665 3.96038 9.99998C3.96038 10.1833 3.97872 10.3941 4.00622 10.6783L4.13455 11.7141L3.31872 12.3558L2.32872 13.1258L2.97038 14.235L4.13455 13.7675L5.10622 13.3733L5.94038 14.015C6.30705 14.29 6.67372 14.5008 7.06788 14.6658L8.03955 15.06L8.18622 16.0958L8.36038 17.3333H9.64372L9.82705 16.0958L9.97372 15.06L10.9454 14.6658C11.3212 14.51 11.6971 14.29 12.0912 13.9966L12.9162 13.3733L13.8696 13.7583L15.0337 14.2258L15.6754 13.1166L14.6854 12.3466L13.8696 11.705L13.9979 10.6691C14.0254 10.3941 14.0437 10.1925 14.0437 9.99998ZM9.00204 6.33331C6.97621 6.33331 5.33537 7.97415 5.33537 9.99998C5.33537 12.0258 6.97621 13.6666 9.00204 13.6666C11.0279 13.6666 12.6687 12.0258 12.6687 9.99998C12.6687 7.97415 11.0279 6.33331 9.00204 6.33331ZM7.16872 9.99998C7.16872 11.0083 7.99372 11.8333 9.00205 11.8333C10.0104 11.8333 10.8354 11.0083 10.8354 9.99998C10.8354 8.99165 10.0104 8.16665 9.00205 8.16665C7.99372 8.16665 7.16872 8.99165 7.16872 9.99998Z"
                    fill="#DADADA"
                  />
                </svg>
              </span>
              <span
                class="icon"
                style="cursor: pointer"
                :title="$t('add_nomenclature')"
                @click="showNomenclature(item)"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM16 16H2V2.00001H16V16ZM10 14H8V10H4V8.00001H8V4.00001H10V8.00001H14V10H10V14Z"
                    fill="#C4C4C4"
                  />
                </svg>
              </span>
              {{ item.name }}
            </span>
          </td>
          <td
            v-else
            style="display: table-cell; padding: 10px 5px;"
            @click="showEditNomenclature(item, $event)"
          >
            <div class="d-flex">
              <span v-if="item.photos && item.photos[0]" class="icon">
                <img :src="serverUrl + item.photos[0]['pathUrl']" alt="" />
              </span>
              <span v-else class="icon no-img"></span>
              <span class="ellipsis" :title="item.name">
                {{ item.name }}
              </span>
              <span
                v-if="item.creatorId === user.id"
                :title="$t('delete')"
                style="width: 20px; height: 25px; cursor: pointer; margin-left: 5px;"
                @click="showDeleteNomenModal(item)"
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
                  fill="#999"
                  stroke="#999"
                  stroke-width="2px"
                >
                  <g id="IconsRepo_bgCarrier"></g>
                  <path
                    d="M54.5,11.667H39.88V3.91c0-2.156-1.754-3.91-3.91-3.91H24.196c-2.156,0-3.91,1.754-3.91,3.91v7.756H5.667 c-0.552,0-1,0.448-1,1s0.448,1,1,1h2.042v40.5c0,3.309,2.691,6,6,6h32.75c3.309,0,6-2.691,6-6v-40.5H54.5c0.552,0,1-0.448,1-1 S55.052,11.667,54.5,11.667z M22.286,3.91c0-1.053,0.857-1.91,1.91-1.91H35.97c1.053,0,1.91,0.857,1.91,1.91v7.756H22.286V3.91z M50.458,54.167c0,2.206-1.794,4-4,4h-32.75c-2.206,0-4-1.794-4-4v-40.5h40.75V54.167z M38.255,46.153V22.847c0-0.552,0.448-1,1-1 s1,0.448,1,1v23.306c0,0.552-0.448,1-1,1S38.255,46.706,38.255,46.153z M29.083,46.153V22.847c0-0.552,0.448-1,1-1s1,0.448,1,1 v23.306c0,0.552-0.448,1-1,1S29.083,46.706,29.083,46.153z M19.911,46.153V22.847c0-0.552,0.448-1,1-1s1,0.448,1,1v23.306 c0,0.552-0.448,1-1,1S19.911,46.706,19.911,46.153z"
                  ></path>
                </svg>
              </span>
            </div>
          </td>
          <td
            v-if="item.price !== undefined"
            width="6%"
            @click="showEditNomenclature(item, $event)"
          >
            {{ item.count }}
          </td>
          <td
            v-if="item.price !== undefined"
            width="6%"
            @click="showEditNomenclature(item, $event)"
          >
            {{ item.units ? item.units.abName : "" }}
          </td>

          <td
            v-if="item.price !== undefined"
            width="8%"
            @click="showEditNomenclature(item, $event)"
          >
            {{ item.term }}
          </td>
          <td
            v-if="item.price !== undefined"
            width="10%"
            style="word-break: initial"
            @click="showEditNomenclature(item, $event)"
          >
            <div id="anim">
              <span class="tooltip-custom">
                <span class="tooltip-html" v-html="statusesHtml(item)"></span>
                <span v-if="item.buy">
                  {{ $t("purchased") }}
                </span>
                <span v-else-if="getStatus(item.status) === 'confirmed_simple'">
                  {{ $t("confirmed_simple") }}
                </span>
                <span v-else>
                  {{ $t("not_confirmed_simple") }}
                </span>
              </span>
            </div>
          </td>
          <td
            v-if="item.price !== undefined && ndsColumns"
            width="6%"
            @click="showEditNomenclature(item, $event)"
          >
            {{ item.nds }}
          </td>
          <td
            v-if="item.price !== undefined"
            width="6%"
            @click="showEditNomenclature(item, $event)"
          >
            {{ item.priceWithoutNds }}
          </td>
          <td
            v-if="item.price !== undefined && ndsColumns"
            width="6%"
            @click="showEditNomenclature(item, $event)"
          >
            {{ item.price }}
          </td>
          <td
            v-if="item.price !== undefined && ndsColumns"
            width="6%"
            @click="showEditNomenclature(item, $event)"
          >
            {{ item.ndsValue }}
          </td>
          <td
            v-if="item.price !== undefined"
            width="6%"
            @click="showEditNomenclature(item, $event)"
          >
            {{ item.totalPrice }}
          </td>
          <td
            v-if="item.price !== undefined"
            width="6%"
            @click="showEditNomenclature(item, $event)"
          >
            <span class="ellipsis">
              {{ item.magazine }}
            </span>
          </td>
          <td v-if="item.price !== undefined" width="20%">
            <span class="ellipsis" style="max-width: 120px;">
              <a :href="item.link" target="_blank">{{ item.link }}</a>
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <!--modals-->
    <transition name="fade-none">
      <div v-if="showAddModal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <form @submit="addGroup">
                    <div class="form-group">
                      <label for="input-name">{{ $t("construct_name") }}</label>
                      <input
                        type="text"
                        id="input-name"
                        class="form-control"
                        :placeholder="$t('construct_name')"
                        :class="{
                          'is-danger': !group.name && showFormErrors
                        }"
                        v-model="group.name"
                      />
                    </div>
                  </form>
                </div>
                <div v-if="!loading" class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="showAddModal = false"
                  >
                    {{ $t("close") }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-custom"
                    @click="addGroup"
                  >
                    {{ $t("save") }}
                  </button>
                </div>
                <div v-else class="modal-footer">
                  <button type="button" class="btn btn-custom">
                    <b-spinner small></b-spinner>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade-none">
      <div v-if="showRemoveNomekModal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="d-flex align-items-center justify-content-center">
                    {{ $t("delete") }} "{{ nomenclature.name }}"?
                  </div>
                </div>
                <div v-if="!loading" class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="showRemoveNomekModal = false"
                  >
                    {{ $t("close") }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-custom"
                    @click="deleteNomenclature"
                  >
                    {{ $t("delete") }}
                  </button>
                </div>
                <div v-else class="modal-footer">
                  <button type="button" class="btn btn-custom">
                    <b-spinner small></b-spinner>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade-none">
      <div v-if="showAddPhotoModal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="form-group row">
                    <uploader
                      v-model="files"
                      limit="1"
                      :title="$t('add_image')"
                      :autoUpload="false"
                      :multiple="true"
                    ></uploader>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="showAddPhotoModal = false"
                  >
                    {{ $t("close") }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-custom"
                    @click="addPhoto"
                  >
                    {{ $t("save") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade-none">
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
                          <div style="flex: 1 1 100%; padding-bottom: 5px">
                            <CustomGallery
                              :nomenclature="nomenclature"
                              :images="nomenclature.photos"
                              :isCreator="
                                nomenclature.creatorId === user.id &&
                                  !absolutesDisabled
                              "
                              :files="files"
                              @on-delete-new="deleteNewPhoto"
                              @on-delete="deletePhotoModal"
                              @on-add-file="readFile"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="body-right col col-lg-6 col-md-12">
                        <div class="form-group row">
                          <div class="col col-8">
                            <label class="title" for="nName">{{
                              $t("construct_name")
                            }}</label>
                            <input
                              type="text"
                              id="nName"
                              class="form-control"
                              :disabled="absolutesDisabled"
                              :class="{
                                'is-danger':
                                  $v.nomenclature.name.$invalid &&
                                  (nomenclature.name || showFormErrors),
                                disabled: absolutesDisabled
                              }"
                              v-model="nomenclature.name"
                              :placeholder="$t('construct_name')"
                            />
                          </div>
                          <div class="col col-4">
                            <div
                              v-if="
                                nomenclature.creatorId === user.id ||
                                  !nomenclature.id
                              "
                              class="custom-control custom-switch"
                              :class="{ disabled: absolutesDisabled }"
                            >
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                :checked="nomenclature.ndsBool"
                                v-model="nomenclature.ndsBool"
                                :disabled="absolutesDisabled"
                                @change="updatePrices"
                                id="customSwitch1"
                                style="cursor: pointer"
                              />
                              <label
                                class="custom-control-label"
                                for="customSwitch1"
                                style="cursor: pointer"
                                >{{ $t("nds") }}</label
                              >
                            </div>
                          </div>
                        </div>
                        <div class="form-group row">
                          <div class="col col-lg-4 col-md-4 col-sm-12">
                            <label class="title" for="nPrice">{{
                              $t("price")
                            }}</label>
                            <input
                              :disabled="absolutesDisabled"
                              :class="{ disabled: absolutesDisabled }"
                              type="number"
                              id="nPrice"
                              step="1000"
                              class="form-control"
                              :placeholder="$t('price')"
                              v-model="price"
                            />
                          </div>
                          <div class="col col-lg-4 col-md-4 col-sm-12">
                            <label class="title" for="nShop">{{
                              $t("magazine")
                            }}</label>
                            <input
                              :disabled="absolutesDisabled"
                              :class="{ disabled: absolutesDisabled }"
                              type="text"
                              id="nShop"
                              class="form-control"
                              v-model="nomenclature.magazine"
                              :placeholder="$t('magazine')"
                            />
                          </div>
                          <div
                            class="col col-lg-4 col-md-4 col-sm-12 d-flex align-self-end flex-column"
                          >
                            <label
                              class="title"
                              for="nRole"
                              style="margin-bottom: 3px;"
                              >{{ $t("unit_sh") }}</label
                            >
                            <v-select
                              :disabled="absolutesDisabled"
                              :class="{ disabled: absolutesDisabled }"
                              class="nomenclature-select w-100"
                              id="nRole"
                              :placeholder="
                                nomenclature.id
                                  ? nomenclature.units.name
                                  : $t('unit_sh')
                              "
                              :options="units"
                              v-model="nomenclature.units"
                            >
                            </v-select>
                          </div>
                        </div>
                        <div class="form-group row">
                          <div class="col col-lg-4 col-md-4 col-sm-12">
                            <label class="title" for="nCount">{{
                              $t("count")
                            }}</label>
                            <input
                              :disabled="absolutesDisabled"
                              :class="{ disabled: absolutesDisabled }"
                              type="number"
                              id="nCount"
                              step="1"
                              class="form-control"
                              :placeholder="$t('count')"
                              v-model="nomenclature.count"
                            />
                          </div>
                          <div class="col col-lg-4 col-md-4 col-sm-12">
                            <label class="title">{{ $t("term") }}</label>
                            <!--<input type="text" id="nTerm" class="form-control" :class="{ 'is-danger': $v.nomenclature.term.$invalid && (nomenclature.term || showFormErrors)}" :placeholder="$t('term')" v-model="nomenclature.term">-->
                            <v-date-picker
                              :class="{ disabled: absolutesDisabled }"
                              :popover="{
                                placement: 'bottom',
                                visibility: 'click'
                              }"
                              v-model="nomenclature.termString"
                              :input-props="{
                                class: `form-control nomenclature`,
                                id: 'nTerm'
                              }"
                              :locale="lang"
                              :masks="{ L: 'DD.MM.YYYY' }"
                            />
                          </div>
                          <div class="col col-lg-4 col-md-4 col-sm-12">
                            <label class="title" for="nLink">{{
                              $t("link")
                            }}</label>
                            <input
                              :disabled="absolutesDisabled"
                              :class="{ disabled: absolutesDisabled }"
                              type="text"
                              id="nLink"
                              class="form-control"
                              :placeholder="$t('link')"
                              v-model="nomenclature.link"
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <div
                            v-if="nomenclature.ndsBool"
                            class="col col-lg-4 col-md-4 col-sm-12"
                            :class="{ disabled: !nomenclature.ndsBool }"
                          >
                            <label class="title" for="nNds">{{
                              $t("nds")
                            }}</label>
                            <input
                              :disabled="absolutesDisabled"
                              :class="{ disabled: absolutesDisabled }"
                              type="number"
                              id="nNds"
                              step="1"
                              class="form-control"
                              :placeholder="$t('nds')"
                              v-model="nomenclature.nds"
                              @change="updatePrices"
                            />
                          </div>
                          <div
                            v-if="nomenclature.ndsBool"
                            class="col col-lg-4 col-md-4 col-sm-12"
                            :class="{ disabled: !nomenclature.ndsBool }"
                          >
                            <label class="title" for="nNdsValue">{{
                              $t("ndsValue")
                            }}</label>
                            <input
                              type="number"
                              id="nNdsValue"
                              disabled
                              step="any"
                              class="form-control"
                              :placeholder="$t('ndsValue')"
                              v-model="nomenclature.ndsValue"
                            />
                          </div>
                          <div class="col col-lg-4 col-md-4 col-sm-12">
                            <label class="title" for="nPriceWithoutNds">{{
                              $t("priceWithoutNds")
                            }}</label>
                            <input
                              type="number"
                              id="nPriceWithoutNds"
                              disabled
                              step="any"
                              class="form-control"
                              :placeholder="$t('priceWithoutNds')"
                              v-model="nomenclature.priceWithoutNds"
                            />
                          </div>
                        </div>
                        <div class="form-group">
                          <label
                            v-for="(item, key) in nomenclature.status"
                            :key="key"
                            :class="{
                              disabled:
                                roles.indexOf(item.userRole) < 0 ||
                                nomenclature.id === updatingId ||
                                nomenclature.buy ||
                                absolutesDisabled ||
                                (nomenclature.status[key]['confirmed'] &&
                                  nomenclature.status[key]['whoConfirmedId'] !==
                                    user.id)
                            }"
                            @click="updateConfirm(nomenclature)"
                          >
                            <p-check
                              class="pretty p-image p-plain text-left"
                              name="test"
                              v-model="nomenclature.status[key]['confirmed']"
                            >
                              <img
                                slot="extra"
                                class="image"
                                src="../../assets/policycheck.svg"
                              />
                              {{ $t("confirmed") }}
                              {{
                                $t(item.userRole.split("_")[1].toLowerCase())
                              }}
                            </p-check>
                          </label>
                        </div>
                        <div
                          v-if="!loading"
                          class="form-group row justify-content-end pr-3"
                        >
                          <button
                            type="button"
                            class="btn btn-secondary btn-close mr-2"
                            @click="showNomekModal = false"
                          >
                            {{ $t("close") }}
                          </button>
                          <button
                            v-if="
                              (nomenclature.creatorId === user.id ||
                                !nomenclature.id) &&
                                !nomenclature.buy
                            "
                            type="button"
                            class="btn btn-custom"
                            @click="addNomenclature"
                          >
                            {{ $t("save") }}
                          </button>
                          <button
                            v-if="
                              getStatus(nomenclature.status) === 'Confirmed' &&
                                !nomenclature.buy
                            "
                            type="button"
                            class="btn btn-custom ml-2"
                            @click="buyNomenclature(nomenclature)"
                          >
                            {{ $t("buy") }}
                          </button>
                          <button
                            v-else-if="
                              nomenclature.buy &&
                                nomenclature.buyerId === user.id
                            "
                            type="button"
                            class="btn btn-custom ml-2"
                            @click="buyNomenclature(nomenclature)"
                          >
                            {{ $t("cancelPurchase") }}
                          </button>
                        </div>
                        <div
                          v-else
                          class="form-group row justify-content-end pr-3"
                        >
                          <button type="button" class="btn btn-custom">
                            <b-spinner small></b-spinner>
                          </button>
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
    <transition name="fade-none">
      <div v-if="showRemovePhotoModal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="d-flex align-items-center justify-content-center">
                    {{ $t("delete") }} "{{ image.id }}"?
                  </div>
                </div>
                <div v-if="!loading" class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="showRemovePhotoModal = false"
                  >
                    {{ $t("close") }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-custom"
                    @click="deletePhoto"
                  >
                    {{ $t("delete") }}
                  </button>
                </div>
                <div v-else class="modal-footer">
                  <button type="button" class="btn btn-custom">
                    <b-spinner small></b-spinner>
                  </button>
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
import Vue from "vue";
import Uploader from "vux-uploader-component";
import { mapState } from "vuex";
import VueMask from "v-mask";
import Validations from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { serverUrl } from "@/store/urls";
import VCalendar from "v-calendar";
import CustomGallery from "@/components/CustomGallery";
import { userUrls } from "@/store/urls";

Vue.use(VCalendar);
Vue.use(VueMask);
Vue.use(Validations);
export default {
  name: "TableFurniture",
  components: {
    Uploader,
    CustomGallery
  },
  data() {
    return {
      userUrls: userUrls,
      hideAllRows: false,
      showAddModal: false,
      showRemoveNomekModal: false,
      showNomekModal: false,
      showRemovePhotoModal: false,
      showAddPhotoModal: false,
      group: {},
      nomenclature: {},
      showFormErrors: false,
      serverUrl: serverUrl,
      tdWidths: [18, 6, 6, 10, 6, 6, 6, 6, 6, 6, 6, 20],
      updatingId: null,
      price: 0,
      photos: [],
      image: {},
      index: null,
      files: [],
      ndsColumns: true,
      currentSort: "",
      currentSortDir: "asc",
      loading: false,
      absolutesDisabled: false
    };
  },
  validations: {
    nomenclature: {
      name: { required }
    }
  },
  methods: {
    statusesHtml(furniture) {
      let items = "",
        whoBought = "";
      if (furniture.status && furniture.status.length) {
        furniture.status.forEach(item => {
          let confirmed = item.confirmed
              ? this.$i18n.messages[this.$i18n.locale]["confirmed_simple"]
              : this.$i18n.messages[this.$i18n.locale]["not_confirmed_simple"],
            role = this.$i18n.messages[this.$i18n.locale][
              item.userRole.split("_")[1].toLowerCase()
            ];
          items +=
            '<div class="status-item"><b>' +
            role +
            ":</b>" +
            " " +
            confirmed +
            "</div>";
          if (furniture.buy && furniture.buyerId === item.whoConfirmedId) {
            whoBought += `<div class="mt-2">${
              this.$i18n.messages[this.$i18n.locale]["purchased"]
            } ${role}</div>`;
          }
        });
      }
      return `<div class="statuses d-flex justify-content-center align-items-center flex-column">
          ${items} ${whoBought}
        </div>`;
    },
    buyNomenclature(nomenclature) {
      this.loading = true;
      this.$store
        .dispatch("furniture/buyNomenclature", {
          data: { furnitureNomenclatureId: nomenclature.id },
          nomenclature: nomenclature
        })
        .then(response => {
          if (response && response.buy) {
            this.absolutesDisabled = response.buy;
          }
          this.showNomekModal = false;
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
    getStatus(statuses) {
      let confirmText = "confirmed_simple";
      if (statuses && statuses.length) {
        statuses.forEach(item => {
          if (item.hasOwnProperty("confirmed") && !item.confirmed) {
            confirmText = "not_confirmed_simple";
          }
        });
        return confirmText;
      }
    },
    toggleRows(item) {
      this.groups[item] = !this.groups[item];
    },
    hideAll() {
      this.hideAllRows = !this.hideAllRows;
    },
    addGroup() {
      if (!this.group.name) {
        Vue.notify({
          group: "warn",
          title: this.$i18n.messages[this.$i18n.locale]["attention"],
          text: this.$i18n.messages[this.$i18n.locale]["register_invalid"],
          type: "warn",
          closeOnClick: true,
          duration: 4000
        });
        this.showFormErrors = true;
        return;
      }
      this.loading = true;
      if (this.group.id) {
        let formData = new FormData();
        formData.append("groupId", this.group.id);
        formData.append("name", this.group.name);

        this.$store
          .dispatch("furniture/updateGroup", {
            data: formData,
            group: this.group
          })
          .then(() => {
            this.showAddModal = false;
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
      } else {
        this.$store
          .dispatch("furniture/addGroup", {
            furnitureId: this.furniture["id"],
            name: this.group.name
          })
          .then(() => {
            this.showAddModal = false;
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
      }
    },
    addNomenclature() {
      if (
        this.$v.nomenclature.$pending ||
        this.$v.nomenclature.$error ||
        this.$v.nomenclature.$invalid
      ) {
        Vue.notify({
          group: "warn",
          title: this.$i18n.messages[this.$i18n.locale]["attention"],
          text: this.$i18n.messages[this.$i18n.locale]["register_invalid"],
          type: "warn",
          closeOnClick: true,
          duration: 4000
        });
        this.showFormErrors = true;
        return;
      }
      this.loading = true;
      let formData = new FormData();

      if (this.nomenclature.id) {
        formData.append("nomenclatureId", this.nomenclature.id);
        formData.append("unitId", this.nomenclature.units.id);
      } else {
        formData.append("groupId", this.nomenclature.groupId);
        formData.append("unitId", this.nomenclature.unit.id);
        for (let i = 0; i < this.files.length; i++) {
          formData.append(`file`, this.files[i]);
        }
      }
      formData.append("name", this.nomenclature.name);
      formData.append("count", this.nomenclature.count);

      let term = this.formatDate(this.nomenclature.termString);
      formData.append("term", term);
      formData.append("ndsBool", this.nomenclature.ndsBool);

      if (this.nomenclature.ndsBool) {
        formData.append("price", this.nomenclature.price);
        formData.append("nds", this.nomenclature.nds);
        formData.append("ndsValue", this.nomenclature.ndsValue);
      } else {
        formData.append("price", "0");
        formData.append("nds", "0");
        formData.append("ndsValue", "0");
      }

      formData.append("priceWithoutNds", this.nomenclature.priceWithoutNds);

      if (this.nomenclature.link) {
        formData.append("link", this.nomenclature.link);
      }
      if (this.nomenclature.magazine) {
        formData.append("magazine", this.nomenclature.magazine);
      }

      if (this.nomenclature.id) {
        this.$store
          .dispatch("furniture/updateNomenclature", {
            data: formData,
            group: this.nomenclature.group,
            nomenclature: this.nomenclature
          })
          .then(() => {
            this.showNomekModal = false;
            if (this.files.length) {
              this.addPhoto();
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
      } else {
        this.$store
          .dispatch("furniture/addNomenclature", {
            data: formData,
            group: this.nomenclature.group,
            onlyOne: this.enabledGroups[this.nomenclature.group.id]
          })
          .then(() => {
            this.showNomekModal = false;
            if (!this.enabledGroups[this.nomenclature.group.id]) {
              // this.enabledGroups[this.nomenclature.group.id] = true;
              this.$store.dispatch("furniture/editEnabledGroups", {
                id: this.nomenclature.group.id,
                value: true
              });
              this.$store.dispatch(
                "furniture/setNomenclature",
                this.nomenclature.group
              );
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
      }
    },
    showModal(group) {
      this.showAddModal = true;
      this.group = group || {};
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
    showNomenclature(item) {
      this.showNomekModal = true;
      this.showFormErrors = false;
      this.files = [];
      this.nomenclature = {
        group: item,
        groupId: item.id,
        nds: this.construction.nds || 0,
        price: 0,
        ndsValue: 0,
        count: 0,
        priceWithoutNds: 0,
        ndsBool: false,
        termString: new Date(),
        photos: []
      };
      this.$store.dispatch("furniture/setUnits").then(() => {
        if (this.units[0]) {
          this.nomenclature.unit = this.units[0];
        }
      });
      this.price = 0;
    },
    showEditNomenclature(item, event) {
      let enableOpen = false;
      this.absolutesDisabled = item.buy;

      if (event) {
        let tagName = event.target.tagName,
          parentName = event.target.parentNode.tagName,
          classList = event.target.classList;
        enableOpen =
          tagName === "TD" ||
          tagName === "IMG" ||
          classList.contains("icon") ||
          classList.contains("ellipsis") ||
          parentName === "TD";
      } else {
        enableOpen = true;
      }

      if (enableOpen) {
        this.$store.dispatch("furniture/setUnits");
        this.showNomekModal = true;

        let term = item.term.split(".");
        term = term[2] + "." + term[1] + "." + term[0];
        item.termString = new Date(term);
        this.nomenclature = item;
        this.nomenclature.units["label"] = item.units.abName;
        this.photos = [];
        this.files = [];
        this.price = item.price;
        if (item.photos) {
          item.photos.forEach(item => {
            this.photos.push(this.serverUrl + item.pathUrl + "&type=1000px");
          });
        }
        if (!item.ndsBool) {
          this.price = this.nomenclature.price = this.nomenclature.priceWithoutNds;
        }
      }
    },
    readFile(newFile) {
      if (newFile) {
        let reader = new FileReader();
        reader.onload = e => {
          if (!this.nomenclature.id) {
            this.nomenclature.photos = [];
          }
          this.nomenclature.photos.push({
            src: e.target.result,
            isNew: true
          });
        };
        reader.readAsDataURL(newFile);
        this.files.push(newFile);
      }
    },
    showDeleteNomenModal(item) {
      this.showRemoveNomekModal = true;
      this.nomenclature = item;
    },
    deleteNomenclature() {
      this.loading = true;
      this.$store
        .dispatch("furniture/deleteNomenclature", this.nomenclature)
        .then(() => {
          this.showRemoveNomekModal = false;
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
    deletePhotoModal(image) {
      this.image = image;
      this.showRemovePhotoModal = true;
    },
    deletePhoto() {
      this.loading = true;
      this.$store
        .dispatch("furniture/deleteNomenclaturePhoto", {
          photoId: this.image.id,
          nomenclature: this.nomenclature
        })
        .then(() => {
          this.showRemovePhotoModal = false;
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
    deleteNewPhoto(image) {
      this.files = [];
      this.nomenclature.photos.splice(
        this.nomenclature.photos.indexOf(image),
        1
      );
    },
    addPhoto() {
      let formData = new FormData();
      formData.append("nomenclatureId", this.nomenclature.id);

      for (let i = 0; i < this.files.length; i++) {
        formData.append(`file`, this.files[i]);
      }
      this.$store
        .dispatch("furniture/addNomenclaturePhoto", {
          data: formData,
          nomenclature: this.nomenclature
        })
        .then(() => {
          this.showAddPhotoModal = false;
          this.nomenclature = {};
          this.files = [];
        })
        .catch(error => {
          this.$notify({
            group: "warn",
            type: "error",
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: error
          });
        });
    },
    toggleGroupRows(group, event) {
      if (
        !event ||
        event.target.tagName === "TD" ||
        (event.target.tagName !== "svg" &&
          event.target.tagName !== "path" &&
          !event.target.classList.contains("icon"))
      ) {
        if (!this.enabledGroups[group.id]) {
          // this.enabledGroups[group.id] = true;
          this.$store.dispatch("furniture/editEnabledGroups", {
            id: group.id,
            value: true
          });
          this.$store
            .dispatch("furniture/setNomenclature", group)
            .then(() => {
              //ignore
            })
            .catch(error => {
              this.$notify({
                group: "warn",
                type: "error",
                title: this.$i18n.messages[this.$i18n.locale]["attention"],
                text: error
              });
            });
        } else {
          this.$store.dispatch("furniture/hideNomenclatures", group);
          // this.enabledGroups[group.id] = false;
          this.$store.dispatch("furniture/editEnabledGroups", {
            id: group.id,
            value: false
          });
        }
      }
    },
    updateConfirm(nomenclature) {
      this.updatingId = nomenclature.id;
      this.loading = true;
      this.$store
        .dispatch("furniture/statusConfirm", {
          furnitureNomenclatureId: nomenclature.id
        })
        .then(() => {
          this.updatingId = null;
        })
        .catch(error => {
          this.$notify({
            group: "warn",
            type: "error",
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: error
          });
          this.updatingId = null;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    updatePrices() {
      if (this.nomenclature.price) {
        if (this.nomenclature.ndsBool) {
          if (!this.nomenclature.nds) {
            this.nomenclature.nds = this.construction.nds;
          }
          if (this.nomenclature.nds < 0) {
            this.nomenclature.nds = 0;
          }
          this.nomenclature["priceWithoutNds"] = (
            this.nomenclature.price / parseFloat("1." + this.nomenclature.nds)
          ).toFixed(2);
          this.nomenclature["ndsValue"] = (
            this.nomenclature.price - this.nomenclature["priceWithoutNds"]
          ).toFixed(2);
        } else {
          this.nomenclature.nds = 0;
          this.nomenclature["ndsValue"] = 0;
          this.nomenclature["priceWithoutNds"] = this.nomenclature.price;
        }
      }
    },
    hideNdsColumns() {
      // console.log(this.ndsColumns);
    },
    sort(column, event) {
      if (
        column.sortable &&
        (event.target.tagName === "TD" ||
          event.target.classList.contains("ellipsis"))
      ) {
        let groupKeys = [];
        this.rows.forEach((item, key) => {
          if (item.children && item.children > 1) {
            groupKeys.push({ start: key, length: item.children });
          }
        });
        groupKeys.forEach(item => {
          let children = this.rows.slice(
            item.start + 1,
            item.length + item.start + 1
          );
          children.sort((a, b) => {
            if (this.currentSort === column.code) {
              return 0;
            }
            if (column.code === "term") {
              let date1 = a[column.code].split(".");
              let date2 = b[column.code].split(".");
              date1 = date1[2] + "-" + date1[1] + "-" + date1[0];
              date2 = date2[2] + "-" + date2[1] + "-" + date2[0];
              return new Date(date1) - new Date(date2);
            } else if (column.code === "status") {
              let intValsArr = {
                  not_confirmed_simple: 1,
                  confirmed_simple: 2,
                  purchased: 3
                },
                columnA = a["buy"]
                  ? 3
                  : intValsArr[this.getStatus(a[column.code])],
                columnB = b["buy"]
                  ? 3
                  : intValsArr[this.getStatus(b[column.code])];
              return columnA - columnB;
            } else {
              if (a[column.code] >= b[column.code]) {
                return -1;
              }
            }
          });
          if (this.currentSort === column.code) {
            children.reverse();
          }
          this.rows.splice(item.start + 1, children.length, ...children);
        });
        this.currentSort = column.code;
      }
    },
    getFirstLetter(role) {
      return role.split("_")[1][0];
    }
  },
  computed: {
    ...mapState({
      rows: state => state.furniture.furniture.groups || [],
      furniture: state => state.furniture.furniture,
      construction: state => state.furniture.construction,
      constructions: state => state.furniture.constructions,
      user: state => state.user.user,
      roles: state => state.user.roles,
      modules: state => state.user.modules,
      enabledGroups: state => state.furniture.enabledGroups,
      units(state) {
        let unitsList = [];
        state.furniture.units.forEach(item => {
          unitsList.push({
            label: item.abName,
            name: item.name,
            id: item.id
          });
        });
        return unitsList;
      },
      lang: state => state.lang,
      titles(state) {
        if (this.ndsColumns) {
          return [
            {
              name: state.furniture.construction.name,
              sortable: true,
              code: "name"
            },
            {
              name: this.$i18n.messages[state.lang]["count_sh"],
              sortable: true,
              code: "count"
            },
            {
              name: this.$i18n.messages[state.lang]["unit_sh"],
              sortable: false,
              code: "units"
            },
            {
              name: this.$i18n.messages[state.lang]["deadlines"],
              sortable: true,
              code: "term"
            },
            {
              name: this.$i18n.messages[state.lang]["status"],
              sortable: true,
              code: "status"
            },
            {
              name: this.$i18n.messages[state.lang]["vatRate"],
              sortable: true,
              code: "nds"
            },
            {
              name: this.$i18n.messages[state.lang]["priceWithoutNds"],
              sortable: true,
              code: "priceWithoutNds"
            },
            {
              name: this.$i18n.messages[state.lang]["price"],
              sortable: true,
              code: "price"
            },
            {
              name: this.$i18n.messages[state.lang]["nds"],
              sortable: true,
              code: "ndsValue"
            },
            {
              name: this.$i18n.messages[state.lang]["sum_price"],
              sortable: true,
              code: "totalPrice"
            },
            {
              name: this.$i18n.messages[state.lang]["magazine"],
              sortable: true,
              code: "magazine"
            },
            {
              name: this.$i18n.messages[state.lang]["link"],
              sortable: false,
              code: "link"
            }
          ];
        } else {
          return [
            {
              name: state.furniture.construction.name,
              sortable: true,
              code: "name"
            },
            {
              name: this.$i18n.messages[state.lang]["count_sh"],
              sortable: true,
              code: "count"
            },
            {
              name: this.$i18n.messages[state.lang]["unit_sh"],
              sortable: false,
              code: "units"
            },
            {
              name: this.$i18n.messages[state.lang]["deadlines"],
              sortable: true,
              code: "term"
            },
            {
              name: this.$i18n.messages[state.lang]["status"],
              sortable: false,
              code: "status"
            },
            {
              name: this.$i18n.messages[state.lang]["priceWithoutNds"],
              sortable: true,
              code: "priceWithoutNds"
            },
            {
              name: this.$i18n.messages[state.lang]["sum_price"],
              sortable: true,
              code: "totalPrice"
            },
            {
              name: this.$i18n.messages[state.lang]["magazine"],
              sortable: true,
              code: "magazine"
            },
            {
              name: this.$i18n.messages[state.lang]["link"],
              sortable: false,
              code: "link"
            }
          ];
        }
      }
    })
  },
  watch: {
    furniture() {
      this.currentSort = "";
      // this.enabledGroups = [];
      this.$store.dispatch("furniture/editEnabledGroups", {
        id: null,
        value: []
      });
    },
    price(val) {
      this.nomenclature.price = val;
      this.updatePrices();
    }
  },
  mounted() {
    if (this.modules.indexOf(this.$route.name) < 0) {
      this.$router.push("/settings");
      return;
    }
  }
};
</script>

<style scoped lang="scss">
$ffamily: "Roboto", sans-serif;
.hidden {
  display: none;
}
.table {
  font-family: $ffamily;
  border-collapse: collapse;
  border: 1px solid #c4c4c4;
  img {
    max-width: 100%;
    max-height: 100%;
  }
  tr {
    border-top: 1px solid #dadada;
    background: #fff;
    font-family: $ffamily;
    color: #868686;
    font-size: 14px;
    transition: 0.3s;
    &.odd {
      background: #f5f5f6;
    }
    td:nth-child(1) {
      border: none;
      display: flex;
      align-items: center;
      font-weight: 500;
    }
    &.parent {
      border-top: 1px solid #c4c4c4;
    }
    &:hover {
      background: rgba(214, 232, 206, 0.69);
    }
    td:nth-child(2) {
      border-left: 1px solid #dadada;
    }
  }
  td,
  th {
    border-right: 1px solid #dadada;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 1px 9px;
    border-top: none;
    /*width: 100%;*/
    word-break: break-word;
  }
  tbody {
    tr {
      td:last-child {
        font-weight: 500;
      }
      td span.ellipsis {
        display: block;
        max-width: 85px;
        white-space: nowrap;
        overflow: hidden;
        margin: 0 auto;
        text-overflow: ellipsis;
      }
    }
  }
  thead {
    td {
      text-align: left;
    }
    td .ellipsis {
      max-width: 70px;
      white-space: nowrap;
      overflow: hidden !important;
      text-overflow: ellipsis;
      display: block;
      margin: 0 auto;
    }
    td:first-child {
      width: 100%;
    }
  }
  .icon {
    margin-right: 14px;
    width: 30px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .no-img {
    background: #c4c4c4;
  }
  .setting-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 13px;
    cursor: pointer;
    &:hover {
      path {
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
    background: linear-gradient(
      98.69deg,
      #688e74 11.52%,
      #8ac29c 90.26%
    ) !important;
    border-radius: 14px;
    transition: 0.3s;
    &:hover {
      opacity: 0.8;
    }
  }
  .btn-close {
    border-radius: 14px;
  }
  .modal-body {
    padding: 0;
  }
  .body-left {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 1rem;
  }
  .body-right {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 1rem;
    background: linear-gradient(
      90deg,
      #e1e1e1 0%,
      rgba(236, 232, 232, 0) 20.31%
    );
  }
  input {
    border: none;
    background: none;
    border-bottom: 1px solid #000;
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
    font-family: $ffamily;
    &::placeholder {
      color: #c4c4c4;
    }
  }
}
.modal-mask {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
}

.is-danger {
  border-bottom: 1px solid #f04124 !important;
}

@media all and(min-width: 768px) {
  .nomenclature-modal {
    max-width: 850px;
  }
}
@media all and(max-width: 960px) {
  .modal-mask {
    align-items: flex-start;
  }
}
@media all and(max-width: 768px) {
  td {
    word-break: break-word;
    span.ellipsis {
      max-width: 100px;
    }
  }
}
@media all and(max-width: 480px) {
  .nomenclature-column {
    flex-direction: column;
  }
}
.disabled {
  pointer-events: none !important;
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
  cursor: not-allowed !important;
  opacity: 0.6 !important;
}
.images-list-wrap {
  display: flex;
  flex-flow: wrap row;
  margin: 5px;
  .delete-icon {
    width: 20px;
    height: 25px;
    cursor: pointer;
    position: absolute;
    top: auto;
    left: 8px;
    bottom: 8px;
  }
}
.nomenclature-image {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: 1px solid #ebebeb;
}

label.title {
  display: block;
  text-align: left;
  color: #000;
  font-weight: bold;
  margin-bottom: 0;
  font-size: 12px;
}
.bold {
  font-weight: bold !important;
}

.custom-control-input:checked ~ .custom-control-label::before {
  background: #688e74;
  border-color: #688e74;
}
</style>

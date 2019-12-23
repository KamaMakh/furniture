<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <td v-for="(item, key) in [this.construction.name, $t('count_sh'), $t('unit_sh'), $t('deadlines'), $t('status'), $t('vatRate'), $t('priceWithoutNds'), $t('price'), $t('nds'), $t('sum_price'), $t('magazine'), $t('link')]" :key="key" :width="tdWidths[key]+'%'" :title="item">
            <span v-if="key === 0" @click="showModal" :title="$t('add_group')" class="icon" style="cursor: pointer">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM16 16H2V2.00001H16V16ZM10 14H8V10H4V8.00001H8V4.00001H10V8.00001H14V10H10V14Z" fill="#C4C4C4"/>
              </svg>
            </span>
            <span class="ellipsis">
              {{ item }}
            </span>
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
          <td v-if="item.price === undefined" colspan="12" class="d-table-cell border-right" @click="toggleGroupRows(item, $event)" :child="enabledGroups[item.id]">
            <span class="d-flex align-items-center justify-content-start">
              <span v-if="!item.price" @click="showModal(item)" :title="$t('edit_group')" class="setting-icon">
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.877 9.99998C15.877 10.3116 15.8495 10.605 15.8129 10.8983L17.747 12.4108C17.9212 12.5483 17.967 12.7958 17.857 12.9975L16.0237 16.1691C15.9412 16.3158 15.7854 16.3983 15.6295 16.3983C15.5745 16.3983 15.5195 16.3891 15.4645 16.3708L13.182 15.4541C12.7054 15.8116 12.192 16.1233 11.6329 16.3525L11.2845 18.7816C11.257 19.0016 11.0645 19.1666 10.8354 19.1666H7.16872C6.93955 19.1666 6.74705 19.0016 6.71955 18.7816L6.37122 16.3525C5.81205 16.1233 5.29872 15.8208 4.82205 15.4541L2.53955 16.3708C2.49372 16.3891 2.43872 16.3983 2.38372 16.3983C2.21872 16.3983 2.06288 16.3158 1.98038 16.1691L0.14705 12.9975C0.0370501 12.7958 0.0828834 12.5483 0.25705 12.4108L2.19122 10.8983C2.15455 10.605 2.12705 10.3025 2.12705 9.99998C2.12705 9.69748 2.15455 9.39498 2.19122 9.10165L0.25705 7.58915C0.0828834 7.45165 0.0278834 7.20415 0.14705 7.00248L1.98038 3.83081C2.06288 3.68415 2.21872 3.60165 2.37455 3.60165C2.42955 3.60165 2.48455 3.61081 2.53955 3.62915L4.82205 4.54581C5.29872 4.18831 5.81205 3.87665 6.37122 3.64748L6.71955 1.21831C6.74705 0.998313 6.93955 0.833313 7.16872 0.833313H10.8354C11.0645 0.833313 11.257 0.998313 11.2845 1.21831L11.6329 3.64748C12.192 3.87665 12.7054 4.17915 13.182 4.54581L15.4645 3.62915C15.5104 3.61081 15.5654 3.60165 15.6204 3.60165C15.7854 3.60165 15.9412 3.68415 16.0237 3.83081L17.857 7.00248C17.967 7.20415 17.9212 7.45165 17.747 7.58915L15.8129 9.10165C15.8495 9.39498 15.877 9.68831 15.877 9.99998ZM14.0437 9.99998C14.0437 9.80748 14.0346 9.61498 13.9979 9.33081L13.8696 8.29498L14.6854 7.65331L15.6662 6.87415L15.0246 5.76498L13.8604 6.23248L12.8887 6.62665L12.0546 5.98498C11.6879 5.70998 11.3212 5.49915 10.9271 5.33415L9.95538 4.93998L9.80872 3.90415L9.63455 2.66665H8.36038L8.17705 3.90415L8.03038 4.93998L7.05872 5.33415C6.68288 5.48998 6.30705 5.70998 5.91288 6.00331L5.08788 6.62665L4.13455 6.24165L2.97038 5.77415L2.32872 6.88331L3.31872 7.65331L4.13455 8.29498L4.00622 9.33081C3.97872 9.60581 3.96038 9.81665 3.96038 9.99998C3.96038 10.1833 3.97872 10.3941 4.00622 10.6783L4.13455 11.7141L3.31872 12.3558L2.32872 13.1258L2.97038 14.235L4.13455 13.7675L5.10622 13.3733L5.94038 14.015C6.30705 14.29 6.67372 14.5008 7.06788 14.6658L8.03955 15.06L8.18622 16.0958L8.36038 17.3333H9.64372L9.82705 16.0958L9.97372 15.06L10.9454 14.6658C11.3212 14.51 11.6971 14.29 12.0912 13.9966L12.9162 13.3733L13.8696 13.7583L15.0337 14.2258L15.6754 13.1166L14.6854 12.3466L13.8696 11.705L13.9979 10.6691C14.0254 10.3941 14.0437 10.1925 14.0437 9.99998ZM9.00204 6.33331C6.97621 6.33331 5.33537 7.97415 5.33537 9.99998C5.33537 12.0258 6.97621 13.6666 9.00204 13.6666C11.0279 13.6666 12.6687 12.0258 12.6687 9.99998C12.6687 7.97415 11.0279 6.33331 9.00204 6.33331ZM7.16872 9.99998C7.16872 11.0083 7.99372 11.8333 9.00205 11.8333C10.0104 11.8333 10.8354 11.0083 10.8354 9.99998C10.8354 8.99165 10.0104 8.16665 9.00205 8.16665C7.99372 8.16665 7.16872 8.99165 7.16872 9.99998Z" fill="#DADADA"/>
                </svg>
              </span>
              <span class="icon" style="cursor: pointer" :title="$t('add_nomenclature')" @click="showNomenclature(item)">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM16 16H2V2.00001H16V16ZM10 14H8V10H4V8.00001H8V4.00001H10V8.00001H14V10H10V14Z" fill="#C4C4C4"/>
                </svg>
              </span>
              {{ item.name }}
            </span>
          </td>
          <td v-else @click="showEditNomenclature(item, $event)">
            <span v-if="item.photos && item.photos[0]" class="icon">
              <img :src="serverUrl + item.photos[0]['pathUrl']" alt="" />
            </span>
            <span v-else class="icon no-img"></span>
            <span class="ellipsis" :title="item.name">
              {{ item.name }}
            </span>
            <span v-if="item.creatorId === user.id" :title="$t('delete')" style="width: 20px; height: 25px; cursor: pointer; margin-left: 5px;" @click="showDeleteNomenModal(item)">
              <svg version="1.1" id="IconsRepoEditor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60.167 60.167" style="enable-background:new 0 0 60.167 60.167;" xml:space="preserve" width="18px" height="18px" fill="#999" stroke="#999" stroke-width="2px">
                <g id="IconsRepo_bgCarrier"></g>
                <path d="M54.5,11.667H39.88V3.91c0-2.156-1.754-3.91-3.91-3.91H24.196c-2.156,0-3.91,1.754-3.91,3.91v7.756H5.667 c-0.552,0-1,0.448-1,1s0.448,1,1,1h2.042v40.5c0,3.309,2.691,6,6,6h32.75c3.309,0,6-2.691,6-6v-40.5H54.5c0.552,0,1-0.448,1-1 S55.052,11.667,54.5,11.667z M22.286,3.91c0-1.053,0.857-1.91,1.91-1.91H35.97c1.053,0,1.91,0.857,1.91,1.91v7.756H22.286V3.91z M50.458,54.167c0,2.206-1.794,4-4,4h-32.75c-2.206,0-4-1.794-4-4v-40.5h40.75V54.167z M38.255,46.153V22.847c0-0.552,0.448-1,1-1 s1,0.448,1,1v23.306c0,0.552-0.448,1-1,1S38.255,46.706,38.255,46.153z M29.083,46.153V22.847c0-0.552,0.448-1,1-1s1,0.448,1,1 v23.306c0,0.552-0.448,1-1,1S29.083,46.706,29.083,46.153z M19.911,46.153V22.847c0-0.552,0.448-1,1-1s1,0.448,1,1v23.306 c0,0.552-0.448,1-1,1S19.911,46.706,19.911,46.153z"></path>
              </svg>
            </span>
          </td>
          <td v-if="item.price !== undefined" width="8%">{{ item.count }}</td>
          <!--<td v-if="item.price !== undefined">-->
            <!--<span v-if="item.creatorId === user.id" :title="$t('add_image')" class="mr-1" @click="addPhotoModal(item)">-->
              <!--<svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">-->
                <!--<path d="M9.66634 5.50002V16.0417C9.66634 18.0675 8.02551 19.7084 5.99967 19.7084C3.97384 19.7084 2.33301 18.0675 2.33301 16.0417V4.58335C2.33301 3.31835 3.35967 2.29169 4.62467 2.29169C5.88968 2.29169 6.91634 3.31835 6.91634 4.58335V14.2084C6.91634 14.7125 6.50384 15.125 5.99967 15.125C5.49551 15.125 5.08301 14.7125 5.08301 14.2084V5.50002H3.70801V14.2084C3.70801 15.4734 4.73467 16.5 5.99967 16.5C7.26468 16.5 8.29134 15.4734 8.29134 14.2084V4.58335C8.29134 2.55752 6.65051 0.916687 4.62467 0.916687C2.59884 0.916687 0.958008 2.55752 0.958008 4.58335V16.0417C0.958008 18.8284 3.21301 21.0834 5.99967 21.0834C8.78634 21.0834 11.0413 18.8284 11.0413 16.0417V5.50002H9.66634Z" fill="#C4C4C4"/>-->
              <!--</svg>-->
            <!--</span>-->
            <!--<span v-if="item.creatorId === user.id" @click="showEditNomenclature(item, $event)" style="width: 20px; height: 25px; cursor: pointer; margin-right: 5px;">-->
              <!--<svg version="1.1" id="IconsRepoEditor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 612 612" style="enable-background:new 0 0 612 612;" xml:space="preserve" width="18px" height="18px" fill="#999" stroke="#999" stroke-width="0">-->
                <!--<g id="IconsRepo_bgCarrier"></g>-->
                <!--<path d="M239.486,368.979c3.389,3.388,7.828,5.081,12.267,5.081c4.442,0,8.88-1.695,12.27-5.081L447.32,185.683 c6.775-6.777,6.775-17.762,0-24.536c-6.774-6.775-17.762-6.775-24.538,0L239.486,344.441 C232.711,351.218,232.711,362.202,239.486,368.979z"></path>-->
                <!--<path d="M604.149,110.573c-6.702-20.057-21.54-41.957-42.922-63.333C539.68,25.69,506.868,0,472.925,0 c-15.226,0-29.255,5.354-40.679,15.501c-0.596,0.457-1.164,0.956-1.7,1.492l-65.823,65.821H20.838 c-9.582,0-17.35,7.769-17.35,17.35V594.65c0,9.582,7.769,17.35,17.35,17.35h494.485c9.582,0,17.35-7.769,17.35-17.35V240.19 c0-1.081-0.113-2.134-0.302-3.161l57.622-57.623c0.116-0.114,0.231-0.227,0.344-0.343c0.003-0.001,0.006-0.004,0.009-0.007 l1.129-1.131c0.534-0.534,1.022-1.09,1.47-1.673C608.724,158.554,612.602,135.88,604.149,110.573z M236.139,469.784 l-122.416,35.331l27.797-129.951L236.139,469.784z M267.877,452.447L156.023,340.592l260.97-260.974l111.856,111.856 L267.877,452.447z M425.445,512.469H213.384l56.919-16.428c2.818-0.814,5.383-2.328,7.458-4.401l220.211-220.211v305.871H38.188 V117.515h291.836L118.818,328.723c-2.367,2.367-3.999,5.367-4.699,8.64L73.73,526.188c-1.277,5.964,0.675,12.161,5.137,16.321 c3.256,3.033,7.498,4.659,11.833,4.659c0.927,0,334.745,0,334.745,0 M566.49,153.768c-0.189,0.202-0.373,0.409-0.551,0.619 l-0.124,0.123c-0.059,0.059-0.121,0.119-0.181,0.178l-12.248,12.246L441.531,55.08l12.53-12.53 c0.217-0.184,0.432-0.373,0.641-0.571c5.315-4.965,11.107-7.278,18.224-7.278c16.963,0,40.208,13.513,63.767,37.078 C549.597,84.681,589.886,128.729,566.49,153.768z"></path>-->
              <!--</svg>-->
            <!--</span>-->
          <!--</td>-->
          <td v-if="item.price !== undefined" width="6%">{{ item.units ? item.units.name: "" }}</td>

          <td v-if="item.price !== undefined" width="10%">{{ item.term }}</td>
          <td v-if="item.price !== undefined" width="6%" :style="{color: item.confirmed ? '#00670A' : '#999'}">
              <!--{{item.confirmed ? $t("confirmed_simple") : $t("not_confirmed_simple")}}-->
          </td>
          <td v-if="item.price !== undefined" width="6%">{{ item.nds }}</td>
          <td v-if="item.price !== undefined" width="6%">{{ item.priceWithoutNds }}</td>
          <td v-if="item.price !== undefined" width="6%">{{ item.price }}</td>
          <td v-if="item.price !== undefined" width="6%">{{ item.ndsValue }}</td>
          <td v-if="item.price !== undefined" width="6%">{{ item.totalPrice }}</td>
          <td v-if="item.price !== undefined" width="6%">{{ item.magazine }}</td>
          <td v-if="item.price !== undefined" width="18%">{{ item.link }}</td>
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
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" @click="showRemoveNomekModal = false">{{ $t("close") }}</button>
                  <button type="button" class="btn btn-custom" @click="deleteNomenclature">{{ $t("delete") }}</button>
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
                    <uploader v-model="files" limit="1" :title="$t('add_image')" :autoUpload="false" :multiple="true"></uploader>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" @click="showAddPhotoModal = false">{{ $t("close") }}</button>
                  <button type="button" class="btn btn-custom" @click="addPhoto">{{ $t("save") }}</button>
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
                        <div v-if="nomenclature.id && nomenclature.creatorId === user.id" class="form-group row" style="border-bottom: 1px solid #999;">
                          <uploader v-model="files" limit="1" :title="$t('add_image')" :autoUpload="false" :multiple="true"></uploader>
                        </div>
                        <div v-else-if="!nomenclature.id" class="form-group row">
                          <uploader v-model="nomenclature.file" limit="3" :title="$t('add_image')" :autoUpload="false" :multiple="true"></uploader>
                        </div>
                        <div class="form-group row">
                          <div v-if="nomenclature.id" style="flex: 1 1 100%;">
                            <gallery :images="photos" :index="index" @close="index = null"></gallery>
                            <div class="d-flex flex-wrap">
                              <div
                                class="images-list-wrap position-relative"
                                v-for="(image, imageIndex) in nomenclature.photos"
                                :key="imageIndex">
                                <div
                                  class="nomenclature-image"
                                  style="cursor: pointer;"
                                  @click="index = imageIndex"
                                  :style="{ backgroundImage: 'url(' + serverUrl + image.pathUrl + '&type=200px)', width: '100px', height: '100px' }"
                                ></div>
                                <span v-if="nomenclature.creatorId === user.id" class="delete-icon" @click="deletePhotoModal(image)">
                                <svg version="1.1" id="IconsRepoEditor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60.167 60.167" style="enable-background:new 0 0 60.167 60.167;" xml:space="preserve" width="18px" height="18px" fill="lightblue" stroke="lightblue" stroke-width="3px">
                                  <g id="IconsRepo_bgCarrier"></g>
                                  <path d="M54.5,11.667H39.88V3.91c0-2.156-1.754-3.91-3.91-3.91H24.196c-2.156,0-3.91,1.754-3.91,3.91v7.756H5.667 c-0.552,0-1,0.448-1,1s0.448,1,1,1h2.042v40.5c0,3.309,2.691,6,6,6h32.75c3.309,0,6-2.691,6-6v-40.5H54.5c0.552,0,1-0.448,1-1 S55.052,11.667,54.5,11.667z M22.286,3.91c0-1.053,0.857-1.91,1.91-1.91H35.97c1.053,0,1.91,0.857,1.91,1.91v7.756H22.286V3.91z M50.458,54.167c0,2.206-1.794,4-4,4h-32.75c-2.206,0-4-1.794-4-4v-40.5h40.75V54.167z M38.255,46.153V22.847c0-0.552,0.448-1,1-1 s1,0.448,1,1v23.306c0,0.552-0.448,1-1,1S38.255,46.706,38.255,46.153z M29.083,46.153V22.847c0-0.552,0.448-1,1-1s1,0.448,1,1 v23.306c0,0.552-0.448,1-1,1S29.083,46.706,29.083,46.153z M19.911,46.153V22.847c0-0.552,0.448-1,1-1s1,0.448,1,1v23.306 c0,0.552-0.448,1-1,1S19.911,46.706,19.911,46.153z"></path>
                                </svg>
                              </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="body-right col col-lg-6 col-md-12">
                        <div class="form-group row">
                          <div class="col col-8">
                            <label class="title" for="nName">{{ $t("construct_name") }}</label>
                            <input type="text" id="nName" class="form-control" :class="{ 'is-danger': $v.nomenclature.name.$invalid && (nomenclature.name || showFormErrors)}" v-model="nomenclature.name" :placeholder="$t('construct_name')">
                          </div>
                          <div class="col col-4">
                            <div class="custom-control custom-switch">
                              <input type="checkbox" class="custom-control-input" :checked="nomenclature.ndsBool" v-model="nomenclature.ndsBool" @change="updatePrices" id="customSwitch1" style="cursor: pointer">
                              <label class="custom-control-label" for="customSwitch1" style="cursor: pointer">{{ $t("nds") }}</label>
                            </div>
                          </div>
                        </div>
                        <div class="form-group row">
                          <div class="col col-lg-4 col-md-4 col-sm-12">
                            <label class="title" for="nPrice">{{ $t("price") }}</label>
                            <input type="number" id="nPrice" step="1000" class="form-control" :class="{ 'is-danger': $v.nomenclature.price.$invalid && (nomenclature.price || showFormErrors)}" :placeholder="$t('price')" v-model="price">
                          </div>
                          <div class="col col-lg-4 col-md-4 col-sm-12">
                            <label class="title" for="nShop">{{ $t("magazine") }}</label>
                            <input type="text" id="nShop" class="form-control" v-model="nomenclature.magazine" :placeholder="$t('magazine')">
                          </div>
                          <div class="col col-lg-4 col-md-4 col-sm-12 d-flex align-self-end flex-column">
                            <label class="title" for="nRole" style="margin-bottom: 3px;">{{ $t("unit_sh") }}</label>
                            <v-select
                              class="nomenclature-select w-100"
                              id="nRole"
                              :class="{ 'is-danger': $v.nomenclature.unit.$invalid && (nomenclature.unit || showFormErrors)}"
                              :placeholder="nomenclature.id ? nomenclature.units.name : $t('unit_sh')"
                              :options="units"
                              v-model="nomenclature.unit"
                            >
                            </v-select>
                            <!--<input type="text" class="form-control" :placeholder="$t('unit_sh')" v-model="nomenclature.unit">-->
                          </div>
                        </div>
                        <div class="form-group row">
                          <div class="col col-lg-4 col-md-4 col-sm-12">
                            <label class="title" for="nCount">{{ $t("count") }}</label>
                            <input type="number" id="nCount" step="1" class="form-control" :class="{ 'is-danger': $v.nomenclature.count.$invalid && (nomenclature.count || showFormErrors)}" :placeholder="$t('count')" v-model="nomenclature.count">
                          </div>
                          <div class="col col-lg-4 col-md-4 col-sm-12">
                            <label class="title" for="nTerm">{{ $t("term") }}</label>
                            <input type="text" id="nTerm" v-mask="'##.##.####'" class="form-control" :class="{ 'is-danger': $v.nomenclature.term.$invalid && (nomenclature.term || showFormErrors)}" :placeholder="$t('term')" v-model="nomenclature.term">
                          </div>
                          <div class="col col-lg-4 col-md-4 col-sm-12">
                            <label class="title" for="nLink">{{ $t("link") }}</label>
                            <input type="text" id="nLink" class="form-control" :placeholder="$t('link')" v-model="nomenclature.link">
                          </div>
                        </div>
                        <div class="form-group row">
                          <div class="col col-lg-4 col-md-4 col-sm-12" :class="{ disabled: !nomenclature.ndsBool }">
                            <label class="title" for="nNds">{{ $t("nds") }}</label>
                            <input type="number" id="nNds" step="1" class="form-control" :class="{ 'is-danger': $v.nomenclature.nds.$invalid && (nomenclature.nds || showFormErrors)}" :placeholder="$t('nds')" v-model="nomenclature.nds" @change="updatePrices">
                          </div>
                          <div class="col col-lg-4 col-md-4 col-sm-12" :class="{ disabled: !nomenclature.ndsBool }">
                            <label class="title" for="nNdsValue">{{ $t("ndsValue") }}</label>
                            <input type="number" id="nNdsValue" disabled step="any" class="form-control" :placeholder="$t('ndsValue')" v-model="nomenclature.ndsValue">
                          </div>
                          <div class="col col-lg-4 col-md-4 col-sm-12">
                            <label class="title" for="nPriceWithoutNds">{{ $t("priceWithoutNds") }}</label>
                            <input type="number" id="nPriceWithoutNds" disabled step="any" class="form-control" :placeholder="$t('priceWithoutNds')" v-model="nomenclature.priceWithoutNds">
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
                          <button v-if="nomenclature.creatorId === user.id || !nomenclature.id" type="button" class="btn btn-custom" @click="addNomenclature">{{ $t("save") }}</button>
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
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" @click="showRemovePhotoModal = false">{{ $t("close") }}</button>
                  <button type="button" class="btn btn-custom" @click="deletePhoto">{{ $t("delete") }}</button>
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
import VueGallery from 'vue-gallery';
Vue.use(VueMask);
Vue.use(Validations);
export default {
  name: "TableFurniture",
  components: {
    Uploader,
    'gallery': VueGallery
  },
  data(){
    return{
      hideAllRows: false,
      showAddModal: false,
      showRemoveNomekModal: false,
      showNomekModal: false,
      showRemovePhotoModal: false,
      showAddPhotoModal: false,
      group: {},
      nomenclature: {},
      showFormErrors: false,
      enabledGroups: [],
      serverUrl: serverUrl,
      tdWidths: [18, 6, 6, 10, 6, 6, 6, 6, 6, 6, 6, 18],
      updatingId: null,
      price: 0,
      photos: [],
      image: {},
      index: null,
      files: []
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
      if(this.$v.nomenclature.$pending || this.$v.nomenclature.$error || this.$v.nomenclature.$invalid || (!this.nomenclature.file && !this.nomenclature.id)){
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

      if(this.nomenclature.id) {
        formData.append( "nomenclatureId", this.nomenclature.id );
        formData.append( "unitId", this.nomenclature.units.id);
      } else {
        formData.append( "groupId", this.nomenclature.groupId );
        formData.append( "unitId", this.nomenclature.unit.id);
        for( let i = 0; i < this.nomenclature.file.length; i++ ){
          formData.append(`file`, this.nomenclature.file[i].blob);
        }
      }
      formData.append( "name", this.nomenclature.name );
      formData.append( "count", this.nomenclature.count );
      formData.append( "term", this.nomenclature.term );
      formData.append( "ndsBool", this.nomenclature.ndsBool );

      if(this.nomenclature.ndsBool) {
        formData.append( "price", this.nomenclature.price );
        formData.append( "nds", this.nomenclature.nds );
        formData.append( "ndsValue", this.nomenclature.ndsValue );
      } else {
        formData.append( "price", "0" );
        formData.append( "nds", "0" );
        formData.append( "ndsValue", "0" );
      }

      formData.append( "priceWithoutNds", this.nomenclature.priceWithoutNds );

      if(this.nomenclature.link) {
        formData.append( "link", this.nomenclature.link );
      }
      if(this.nomenclature.magazine) {
        formData.append( "magazine", this.nomenclature.magazine);
      }

      if(this.nomenclature.id) {
        this.$store.dispatch("furniture/updateNomenclature", {data: formData, group: this.nomenclature.group})
          .then((response) => {
            this.showNomekModal = false;
            if(this.files.length) {
              this.addPhoto();
            }
          })
          .catch((error) => {
            this.$notify({
              group: 'warn',
              type: 'error',
              title: this.$i18n.messages[this.$i18n.locale]["attention"],
              text: error
            });
          });
      } else {
        this.$store.dispatch("furniture/addNomenclature", {data: formData, group: this.nomenclature.group, onlyOne: this.enabledGroups[this.nomenclature.group.id]})
          .then((response) => {
            this.showNomekModal = false;
            if(!this.enabledGroups[this.nomenclature.group.id]) {
              this.enabledGroups[this.nomenclature.group.id] = true;
              this.$store.dispatch("furniture/setNomenclature", this.nomenclature.group)
            }
          })
          .catch((error) => {
            this.$notify({
              group: 'warn',
              type: 'error',
              title: this.$i18n.messages[this.$i18n.locale]["attention"],
              text: error
            });
          });
      }
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
        priceWithoutNds: 0,
        ndsBool: false
      };
      this.price = 0;
    },
    showEditNomenclature(item, event) {
      this.$store.dispatch("furniture/setUnits");
      this.showNomekModal = true;
      this.nomenclature = item;
      this.nomenclature.unit = item.units.name;
      this.photos = [];
      this.price = item.price;
      if(item.photos) {
        item.photos.forEach(item => {
          this.photos.push(this.serverUrl+item.pathUrl+"&type=1000px");
        })
      }
      if(!item.ndsBool) {
        this. price = this.nomenclature.price = this.nomenclature.priceWithoutNds;
      }
    },
    showDeleteNomenModal(item) {
      this.showRemoveNomekModal = true;
      this.nomenclature = item;
    },
    deleteNomenclature() {
      this.$store.dispatch("furniture/deleteNomenclature", this.nomenclature)
        .then(() => {
          this.showRemoveNomekModal = false;
        })
        .catch((error) => {
          this.$notify({
            group: 'warn',
            type: 'error',
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: error
          });
        });
    },
    deletePhotoModal(image) {
      this.image = image;
      this.showRemovePhotoModal = true;
    },
    deletePhoto() {
      this.$store.dispatch("furniture/deleteNomenclaturePhoto", {photoId: this.image.id, nomenclature: this.nomenclature})
        .then(() => {
          this.showRemovePhotoModal = false;
        })
        .catch((error) => {
          this.$notify({
            group: 'warn',
            type: 'error',
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: error
          });
        });
    },
    addPhoto() {
      let formData = new FormData();
      formData.append( "nomenclatureId", this.nomenclature.id );

      for( let i = 0; i < this.files.length; i++ ){
        formData.append(`file`, this.files[i].blob);
      }
      this.$store.dispatch("furniture/addNomenclaturePhoto", {data: formData, nomenclature: this.nomenclature})
        .then(() => {
          this.showAddPhotoModal = false;
          this.nomenclature = {};
          this.files = [];
        })
        .catch((error) => {
          this.$notify({
            group: 'warn',
            type: 'error',
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: error
          });
        });
    },
    toggleGroupRows(group, event) {
      if(event.target.tagName === "TD" || (event.target.tagName !== "svg" && event.target.tagName !== "path" && !event.target.classList.contains("icon"))) {
        if(!this.enabledGroups[group.id]) {
          this.enabledGroups[group.id] = true;
          this.$store.dispatch("furniture/setNomenclature", group)
            .then(() => {
              //ignore
            })
            .catch(error => {
              this.$notify({
                group: 'warn',
                type: 'error',
                title: this.$i18n.messages[this.$i18n.locale]["attention"],
                text: error
              });
            })
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
            text: error
          });
          this.updatingId = null;
        });
    },
    updatePrices() {
      if(this.nomenclature.price) {
        if(this.nomenclature.ndsBool) {
          this.nomenclature["priceWithoutNds"] = Math.round(this.nomenclature.price / parseFloat('1.' + this.nomenclature.nds));
          this.nomenclature["ndsValue"] = Math.round(this.nomenclature.price - this.nomenclature["priceWithoutNds"]);
        } else {
          this.nomenclature["priceWithoutNds"] = this.nomenclature.price;
          // this.nomenclature["ndsValue"] = this.nomenclature.price - this.nomenclature["priceWithoutNds"];
        }
      }
    }
  },
  computed: {
    ...mapState({
      rows: state => state.furniture.furniture.groups || [],
      furniture: state => state.furniture.furniture,
      construction: state => state.furniture.construction,
      user: state => state.user.user,
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
    max-height: 100%;
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
    td:nth-child(2) {
      border-left: 1px solid #DADADA;
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
      td:last-child {
        font-weight: 500;
      }
      td span.ellipsis {
        max-width: 85px;
        white-space: nowrap;
        overflow: hidden;
        margin: 0 auto;
        text-overflow: ellipsis;
      }
    }
  }
  thead {
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
@media all and(max-width: 768px) {
  td {
    word-break: break-word;
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
  cursor: none !important;
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

label.title{
  display: block;
  text-align: left;
  color: #000;
  font-weight: bold;
  margin-bottom: 0;
  font-size: 12px;
}
</style>

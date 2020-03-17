<template>
  <div class="contacts">
    <v-card class="mx-auto" max-width="500" raised>
      <v-card-title>
        {{ $t("contacts") }}
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item link href="tel:+7-903-903-39-29">
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-phone</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-left">
                <a href="tel:+7-903-903-39-29">+7-903-903-39-29</a>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link href="mailto:eradevelopmentnsk@gmail.com">
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-email</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-left">
                <a href="mailto:eradevelopmentnsk@gmail.com">
                  eradevelopmentnsk@gmail.com
                </a>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link href="tg://resolve?domain=stroyassistent">
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-telegram</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-left">
                <a href="tg://resolve?domain=stroyassistent">
                  @stroyassistent
                </a>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Contacts"
};
</script>

<style scoped></style>

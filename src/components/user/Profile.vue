<template>
  <v-container class="d-flex align-center justify-center">
    <v-card variant="outlined" class="card-profile">
      <v-card-title class="card-title">
        <h2>Profile</h2>
      </v-card-title>
      <v-divider class="mr-n8 ml-n8"></v-divider>
      <v-card-text class="mt-4">
        <v-row>
          <v-col md="3">
            <v-row
              class="d-flex align-center justify-center"
              style="height: 100%"
            >
              <v-img
                src="@/assets/default-profile.png"
                class="img-profile"
              >
            <div></div>
            </v-img>
              <!-- <v-avatar color="surface-variant" size="150"></v-avatar> -->
            </v-row>
          </v-col>
          <v-col md="9">
            <v-text-field variant="outlined" label="First Name"></v-text-field>
            <v-text-field variant="outlined" label="Last Name"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<style lang="scss" scoped>
  .card-profile {
    min-width: 900px;
    max-width: 1200px !important;
    padding: 32px;
    .card-title {
      margin-bottom: 16px;
    }
    .img-profile {
      border-radius: 50%;
      color: #fff;
      height: 150px;
      //   left: 0;
      position: absolute;
      text-align: center;
      //   top: 0;
      width: 150px;
      &:hover {
        cursor: pointer;
      }
    }
  }
</style>

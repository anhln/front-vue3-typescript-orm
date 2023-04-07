<template>
  <v-container style="height: 100%; width: 100%" class="container">
    <v-row
      class="d-flex align-center justify-center login-container"
      style="height: 100%; width: 100%"
    >
      <v-card class="card-container">
        <v-form>
          <div class="title">
            <h3>Log in to your account</h3>
          </div>
          <v-text-field
            class="user-name"
            placeholder="User Name"
            label="User Name"
            variant="outlined"
            prepend-inner-icon="mdi-account"
          ></v-text-field>
          <v-text-field
            label="Password"
            placeholder="Password"
            :type="visiblePassword ? 'input' : 'password'"
            variant="outlined"
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="visiblePassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:appendInner="changeViewPassword"
          ></v-text-field>
          <v-btn class="btn-login" block @click="login">Log In</v-btn>
          <v-card-actions></v-card-actions>
          <div class="panel-footer">
            <v-row>
              <span>Forgot Password</span>
              <v-spacer></v-spacer><span>Sign Up</span>
            </v-row>
          </div>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>
<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    data() {
      return {
        visiblePassword: false,
      };
    },
    methods: {
      changeViewPassword() {
        this.visiblePassword = !this.visiblePassword;
      },
      login() {
        this.$router.push("/profile");
      },
    },
  });
</script>
<style lang="scss" scoped>
  .container {
    padding: 0px;
    margin: 0px !important;
    max-width: 100%;
  }
  .login-container {
    margin: 0px;
    padding: 0px;
    height: 100%;
    background-color: #673ab7;
    .card-container {
      padding: 32px 32px 0px 32px;
      border-radius: 8px;
      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 24px;
        h3 {
          font-weight: 400;
          font-size: 24px;
        }
      }
      .btn-login {
        background-color: #60467e;
        color: white;
        height: 40px;
        text-transform: none;
        font-size: 18px;
        font-weight: 500;
      }
      .bottom {
        padding: 16px 12px;
        background-color: #673ab7;
      }
      .panel-footer {
        margin-left: -32px;
        margin-right: -32px;
        padding: 32px 48px 32px 48px;
        display: block;
        font-size: 17px;
        color: #4a5568;

        background-color: #f5f5f5;
        border-top: 1px solid #ddd;
        border-bottom-right-radius: 8px;
        border-bottom-left-radius: 8px;
        span {
          font-size: 17px;
          text-decoration: underline;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .user-name {
      min-width: 350px;
    }
  }
</style>

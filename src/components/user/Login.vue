<template>
  <v-container style="height: 100%; width: 100%" class="container">
    <v-row
      class="d-flex align-center justify-center login-container"
      style="height: 100%; width: 100%"
    >
      <v-card class="card-container">
        <form @submit.prevent="submit">
          <div class="title">
            <h3>Log in to your account</h3>
          </div>
          <v-text-field
            class="user-name"
            placeholder="User Name"
            label="User Name"
            variant="outlined"
            prepend-inner-icon="mdi-account"
            :error-messages="username.errorMessage.value"
            v-model="username.value.value"
          ></v-text-field>
          <v-text-field
            class="user-name"
            label="Password"
            placeholder="Password"
            hint="Enter your password to access this website"
            :type="visiblePassword ? 'input' : 'password'"
            variant="outlined"
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="visiblePassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:appendInner="changeViewPassword"
            :error-messages="password.errorMessage.value"
            v-model="password.value.value"
          ></v-text-field>
          <v-btn class="btn-login" block type="submit">Log In</v-btn>
          <div class="panel-footer">
            <v-row>
              <span>Forgot Password</span>
              <v-spacer></v-spacer><span>Sign Up</span>
            </v-row>
          </div>
        </form>
      </v-card>
    </v-row>
  </v-container>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useField, useForm } from "vee-validate";
  import { useUserStore } from "@/store/user";
  import * as _ from "lodash";

  export default defineComponent({
    name: "LoginForm",
    setup() {
      const userStore = useUserStore();
      const router = useRouter();
      const visiblePassword = ref(false);

      const { handleSubmit } = useForm({
        validationSchema: {
          username(value) {
            if (value?.length >= 2) return true;
            return "Name needs to be at least 2 characters.";
          },
          password(value) {
            if (value?.length >= 2) return true;
            return "Password needs to be at least 2 characters.";
          },
        },
      });
      const username = useField("username");
      const password = useField("password");

      const changeViewPassword = () => {
        visiblePassword.value = !visiblePassword.value;
      };

      function login() {
        router.push("/");
      }

      const submit = handleSubmit(async () => {
        try {
          await userStore.login(username.value, password.value);
          if (!_.isEmpty(userStore.user)) {
            console.log("OK");
            router.push("/profile");
          }
        } catch (error) {
          console.log(JSON.stringify(error));
        }
      });

      return {
        visiblePassword,
        username,
        password,
        changeViewPassword,
        login,
        submit,
      };
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
        min-height: 56px;
        text-transform: none;
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 24px;
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
      min-width: 375px;
      margin-bottom: 12px;
      &:deep .v-field__prepend-inner .v-icon {
        margin-right: 12px;
      }
      &:deep .v-field__append-inner .v-icon {
        margin-left: 12px;
      }
    }
  }
</style>

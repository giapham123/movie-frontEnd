<template>
  <div>
    <v-dialog v-model="dialog" persistent width="500px">
      <v-content>
        <v-layout align-center justify-center>
          <v-flex>
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="username"
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="close">Close</v-btn>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-content>
    </v-dialog>
  </div>
</template>
<script>
import auth from "./auth";
import { mapActions } from "vuex";

export default {
  props: {
    dialog: Boolean
  },
  data: () => ({
    username: "",
    password: ""
  }),
  computed: {},
  watch: {},
  methods: {
    ...mapActions("login", ["loginResult", "changeState"]),
    close() {
      this.$emit("close", false);
    },
    async login() {
      var param = {
        username: this.username,
        password: this.password
      };

      const a = await this.loginResult(param);
      this.changeState(true);
      this.close();
    }
  }
};
</script>
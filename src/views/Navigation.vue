<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters style="flex-wrap: nowrap;">
      <v-col cols="2">
        <img alt="Vue logo" src="../assets/icon.png" width="100px" />
      </v-col>
      <v-col cols="6" class="align-self-center">
        <v-tabs background-color="white" color="deep-purple accent-4" left>
          <v-tab
            :to="item.path"
            style="padding-left:10px"
            v-for="item in menus1"
            :key="item.path"
          >{{item.title}}</v-tab>
          <!-- <v-tab to="/AddMovie" style="padding-left:10px">Add Movies</v-tab> -->
        </v-tabs>
      </v-col>
      <v-col class="align-self-center" style="padding-right:100px">
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="search"
          background-color="white"
          @keydown="searchData"
        ></v-text-field>
      </v-col>
      <v-btn @click="showdialog">{{loginLabel}}</v-btn>
    </v-row>
    <Login :dialog="show" @close="close"></Login>
  </v-container>
</template>
<script>
import login from "./Login";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    Login: login
  },
  data: () => ({
    loginLabel: "Log In",
    show: false,
    search: ""
  }),
  computed: {
    ...mapState("login", ["ilogin"]),
    menus1() {
      var menus2 = [];
      if (this.ilogin == true) {
        if (localStorage.getItem("ACCESS_TOKEN") != null) {
          menus2 = [
            { title: "Romantic", path: "/" },
            { title: "Add Movies", path: "/AddMovie" }
          ];
          this.loginLabel = "Log Out";
        }
      } else {
        menus2 = [{ title: "Romantic", path: "/" }];
        this.loginLabel = "Log In";
      }
      return menus2;
    }
  },
  created() {
    this.accessLogin();
  },
  methods: {
    ...mapActions("login", ["changeState", "clearToken"]),
    async searchData() {
      const a = await this.$http.post("notes/searchMovie", {
        title: this.search
      });
      this.$bus.$emit("searchEvent", a.data);
    },
    async showdialog() {
      if (this.loginLabel == "Log Out") {
        this.changeState(false);
        await this.clearToken();
      } else {
        this.show = true;
      }
    },
    close() {
      this.show = false;
    },
    accessLogin() {
      if (localStorage.getItem("ACCESS_TOKEN") != null) {
        this.changeState(true);
      }
    }
  }
};
</script>

<template>
<v-container>
  <v-row>
    <v-card
      v-for="(item, i) in items"
      :key="i"
      style="margin-left:20px; margin-top:30px"
      width="350"
      height="130"
    >
      <v-img :src="item.thumbnails" width="350" height="130" class="fix" @click="getDetail(item)">
        <div class="fix2">
          <v-list-item-action-text>{{item.countUser}} views</v-list-item-action-text>
        </div>
      </v-img>
      <div class="fix1" @click="getDetail(item)">{{item.title}}</div>
    </v-card>
  </v-row>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    items: []
  }),
  created() {
    this.loaddata();
    this.$bus.$on("searchEvent", data => {
      this.items = data;
    });
  },
  methods: {
    async loaddata() {
      try {
        const a = await this.$http.get("movie/animeMovie");
        this.items = a.data;
        for (let i = 0; i < a.data.length; i++) {
          this.items[i].thumbnails =
            this.$urltest + this.items[i].thumbnails;
        }
        this.items = a.data;
      } catch (e) {
        throw e;
      }
    },
    getDetail(a) {
      // var b = { url: a.src, title: a.title, id:a._id };
      this.$router.push({path: `/Details/${a._id}` });
    }
  }
};
</script>
<style scoped>
.fix {
  /* padding: 50px;
  background-color: green;
  transition: transform 0.2s;
  width: 200px;
  height: 200px;
  margin: 0 auto; */
  cursor: pointer;
}

.fix:hover {
  -ms-transform: scale(1.1); /* IE 9 */
  -webkit-transform: scale(1.1); /* Safari 3-8 */
  transform: scale(1.1);
}
.fix1 {
  align: left;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.fix1:hover {
  transform: scale(1.1);
}
.fix2 {
  text-align: right;
  padding-right: 5px;
  padding-top: 100px;
  color: white;
  font-weight: bold;
}
</style>
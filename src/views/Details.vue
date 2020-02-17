<template>
  <div class="grey lighten-5">
    <v-row no-gutters class="mb-6">
      <v-col :cols="8">
        <v-card class="pa-2" tile outlined>
          <iframe
            width="100%"
            height="400"
            allowfullscreen="true"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            :src="url"
          ></iframe>
        </v-card>
      </v-col>
      <v-col :cols="4">
        <v-card class="pa-2" tile outlined>
          <v-card class max-width="100%">
            <v-list height="407" class="aaaa">
              <v-list-item-title
                style="padding-left:20px;font-size:20px; text-align:left"
              >Top Videos</v-list-item-title>
              <v-divider></v-divider>
              <v-list-item-content>
                <v-list-item-action-text
                  style="padding-left: 20px;text-align: left"
                >Total movies: {{items.length}} videos</v-list-item-action-text>
              </v-list-item-content>
              <v-divider></v-divider>
              <v-list-item-group v-model="model" mandatory color="indigo">
                <v-list-item v-for="(item, i) in items" :key="i" @click="watchMovie(item)">
                  <v-list-item-content>
                    <v-img
                      :src="item.thumbnails"
                      aspect-ratio="1"
                      class="grey lighten-2 itemsCard"
                      max-width="60%"
                      max-height="60"
                    ></v-img>
                  </v-list-item-content>

                  <v-list-item-content class="title">
                    <v-list-item-action @click="watchMovie(item)" class="overflowTest">
                      <div>{{item.title}}</div>
                    </v-list-item-action>
                    <div class="fix2">
                      <v-list-item-action-text>{{item.countUser}} views</v-list-item-action-text>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters style="padding-left:20px">{{title}}</v-row>
    <v-col cols="12" sm="10">
      <v-textarea
        label="Comments"
        auto-grow
        outlined
        rows="1"
        row-height="15"
        v-model="commentInput"
      ></v-textarea>
    </v-col>
    <div class="comment">
      <v-btn small @click="SaveComments">Comment</v-btn>
      <!-- <div v-for="item in commentsList" :key="item" style="padding-top:20px">
        <row>
        <img alt="Vue logo" src="../assets/Anonymous-mask_white-bg.jpg" width="50px" style="padding-right:10px"/></row>
        <row> {{ item }}</row>
      </div>-->
    </div>
    <div v-for="item in commentsList" :key="item._id" style="padding-top:20px">
     
      <v-list-item tw0-line cols="12">
        <img
          alt="Vue logo"
          src="../assets/Anonymous-mask_white-bg.jpg"
          width="120px"
          style="padding-right:10px"
        />
        <v-list-item-content>
          <v-list-item-title v-text="item.content" style="text-align:left;white-space: pre-line"></v-list-item-title>
          <v-list-item-subtitle :style="{'text-align':'left'}" >Author: Anonymous</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    param1: Object
  },
  data: () => ({
    title: "",
    url: "",
    items: [],
    model: 1,
    commentsList: [],
    commentInput: ""
  }),
  computed: {},
  watch:{
    
  },
  created() {
    this.loaddata();
    this.getComment();
  },
  methods: {
       ...mapActions("login", ["saveComments","getComments"]),
    async loaddata() {
      try {
        const resultFilm = await this.$http.get("notes");
        this.items = resultFilm.data;
        for (let i = 0; i < resultFilm.data.length; i++) {
          this.items[i].thumbnails = this.$urltest + this.items[i].thumbnails;
        }
        this.loadingVideo();
      } catch (e) {
        throw e;
      }
    },
    watchMovie(item) {
      this.$router.push({path: `/Details/${item._id}` });
      this.url = item.src;
      this.title = item.title;
    },
    loadingVideo() {
      var idOfVideo = this.$router.currentRoute.params.id;
      for (let item of this.items) {
        if (item._id == idOfVideo) {
          this.url = item.src;
          this.title = item.title;
        }
      }
    },
     async SaveComments() {
      var param = {
        content: this.commentInput,
        idmovie: this.$router.currentRoute.params.id
      }
      if(this.commentInput != ''){
      this.commentsList.push(this.commentInput);
      this.commentInput= '';   
      await this.saveComments(param)
      }
    },
    async getComment(){
       var param = {
        idmovie: this.$router.currentRoute.params.id
      }
      var result =  await this.getComments(param)
      this.commentsList = result.data;
      // for(let item of this.commentsList){
      //   var formatDate = new Date(item.createdAt).getHours();
      //   var currentTime = new Date().getHours();
      //   var getHour = currentTime - formatDate
      //   console.log(getHour);
      // }

    }
  }
};
</script>
<style scoped>
.comment {
  position: absolute;
  margin-top: -30px;
  margin-left: 20px;
}
.aaaa {
  overflow-y: scroll;
}
.title {
  padding-left: 5px;
  margin-left: -80px;
}
.itemsCard {
  cursor: pointer;
}
.itemsCard:hover {
  transform: scale(1.5);
}
.fix2 {
  text-align: left;
  padding-right: 5px;
}
.overflowTest {
  white-space: nowrap;
  width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  /* word-break: break-all; */
  /* border: 1px solid #000000; */
}
</style>
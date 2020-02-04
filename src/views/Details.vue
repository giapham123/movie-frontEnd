<template>
  <div class="grey lighten-5">
    <v-row no-gutters class="mb-6">
      <v-col :cols="8">
        <v-card class="pa-2" tile outlined>
          <iframe
            width="100%"
            height="700"
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
            <v-list height="707" class="aaaa">
            <v-list-item-title style="padding-left:20px;font-size:20px; text-align:left">Top Videos</v-list-item-title>
          <v-divider></v-divider>
         <v-list-item-content>
            <v-list-item-action-text style="padding-left: 20px;text-align: left">Total movies: {{items.length}} videos</v-list-item-action-text>
         </v-list-item-content>
          <v-divider></v-divider>
              <v-list-item-group v-model="model" mandatory color="indigo">
                <v-list-item v-for="(item, i) in items" :key="i" @click="watchMovie(item)" >
                  <v-list-item-content>
                    <v-img
                      :src="item.thumbnails"
                      aspect-ratio="1"
                      class="grey lighten-2 itemsCard"
                      max-width="90%"
                      max-height="80"
                     
                    ></v-img>
                  </v-list-item-content>

                  <v-list-item-content class="title">
                    <v-list-item-action  @click="watchMovie(item)"><div>{{item.title}}</div></v-list-item-action>
                   <div class="fix2"> <v-list-item-action-text  >{{item.countUser}} views</v-list-item-action-text></div>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-card class="pa-2 text-xl-left" tile style="align:left">
          <v-card-title>
            {{title}}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    param1: Object
  },
  data: () => ({
    title: "",
    url: "",
    items: [],
    model: 1
  }),

  created() {
    this.loaddata();
    this.url = this.param1.url;
    this.title = this.param1.title
   
  },
  methods: {
    async loaddata() {
      try {
        const a = await this.$http.get("notes");
        this.items = a.data;
         for(let i = 0; i <a.data.length; i++){
         this.items[i].thumbnails = 'http://localhost:3000/'+ this.items[i].thumbnails;
        }
      } catch (e) {
        throw e;
      }
    },
    watchMovie(a) {
      this.url = a.src;
      this.title = a.title;
    }
  }
};
</script>
<style scoped>
.aaaa {
  overflow-y: scroll;
}
.title{
  padding-left: 5px
}
.itemsCard{
  cursor: pointer;
}
.itemsCard:hover{
   transform: scale(1.5);
}
.fix2{
  text-align: left;
    padding-right: 5px;
}
</style>
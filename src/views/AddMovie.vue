<template>
  <v-container>
    <form>
      <v-col cols="12" sm="5">
        <v-select
          v-model="itemsCategory.selected"
          :items="itemsCategory.items"
          label="Category"
          item-value="value"
          item-text="name"
        ></v-select>
      </v-col>
      <v-row>
        <v-col cols="12" sm="10" style="padding-left:30px">
          <div v-for="(item, index) in items" :key="index">
            <v-row>
              <v-text-field label="Title" v-model="listDataFilm[index].title"></v-text-field>
              <v-text-field
                label="Source"
                v-model="listDataFilm[index].src"
                style="padding-left:5px"
              ></v-text-field>
            </v-row>
          </div>
        </v-col>
        <v-btn class="mr-4" @click="addField">+</v-btn>
      </v-row>
      <v-col cols="12" sm="3">
        <input type="file" ref="file" @change="onselect" />
      </v-col>
      <v-btn class="mr-4" @click="saveData">submit</v-btn>
      <v-btn @click="importSeriesMovie">Series Movie</v-btn>
      <div style="padding-top:20px">
        <v-data-table v-model="selectedIntable" :headers="headers" single-select show-select :items="listData" :items-per-page="10" class="elevation-1" item-key="stt"></v-data-table>
      </div>
    </form>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    selectedIntable:[],
    items: 1,
    listDataFilm: [{ title: "", src: "" }],
    itemsCategory: {
      selected: 1,
      items: [
        { name: "Romantics", value: 1 },
        { name: "Action", value: 2 },
        { name: "Anime", value: 3 },
        { name: "Series Movies", value: 4 }
      ]
    },
    srcThumbnail: [],
    file: "",
    headers: [
      { text: "STT", value: "stt" },
      {
        text: "Title",
        align: "left",
        sortable: false,
        value: "title"
      },
      { text: "Source", value: "src" },
      { text: "Thumnails", value: "thumbnails" },
      { text: "Category", value: "category" }
    ],
    listData: []
  }),
  watch:{
    listData(){
      for(let i=0; i<this.listData.length; i++){
        this.listData[i].stt = i + 1        
      }
    }
  },
  created() {
    this.loaddata();
  },
  methods: {
      ...mapActions("login", ["saveSeriesMovie"]),
    async importSeriesMovie(){
      var param = {
        idmovie: this.selectedIntable[0]._id,
        thumnail:this.selectedIntable[0].thumbnails,
        arraylist:JSON.stringify(this.listDataFilm)
      }
      await this.saveSeriesMovie(param)
    },
    async loaddata() {
      try {
        const a = await this.$http.get("notes");
        this.listData = a.data;
        this.listData.forEach(element => {
          if(element.category == 1){
            element.category = 'Romantics'
          }
          if(element.category == 2){
            element.category = 'Action'
          }
          if(element.category == 3){
            element.category = 'Anime'
          }
          if(element.category == 4){
            element.category = 'Series Movies'
          }
        });
      } catch (e) {
        throw e;
      }
    },
    addField() {
      this.items = this.items + 1;
      for (let i = 1; i < this.items; i++) {
        this.listDataFilm.push({ title: "", src: "" });
      }
    },
    onselect() {
      const file = this.$refs.file.files[0];
      this.file = file;
    },
    async saveData() {

      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("arrayList", JSON.stringify(this.listDataFilm));
      formData.append("category", this.itemsCategory.selected);      
      var result = await this.$http.post("/notes", formData);
      if (result.data.length != 0) {
        this.listDataFilm = [{ title: "", src: "" }];
        this.file = "";
      }
    }
  }
};
</script>
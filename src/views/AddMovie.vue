<template>
  <v-container>
    <form>
      <v-text-field :counter="10" label="Title" v-model="title" required></v-text-field>
      <v-text-field label="Source Movie" v-model="srcMovie" required></v-text-field>
      <v-col cols="12" sm="3">
        <v-select
          v-model="itemsCategory.selected"
          :items="itemsCategory.items"
          label="Category"
          item-value="value"
          item-text="name"
        ></v-select>
        <input type="file" ref="file" @change="onselect" />
      </v-col>
      <v-btn class="mr-4" @click="saveData">submit</v-btn>
      <v-btn>clear</v-btn>
      <v-data-table :headers="headers" :items="desserts" :items-per-page="5" class="elevation-1"></v-data-table>
    </form>
    <div v-for="(item, index) in items" :key="index">
      <v-text-field :counter="10" label="Title" v-model="textfield[index].a"></v-text-field>
      <v-text-field :counter="10" label="Source" v-model="textfield[index].src" required></v-text-field>
    </div>
    <v-btn class="mr-4" @click="addField">+</v-btn>
    <v-btn class="mr-4" @click="saveAll">Svae</v-btn>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    items: 1,
    textfield: [{ a: "", src:'' }],
    itemsCategory: {
      selected: null,
      items: [
        { name: "Romantics", value: 1 },
        { name: "Action", value: 2 },
        { name: "Anime", value: 3 }
      ]
    },
    srcThumbnail: [],
    title: "",
    srcMovie: "",
    file: "",
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Calories", value: "calories" },
      { text: "Fat (g)", value: "fat" },
      { text: "Carbs (g)", value: "carbs" },
      { text: "Protein (g)", value: "protein" },
      { text: "Iron (%)", value: "iron" }
    ],
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: "1%"
      }
    ]
  }),
  methods: {
    saveAll() {
      this.textfield.forEach(element => {
        console.log(element);
      });
   
    },
    addField() {
      this.items = this.items + 1;
      for (let i = 1; i < this.items; i++) {
        this.textfield.push({ a: "", src:''  });
        // this.sourceList.push({src:'', src:'' })
      }
    },
    onselect() {
      const file = this.$refs.file.files[0];
      this.file = file;
    },
    async saveData() {
      const formData = new FormData();
      
      // this.textfield.forEach(element => {
      //  formData.append("arrayList[]", element);
      // });
       formData.append("arrayList[]", element);
      formData.append("file", this.file);
      formData.append("title", this.title);
      formData.append("src", this.srcMovie);
      formData.append("category", this.itemsCategory.selected);
      var result = await this.$http.post("/notes", formData);
      if (result.data.length != 0) {
        this.file = "";
        this.title = "";
        this.srcMovie = "";
      }
    }
  }
};
</script>
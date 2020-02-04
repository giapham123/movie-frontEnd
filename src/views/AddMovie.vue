<template>
  <v-container>
    <form>
      <v-text-field :counter="10" label="Title" v-model="title" required></v-text-field>
      <v-text-field label="Source Movie" v-model="srcMovie" required></v-text-field>
      <input
      type="file"
      ref="file"
      @change="onselect"
      />
      <v-btn class="mr-4" @click="saveData">submit</v-btn>
      <v-btn>clear</v-btn>
    </form>
  </v-container>
</template>
<script>
export default {
    data: () => ({
        srcThumbnail:[],
        title:'',
        srcMovie:'',
        file:''
    }),
    methods:{
      onselect(){
        const file = this.$refs.file.files[0];
        this.file = file;
      },
       async saveData(){
          const formData = new FormData();
          formData.append("file",  this.file)
          formData.append("title",  this.title)
          formData.append("src",  this.srcMovie)
          var result = await this.$http.post("/notes", formData);
          if(result.data.length != 0 ){
            this.file = '';
            this.title ='';
            this.srcMovie= '';
          }
          
        }
    }
}
</script>
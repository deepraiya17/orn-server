<template>
  New Company Name : <input type="text" v-model="companyName" />
  <button @click="add">ADD</button>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      companyName: "",
    };
  },
  methods: {
    async add() {
      const query = `insert into companys (companyName) values ('${this.companyName}');`;
      await axios.post("http://64.227.181.112/ron/insert", { query });
      this.companyName = "";
    },
  },
};
</script>

<style></style>

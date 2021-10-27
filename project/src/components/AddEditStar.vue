<template>
  List Of Stars :
  <select v-model="selectedStar" @change="changeOption">
    <option
      v-for="pornstar in listOfPornStars"
      :key="pornstar.starId"
      :value="pornstar.starId"
    >
      {{ pornstar.starName }}
    </option>
  </select>
  <div class="container bg-green-300 mx-auto" v-if="isDisplaying">
    <div class="flex justify-around py-5">
      <input
        type="text"
        v-model="displayingData.starName"
        class="text-3xl font-bold w-96 text-center"
      />
      <div class="text-3xl font-extrabold">
        <input
          type="text"
          v-model="displayingData.breast"
          class="text-3xl font-bold w-9"
        />-
        <input
          type="text"
          v-model="displayingData.waist"
          class="text-3xl font-bold w-9"
        />-
        <input
          type="text"
          v-model="displayingData.butts"
          class="text-3xl font-bold w-9"
        />
      </div>
    </div>
    <br />
    <div class="w-full">
      <div class="w-1/3 inline-block text-3xl font-extrabold">
        <u>In Bikini</u>
        <br />
        <input
          type="text"
          v-model="displayingData.photo1"
          class="text-center"
        />

        <img :src="displayingData.photo1" alt="Something is Wrong" />
      </div>
      <div class="w-1/3 inline-block text-3xl font-extrabold">
        <u> Topless </u>
        <br />
        <input
          type="text"
          v-model="displayingData.photo2"
          class="text-center"
        />
        <img :src="displayingData.photo2" alt="Something is Wrong" />
      </div>
      <div class="w-1/3 inline-block text-3xl font-extrabold">
        <u> Nude </u>
        <br />
        <input
          type="text"
          v-model="displayingData.photo3"
          class="text-center"
        />
        <img :src="displayingData.photo3" alt="Something is Wrong" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      selectedStar: "",
      listOfPornStars: [],
      displayingData: {},
      isDisplaying: false,
    };
  },
  methods: {
    changeOption() {
      this.listOfPornStars.forEach((s) => {
        if (s.starId === this.selectedStar) {
          this.displayingData = s;
          this.isDisplaying = true;
        }
      });
    },
  },
  async mounted() {
    let query = `SELECT * FROM stars`;
    this.listOfPornStars = (
      await axios.put("http://64.227.181.112/ron/get", { query })
    ).data;
    document.title = "Editing Star";
  },
};
</script>

<style></style>

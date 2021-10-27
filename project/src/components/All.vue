<template>
  <table
    class="
      uppercase
      mx-auto
      mt-5
      border-4 border-separate
      bg-green-700
      border-green-900
    "
  >
    <tbody>
      <tr v-for="(v, j) in displayingData2" :key="j">
        <td
          class="border-2 border-green-600 p-2 text-red-600 font-bold text-xl"
        >
          <a
            class="bg-white text-green-600 rounded-lg p-1"
            target="_blank"
            :href="viewURL(v.videoId)"
            >View</a
          >
        </td>
        <td
          class="border-2 border-green-600 p-2 text-red-600 font-bold text-xl"
        >
          <div class="border-2 border-red-200 bg-gray-50">
            {{ v.companyName }}
          </div>
        </td>
        <td
          class="border-2 border-green-600 p-2 text-red-600 font-bold text-xl"
        >
          <div class="border-2 border-red-200 bg-gray-50">{{ v.starName }}</div>
        </td>

        <td
          class="border-2 border-green-600 p-2 text-red-600 font-bold text-xl"
        >
          <input v-model="v.nameOfVideo" class="border-2 border-red-200" />
        </td>
        <td
          class="border-2 border-green-600 p-2 text-red-600 font-bold text-xl"
        >
          <input v-model="v.inWhichAccount" class="border-2 border-red-200" />
        </td>
        <td
          class="border-2 border-green-600 p-2 text-red-600 font-bold text-xl"
        >
          <input v-model="v.startAt" class="border-2 border-red-200" />
        </td>
        <td
          class="border-2 border-green-600 p-2 text-red-600 font-bold text-xl"
        >
          <input v-model="v.endAt" class="border-2 border-red-200" />
        </td>
        <td
          class="border-2 border-green-600 p-2 text-red-600 font-bold text-xl"
        >
          <input v-model="v.rating" class="border-2 border-red-200" />
        </td>
        <td
          class="border-2 border-green-600 p-2 text-red-600 font-bold text-xl"
        >
          <button
            class="bg-white text-green-600 rounded-lg p-1"
            @click="update(j)"
          >
            Update
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      displayingData2: {},
    };
  },
  methods: {
    viewURL(videoId) {
      return `http://64.227.185.91/video-details/${videoId}`;
    },

    async update(index) {
      const query = `UPDATE videos SET 
       nameOfVideo='${this.displayingData2[index].nameOfVideo}',
       inWhichAccount='${this.displayingData2[index].inWhichAccount}',
       startAt=${this.displayingData2[index].startAt},
       endAt=${this.displayingData2[index].endAt},
       rating=${this.displayingData2[index].rating},
       videourl='${this.displayingData2[index].videourl}',
       isChecked=${this.displayingData2[index].isChecked}
       WHERE videoId = ${this.displayingData2[index].videoId}`;
      // console.log(query);
      alert(
        (await axios.put("http://64.227.181.112/ron/update", { query })).data
      );
    },
    async initialize() {
      const q2 =
        "SELECT * FROM videos join starslinks on starslinks.videoId=videos.videoId join stars on starslinks.starId = stars.starId join companyslinks on videos.videoId = companyslinks.videoId join companys on companyslinks.companyId=companys.companyId order by starName";
      this.displayingData2 = (
        await axios.put("http://64.227.181.112/ron/get", {
          query: q2,
        })
      ).data;
    },
  },
  async mounted() {
    this.initialize();
  },
};
</script>

<style></style>

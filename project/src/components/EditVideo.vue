<template>
  <div v-if="loaded" class="grid grid-cols-3 gap-2">
    <div class="col-span-1 text-right text-xl font-bold">Company</div>
    <div class="col-span-2 text-left text-2xl font-semibold">
      <select v-model="company[0].companyId">
        <option v-for="(c, i) in companyList" :key="i" :value="c.companyId">
          {{ c.companyName }}
        </option>
      </select>
    </div>
    <div class="col-span-1 text-right text-xl font-bold">Strars In Video :</div>
    <div class="col-span-2 text-left text-2xl font-semibold">
      <span
        v-for="(star, i) in starsInVideo"
        :key="star.starId"
        class="text-blue-700 underline"
      >
        {{ star.starName }} {{ i + 1 < starsInVideo.length ? ", " : "" }}
      </span>
    </div>
    <div class="col-span-1 text-right text-xl font-bold p-2 my-3">
      Name Of Video :
    </div>
    <input
      type="text"
      v-model="videoData[0].nameOfVideo"
      class="
        col-span-2
        text-left text-2xl
        font-semibold
        w-max
        p-1
        my-3
        border-separate border-2 border-black
      "
    />
    <div class="col-span-1 text-right text-xl font-bold p-2 my-3">
      In Which Account :
    </div>
    <input
      class="
        col-span-2
        text-left text-2xl
        font-semibold
        w-max
        p-1
        my-3
        border-black border-2
      "
      v-model="videoData[0].inWhichAccount"
    />
    <div class="col-span-1 text-right text-xl font-bold p-2 my-3">
      Start At :
    </div>
    <input
      class="
        col-span-2
        text-left text-2xl
        font-semibold
        w-max
        p-1
        my-3
        border-black border-2
      "
      v-model="videoData[0].startAt"
    />
    <div class="col-span-1 text-right text-xl font-bold p-2 my-3">End At :</div>
    <input
      class="
        col-span-2
        text-left text-2xl
        font-semibold
        w-max
        p-1
        my-3
        border-black border-2
      "
      v-model="videoData[0].endAt"
    />
    <div class="col-span-1 text-right text-xl font-bold p-2 my-3">Rating :</div>
    <input
      class="
        col-span-2
        text-left text-2xl
        font-semibold
        w-max
        p-1
        my-3
        border-black border-2
      "
      v-model="videoData[0].rating"
    />
    <div class="col-span-1 text-right text-xl font-bold p-2 my-3">
      Embeded Code :
    </div>
    <input
      class="
        col-span-2
        text-left text-2xl
        font-semibold
        w-max
        p-1
        my-3
        border-black border-2
      "
      v-model="videoData[0].videourl"
    />
    <div class="col-span-1 text-right text-xl font-bold p-2 my-3">
      Is Checked :
    </div>
    <input
      class="
        col-span-2
        text-left text-2xl
        font-semibold
        w-max
        p-1
        my-3
        border-black border-2
      "
      v-model="videoData[0].isChecked"
    />
  </div>
  <button @click="update" class="bg-gray-700 text-white p-2 font-bold text-4xl">
    Update
  </button>
</template>

<script>
import axios from "axios";
export default {
  async mounted() {
    this.videoId = this.$route.params.videoId;
    const query1 = `SELECT * FROM videos WHERE videoId=${this.videoId}`;
    const query2 = `SELECT companys.companyId,companyName FROM videos join companyslinks on videos.videoId = companyslinks.videoId join companys on  companyslinks.companyId = companys.companyId WHERE videos.videoId=${this.videoId}`;
    const query3 = `SELECT stars.starName FROM videos JOIN starslinks ON videos.videoId=starslinks.videoId JOIN stars ON starslinks.starId = stars.starId WHERE videos.videoId=${this.videoId}`;
    const query4 = "SELECT * FROM companys ORDER BY companyName";
    this.videoData = (
      await axios.put("http://64.227.181.112/ron/get", { query: query1 })
    ).data;
    this.company = (
      await axios.put("http://64.227.181.112/ron/get", { query: query2 })
    ).data;
    this.starsInVideo = (
      await axios.put("http://64.227.181.112/ron/get", { query: query3 })
    ).data;
    this.companyList = (
      await axios.put("http://64.227.181.112/ron/get", { query: query4 })
    ).data;
    console.log(this.videoData, this.company, this.starsInVideo);
    this.newCompany = this.company[0].companyId;
    let title = `Editing ${this.company[0].companyName} # ${this.videoData[0].nameOfVideo}`;
    document.title = title;
    this.loaded = true;
  },
  methods: {
    computedURL(a) {
      return "https://mega.nz/embed/" + a;
    },
    async update() {
      try {
        let query = `UPDATE companyslinks SET companyId=${this.company[0].companyId} WHERE videoId = ${this.videoId}`;
        await axios.put("http://64.227.181.112/ron/update", { query });
        query = `UPDATE videos SET 
       nameOfVideo='${this.videoData[0].nameOfVideo}',
       inWhichAccount='${this.videoData[0].inWhichAccount}',
       startAt=${this.videoData[0].startAt},
       endAt=${this.videoData[0].endAt},
       rating=${this.videoData[0].rating},
       videourl='${this.videoData[0].videourl}',
       isChecked=${this.videoData[0].isChecked}
       WHERE videoId = ${this.videoId}`;
        // console.log(query);
        await axios.put("http://64.227.181.112/ron/update", { query });
        this.$router.go();
      } catch (err) {
        console.error(err);
      }
    },
  },
  data() {
    return {
      loaded: false,
      videoId: 0,
      videoData: {},
      company: {},
      starsInVideo: {},
      companyList: [],
    };
  },
};
</script>

<style></style>

<template>
  <div v-if="loaded" class="grid grid-cols-12 gap-2">
    <div class="col-span-4">
      <div class="grid grid-cols-10 gap-1">
        <div class="col-span-3 text-right text-xl font-bold">
          Company Name :
        </div>
        <div class="col-span-7 text-left text-2xl font-semibold">
          {{ company[0].companyName }}
        </div>
        <div class="col-span-3 text-right text-xl font-bold">
          Strars In Video :
        </div>
        <div class="col-span-7 text-left text-2xl font-semibold">
          <span
            v-for="(star, i) in starsInVideo"
            :key="star.starId"
            class="text-blue-700 underline"
          >
            {{ star.starName }} {{ i + 1 < starsInVideo.length ? ", " : "" }}
          </span>
        </div>
        <div class="col-span-3 text-right text-xl font-bold">
          Name Of Video :
        </div>
        <div class="col-span-7 text-left text-2xl font-semibold">
          {{ videoData[0].nameOfVideo }}
        </div>
        <div class="col-span-3 text-right text-xl font-bold">
          In Which Account :
        </div>
        <div class="col-span-7 text-left text-2xl font-semibold">
          {{ videoData[0].inWhichAccount }}
        </div>
        <div class="col-span-3 text-right text-xl font-bold">Start At :</div>
        <div class="col-span-7 text-left text-2xl font-semibold">
          {{ videoData[0].startAt }}
        </div>
        <div class="col-span-3 text-right text-xl font-bold">End At :</div>
        <div class="col-span-7 text-left text-2xl font-semibold">
          {{ videoData[0].endAt }}
        </div>
        <div class="col-span-3 text-right text-xl font-bold">Rating :</div>
        <div class="col-span-7 text-left text-2xl font-semibold">
          {{ videoData[0].rating }}
        </div>
        <div class="col-span-3 text-right text-xl font-bold">Is Checked :</div>
        <div class="col-span-7 text-left text-2xl font-semibold">
          {{ videoData[0].isChecked === 0 ? "Not Checked" : "Checked" }}
        </div>
      </div>
      <div class="col-span-10">
        <a
          class="bg-indigo-500 text-white rounded-xl text-2xl font-bold p-2"
          :href="updateLink()"
          target="_blank"
        >
          Edit Video Details
        </a>
      </div>
    </div>
    <div class="col-span-8">
      <iframe
        width="1040"
        height="660"
        frameborder="0"
        :src="computedURL(videoData[0].videourl)"
        allowfullscreen
      ></iframe>
    </div>
  </div>
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
    let title = `Viewing ${this.company[0].companyName} # ${this.videoData[0].nameOfVideo}`;
    document.title = title;
    this.loaded = true;
  },
  methods: {
    computedURL(a) {
      return "https://mega.nz/embed/" + a;
    },
    updateLink(a) {
      // console.log(a, this.videoId);
      return `http://64.227.185.91/edit-video-details/${this.videoId}`;
    },
  },
  data() {
    return {
      loaded: false,
      videoId: 0,
      videoData: {},
      company: {},
      newCompany: {},
      starsInVideo: {},
      companyList: [],
    };
  },
};
</script>

<style></style>

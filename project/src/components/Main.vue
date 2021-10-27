<template>
  <div class="text-center">
    <a
      class="
        mx-2
        px-2
        py-1
        bg-blue-300
        text-black
        rounded-xl
        hover:text-white hover:bg-blue-700
        focus:text-white focus:bg-blue-700
      "
      href="http://64.227.185.91/add-edit-star"
      target="_blank"
    >
      Add Edit Star
    </a>
    <a
      class="
        mx-2
        px-2
        py-1
        bg-blue-300
        text-black
        rounded-xl
        hover:text-white hover:bg-blue-700
        focus:text-white focus:bg-blue-700
      "
      href="http://64.227.185.91/add-company"
      target="_blank"
    >
      Add Company
    </a>

    <button
      class="
        mx-2
        px-2
        py-1
        bg-blue-300
        text-black
        rounded-xl
        hover:text-white hover:bg-blue-700
        focus:text-white focus:bg-blue-700
      "
      @mouseover="display1"
      @focus="display1"
    >
      Company List
    </button>
    <button
      class="
        mx-2
        px-2
        py-1
        bg-blue-300
        text-black
        rounded-xl
        hover:text-white hover:bg-blue-700
        focus:text-white focus:bg-blue-700
      "
      @mouseover="display2"
      @focus="display2"
    >
      Star List
    </button>
    <button
      class="
        mx-2
        px-2
        py-1
        bg-blue-300
        text-black
        rounded-xl
        hover:text-white hover:bg-blue-700
        focus:text-white focus:bg-blue-700
      "
      @click="displaynone"
    >
      Hide
    </button>
  </div>
  <div class="grid grid-cols-12 mt-3">
    <div class="col-span-6 col-start-4 bg-blue-300 ml-3" :class="display[0]">
      <ul>
        <div class="grid grid-cols-5">
          <li
            v-for="(d, i) in dataOfCompany"
            :key="i"
            class="inline-block p-2 bg-blue-700 text-white m-2 w-max rounded-xl"
          >
            <button class="col-span-1" @click="displayData(d.companyId)">
              {{ d.companyName }}({{ d.countOfVideos }})
            </button>
          </li>
        </div>
      </ul>
    </div>
    <div class="col-span-6 col-start-4 bg-blue-300 mr-3" :class="display[1]">
      <ul>
        <div class="grid grid-cols-6 t">
          <li
            v-for="(d, i) in dataOfPornStar"
            :key="i"
            class="inline-block p-2 bg-blue-700 text-white m-2 w-max rounded-xl"
          >
            <button class="col-span-1" @click="displayData(d.starId)">
              {{ d.starName }}({{ d.countOfVideos }})
            </button>
          </li>
        </div>
      </ul>
    </div>
  </div>
  <br />
  <div
    class="container bg-green-300 mx-auto"
    v-if="currentDisplaying === 'company'"
  >
    <div class="flex justify-around py-5">
      <button
        class="text-3xl font-extrabold border-8 p-2 rounded-xl border-white"
        @click="showCompanyVideo(displayingData.companyId)"
      >
        {{ displayingData.companyName }}({{ displayingData.countOfVideos }})
      </button>
    </div>
    <table
      class="
        uppercase
        mx-auto
        border-4 border-separate
        bg-green-700
        border-green-900
      "
      v-if="videoList.length > 0"
    >
      <thead>
        <tr>
          <th
            class="
              border-2 border-green-600
              p-2
              text-gray-100
              font-bold
              text-xl
            "
          >
            name of video
          </th>

          <th
            class="
              border-2 border-green-600
              p-2
              text-gray-100
              font-bold
              text-xl
            "
          >
            pornstars in video
          </th>
          <th
            class="
              border-2 border-green-600
              p-2
              text-gray-100
              font-bold
              text-xl
            "
          >
            in which account
          </th>
          <th
            class="
              border-2 border-green-600
              p-2
              text-gray-100
              font-bold
              text-xl
            "
          >
            rating
          </th>
          <th
            class="
              border-2 border-green-600
              p-2
              text-gray-100
              font-bold
              text-xl
            "
          >
            is checked
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="v in videoList" :key="v.videoId">
          <td
            class="
              border-2 border-green-600
              p-2
              text-gray-100
              font-bold
              text-xl
            "
          >
            {{ v.nameOfVideo }}
          </td>
          <td
            class="
              border-2 border-green-600
              p-2
              text-gray-100
              font-bold
              text-xl
            "
          >
            <span v-for="(star, i) in v.pornstars" :key="star.starId"
              >{{ star.starName }}
              {{ i + 1 < v.pornstars.length ? ", " : "" }}</span
            >
          </td>
          <td
            class="
              border-2 border-green-600
              p-2
              text-gray-100
              font-bold
              text-xl
            "
          >
            {{ v.inWhichAccount }}
          </td>
          <td
            class="
              border-2 border-green-600
              p-2
              text-gray-100
              font-bold
              text-xl
            "
          >
            {{ v.rating }}
          </td>
          <td
            class="
              border-2 border-green-600
              p-2
              text-gray-100
              font-bold
              text-xl
            "
          >
            {{ v.isChecked }}
          </td>
          <td
            class="
              border-2 border-green-600
              p-2
              text-gray-100
              font-bold
              text-xl
            "
          >
            <a :href="createViewURL(v.videoId)" target="_blank">View Video</a>
          </td>
          <td
            class="
              border-2 border-green-600
              p-2
              text-gray-100
              font-bold
              text-xl
            "
          >
            <a :href="createEditURL(v.videoId)" target="_blank">Edit Video</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    class="container bg-green-300 mx-auto"
    v-if="currentDisplaying === 'star'"
  >
    <div class="flex justify-around py-5">
      <button
        class="text-3xl font-extrabold border-8 p-2 rounded-xl border-white"
        @click="showStarVideo(displayingData.starId)"
      >
        {{ displayingData.starName }}({{ displayingData.countOfVideos }})
      </button>
      <div class="text-3xl font-extrabold">
        {{ displayingData.breast }}-{{ displayingData.waist }}-{{
          displayingData.butts
        }}
      </div>
    </div>
    <br />
    <div class="w-full">
      <div class="w-1/3 inline-block text-3xl font-extrabold">
        <u>In Bikini</u>
        <img :src="displayingData.photo1" alt="Something is Wrong" />
      </div>
      <div class="w-1/3 inline-block text-3xl font-extrabold">
        <u> Topless </u>
        <img :src="displayingData.photo2" alt="Something is Wrong" />
      </div>
      <div class="w-1/3 inline-block text-3xl font-extrabold">
        <u> Nude </u>
        <img :src="displayingData.photo3" alt="Something is Wrong" />
      </div>
    </div>
    <table
      class="
        uppercase
        mx-auto
        mt-5
        border-4 border-separate
        bg-green-700
        border-green-900
      "
      v-if="videoList.length > 0"
    >
      <thead>
        <tr>
          <th
            class="
              border-2 border-green-600
              p-2
              text-gray-100
              font-bold
              text-xl
            "
          >
            name of video
          </th>
          <th
            class="
              border-2 border-green-600
              p-2
              text-gray-100
              font-bold
              text-xl
            "
          >
            in which account
          </th>
          <th
            class="
              border-2 border-green-600
              p-2
              text-gray-100
              font-bold
              text-xl
            "
          >
            rating
          </th>
          <th
            class="
              border-2 border-green-600
              p-2
              text-gray-100
              font-bold
              text-xl
            "
          >
            is checked
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="v in videoList" :key="v.videoId">
          <td
            class="
              border-2 border-green-600
              p-2
              text-gray-100
              font-bold
              text-xl
            "
          >
            {{ v.nameOfVideo }}
          </td>
          <td
            class="
              border-2 border-green-600
              p-2
              text-gray-100
              font-bold
              text-xl
            "
          >
            {{ v.inWhichAccount }}
          </td>
          <td
            class="
              border-2 border-green-600
              p-2
              text-gray-100
              font-bold
              text-xl
            "
          >
            {{ v.rating }}
          </td>
          <td
            class="
              border-2 border-green-600
              p-2
              text-gray-100
              font-bold
              text-xl
            "
          >
            {{ v.isChecked }}
          </td>
          <td
            class="
              border-2 border-green-600
              p-2
              text-gray-100
              font-bold
              text-xl
            "
          >
            <a :href="createViewURL(v.videoId)" target="_blank">View Video</a>
          </td>
          <td
            class="
              border-2 border-green-600
              p-2
              text-gray-100
              font-bold
              text-xl
            "
          >
            <a :href="createEditURL(v.videoId)" target="_blank">Edit Video</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dataOfPornStar: [],
      dataOfCompany: [],
      display: ["hidden", "hidden"],
      displayingData: {},
      currentDisplaying: "",
      videoList: [],
    };
  },
  methods: {
    createViewURL(videoId) {
      return `http://64.227.185.91/video-details/${videoId}`;
    },
    createEditURL(videoId) {
      return `http://64.227.185.91/edit-video-details/${videoId}`;
    },
    async showCompanyVideo(id) {
      const query = `SELECT videos.videoId,nameOfVideo,isChecked,rating,inWhichAccount FROM companyslinks LEFT JOIN videos ON companyslinks.videoId = videos.videoId WHERE companyslinks.companyId = ${id} ORDER BY nameOfVideo`;
      this.videoList = (
        await axios.put("http://64.227.181.112/ron/get", {
          query,
        })
      ).data;
      this.videoList.forEach(async function (v) {
        const query3 = `SELECT stars.starId,stars.starName FROM videos JOIN starslinks ON videos.videoId=starslinks.videoId JOIN stars ON starslinks.starId = stars.starId WHERE videos.videoId=${v.videoId}`;
        v.pornstars = (
          await axios.put("http://64.227.181.112/ron/get", { query: query3 })
        ).data;
      });
    },
    async showStarVideo(id) {
      const query = `SELECT videos.videoId,nameOfVideo,isChecked,rating,inWhichAccount FROM starslinks  JOIN videos ON starslinks.videoId = videos.videoId WHERE starslinks.starId = ${id} ORDER BY nameOfVideo`;
      this.videoList = (
        await axios.put("http://64.227.181.112/ron/get", {
          query,
        })
      ).data;
      console.log(this.videoList);
    },
    displaynone() {
      this.display[0] = "hidden";
      this.display[1] = "hidden";
    },
    display1() {
      this.display[0] = "";
      this.display[1] = "hidden";
    },
    display2() {
      this.display[0] = "hidden";
      this.display[1] = "";
    },
    async displayData(id) {
      if (this.display[0] === "hidden") {
        this.currentDisplaying = "star";
        this.display[1] = "hidden";
        const starDetails = this.dataOfPornStar.filter(
          (s) => s.starId === id
        )[0];

        this.displayingData.starId = starDetails.starId;
        this.displayingData.starName = starDetails.starName;
        this.displayingData.countOfVideos = starDetails.countOfVideos;
        this.displayingData.breast = starDetails.breast;
        this.displayingData.waist = starDetails.waist;
        this.displayingData.butts = starDetails.butts;
        this.displayingData.photo1 = starDetails.photo1;
        this.displayingData.photo2 = starDetails.photo2;
        this.displayingData.photo3 = starDetails.photo3;
        // this.displayingData.push(await axios.put('http:64.227.190.199/ron/get'))
      } else {
        this.currentDisplaying = "company";
        this.display[0] = "hidden";
        const companyDetails = this.dataOfCompany.filter(
          (c) => c.companyId === id
        )[0];

        this.displayingData.companyId = companyDetails.companyId;
        this.displayingData.companyName = companyDetails.companyName;
        this.displayingData.countOfVideos = companyDetails.countOfVideos;
      }
    },
    async initialize() {
      const q1 = `SELECT stars.starId, starName,breast,waist,butts,photo1,photo2,photo3, count(videoId) AS countOfVideos FROM stars LEFT JOIN starslinks ON stars.starId = starslinks.starId GROUP BY starId ORDER BY starName`;
      this.dataOfPornStar = (
        await axios.put("http://64.227.181.112/ron/get", {
          query: q1,
        })
      ).data;
      const q2 = `SELECT companys.companyId, companyName, count(videoId) AS countOfVideos FROM companys LEFT JOIN companyslinks ON companys.companyId = companyslinks.companyId GROUP BY companyId ORDER BY companyName`;
      this.dataOfCompany = (
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

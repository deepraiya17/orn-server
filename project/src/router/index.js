import { createRouter, createWebHistory } from "vue-router";
import Main from "../components/Main.vue";
import All from "../components/All.vue";
import VideoDetails from "../components/VideoDetails.vue";
import EditVideo from "../components/EditVideo.vue";
import AddEditStar from "../components/AddEditStar.vue";
import AddCompany from "../components/AddCompany.vue";
const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/all",
    name: "All",
    component: All,
  },
  {
    path: "/video-details/:videoId",
    name: "VideoDetails",
    component: VideoDetails,
  },
  {
    path: "/edit-video-details/:videoId",
    name: "EditVideoDetails",
    component: EditVideo,
  },
  {
    path: "/add-company",
    name: "AddCompany",
    component: AddCompany,
  },
  {
    path: "/add-edit-star",
    name: "AddEditStar",
    component: AddEditStar,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;

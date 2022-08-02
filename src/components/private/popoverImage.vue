<template>
  <div class="popoverImage">
    <div v-if="uid != userInfo.userId" class="unselfContainer">
      <popoverUser :userInfo="userInfo" />
      <div style="margin-left: 10px" v-if="msg" class="popoverimageContainer">
        <el-image
          @click="$preview(msg.picInfo.picUrl)"
          style="width: 150px; height: 150px"
          :src="msg.picInfo.picUrl"
          :fit="'cover'"
        />
      </div>
    </div>
    <div v-else class="selfContainer">
      <div style="margin-right: 10px" v-if="msg" class="popoverimageContainer">
        <el-image
          @click="$preview(msg.picInfo.picUrl)"
          style="width: 150px; height: 150px"
          :src="msg.picInfo.picUrl"
          :fit="'cover'"
        />
      </div>
      <popoverUser :userInfo="userInfo" />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import popoverUser from "./popoverUser.vue";

export default defineComponent({
  name: "popoverImage",

  components: {
    popoverUser,
  },
  props: ["userInfo", "msg"],
  setup() {
    const data = reactive({
      uid: decodeURIComponent(
        window.atob(localStorage.getItem("id") as string)
      ),
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
.popoverImage {
  .el-image {
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
  }
  
}
</style>
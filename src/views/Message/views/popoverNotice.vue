<template>
  <div class="popoverNotice">
    <div v-if="uid != userInfo.userId" class="unselfContainer">
      <popoverUser :userInfo="userInfo" />
      <div
        style="margin-left: 10px"
        v-if="msg"
        class="popoverInfoContainer unselfPopover"
      >
        <div class="msgContainer">{{ msg.msg }}</div>
        <div @click="toPage" class="noticeInfo">
          <el-image
            style="width: 120px; height: 70px"
            :src="msg.promotionUrl.coverUrl"
            :fit="'cover'"
          />
          <div class="otherInfo">
            {{ msg.promotionUrl.text }}
          </div>
        </div>
      </div>
    </div>
    <div v-else class="selfContainer">
      <div
        style="margin-right: 10px"
        v-if="msg"
        class="popoverInfoContainer selfPopover"
      >
        <div class="msgContainer">{{ msg.msg }}</div>
        <div @click="toPage" class="noticeInfo">
          <el-image
            style="width: 120px; height: 70px"
            :src="msg.promotionUrl.coverUrl"
            :fit="'cover'"
          />
          <div class="otherInfo">
            {{ msg.promotionUrl.text }}
          </div>
        </div>
        <popoverUser :userInfo="userInfo" />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import popoverUser from "./popoverUser.vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "popoverNotice",
  props: ["userInfo", "msg"],
  components: {
    popoverUser,
  },
  setup(props) {
    const router = useRouter();
    const data = reactive({
      uid: decodeURIComponent(
        window.atob(localStorage.getItem("id") as string)
      ),
    });
    const toPage = () => {
      window.open(props.msg.promotionUrl.url)
    }
    return {
      router,
      toPage,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
.popoverNotice {
  .noticeInfo {
    padding: 7px 10px;
    background-color: #3d3d3d;
    margin-bottom: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    .el-image {
      border-radius: 8px;
      overflow: hidden;
    }
    .otherInfo {
      min-width: 150px;
      margin-left: 10px;
      .title {
        font-size: 13px;
        font-weight: bold;
        margin-bottom: 2px;
        .target {
          font-size: 12px;
          padding: 3px 6px;
          color: @themeColor;
          border: 1px solid @themeColor;
          border-radius: 5px;
          zoom: 0.8;
          margin-right: 6px;
        }
      }
      .artists {
        max-width: 440px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        span {
          color: @fontColor;
          font-size: 12px;
          cursor: pointer;
          &:hover {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
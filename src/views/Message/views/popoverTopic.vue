<template>
  <div class="popoverTopic">
    <div v-if="uid != userInfo.userId" class="unselfContainer">
      <popoverUser :userInfo="userInfo" />
      <div
        style="margin-left: 10px"
        v-if="msg"
        class="popoverInfoContainer unselfPopover"
      >
        <div class="msgContainer">
          {{ msg.msg }}
        </div>
        <div class="topicInfo">
          <el-image
            style="width: 120px; height: 70px"
            :src="msg.topic.coverUrl"
            :fit="'cover'"
          />
          <div class="otherInfo">
            <div class="infoTitle">
              <span class="target">专栏</span>{{ msg.topic.mainTitle }}
            </div>
            <div class="infoCreator">
              by
              <span
                @click="
                  router.push('/UserDetail?id=' + msg.topic.creator.userId)
                "
                >{{ msg.topic.creator.nickname }}</span
              >
            </div>
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
        <div class="msgContainer">
          <span class="target">专栏</span> {{ msg.msg }}
        </div>
        <div class="topicInfo">
          <el-image
            style="width: 120px; height: 70px"
            :src="msg.promotionUrl.coverUrl"
            :fit="'cover'"
          />
          <div class="otherInfo">
            <div class="infoTitle">
              <span class="target">专栏</span>{{ msg.topic.mainTitle }}
            </div>
            <div class="infoCreator">
              by
              <span
                @click="
                  router.push('/UserDetail?id=' + msg.topic.creator.userId)
                "
                >{{ msg.topic.creator.nickname }}</span
              >
            </div>
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
  name: "popoverTopic",
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
    return {
      router,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
.popoverTopic {
  .topicInfo {
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
      .infoTitle {
        margin-bottom: 6px;
      }
      .target {
        font-size: 12px;
        padding: 3px 6px;
        color: @themeColor;
        border: 1px solid @themeColor;
        border-radius: 5px;
        zoom: 0.8;
        margin-right: 6px;
      }
      .infoCreator {
        max-width: 440px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: @fontColor;
        font-size: 12px;
        span {
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
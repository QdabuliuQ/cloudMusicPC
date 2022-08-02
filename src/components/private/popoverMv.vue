<template>
  <div class="popoverMv">
    <div v-if="uid != userInfo.userId" class="unselfContainer">
      <popoverUser :userInfo="userInfo" />
      <div
        style="margin-left: 10px"
        v-if="msg"
        class="popoverInfoContainer unselfPopover"
      >
        <div class="msgContainer">分享MV: {{ msg.msg }}</div>
        <div @click="router.push('/MvPlay?id=' + msg.mv.id)" class="mvInfo">
          <div class="topInfoMask">
            <div class="title">
              {{ msg.mv.name }}
              -
              <span
                @click.stop="router.push('/SingerDetail?id=' + item.id)"
                v-for="item in msg.mv.artists"
                :key="item.id"
              >
                {{ item.name }}&nbsp;&nbsp;
              </span>
            </div>
          </div>
          <img class="icon" src="~images/common/sheetPlay.png" alt="" />
          <div class="bottomInfoMask">
            <span>播放：{{ msg.mv.playCount }}</span>
            <span>{{ $formatTime(msg.mv.duration) }}</span>
          </div>
          <img class="cover" :src="msg.mv.imgurl16v9" alt="" />
        </div>
      </div>
    </div>
    <div v-else class="selfContainer">
      <div
        style="margin-right: 10px"
        v-if="msg"
        class="popoverInfoContainer selfPopover"
      >
        <div class="msgContainer">分享MV: {{ msg.msg }}</div>
        <div @click="router.push('/MvPlay?id=' + msg.mv.id)" class="mvInfo">
          <div class="topInfoMask">
            <div class="title">
              {{ msg.mv.name }}
              -
              <span
                @click.stop="router.push('/SingerDetail?id=' + item.id)"
                v-for="item in msg.mv.artists"
                :key="item.id"
              >
                {{ item.name }}&nbsp;&nbsp;
              </span>
            </div>
          </div>
          <img class="icon" src="~images/common/sheetPlay.png" alt="" />
          <div class="bottomInfoMask">
            <span>播放：{{ msg.mv.playCount }}</span>
            <span>{{ $formatTime(msg.mv.duration) }}</span>
          </div>
          <img class="cover" :src="msg.mv.imgurl16v9" alt="" />
        </div>
      </div>
      <popoverUser :userInfo="userInfo" />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import popoverUser from "./popoverUser.vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "popoverMv",
  props: ["userInfo", "msg"],
  components: {
    popoverUser,
  },
  setup() {
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
.popoverMv {
  .mvInfo {
    width: 250px;
    aspect-ratio: 2/1.1;
    margin-bottom: 12px;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
    }
    .topInfoMask {
      position: absolute;
      width: 100%;
      height: 30px;
      top: 0;
      z-index: 2;
      bottom: 0;
      display: flex;
      align-items: center;
      background-image: linear-gradient(rgba(0, 0, 0, 0.651), transparent);
      .title {
        margin-left: 10px;
        span {
          cursor: pointer;
        }
      }
    }
    .bottomInfoMask {
      position: absolute;
      padding: 0 12px;
      height: 30px;
      z-index: 2;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.651));
    }
    .cover {
      width: 100%;
      height: 100%;
      object-fit: cover;
      vertical-align: top;
    }
  }
}
</style>
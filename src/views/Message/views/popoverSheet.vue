<template>
  <div class="popoverSheet">
    <div v-if="uid != userInfo.userId" class="unselfContainer">
      <popoverUser :userInfo="userInfo" />
      <div
        style="margin-left: 10px"
        v-if="msg"
        class="popoverInfoContainer unselfPopover"
      >
        <div class="msgContainer">{{ msg.title }}: {{ msg.msg }}</div>
        <div @click="router.push('/SheetDetail?id='+msg.playlist.id)" class="sheetInfo">
          <el-avatar
            shape="square"
            :size="40"
            :fit="'cover'"
            :src="msg.playlist.coverImgUrl"
          />
          <div class="otherInfo">
            <div class="title">
              <span class="target">歌单</span>{{ msg.playlist.name }}
            </div>
            <div class="artists">
              <span
                @click.stop="router.push('/UserDetail?id=' + msg.playlist.creator.userId)"
              >
                {{ msg.playlist.creator.nickname }}
              </span>
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
        <div class="msgContainer">{{ msg.title }}: {{ msg.msg }}</div>
        <div @click="router.push('/SheetDetail?id='+msg.playlist.id)" class="sheetInfo">
          <el-avatar
            shape="square"
            :size="40"
            :fit="'cover'"
            :src="msg.playlist.coverImgUrl"
          />
          <div class="otherInfo">
            <div class="title">
              <span class="target">歌单</span>{{ msg.playlist.name }}
            </div>
            <div class="artists">
              <span
                @click.stop="router.push('/UserDetail?id=' + msg.playlist.creator.userId)"
              >
                {{ msg.playlist.creator.nickname }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <popoverUser :userInfo="userInfo" />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
import popoverUser from "./popoverUser.vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: 'popoverSheet',
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
    })
    return {
      router,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
.popoverSheet {
  .sheetInfo {
    padding: 6px 10px;
    background-color: var(--eventBgc);
    margin-bottom: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
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
          color: var(--el-color-primary);
          border: 1px solid var(--el-color-primary);
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
            color: var(--textColor);
          }
        }
      }
    }
  }
}
</style>
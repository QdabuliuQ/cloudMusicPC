<template>
  <div class="commentItem">
    <div class="itemImage">
      <el-avatar style="margin-top: 5px" :size="40" :src="avatarUrl" />
    </div>
    <div class="itemInfo">
      <div class="infoBox">
        <div class="topInfo">
          <div class="infoName">{{nickname}}:<span class="infoContent">&nbsp;{{content}}</span></div>
        </div>
        <div v-if="beReplied && beReplied.length" class="centerInfo">
          <div v-for="item in beReplied" :key="item.beRepliedCommentId" class="listItem">
            <span>{{item.user.nickname}}:</span>&nbsp;{{item.content}}
          </div>
        </div>
        <div class="bottomInfo">
          <div class="time">
            {{$getTime(time)}}
          </div>
          <div class="data">
            <div class="dataItem">
              <img v-if="!liked" src="~images/common/unpraise.png" alt="">
              <img v-else src="~images/common/praise.png" alt="">
              {{likedCount}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
export default defineComponent({
  name: 'commentItem',
  props: [
    'avatarUrl',
    'time',
    'likedCount',
    'content',
    'nickname',
    'userId',
    'beReplied',
    'liked'
  ],
  setup() {
    const data = reactive({})
    onMounted(() => {
    })
    return {
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
.commentItem {
  display: flex;
  padding: 12px 0;
  .itemImage {
    margin-right: 10px;
  }
  .itemInfo {
    width: 94%;
    font-size: 13px;
    .listItem {
      span {
        cursor: pointer;
      }
    }
    .topInfo {
      display: flex;
      align-items: center;
      .infoName {
        color: @nameColor;
        cursor: pointer;
        line-height: 21px;
        word-break:break-all;
      }
      .infoContent {
        color: @fontColor;
      }
    }
    .centerInfo {
      margin-top: 6px;
      padding: 10px 15px;
      font-size: 12px;
      background-color: @eventBgc;
      border-radius: 8px;
      color: @fontColor;
      span {
        color: @nameColor;
      }
    }
    .bottomInfo {
      width: 100%;
      margin-top: 10px;
      font-size: 12px;
      color: @fontColor;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .dataItem {
        font-size: 12px;
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
          color: @themeColor;
        }
        img {
          width: 15px;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
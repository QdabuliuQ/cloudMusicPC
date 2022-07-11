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
            <div @click="praiseResource" :class="[isLike?'likeItem':'','dataItem']">
              <img v-if="!isLike" src="~images/common/unpraise.png" alt="">
              <img v-else src="~images/common/praise.png" alt="">
              {{count}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, watch, reactive, toRefs } from 'vue'
import { commentLike } from "@/network/VideoPlay/videoPlay";

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
    'liked',
    'type',
    'id',
    'cid',
    'threadId'
  ],
  setup(props) {
    const data = reactive({
      isLike: false,
      count: 0
    })

    watch(() => props.liked, (n) => {
      data.isLike = n
    }, {immediate: true})
    watch(() => props.likedCount, (n) => {
      data.count = n
    }, {immediate: true})

    const praiseResource = () => {
      if (props.type != 6) {
        commentLike({
          type: props.type,
          t: data.isLike ? 0 : 1,
          id: props.id,
          cid: props.cid
        }).then((res: any) => {
          if (res.data.code == 200) {
            data.isLike = !data.isLike
            data.isLike ? data.count ++ : data.count --
          }
        })
      } else {
        // 动态评论点赞
        commentLike({
          type: props.type,
          t: data.isLike ? 0 : 1,
          threadId: props.threadId,
          cid: props.cid
        }).then((res: any) => {
          if (res.data.code == 200) {
            data.isLike = !data.isLike
            data.isLike ? data.count ++ : data.count --
          }
        })
      }
    }

    return {
      ...toRefs(data),
      praiseResource
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
        white-space: pre;
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
      .likeItem {
        color: @themeColor;
      }
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
<template>
  <div id="VideoPlay">
    <div class="leftVideoContainer">
      <pageNav :title="'视频详情'" :icon="true"></pageNav>
      <div class="playContainer">
        <mediaPlay :src="url"></mediaPlay>
      </div>
      <div v-if="videoInfo.creator.avatarUrl != ''" class="creatorInfo">
        <div class="leftInfo">
          <el-avatar :size="50" :src="videoInfo.creator.avatarUrl" />
          <span style="margin-left: 15px">{{
            videoInfo.creator.nickname
          }}</span>
        </div>
        <div class="rightBtn">
          <followBtn :isFollow="videoInfo.creator.followed"></followBtn>
        </div>
      </div>
      <div class="videoInfo">
        <div class="videoTitle">
          {{ videoInfo.title }}
        </div>
        <div class="videoDesc">
          {{ videoInfo.description }}
        </div>
        <div class="videoParams">
          <div class="time">
            发布时间：{{ $getTime(videoInfo.publishTime) }}
          </div>
          <div class="count">
            播放量：{{ $countFormat(videoInfo.playTime) }}次
          </div>
        </div>
        <div class="videoTarget">
          <span v-for="item in videoInfo.videoGroup" :key="item.id">
            {{ item.name }}
          </span>
        </div>
        <div class="videoData">
          <div class="dataItem">
            <img src="~images/common/unpraise.png" alt="" />
            {{ videoInfo.praisedCount }}
          </div>
          <div class="dataItem">
            <img src="~images/common/uncollect.png" alt="" />
            {{ videoInfo.subscribeCount }}
          </div>
          <div class="dataItem">
            <img src="~images/common/share.png" alt="" />
            {{ videoInfo.shareCount }}
          </div>
        </div>
        <div class="videoComment">
          <div class="commentTitle">
            评论<span>({{ total }})</span>
          </div>
          <div class="commentBox">
            <textarea></textarea>
          </div>
          <div class="btnContainer">
            <div class="sendBtn">评论</div>
          </div>
          <div style="font-weight: bold">精彩评论</div>
          <div style="margin-bottom: 50px" class="commentList">
            <commentItem
              class="comItem"
              v-for="item in hotComment"
              :key="item.commentId"
              :avatarUrl="item.user.avatarUrl"
              :time="item.time"
              :likedCount="item.likedCount"
              :content="item.content"
              :nickname="item.user.nickname"
              :userId="item.user.userId"
              :beReplied="item.beReplied"
            ></commentItem>
          </div>
          <div ref="title" style="font-weight: bold">最新评论</div>
          <div class="commentList">
            <commentItem
              class="comItem"
              v-for="item in allComment"
              :key="item.commentId"
              :avatarUrl="item.user.avatarUrl"
              :time="item.time"
              :likedCount="item.likedCount"
              :content="item.content"
              :nickname="item.user.nickname"
              :userId="item.user.userId"
              :beReplied="item.beReplied"
            ></commentItem>
          </div>
          <div style="display: flex; justify-content: center; margin-top: 10px">
            <el-pagination
              @current-change="pageChange"
              :current-page="offset"
              :page-size="20"
              background
              layout="prev, pager, next"
              :total="total"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="rightVideList">
      <pageNav :title="'相关视频'" :icon="false"></pageNav>
      <div class="videoList">
        <videoItem 
          v-for="item in relateVideoList" 
          :key="item.vid"
          :coverUrl="item.coverUrl"
          :durationms="item.durationms"
          :title="item.title"
          :creator="item.creator"
          :playTime="item.playTime"
        ></videoItem>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, ref } from "vue";
import pageNav from "@/components/private/pageNav.vue";
import { useRouter } from "vue-router";
import { InitData } from "@/types/VideoPlay/VideoPlay";
import {
  getVideoDetail,
  getVideoComment,
  getRelateVideo,
  getVideoUrl,
} from "@/network/VideoPlay/VideoPlay";
import followBtn from "@/components/private/followBtn.vue";
import commentItem from "@/components/private/commentItem.vue";
import videoItem from "./videoItem.vue";
import mediaPlay from "@/components/common/mediaPlay.vue";

export default defineComponent({
  name: "VideoPlay",
  components: {
    pageNav,
    followBtn,
    commentItem,
    videoItem,
    mediaPlay,
  },
  setup() {
    const data = reactive(new InitData());
    const router = useRouter();
    const title = ref();
    // 评论页码切换
    const pageChange = (e: number) => {
      data.offset = e;
      getCommentData(true);
      window.scrollTo(0, title.value.offsetTop - 55);
    };
    // 获取评论数据
    const getCommentData = (tPage: boolean) => {
      getVideoComment({
        id: router.currentRoute.value.query.id as string,
        limit: 20,
        offset: (data.offset - 1) * 20,
        before: "",
      }).then((res: any) => {
        data.total = res.data.total;
        if (!tPage) {
          data.hotComment = res.data.hotComments;
        }
        data.allComment = res.data.comments;
      });
    };

    onMounted(() => {
      let t = router.currentRoute.value.query;
      if (t.type == "video") {
        // 视频url
        getVideoUrl({
          id: t.id as string
        }).then((res: any) => {
          console.log(res);
          data.url = res.data.urls[0].url
        })

        // 视频详情
        getVideoDetail({
          id: t.id as string,
        }).then((res: any) => {
          data.videoInfo = res.data.data;
        });
      }

      // 相关视频
      getRelateVideo({
        id: t.id as string,
      }).then((res: any) => {
        data.relateVideoList = res.data.data;
      });

      // 视频评论
      getCommentData(false);
      
    });
    return {
      ...toRefs(data),
      pageChange,
      title,
    };
  },
});
</script>

<style lang='less'>
#VideoPlay {
  background-color: @greyColor;
  padding: 30px 15vw;
  display: flex;
  justify-content: space-between;
  .leftVideoContainer {
    width: 70%;
    .playContainer {
      width: 100%;
      height: 400px;
      background-color: #000;
      margin-bottom: 25px;
    }
    .creatorInfo {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .leftInfo {
        display: flex;
        align-items: center;
      }
      .rightBtn {
        display: flex;
        align-items: center;
      }
    }
    .videoInfo {
      .videoTitle {
        font-size: 25px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .videoDesc {
        color: @fontColor;
        font-size: 14px;
        line-height: 24px;
        margin-bottom: 10px;
      }
      .videoParams {
        font-size: 13px;
        color: @fontColor;
        display: flex;
        margin-bottom: 15px;
        .count {
          margin-left: 25px;
        }
      }
      .videoTarget {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 13px;
        span {
          margin-right: 20px;
          margin-bottom: 7px;
          font-size: 12px;
          padding: 6px 15px 8px;
          background-color: #393939;
          border-radius: 10px;
          transition: 0.2s all linear;
          cursor: pointer;
          &:hover {
            background-color: @themeColor;
            color: #fff;
          }
        }
      }
      .videoData {
        display: flex;
        align-items: center;
        margin-bottom: 40px;
        .dataItem {
          margin-right: 20px;
          padding: 6px 16px;
          font-size: 13px;
          color: @fontColor;
          border-radius: 35px;
          border: 1px solid @fontColor;
          display: flex;
          align-items: center;
          cursor: pointer;
          &:hover {
            background-color: @hoverColor;
          }
          img {
            width: 18px;
            margin-right: 4px;
          }
        }
      }
      .videoComment {
        .commentTitle {
          font-weight: bold;
          font-size: 23px;
          margin-bottom: 10px;
          span {
            font-weight: normal;
            font-size: 13px;
            color: @fontColor;
            margin-left: 5px;
          }
        }
        .commentBox {
          padding: 10px 12px;
          border-radius: 8px;
          background-color: #393939;
          margin-bottom: 8px;
          textarea {
            resize: none;
            width: 100%;
            height: 80px;
            background-color: transparent;
            outline: none;
            border: 0;
            color: #fff;
            font-size: 15px;
          }
        }
        .btnContainer {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 40px;
          .sendBtn {
            font-size: 14px;
            padding: 10px 24px;
            background-color: #393939;
            border-radius: 10px;
            transition: 0.2s all linear;
            cursor: pointer;
            &:hover {
              background-color: @themeColor;
              color: #fff;
            }
          }
        }
        .commentList {
          .comItem:not(:last-child) {
            box-sizing: border-box;
            border-bottom: 1px solid #3f3f3f;
          }
        }
      }
    }
  }
  .rightVideList {
    width: 27%;
  }
}
</style>
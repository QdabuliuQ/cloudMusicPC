<template>
  <div id="VideoPlay">
    <div class="leftVideoContainer">
      <pageNav :title="'视频详情'" :icon="true"></pageNav>
      <div ref="playContainer" class="playContainer">
        <mediaPlay :miniModel="miniModel" :src="url"></mediaPlay>
      </div>
      <div @click="router.push('/UserDetail?id='+videoInfo.creator.userId)" v-if="videoInfo.creator.avatarUrl != ''" class="creatorInfo">
        <div class="leftInfo">
          <el-avatar :size="50" :src="videoInfo.creator.avatarUrl" />
          <span style="margin-left: 15px">{{
            videoInfo.creator.nickname
          }}</span>
        </div>
        <div @click.stop="toFollow" class="rightBtn">
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
          <div
            @click="likeEvent"
            :class="[liked ? 'likeItem' : '', 'dataItem']"
          >
            <img v-if="!liked" src="~images/common/unpraise.png" alt="" />
            <img v-else src="~images/common/praise.png" alt="" />
            {{ videoInfo.praisedCount }}
          </div>
          <div class="dataItem">
            <img src="~images/common/uncollect.png" alt="" />
            {{ videoInfo.subscribeCount }}
          </div>
          <div @click="shareEvent" class="dataItem">
            <img src="~images/common/share.png" alt="" />
            {{ videoInfo.shareCount }}
          </div>
        </div>
        <div class="videoComment">
          <div class="commentTitle">
            评论<span>({{ total }})</span>
          </div>
          <commentArea @commentEvent="commentEvent"></commentArea>
          <div v-if="hotComment.length" style="font-weight: bold">精彩评论</div>
          <div
            v-if="hotComment.length"
            style="margin-bottom: 50px"
            class="commentList"
          >
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
              :liked="item.liked"
              :id="videoInfo.vid"
              :cid="item.commentId"
              :type="5"
            ></commentItem>
          </div>
          <div v-if="allComment.length" ref="title" style="font-weight: bold">
            最新评论
          </div>
          <div v-if="allComment.length" class="commentList">
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
              :liked="item.liked"
              :id="videoInfo.vid"
              :cid="item.commentId"
              :type="5"
            ></commentItem>
          </div>
          <div style="display: flex; justify-content: center; margin-top: 10px">
            <el-pagination
              v-if="total > 20"
              @current-change="pageChange"
              :current-page="offset"
              :page-size="20"
              background
              layout="prev, pager, next"
              :total="total"
            />
          </div>
          <emptyContent
            v-if="!hotComment.length && !allComment.length && total == 0"
          ></emptyContent>
        </div>
      </div>
    </div>
    <div class="rightVideList">
      <pageNav :title="'相关视频'" :icon="false"></pageNav>
      <div class="videoList">
        <videoItem
          @creatorClick='creatorClick'
          @click="router.push('/VideoPlay?id='+item.vid+'&type=video')"
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
import {
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  ref,
  watch
} from "vue";
import pageNav from "@/components/private/pageNav.vue";
import { useRouter } from "vue-router";
import { InitData } from "@/types/VideoPlay/VideoPlay";
import {
  getVideoDetail,
  getVideoComment,
  getRelateVideo,
  getVideoUrl,
  getVideoData,
  likeResource,
} from "@/network/VideoPlay/videoPlay";
import { followUser } from "@/network/AccountDetail/UserDetail";
import followBtn from "@/components/private/followBtn.vue";
import commentItem from "@/components/private/commentItem.vue";
import videoItem from "./videoItem.vue";
import mediaPlay from "@/components/common/mediaPlay.vue";
import commentArea from "@/components/common/commentArea.vue";
import useLogin from "@/hooks/useLogin";
import { commentResource } from "@/network/UserInfo/userEvents";
import emptyContent from "@/components/common/emptyContent.vue";

export default defineComponent({
  name: "VideoPlay",
  components: {
    pageNav,
    followBtn,
    commentItem,
    videoItem,
    mediaPlay,
    commentArea,
    emptyContent,
  },
  setup() {
    const data = reactive(new InitData());
    const router = useRouter();
    const title = ref();
    const playContainer = ref();

    const toFollow = () => {
      if (useLogin()) {
        followUser({
          id: data.videoInfo.creator.userId+'',
          t: data.videoInfo.creator.followed ? 0 : 1
        }).then((res: any) => {
          if (res.data.code == 200) {
            data.videoInfo.creator.followed = !data.videoInfo.creator.followed
          }
        })
      }
    }
    const creatorClick = (e: number) => {
      router.push('/UserDetail?id='+e)
    }
    // 评论回调
    const commentEvent = (e: { content: string; cid: number }) => {
      if (e.cid) {
        commentResource({
          t: 2,
          type: 5,
          id: router.currentRoute.value.query.id as string,
          content: e.content,
          commentId: e.cid,
        }).then((res: any) => {
          if (res.data.code == 200) {
            setTimeout(() => {
              getCommentData(false);
            }, 300);
          }
        });
      } else {
        commentResource({
          t: 1,
          type: 5,
          id: router.currentRoute.value.query.id as string,
          content: e.content,
        }).then((res: any) => {
          if (res.data.code == 200) {
            res.data.comment.likedCount = 0;
            data.allComment.unshift(res.data.comment);
          }
        });
      }
    };

    const likeEvent = () => {
      if (useLogin()) {
        let t = router.currentRoute.value.query;
        if (t.type == "video") {
          likeResource({
            type: 5,
            t: data.liked ? 0 : 1,
            id: t.id as string,
          }).then((res: any) => {
            if (res.data.code == 200) {
              data.liked = !data.liked;
              data.liked
                ? data.videoInfo.praisedCount++
                : data.videoInfo.praisedCount--;
            }
          });
        }
      }
    };
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
          id: t.id as string,
        }).then((res: any) => {
          data.url = res.data.urls[0].url;
        });

        getVideoData({
          vid: t.id as string,
        }).then((res: any) => {
          data.liked = res.data.liked;
        });

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

      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            data.miniModel = !entry.isIntersecting;
          });
        },
        {
          root: null,
          rootMargin: "0px 0px 30px 0px",
        }
      );
      observer.observe(playContainer.value);

      watch(() => router.currentRoute.value.query.id, () => {
        if (router.currentRoute.value.name == 'VideoPlay') {
          location.reload()
        }
      })
    });
    return {
      ...toRefs(data),
      pageChange,
      likeEvent,
      commentEvent,
      creatorClick,
      toFollow,
      title,
      router,
      playContainer,
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
      aspect-ratio: 2/1.1;
      background-color: #000;
      margin-bottom: 25px;
    }
    .creatorInfo {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      cursor: pointer;
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
          background-color: @eventBgc;
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
        .likeItem {
          color: @themeColor !important;
          border: 1px solid @themeColor !important;
        }
        .dataItem {
          margin-right: 20px;
          padding: 6px 16px;
          font-size: 13px;
          color: @fontColor;
          border-radius: 35px;
          border: 1px solid #6b6b6b;
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
          background-color: @eventBgc;
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
            font-size: 13px;
            padding: 10px 24px;
            background-color: @eventBgc;
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
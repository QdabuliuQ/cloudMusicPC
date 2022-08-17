<template>
  <div id="VideoPlay">
    <div class="leftVideoContainer">
      <pageNav :title="'MV详情'" :icon="true"></pageNav>
      <div ref="playContainer" class="playContainer">
        <mediaPlay :miniModel="miniModel" :src="url"></mediaPlay>
      </div>
      <div
        @click="router.push('/SingerDetail?id=' + item.id)"
        v-if="videoInfo.artists.length"
        v-for="item in videoInfo.artists"
        :key="item.id"
        class="creatorInfo"
      >
        <div class="leftInfo">
          <el-avatar :size="50" :src="item.img1v1Url" />
          <span style="margin-left: 15px">{{ item.name }}</span>
        </div>
      </div>
      <div class="videoInfo">
        <div class="videoTitle">
          {{ videoInfo.name }}
        </div>
        <div class="videoDesc">
          {{ videoInfo.desc }}
        </div>
        <div class="videoParams">
          <div class="time">发布时间：{{ videoInfo.publishTime }}</div>
          <div class="count">
            播放量：{{ $countFormat(videoInfo.playCount) }}次
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
            {{ likedCount }}
          </div>
          <div
            @click="collectEvent"
            :class="[subed ? 'likeItem' : '', 'dataItem']"
          >
            <img v-if="subed" src="~images/common/collect.png" alt="" />
            <img v-else src="~images/common/uncollect.png" alt="" />
            {{ videoInfo.subCount }}
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
              :id="videoInfo.id"
              :cid="item.commentId"
              :type="1"
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
              :id="videoInfo.id"
              :cid="item.commentId"
              :type="1"
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
          @creatorClick="creatorClick"
          @click="router.push('/MvPlay?id=' + item.id)"
          v-for="item in relateVideoList"
          :key="item.id"
          :coverUrl="item.cover"
          :durationms="item.duration"
          :title="item.name"
          :creator="item.artists"
          :playTime="item.playCount"
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
  getCurrentInstance,
  watch,
} from "vue";
import pageNav from "@/components/private/pageNav.vue";
import { useRouter } from "vue-router";
import { InitData } from "@/types/MvPlay/MvPlay";
import {
  getMVUrl,
  getMVDetail,
  getMVSimilar,
  getMVData,
  getMVComment,
  collectMv,
} from "@/network/MvPlay/mvPlay";
import { commentResource } from "@/network/UserInfo/userEvents";

import followBtn from "@/components/private/followBtn.vue";
import commentItem from "@/components/private/commentItem.vue";
import videoItem from "../VideoPlay/videoItem.vue";
import mediaPlay from "@/components/common/mediaPlay.vue";
import commentArea from "@/components/common/commentArea.vue";
import useLogin from "@/hooks/useLogin";
import emptyContent from "@/components/common/emptyContent.vue";
import { likeResource } from "@/network/VideoPlay/videoPlay";

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
    const _this: any = getCurrentInstance();
    const data = reactive(new InitData());
    const router = useRouter();
    const title = ref();
    const playContainer = ref();

    const creatorClick = (e: number) => {
      router.push("/SingerDetail?id=" + e);
    };
    const collectEvent = () => {
      collectMv({
        mvid: router.currentRoute.value.query.id as string,
        t: data.subed ? 0 : 1,
      }).then((res: any) => {
        if (res.data.code == 200) {
          data.subed = !data.subed;
          data.subed ? data.videoInfo.subCount++ : data.videoInfo.subCount--;
        }
      });
    };
    const shareEvent = () => {
      _this.proxy.$toShare(
        router.currentRoute.value.query.id,
        "mv",
        data.videoInfo.name,
        data.videoInfo.cover
      );
    };
    // 评论回调
    const commentEvent = (e: { content: string; cid: number }) => {
      if (e.cid) {
        commentResource({
          t: 2,
          type: 1,
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
          type: 1,
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
        likeResource({
          type: 1,
          t: data.liked ? 0 : 1,
          id: t.id as string,
        }).then((res: any) => {
          if (res.data.code == 200) {
            data.liked = !data.liked;
            data.liked ? data.likedCount++ : data.likedCount--;
          }
        });
      }
    };

    // 评论页码切换
    const pageChange = (e: number) => {
      data.offset = e;
      getCommentData(false);
      window.scrollTo(0, title.value.offsetTop - 55);
    };
    // 获取评论数据
    const getCommentData = (tPage: boolean) => {
      getMVComment({
        id: router.currentRoute.value.query.id as string,
        limit: 20,
        offset: (data.offset - 1) * 20,
      }).then((res: any) => {
        data.total = res.data.total;
        if (tPage) {
          data.hotComment = res.data.hotComments;
        }
        data.allComment = res.data.comments;
      });
    };

    watch(
      () => router.currentRoute.value.query.id,
      (n) => {
        if (router.currentRoute.value.name == "MvPlay") {
          location.reload();
        }
      }
    );

    onMounted(() => {
      let t = router.currentRoute.value.query;
      getMVUrl({
        id: t.id as string,
      }).then((res: any) => {
        data.url = res.data.data.url;
      });

      getMVDetail({
        mvid: t.id as string,
      }).then((res: any) => {
        data.videoInfo = res.data.data;
        data.subed = res.data.subed;
      });

      getMVSimilar({
        mvid: t.id as string,
      }).then((res: any) => {
        data.relateVideoList = res.data.mvs;
      });

      getMVData({
        mvid: t.id as string,
      }).then((res: any) => {
        data.likedCount = res.data.likedCount;
        data.liked = res.data.liked;
      });

      getCommentData(true);

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
    });
    return {
      ...toRefs(data),
      pageChange,
      collectEvent,
      shareEvent,
      likeEvent,
      commentEvent,
      creatorClick,
      router,
      title,
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
            color: var(--textColor);
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
            background-color: var(--hoverColor);
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
          color: var(--textColor);
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
            color: var(--textColor);
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
              color: var(--textColor);
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
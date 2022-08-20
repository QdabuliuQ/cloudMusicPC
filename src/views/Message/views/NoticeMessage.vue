<template>
  <div id="NoticeMessage">
    <loading v-if="!noticeList.length && more == null" />
    <emptyContent v-else-if="!noticeList.length && more == false" />
    <div
      v-else
      v-masonry
      transiton-duration="0.3s"
      item-selector=".noticeItem"
      column-width=".noticeItem"
      :gutter="10"
      v-infinite-scroll="loadData"
      :infinite-scroll-disabled="!more"
      :infinite-scroll-delay="700"
      :infinite-scroll-immediate="false"
      class="noticeContainer"
    >
      <div
        v-for="item in noticeList"
        :key="item.id"
        :style="{
          marginBottom:
            item.notice.type == 1 ||
            item.notice.type == 2 ||
            item.notice.type == 6 ||
            item.notice.type == 10
              ? '10px'
              : '0px',
        }"
        class="noticeItem"
      >
        <div
          v-if="
            item.notice.type == 1 ||
            item.notice.type == 2 ||
            item.notice.type == 6 ||
            item.notice.type == 10
          "
          class="itemContainer"
        >
          <div class="userInfo">
            <el-avatar :size="40" :src="item.notice.user.avatarUrl" />
            <div class="otherInfo">
              <div
                @click="
                  router.push('/UserDetail?id=' + item.notice.user.userId)
                "
                class="name"
              >
                {{ item.notice.user.nickname }}
              </div>
              <div
                style="margin-top: 3px"
                v-if="item.notice.user.signature != ''"
                class="sign"
              >
                {{ item.notice.user.signature }}xxxxxxx
              </div>
            </div>
          </div>
          <div class="noticeInfo">
            <div class="infoTitle">
              <span>{{ item.notice.user.nickname }}</span>
              {{ item.notice.type != 10 ? typeText(item.notice.type) : item.notice.generalNotice.actionDesc }}
            </div>
            <div class="infoContainer">
              <div class="eventContainerInfo" v-if="item.notice.type == 1">
                <img src="~images/common/event.png" alt="">
                {{ getMsg(item.notice.track.json) }}
              </div>
              <div
                @click="
                  router.push('/SheetDetail?id=' + item.notice.playlist.id)
                "
                class="playlistInfo"
                v-else-if="item.notice.type == 2"
              >
                <img src="~images/shareDialog/musicEvent.png" alt="" />
                {{ item.notice.playlist.name }}
              </div>
              <div class="commentContainerInfo" v-else-if="item.notice.type == 6">
                <img src="~images/common/comment.png" alt="" />
                {{ item.notice.comment.content }}
              </div>
              <div class="hugContainerInfo" v-else-if="item.notice.type == 10">
                <img src="~images/common/hug.png" alt="" />
                {{ item.notice.generalNotice.content }}
              </div>
            </div>
          </div>
          <div class="timeInfo">
            {{$getTime(item.time)}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, getCurrentInstance } from "vue";
import { getNoticeList } from "@/network/Message/noticeMessage";
import { InitData } from "@/types/Message/NoticeMessage";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "NoticeMessage",
  components: {
    loading,
    emptyContent,
  },
  setup() {
    const router = useRouter();
    const _this: any = getCurrentInstance();
    const data = reactive(new InitData());

    const getMsg = (json: string) => {
      return (JSON.parse(json).msg).trim();
    };
    const typeText = (t: number) => {
      switch (t) {
        case 6:
          return "点赞你的评论";
        case 1:
          return "点赞你的动态";
        case 2:
          return "收藏你的歌单";
      }
    };
    const loadData = () => {
      getData();
    };

    const getData = () => {
      getNoticeList({
        limit: 30,
        lasttime: data.lasttime,
      }).then((res: any) => {
        data.more = res.data.more;
        for (const item of res.data.notices) {
          item.notice = JSON.parse(item.notice);
        }
        data.lasttime = res.data.notices[res.data.notices.length - 1].time;
        data.noticeList = [...data.noticeList, ...res.data.notices];
        console.log(data.noticeList);

        setTimeout(() => {
          _this.appContext.config.globalProperties.$redrawVueMasonry();
        }, 50);
      });
    };
    getData();

    return {
      router,
      getMsg,
      typeText,
      loadData,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#NoticeMessage {
  .noticeContainer {
    width: 100%;
    .noticeItem {
      width: 24.2%;
      margin-bottom: 12px;
      box-sizing: border-box;
      background-color: var(--hoverColor);
      border-radius: 8px;
      .itemContainer {
        padding: 10px 14px;
        .userInfo {
          display: flex;
          align-items: center;
          .el-avatar {
            min-width: 40px;
          }
          .otherInfo {
            flex: 1;
            margin-left: 7px;
            .name {
              color: var(--nameColor);
              font-size: 13px;
              cursor: pointer;
            }
            .sign {
              width: 220px;
              color: @fontColor;
              font-size: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .noticeInfo {
          padding: 10px;
          background-color: var(--messageColor);
          margin-top: 10px;
          border-radius: 10px;
          .infoTitle {
            font-size: 13px;
            span {
              color: var(--nameColor);
            }
          }
          .infoContainer {
            margin-top: 6px;
            font-size: 13px;
            .eventContainerInfo {
              word-break: break-word;
              line-height: 23px;
              img {
                position: relative;
                top: 3px;
                width: 17px;
                margin-right: 2px;
              }
            }
            .playlistInfo {
              cursor: pointer;
              display: flex;
              align-items: center;
              color: @fontColor;
              img {
                width: 30px;
                margin-right: 5px;
              }
            }
            .commentContainerInfo {
              line-height: 23px;
              img {
                width: 20px;
                position: relative;
                top: 6px;
              }
            }
            .hugContainerInfo {
              line-height: 23px;
              img {
                width: 17px;
                margin-right: 4px;
                position: relative;
                top: 3px;
              }
            }
          }
        }
        .timeInfo {
          margin-top: 5px;
          font-size: 13px;
          color: @fontColor;
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
}
</style>
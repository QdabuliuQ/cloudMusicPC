<template>
  <div id="detailPanel">
    <div class="leftPanel">
      <el-avatar
        style="border-radius: 10px"
        shape="square"
        :size="200"
        :fit="'cover'"
        :src="picUrl"
      />
    </div>
    <div class="rightPanel">
      <div class="infoName infoItem">
        <span class="target">{{ target }}</span>
        <div class="name">{{ name }}</div>
      </div>
      <div
        @click="router.push('/UserDetail?id=' + userId)"
        class="infoCreator infoItem"
      >
        <el-avatar style="margin-right: 7px" :size="30" :src="avatarUrl" />
        {{ nickname }}
      </div>
      <div class="infoBtn infoItem">
        <div
          @click="collectEvent"
          :class="[
            isCollect ? 'collectBtn' : '',
            id == userId ? 'disableBtn' : '',
            'btnItem',
          ]"
        >
          <img v-if="isCollect" src="~images/common/collect.png" alt="" />
          <img v-else src="~images/common/uncollect.png" alt="" />
          {{ isCollect ? "已收藏" : "收藏" }}({{ subCount }})
        </div>
        <div @click="shareResource" class="btnItem">
          <img src="~images/common/share.png" alt="" />
          分享({{ shareCount }})
        </div>
        <el-popover
          v-if="target == '歌单' && useLogin(false)"
          placement="bottom"
          :width="170"
          trigger="click"
        >
          <template #reference>
            <div class="btnItem">
              <img src="~images/common/chat.png" alt="" />
              私信
            </div>
          </template>
          <div class="userListContainer">
            <el-scrollbar height="250px">
              <div
                @click="userClick(index)"
                v-for="(item, index) in contactorList"
                :key="item.userId"
                class="userItem"
              >
                <el-avatar
                  style="margin-right: 5px"
                  :size="30"
                  :src="item.avatarUrl"
                />
                <div class="name">
                  {{ item.nickname }}
                </div>
              </div>
            </el-scrollbar>
          </div>
        </el-popover>
      </div>
      <div v-if="target == '歌单'" class="infoDesc2">
        <div class="infoItem2">
          <div class="infoTitle">标签:&nbsp;&nbsp;</div>
          <div class="infoContent">
            <span v-if="tags.length" v-for="item in tags" :key="item">
              {{ item }}
            </span>
            <span
              @click="router.push('/EditSheet?id=' + rid)"
              v-else-if="id == userId"
              >添加标签</span
            >
            <span class="noData" v-else>暂无标签</span>
          </div>
        </div>
        <div class="infoItem2">
          <div class="infoTitle">
            歌曲:&nbsp;&nbsp;<span>{{ count }}</span>
          </div>
          <div style="margin-left: 15px" class="infoTitle">
            播放:&nbsp;&nbsp;<span>{{ $countFormat(playCount) }}</span>
          </div>
        </div>
        <div class="infoItem2">
          <div :title="desc" class="infoTitle overTwoLine">
            简介:&nbsp;
            <span v-if="desc">{{ desc }}</span>
            <span
              @click="router.push('/EditSheet?id=' + rid)"
              class="addDesc"
              v-else-if="id == userId"
            >
              添加简介
            </span>
            <span v-else>暂无简介</span>
          </div>
        </div>
      </div>
      <div v-else class="infoDesc">
        <span class="target">{{ category }}</span>
        <div :title="desc" class="desc">
          {{ desc }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, watch } from "vue";
import { collectSheet } from "@/network/DetailPanel/detailPanel";
import { useRouter } from "vue-router";
import bus from "vue3-eventbus";
import useLogin from "@/hooks/useLogin";
import { getRecentContractor } from "@/network/Message/privateMessage";

export default defineComponent({
  props: [
    "picUrl",
    "name",
    "desc",
    "shareCount",
    "subCount",
    "subed",
    "nickname",
    "avatarUrl",
    "userId",
    "target",
    "category",
    "tags",
    "count",
    "playCount",
    "rid",
  ],
  emits: ["shareEvent", "collectEvent", "sendMessageEvent"],
  name: "detailPanel",
  setup(props, context) {
    const router = useRouter();
    const data = reactive({
      id: decodeURIComponent(window.atob(localStorage.getItem("id") as string)),
      isCollect: false,
      contactorList: <any>[]
    });

    const collectEvent = () => {
      if (useLogin()) {
        if (data.id != props.userId && props.target == "歌单") {
          collectSheet({
            t: props.subed ? 2 : 1,
            id: router.currentRoute.value.query.id as string,
          }).then((res: any) => {
            if (res.data.code == 200) {
              bus.emit("refreshSheetList");
              data.isCollect = props.subed ? false : true;
            }
          });
        } else if (props.target == "播客") {
        }
      }
    };
    const shareResource = () => {
      if (useLogin()) {
        context.emit("shareEvent");
      }
    };
    const userClick = (e: number) => {
      if (useLogin()) {
        context.emit("sendMessageEvent", {
          nickname: data.contactorList[e].nickname,
          id: data.contactorList[e].userId
        });
      }
    };
    if (useLogin(false)) {
      getRecentContractor().then((res: any) => {
        data.contactorList = res.data.data.follow;
      });
    }

    watch(
      () => props.subed,
      (n) => {
        data.isCollect = n;
      },
      { immediate: true }
    );

    return {
      ...toRefs(data),
      useLogin,
      userClick,
      shareResource,
      collectEvent,
      router,
    };
  },
});
</script>

<style lang='less'>
#detailPanel {
  width: 100%;
  display: flex;
  .leftPanel {
    margin-right: 20px;
  }
  .rightPanel {
    .noData {
      color: @fontColor !important;
    }
    .target {
      display: inline-block;
      font-size: 14px;
      padding: 3px 10px 3px;
      color: @themeColor;
      border: 1px solid @themeColor;
      zoom: 0.8;
      margin-right: 7px;
    }
    .infoItem {
      margin-bottom: 15px;
    }
    .infoName {
      display: flex;
      align-items: center;
      .name {
        font-size: 20px;
        font-weight: bold;
        color: var(--textColor);
      }
    }
    .infoCreator {
      font-size: 13px;
      color: var(--nameColor);
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .infoBtn {
      display: flex;
      align-items: center;
      .collectBtn {
        border: 1px solid @themeColor !important;
        color: @themeColor !important;
      }
      .disableBtn {
        background-color: #4a4a4a;
        color: @fontColor;
        cursor: not-allowed !important;
      }
      .btnItem {
        padding: 5px 18px 6px;
        font-size: 13px;
        display: flex;
        align-items: center;
        border-radius: 30px;
        border: 1px solid #5b5b5b;
        cursor: pointer;
        margin-right: 15px;
        color: var(--textColor);
        &:hover {
          background-color: var(--hoverColor);
        }
        img {
          width: 20px;
          margin-right: 5px;
        }
      }
    }
    .infoDesc {
      display: flex;
      white-space: pre;
      font-size: 13px;
      line-height: 25px;
      color: #d5d5d5;
      .desc {
        width: 700px;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .infoDesc2 {
      font-size: 13px;
      color: #d5d5d5;

      .infoItem2 {
        display: flex;
        align-items: center;
        margin-bottom: 8px;

        .infoTitle {
          color: var(--textColor);
          span {
            color: var(--textColor);
            line-height: 20px;
            cursor: pointer;
          }
          .addDesc {
            color: var(--nameColor);
            cursor: pointer;
          }
        }
        .infoContent {
          span {
            margin-right: 10px;
            color: var(--nameColor);
            cursor: pointer;
          }
        }
      }
    }
    .userListContainer {
      .userItem {
        font-size: 12px;
        display: flex;
        align-items: center;
        padding: 6px 0;
        cursor: pointer;
        .name {
          margin-left: 8px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
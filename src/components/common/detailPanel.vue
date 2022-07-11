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
      <div class="infoCreator infoItem">
        <el-avatar style="margin-right: 7px" :size="30" :src="avatarUrl" />
        {{ nickname }}
      </div>
      <div class="infoBtn infoItem">
        <div class="btnItem">
          <img v-if="subed" src="~images/common/collect.png" alt="" />
          <img v-else src="~images/common/uncollect.png" alt="" />
          {{ subed ? "已收藏" : "收藏" }}({{ subCount }})
        </div>
        <div @click="shareResource" class="btnItem">
          <img src="~images/common/share.png" alt="" />
          分享({{ shareCount }})
        </div>
      </div>
      <div v-if="target == '歌单'" class="infoDesc2">
        <div class="infoItem2">
          <div class="infoTitle">
            标签:&nbsp;&nbsp;
          </div>
          <div class="infoContent">
            <span v-for="item in tags" :key="item">
              {{item}}
            </span>
          </div>
        </div>
        <div class="infoItem2">
          <div class="infoTitle">
            歌曲:&nbsp;&nbsp;<span>{{count}}</span>
          </div>
          <div style="margin-left: 15px" class="infoTitle">
            播放:&nbsp;&nbsp;<span>{{$countFormat(playCount)}}</span>
          </div>
        </div>
        <div class="infoItem2">
          <div :title="desc" class="infoTitle overTwoLine">
            简介:&nbsp;&nbsp;<span>{{desc}}</span>
          </div>
        </div>
      </div>
      <div v-else class="infoDesc">
        <div>
          <span class="target">{{ category }}</span>
        </div>
        <div :title="desc" class="desc">
          {{ desc }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

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
    "playCount"
  ],
  emits: ['shareEvent'],
  name: "detailPanel",
  setup(props, context) {
    const shareResource = () => {
      context.emit('shareEvent')
    }

    return {
      shareResource
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
    .target {
      display: inline-block;
      font-size: 14px;
      padding: 4px 8px 6px;
      color: @themeColor;
      border: 1px solid @themeColor;
      transform: scale(0.8);
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
      }
    }
    .infoCreator {
      font-size: 13px;
      color: @nameColor;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .infoBtn {
      display: flex;
      align-items: center;
      .btnItem {
        padding: 5px 18px 6px;
        font-size: 13px;
        display: flex;
        align-items: center;
        border-radius: 30px;
        border: 1px solid #5b5b5b;
        cursor: pointer;
        margin-right: 15px;
        &:hover {
          background-color: #434343;
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
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        word-break: break-all;
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
          span {
            color: @fontColor;
            line-height: 20px;
          }
        }
        .infoContent {
          span {
            margin-right: 10px;
            color: @nameColor;
          }
        }
      }
    }
  }
}
</style>
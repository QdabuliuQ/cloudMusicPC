<template>
  <div id="TopicDetail">
    <div class="topContainer">
      <div class="imgBox">
        <img :src="info.coverPCUrl" alt="" />
        <div class="topicInfo">
          <div class="topicTitle">#{{ info.title }}#</div>
          <div class="topicCount">{{ info.participateCount }}人参与</div>
        </div>
      </div>
      <div class="tipList">
        <ul>
          <li v-for="(item, index) in info.text" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <div class="eventContainer">
      <div class="eventTitle">热门动态</div>
      <div class="routerView">
        <router-view :actid="id"></router-view>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { getTopicDetail } from "@/network/Topic/topic";
import { useRouter } from "vue-router";
import { InitData } from "@/types/Topic/TopicDetail";

export default defineComponent({
  name: "TopicDetail",
  setup() {
    const data = reactive(new InitData());
    const router = useRouter();
    data.id = router.currentRoute.value.query.id as string;
    onMounted(() => {
      getTopicDetail({
        actid: data.id,
      }).then((res: any) => {
        data.info = res.data.act;
      });
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#TopicDetail {
  padding: 40px;
  .topContainer {
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 1px solid #525252;
    .imgBox {
      width: 100%;
      height: 240px;
      overflow: hidden;
      border-radius: 10px;
      position: relative;
      @keyframes turnZ {
        0% {
          transform: rotateZ(0deg);
        }

        100% {
          transform: rotateZ(360deg);
        }
      }
      &:hover {
        .topicInfo {
          transform: translate(-50%, -50%) scale(1);
        }
        img {
          filter: blur(0px);
        }
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: blur(10px);
        transition: 0.2s all linear;
      }
      .topicInfo {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0.9);
        padding: 15px 10px;
        transition: 0.3s all linear;
        border-top: 1px solid #ababab;
        border-bottom: 1px solid #ababab;
        .topicTitle {
          font-weight: bold;
          font-size: 20px;
          letter-spacing: 2px;
        }
        .topicCount {
          text-align: center;
          font-size: 12px;
          margin-top: 4px;
        }
      }
    }
    .tipList {
      ul {
        padding-left: 17px;
      }
      font-size: 13px;
      color: @fontColor;
      li {
        margin-bottom: 8px;
      }
      li::marker {
        color: var(--el-color-primary);
      }
    }
  }
  .eventContainer {
    padding: 15px 0;
    .eventTitle {
      font-size: 14px;
      color: @fontColor;
      font-weight: bold;
      margin-bottom: 10px;
    }
    #UserEvents {
      padding: 0 !important;
      .title {
        display: none;
      }
    }
  }
}
</style>
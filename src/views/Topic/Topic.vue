<template>
  <div id="Topic">
    <div :infinite-scroll-immediate='false' :infinite-scroll-delay='700' :infinite-scroll-disabled="disableScroll" v-infinite-scroll="loadData" class="topicContainer">
      <div @click="toPage('/TopicDetail?id='+item.actId)" class="topicItem" v-for="item in topicList" :key="item.actId">
        <el-avatar
          shape="square"
          :size="80"
          :fit="'cover'"
          :src="item.sharePicUrl"
        />
        <div class="info">
          <div class="name">#{{ item.title }}#</div>
          <div class="count">{{ item.participateCount }}人参与</div>
          <div class="text">
            <span v-for="(i, index) in item.text" :key="index">
              {{ i }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { getHotTopic } from "@/network/Follow/follow";
import { InitData } from "@/types/Topic/Topic";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Topic",
  setup() {
    const data = reactive(new InitData());
    const router = useRouter()

    const toPage = (e: string) => {
      router.push(e)
    }
    const loadData = () => {
      getData();
    };
    const getData = () => {
      getHotTopic({
        limit: 40,
        offset: data.offset * 40,
      }).then((res: any) => {
        if (res.data.hot.length) {
          data.offset++;
          data.topicList = [...data.topicList, ...res.data.hot];
        } else {
          data.disableScroll = true
        }
      });
    };

    onMounted(() => {
      getData();
    });
    return {
      ...toRefs(data),
      loadData,
      toPage
    };
  },
});
</script>

<style lang='less'>
#Topic {
  padding: 40px;
  .topicContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 15px;
    .topicItem {
      display: flex;
      align-items: center;
      cursor: pointer;
      &:hover {
        background-color: @hoverColor;
      }
      .info {
        width: 10vw;
        margin-left: 10px;
        .name {
          font-weight: bold;
          font-size: 14px;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap;
        }
        .count {
          font-size: 12px;
          color: @fontColor;
          margin-top: 6px;
          
        }
        .text {
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap;
          font-size: 12px;
          color: @fontColor;
          margin-top: 6px;
        }
      }
    }
  }
}
</style>
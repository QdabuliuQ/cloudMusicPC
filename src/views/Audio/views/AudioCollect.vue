<template>
  <div id="AudioCollect">
    <loading v-if="!userList.length"></loading>
    <div
      v-else
      :infinite-scroll-immediate="false"
      :infinite-scroll-delay="700"
      :infinite-scroll-disabled="disableScroll"
      v-infinite-scroll="loadData"
      class="userContainer"
    >
      <div v-for="item in userList" :key="item.userId" class="userItem">
        <el-avatar style="margin-left: 8px" :size="50" :src="item.avatarUrl" />
        <div class="itemInfo">
          <div class="itemName">{{ item.nickname }}</div>
          <div class="itemSignature">{{ item.signature }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { InitData } from "@/types/Audio/AudioCollect";
import { getAudioCollect } from "@/network/Audio/audioCollect";
import { useRouter } from "vue-router";
import loading from "@/components/common/loading.vue";

export default defineComponent({
  name: "AudioCollect",
  components: {
    loading
  },
  setup() {
    const data = reactive(new InitData());
    const router = useRouter();

    // 获取数据
    const getData = () => {
      getAudioCollect({
        id: router.currentRoute.value.query.audioId as string,
        time: data.time,
        limit: 40,
      }).then((res: any) => {
        if (res.data.subscribers.length) {
          data.time = res.data.time;
          data.userList = [...data.userList, ...res.data.subscribers];
        } else {
          data.disableScroll = true;
        }
      });
    };

    const loadData = () => {
      getData();
    };

    onMounted(() => {
      getData();
    });
    return {
      ...toRefs(data),
      loadData,
    };
  },
});
</script>

<style lang='less'>
#AudioCollect {
  .userContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;
    .userItem {
      display: flex;
      align-items: center;
      font-size: 13px;
      cursor: pointer;
      padding: 8px 0;
      border-radius: 8px;
      &:hover {
        background-color: var(--hoverColor);
      }
      .itemInfo {
        margin-left: 10px;
        .itemName {
          width: 15vw;
          margin-bottom: 5px;
          overflow: hidden;
          white-space: nowrap; //内容超出不换行
          text-overflow: ellipsis;
        }
        .itemSignature {
          width: 15vw;
          font-size: 12px;
          color: @fontColor;
          overflow: hidden;
          white-space: nowrap; //内容超出不换行
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
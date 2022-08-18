<template>
  <loading v-if="!sheetList.length && count != 0"></loading>
  <emptyContent v-else-if="count == 0"></emptyContent>
  <div v-else id="UserSheet">
    <div
      @click="router.push('/SheetDetail?id=' + item.id)"
      v-for="item in sheetList"
      :key="item.id"
      class="sheetItem"
    >
      <img class="sheetIcon" src="~images/common/sheetPlay.png" alt="" />
      <div v-if="item.privacy == 10" class="lockMask">
        <img style="width: 25px" src="~images/common/lock_white.png" alt="" />
      </div>
      <div class="mask">
        <span>
          <img src="~images/recommend/playLine_white.png" alt="" />
          {{ $countFormat(item.playCount) }}
        </span>
      </div>
      <el-image
        style="width: 100%; height: 190px"
        :fit="'cover'"
        :src="item.coverImgUrl"
      />
      <div class="sheetName">
        {{ item.name }}
        <div class="sheetData">{{ item.trackCount }}首</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, watch } from "vue";
import { getUserSheet } from "@/network/MenuList/menuList";
import { useRouter } from "vue-router";
import { InitData } from "@/types/AccountDetail/UserSheet";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";

export default defineComponent({
  name: "UserSheet",
  components: {
    loading,
    emptyContent,
  },
  setup() {
    const router = useRouter();
    const data = reactive(new InitData());
    data.id = router.currentRoute.value.query.id as string;

    const getData = () => {
      data.sheetList = [];
      getUserSheet({
        uid: data.id,
        limit: 999,
        offset: 0,
      }).then((res: any) => {
        if (router.currentRoute.value.name == "UserSheet") {
          for (const item of res.data.playlist) {
            if (item.userId == data.id) {
              data.sheetList.push(item);
            }
          }
          data.count = data.sheetList.length;
        } else {
          for (const item of res.data.playlist) {
            if (item.userId != data.id) {
              data.sheetList.push(item);
            }
          }
          data.count = data.sheetList.length;
        }
      });
    };

    onMounted(() => {
      getData();
    });

    watch(
      () => router.currentRoute.value.name,
      (n: any) => {
        data.count = 999;
        data.id = router.currentRoute.value.query.id as string;
        getData();
      }
    );

    watch(
      () => router.currentRoute.value.query.id,
      (n) => {
        if (data.id != n) {
          data.id = n as string;
          getData();
        }
      }
    );

    return {
      ...toRefs(data),
      router,
    };
  },
});
</script>

<style lang='less'>
#UserSheet {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  .sheetItem {
    cursor: pointer;
    position: relative;
    &:hover {
      .sheetIcon {
        opacity: 1;
      }
    }
    .lockMask {
      position: absolute;
      z-index: 2;
      width: 0;
      height: 0;
      right: 0;
      bottom: 42px;
      border-left: 40px solid transparent;
      border-right: 40px solid #00000096;
      border-top: 40px solid transparent;
      border-bottom: 40px solid #00000096;
      img {
        position: relative;
        top: 4px;
        left: 4px;
      }
    }
    .sheetIcon {
      position: absolute;
      z-index: 2;
      top: 43%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50px;
      opacity: 0;
      transition: 0.2s all linear;
    }
    .mask {
      display: flex;
      justify-content: flex-end;
      font-size: 12px;
      position: absolute;
      z-index: 2;
      width: 100%;
      height: 30px;
      background-image: linear-gradient(#00000057, transparent);
      color: #fff;
      img {
        width: 15px;
        margin-right: 3px;
      }
      span {
        margin-right: 7px;
        display: flex;
        align-items: center;
      }
    }
    .sheetName {
      max-width: 170px;
      min-width: 150px;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--textColor);
    }
    .sheetData {
      font-size: 12px;
      color: @fontColor;
      margin-top: 3px;
    }
  }
}
</style>
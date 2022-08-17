<template>
  <div id="SheetCollect">
    <loading v-if="userList.length == 0 && total != 0"></loading>
    <emptyContent v-else-if="total == 0"></emptyContent>
    <div
      v-else
      :infinite-scroll-immediate="false"
      :infinite-scroll-delay="700"
      :infinite-scroll-disabled="disableScroll"
      v-infinite-scroll="loadData"
      class="userContainer"
    >
      <div
        @click="router.push('/UserDetail?id=' + item.userId)"
        v-for="item in userList"
        :key="item.userId"
        class="userItem"
      >
        <el-avatar style="margin-left: 8px" :size="50" :src="item.avatarUrl" />
        <div class="itemInfo">
          <div class="itemName">{{ item.nickname }}</div>
          <div class="itemSignature">{{ item.signature }}</div>
        </div>
      </div>
    </div>
    <div v-if="!useLogin(false)" class="tip">登录查看更多评论</div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import { InitData } from "@/types/SheetDetail/SheetCollect";
import { getSheetCollect } from "@/network/SheetDetail/sheetDetail";
import { useRouter } from "vue-router";
import useLogin from "@/hooks/useLogin";

export default defineComponent({
  name: "SheetCollect",
  components: {
    loading,
    emptyContent,
  },
  setup() {
    const data = reactive(new InitData());
    const router = useRouter();

    const loadData = () => {
      getData();
    };

    const getData = () => {
      getSheetCollect({
        id: router.currentRoute.value.query.id as string,
        limit: 40,
        offset: data.offset * 40,
      }).then((res: any) => {
        data.total = res.data.total;
        if (res.data.subscribers.length) {
          data.type = res.data.reason;
          data.offset++;
          data.userList = [...data.userList, ...res.data.subscribers];
        } else {
          data.disableScroll = true;
        }
      });
    };

    onMounted(() => {
      getData();
    });
    return {
      ...toRefs(data),
      loadData,
      useLogin,
      router,
    };
  },
});
</script>

<style lang='less'>
#SheetCollect {
  padding: 0 30px 30px;
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
          color: var(--textColor);
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
  .tip {
    margin-top: 10px;
    font-size: 13px;
    text-align: center;
  }
}
</style>
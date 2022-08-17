<template>
  <div id="UserFollow">
    <div v-if="userInfo" class="title">{{ userInfo.nickname }}的关注</div>
    <!-- <loading v-if="!userList.length"></loading> -->
    <emptyContent v-if="!userList.length"></emptyContent>
    <div v-else class="userContainer">
      <userItem
        v-for="item in userList"
        :key="item.userId"
        @click="router.push('/UserDetail?id=' + item.userId)"
        :avatarUrl="item.avatarUrl"
        :nickname="item.nickname"
        :signature="item.signature"
        :playlistCount="item.playlistCount"
        :followeds="item.followeds"
      ></userItem>
    </div>
    <div
      v-if="userInfo"
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 15px;
      "
    >
      <el-pagination
        v-if="follows > 32"
        @current-change="pageChange"
        :page-size="32"
        :current-page="offset"
        background
        layout="prev, pager, next"
        :total="follows"
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { getFollowList } from "@/network/UserInfo/userFollow";
import { InitData } from "@/types/UserInfo/UserFollow";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import userItem from "@/components/private/userItem.vue";
import { useRouter } from "vue-router";
import { getUserDetail } from "@/network/LoginDialog/loginDialog";

export default defineComponent({
  name: "UserFollow",
  components: {
    loading,
    emptyContent,
    userItem,
  },
  setup() {
    const router = useRouter();
    const data = reactive(new InitData());

    const pageChange = (e: number) => {
      data.offset = e;
      getData();
    };

    const getData = () => {
      getFollowList({
        offset: (data.offset - 1) * 32,
        limit: 32,
        uid: router.currentRoute.value.query.id as string,
      }).then((res: any) => {
        data.total = res.data.touchCount
        data.userList = res.data.follow;
      });
    };

    onMounted(() => {
      getData();
      getUserDetail({
        uid: parseInt(router.currentRoute.value.query.id as string),
      }).then((res: any) => {
        data.userInfo = res.data.profile;
        data.follows = data.userInfo.follows;
      });
    });
    return {
      ...toRefs(data),
      pageChange,
      router,
    };
  },
});
</script>

<style lang='less'>
#UserFollow {
  padding: 40px;
  .title {
    font-size: 19px;
    font-weight: bold;
    margin-bottom: 30px;
    color: var(--textColor);
  }
  .userContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
    .userItem {
      display: flex;
      align-items: center;
      cursor: pointer;
      .leftInfo {
        display: flex;
        align-items: center;
        margin-right: 10px;
      }
      .rightInfo {
        font-size: 14px;
        .name {
          color: var(--textColor);
        }
        .signature {
          margin-top: 10px;
          font-size: 12px;
          color: @fontColor;
          width: 150px;
          word-break: keep-all;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .detail {
          font-size: 12px;
          color: @fontColor;
        }
      }
    }
  }
}
</style>
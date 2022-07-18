<template>
  <div id="UserFollow">
    <div v-if="userInfo" class="title">{{ userInfo.nickname }}的关注</div>
    <loading v-if="!userList.length"></loading>
    <div v-else class="userContainer">
      <userItem
        :avatarUrl="item.avatarUrl"
        :nickname="item.nickname"
        :signature="item.signature"
        :playlistCount="item.playlistCount"
        :followeds="item.followeds"
        v-for="item in userList"
        :key="item.userId"
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
import userItem from "@/components/private/userItem.vue";
import useLogin from "@/hooks/useLogin";

export default defineComponent({
  name: "UserFollow",
  components: {
    loading,
    userItem,
  },
  setup() {
    const data = reactive(new InitData());

    const pageChange = (e: number) => {
      data.offset = e;
      getData();
    };

    const getData = () => {
      getFollowList({
        offset: (data.offset - 1) * 32,
        limit: 32,
      }).then((res: any) => {
        data.userList = res.data.follow;
      });
    };

    onMounted(() => {
      if (useLogin()) {
        getData();
        data.userInfo = JSON.parse(
          decodeURIComponent(
            window.atob(localStorage.getItem("data") as string)
          )
        );
        data.follows = data.userInfo.follows;
      }
    });
    return {
      ...toRefs(data),
      pageChange,
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
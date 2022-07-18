<template>
  <div id="UserFans">
    <div v-if="userInfo" class="title">{{ userInfo.nickname }}的粉丝</div>
    <loading v-if="!userList.length"></loading>
    <emptyContent v-else-if="size == 0"></emptyContent>
    <div v-else class="userContainer">
      <userItem
        @click="router.push('/UserDetail?id='+item.userId)"
        :nickname="item.nickname"
        :avatarUrl="item.avatarUrl"
        :signature="item.signature"
        :playlistCount="item.playlistCount"
        :followeds="item.followeds"
        :gender="item.gender"
        v-for="item in userList"
        :key="item.userId"
      >
      </userItem>
    </div>
    <div
      style="
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <el-pagination
        v-if="userInfo && userInfo.followeds > 32"
        @current-change="pageChange"
        :page-size="32"
        :current-page="offset"
        background
        layout="prev, pager, next"
        :total="userInfo.followeds"
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import userItem from "@/components/private/userItem.vue";
import { getUserFans } from "@/network/UserInfo/userFans";
import { InitData } from "@/types/UserInfo/UserFans";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import { useRouter } from "vue-router";
import { getUserDetail } from "@/network/LoginDialog/loginDialog";

export default defineComponent({
  name: "UserFans",
  components: {
    userItem,
    loading,
    emptyContent
  },
  setup() {
    const router = useRouter()
    const data = reactive(new InitData());

    const pageChange = (e: number) => {
      data.offset = e;
      getData();
    };

    const getData = () => {
      getUserFans({
        offset: (data.offset - 1) * 32,
        limit: 32,
        uid: router.currentRoute.value.query.id as string,
      }).then((res: any) => {
        data.userList = res.data.followeds;
        data.size = res.data.size
      });
    };

    onMounted(() => {
      getUserDetail({
        uid: parseInt(router.currentRoute.value.query.id as string),
      }).then((res: any) => {
        data.userInfo = res.data.profile;
      });
      getData();
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
#UserFans {
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
  }
}
</style>
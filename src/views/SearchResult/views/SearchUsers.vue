<template>
  <div id="SearchUsers">
    <loading v-if="!userList.length && total != 0"></loading>
    <emptyContent v-else-if="total == 0"></emptyContent>
    <tableList @itemClick="itemClick" :columns="columns" :data="userList" v-else>
      <template v-slot:avatarUrl="{ content }">
        <div class="userImage">
          <el-avatar
            :size="60"
            :fit="'cover'"
            :src="content.avatarUrl"
          />
        </div>
      </template>
      <template v-slot:nickname="{ content }">
        <div class="userName">
          <div class="name">
            <span v-html="$highKey(content.nickname, router.currentRoute.value.query.key)"></span>
            <img v-if="content.gender == 1" src="~images/common/boy.png" alt="">
            <img v-else-if="content.gender == 2" src="~images/common/girl.png" alt="">
          </div>
          <div :title="content.signature" class="signature" v-html="$highKey(content.signature, router.currentRoute.value.query.key)"></div>
        </div>
      </template>
      <template v-slot:description="{ content }">
        <div class="userInfo">{{ content.userType == 2 ? '歌手' : content.userType == 4 ? '网易音乐人' : ''}}</div>
      </template>
    </tableList>
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
      "
    >
      <el-pagination
        v-if="total > 30"
        @current-change="pageChange"
        :current-page="offset"
        :page-size="30"
        background
        layout="prev, pager, next"
        :total="total"
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import tableList from "@/components/common/tableList.vue";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import { getSearchData } from "@/network/SearchResult/searchResult";
import { useRouter } from "vue-router";
import { InitData } from "@/types/SearchResult/SearchUsers";

export default defineComponent({
  name: "SearchUsers",
  components: {
    tableList,
    loading,
    emptyContent,
  },
  setup() {
    const router = useRouter();
    const data = reactive(new InitData());

    const itemClick = (e: any) => {
      router.push('/UserDetail?id='+e.userId)
    }
    const pageChange = (e: number) => {
      window.scrollTo(0,0)
      data.offset = e
      getData()
    }
    const getData = () => {
      getSearchData({
        keywords: router.currentRoute.value.query.key as string,
        limit: 30,
        offset: (data.offset - 1) * 30,
        type: 1002,
      }).then((res: any) => {
        data.total = res.data.result.userprofileCount;
        data.userList = res.data.result.userprofiles;
      });
    };
    getData();

    return {
      router,
      pageChange,
      itemClick,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#SearchUsers {
  .userImage {
    display: flex;
    align-items: center;
  }
  .userName {
    margin-left: 10px;
    .name {
      font-size: 15px;
      font-weight: bold;
      display: flex;
      align-items: center;
      img {
        width: 15px;
        margin-left: 5px;
      }
    }
    .signature {
      max-width: 600px;
      font-size: 13px;
      color: @fontColor;
      margin-top: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .userInfo {
    font-size: 13px;
    color: @fontColor;
  }
}
</style>
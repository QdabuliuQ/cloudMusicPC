<template>
  <div id="SingerDetail">
    <loading v-if="!singerInfo"></loading>
    <detailPanel
      style="margin-bottom: 25px"
      v-else
      :img="singerInfo.artist.cover"
    >
      <template #default>
        <div class="singerInfo">
          <div class="name">
            {{ singerInfo.artist.name }}
            <span
              :key="index"
              v-for="(item, index) in singerInfo.artist.identifyTag"
              >{{ item }}</span
            >
          </div>
          <div v-if="singerInfo.user" class="btnList">
            <div @click="followEvent" class="follow btnItem">
              <img
                style="width: 15px"
                v-if="singerInfo.user.followed"
                src="~images/common/follow.png"
                alt=""
              />
              <img
                style="width: 12px; opacity: 0.5"
                v-else
                src="~images/common/unfollow.png"
                alt=""
              />
              {{ singerInfo.user.followed ? "已关注" : "关注" }}
            </div>
            <div
              @click="router.push('/UserDetail?id=' + singerInfo.user.userId)"
              class="btnItem"
            >
              <img
                style="width: 15px"
                src="~images/musicNavBar/singer.png"
                alt=""
              />
              个人主页
            </div>
          </div>
          <div class="dataList">
            <span>单曲数：{{ singerInfo.artist.musicSize }}</span>
            <span>专辑数：{{ singerInfo.artist.albumSize }}</span>
            <span>MV数：{{ singerInfo.artist.mvSize }}</span>
          </div>
        </div>
      </template>
    </detailPanel>
    <detailNav
      :watch="true"
      style="margin-bottom: 20px"
      :routerKey="'singerIndex'"
      :list="navList"
    ></detailNav>
    <router-view></router-view>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, watch } from "vue";
import { getSingerDetail } from "@/network/SingerDetail/singerDetail";
import { InitData } from "@/types/SingerDetail/SingerDetail";
import { useRouter } from "vue-router";
import { followUser } from "@/network/AccountDetail/UserDetail";
import detailPanel from "../AccountDetail/detailPanel.vue";
import detailNav from "@/components/common/detailNav.vue";
import loading from "@/components/common/loading.vue";
import useLogin from "@/hooks/useLogin";
import { ElNotification } from "element-plus";

export default defineComponent({
  name: "SingerDetail",
  components: {
    detailPanel,
    detailNav,
    loading,
  },
  setup() {
    const router = useRouter();
    const data = reactive(new InitData());
    data.id = router.currentRoute.value.query.id as string;

    const getData = () => {
      getSingerDetail({
        id: data.id,
      }).then((res: any) => {
        data.singerInfo = res.data.data;
        console.log(data.singerInfo, '---------');
        console.log(data.singerInfo.user);
        
        data.navList.push(
          {
            name: `单曲(${data.singerInfo.artist.musicSize})`,
            path: `/SingerSongs?id=${data.id}`,
          },
          {
            name: `专辑(${data.singerInfo.artist.albumSize})`,
            path: `/SingerAlbums?id=${data.id}`,
          },
          {
            name: `MV(${data.singerInfo.artist.mvSize})`,
            path: `/SingerMvs?id=${data.id}`,
          },
          {
            name: `歌手详情`,
            path: `/SingerInfo?id=${data.id}`,
          },
          {
            name: `相似歌手`,
            path: `/SingerSimilar?id=${data.id}`,
          }
        );
      });
    };
    const followEvent = () => {
      if (useLogin()) {
        followUser({
          id: data.singerInfo.user.userId as string,
          t: data.singerInfo.user.followed ? 1 : 0,
        }).then((res: any) => {
          if (res.data.code == 200) {
            data.singerInfo.user.followed = !data.singerInfo.user.followed;
            ElNotification({
              message: data.singerInfo.user.followed
                ? "关注歌手成功"
                : "已取消关注歌手",
              type: "success",
              customClass: "darkNotice",
            });
          } else {
            ElNotification({
              message: "操作失败，请重试",
              type: "error",
              customClass: "darkNotice",
            });
          }
        });
      }
    };
    getData();

    watch(
      () => router.currentRoute.value.query.id,
      (n) => {
        data.id = n as string;
        data.navList = [];
        data.singerInfo = null;
        getData();
      }
    );

    return {
      router,
      followEvent,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#SingerDetail {
  padding: 30px;
  .singerInfo {
    .name {
      font-weight: bold;
      font-size: 24px;
      display: flex;
      align-items: center;
      span {
        font-size: 12px;
        padding: 4px 10px;
        color: #fff;
        background-color: var(--el-color-primary);
        border-radius: 30px;
        margin: 0 7px;
        position: relative;
        top: 1px;
      }
    }
    .btnList {
      display: flex;
      align-items: center;
      margin-top: 15px;
      .btnItem {
        display: flex;
        align-items: center;
        padding: 7px 16px;
        font-size: 13px;
        border: 1px solid var(--borderColor);
        color: @fontColor;
        border-radius: 20px;
        cursor: pointer;
        margin-right: 10px;
        &:hover {
          background-color: var(--hoverColor);
        }
        img {
          margin-right: 3px;
        }
      }
    }
    .dataList {
      margin-top: 15px;
      font-size: 13px;
      span {
        font-weight: bold;
        margin-right: 10px;
      }
    }
  }
}
</style>
<template>
  <div id="AlbumDetail">
    <detailPanel style="margin-bottom: 30px" v-if="dataInfo && otherInfo">
      <template v-slot:img>
        <div class="albumImageContainer">
          <img class="bgImage" src="~images/common/album.png" alt="" />
          <div class="albumImage">
            <img :src="dataInfo.picUrl" alt="" />
          </div>
        </div>
      </template>
      <template #default>
        <div class="albumTitle">
          <span class="target">专辑</span>
          <div class="name">
            <label>{{ dataInfo.name }}</label>
            <span v-for="(item, index) in dataInfo.alias" :key="index">
              ({{ item }})&nbsp;&nbsp;
            </span>
          </div>
        </div>
        <div class="albumBtnList">
          <div @click="toFollow" class="btnItem">
            <img
              style="width: 17px"
              v-if="otherInfo.isSub"
              src="~images/common/follow.png"
              alt=""
            />
            <img
              style="width: 12px; opacity: 0.5; margin-right: 4px"
              v-else
              src="~images/common/unfollow.png"
              alt=""
            />
            {{ otherInfo.isSub ? "已收藏" : "收藏" }}
          </div>
          <div class="btnItem">
            <img style="width: 17px" src="~images/common/share.png" alt="" />
            分享({{ otherInfo.shareCount }})
          </div>
          <el-popover
            v-if="isLogin"
            placement="bottom"
            popper-class="dialogPopperClass"
            :width="170"
            trigger="click"
          >
            <template #reference>
              <div class="btnItem">
                <img style="width: 17px" src="~images/common/chat.png" alt="" />
                私信
              </div>
            </template>
            <div class="userListContainer">
              <el-scrollbar height="250px">
                <div
                  @click="userClick(index)"
                  v-for="(item, index) in contactorList"
                  :key="item.userId"
                  class="userItem"
                >
                  <el-avatar
                    style="margin-right: 5px"
                    :size="30"
                    :src="item.avatarUrl"
                  />
                  <div class="name">
                    {{ item.nickname }}
                  </div>
                </div>
              </el-scrollbar>
            </div>
          </el-popover>
        </div>
        <div class="singerList">
          <div class="listTitle">歌手：&nbsp;</div>
          <span
            @click="router.push('/SingerDetail?id=' + item.id)"
            v-for="item in dataInfo.artists"
            :key="item.id"
          >
            {{ item.name }}&nbsp;&nbsp;
          </span>
        </div>
        <div class="albumTime">
          <div class="listTitle">时间：&nbsp;</div>
          <span>{{ $getTime(dataInfo.publishTime, true) }}</span>
        </div>
        <div class="albumInfo">
          <div class="listTitle">歌曲：&nbsp;</div>
          <span>{{ dataInfo.size }}首</span>
        </div>
      </template>
    </detailPanel>
    <detailNav
      :watch="true"
      style="margin-bottom: 20px"
      :routerKey="'albumIndex'"
      :list="navList"
    ></detailNav>
    <router-view></router-view>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, getCurrentInstance } from "vue";
import detailPanel from "../AccountDetail/detailPanel.vue";
import { useRouter } from "vue-router";
import { InitData } from "@/types/AlbumDetail/AlbumDetail";
import {
  getAlbumDetail,
  getAlbumInfo,
  followAlbum,
} from "@/network/AlbumDetail/albumDetail";
import useLogin from "@/hooks/useLogin";
import { ElNotification } from "element-plus";
import detailNav from "@/components/common/detailNav.vue";
import { getRecentContractor } from "@/network/Message/privateMessage";

export default defineComponent({
  name: "AlbumDetail",
  components: {
    detailPanel,
    detailNav,
  },
  setup() {
    const _this: any = getCurrentInstance();
    const router = useRouter();
    const data = reactive(new InitData());
    data.id = router.currentRoute.value.query.id as string;

    if (useLogin(false)) {
      getRecentContractor().then((res: any) => {
        data.contactorList = res.data.data.follow;
      });
    }

    // 点击用户
    const userClick = (e: number) => {
      if (useLogin()) {
        _this.proxy.$toMessage(
          data.id,
          "album",
          data.dataInfo.name,
          data.dataInfo.picUrl,
          data.contactorList[e].userId,
          data.contactorList[e].nickname
        );
      }
    };

    // 关注
    const toFollow = () => {
      if (useLogin()) {
        followAlbum({
          id: data.id,
          t: data.otherInfo?.isSub ? 0 : 1,
        }).then((res: any) => {
          if (res.data.code == 200) {
            ElNotification({
              message: data.otherInfo?.isSub
                ? "已取消收藏专辑"
                : "收藏专辑成功",
              type: "success",
              customClass: "darkNotice",
            });
            data.otherInfo!.isSub = !data.otherInfo?.isSub as boolean;
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

    getAlbumDetail({
      id: data.id,
    }).then((res: any) => {
      data.dataInfo = res.data.album;
    });

    getAlbumInfo({
      id: data.id,
    }).then((res: any) => {
      data.navList.push(
        {
          name: "歌曲列表",
          path: "/AlbumSongs?id=" + data.id,
        },
        {
          name: `评论(${res.data.commentCount})`,
          path: "/AlbumComments?id=" + data.id,
        },
        {
          name: "专辑详情",
          path: "/AlbumInfo?id=" + data.id,
        }
      );
      data.otherInfo = res.data;
    });

    return {
      router,
      userClick,
      toFollow,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#AlbumDetail {
  padding: 30px;
  .albumImageContainer {
    position: relative;
    margin-right: 20px;
    width: 250px;
    .userListContainer {
      .userItem {
        font-size: 12px;
        display: flex;
        align-items: center;
        padding: 6px 0;
        cursor: pointer;
        .name {
          margin-left: 8px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .bgImage {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
    }
    .albumImage {
      width: 86%;
      aspect-ratio: 1/1;
      object-fit: contain;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .albumBtnList {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .btnItem {
      padding: 5.5px 15px 7px;
      font-size: 13px;
      border-radius: 30px;
      border: 1px solid #6c6c6c;
      color: @fontColor;
      cursor: pointer;
      margin-right: 20px;
      display: flex;
      align-items: center;
      img {
        margin-right: 3px;
      }
    }
  }
  .albumTitle {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .target {
      padding: 3px 10px;
      color: @themeColor;
      border: 1px solid @themeColor;
      font-size: 14px;
      zoom: 0.8;
      margin-right: 7px;
    }
    .name {
      font-size: 20px;
      font-weight: bold;
      span {
        color: @fontColor;
      }
    }
  }
  .singerList {
    font-size: 13px;
    display: flex;
    margin-bottom: 10px;
    span {
      color: var(--nameColor);
      cursor: pointer;
    }
  }
  .albumTime {
    display: flex;
    font-size: 13px;
    margin-bottom: 10px;
    span {
      color: @fontColor;
    }
  }
  .albumInfo {
    display: flex;
    font-size: 13px;
    span {
      color: @fontColor;
    }
  }
}
</style>
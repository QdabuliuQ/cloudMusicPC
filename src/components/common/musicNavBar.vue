<template>
  <div id="musicNavBar">
    <div class="navbarContainer">
      <div class="leftLogo"><em>云音乐</em></div>
      <div class="centerSearch">
        <div class="searchContainer">
          <img src="~images/musicNavBar/search.png" alt="" />
          <el-popover
            ref="searchPopoverRef"
            popper-class="dialogPopperClass"
            placement="bottom"
            :offset="25"
            :width="400"
            :hide-after="0"
            trigger="focus"
          >
            <template #reference>
              <input
                @keyup.enter="toSearch"
                :placeholder="searchDefault"
                @input="searchChange"
                @focus="searchChange"
                v-model="searchText"
                type="text"
              />
            </template>
            <el-scrollbar height="500px">
              <div class="searchInfoContainer">
                <div
                  v-show="!searchRecommentList.length"
                  class="hotListContainer"
                >
                  <div class="title">热搜榜</div>
                  <div 
                    @click="clickSearch(item.searchWord)"
                    v-for="(item, index) in searchList"
                    :key="item.score"
                    class="searchItem"
                  >
                    <div
                      :style="{ color: index < 3 ? '#ec4141' : '' }"
                      class="itemIndex"
                    >
                      {{ index + 1 }}
                    </div>
                    <div class="itemInfo">
                      <div>
                        <div class="itemName">
                          {{ item.searchWord }}
                          <span
                            ><img src="~images/mvList/fire.png" alt="" />{{
                              item.score
                            }}</span
                          >
                          <img
                            :style="{
                              width: item.iconType == 5 ? '12px' : '30px',
                            }"
                            v-if="item.iconUrl"
                            :src="item.iconUrl"
                            alt=""
                          />
                        </div>
                        <div v-if="item.content" class="itemContent">
                          {{ item.content }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-show="searchRecommentList.length"
                  class="recommentListContainer"
                >
                  <div class="title">猜你喜欢</div>
                  <div
                    v-for="(item, index) in searchRecommentList"
                    :key="index"
                    class="recommendItem"
                  >
                    <div class="itemTitle">
                      <img
                        style="width: 22px; left: 3px"
                        v-if="item.type == 'songs'"
                        src="~images/musicNavBar/song.png"
                        alt=""
                      />
                      <img
                        v-else-if="item.type == 'artists'"
                        src="~images/musicNavBar/singer.png"
                        alt=""
                      />
                      <img
                        v-else-if="item.type == 'albums'"
                        src="~images/musicNavBar/album.png"
                        alt=""
                      />
                      <img
                        v-else-if="item.type == 'playlists'"
                        src="~images/musicNavBar/sheet.png"
                        alt=""
                      />
                      {{ recommendType(item.type) }}
                    </div>
                    <div @click="toDetail(i.id, item.type)" v-for="i in item.children" :key="i.id" class="item">
                      {{ i.name }}
                    </div>
                  </div>
                </div>
              </div>
            </el-scrollbar>
          </el-popover>
        </div>
      </div>
      <div class="rightInfo">
        <div
          @click="toLogin"
          v-if="!userInfo || !userInfo.nickname"
          class="userInfo"
        >
          <img src="~images/musicNavBar/userUnlogin.png" alt="" />
          未登录
        </div>
        <div v-else class="userData">
          <div class="dataBox">
            <el-avatar
              @click="router.push('/UserDetail?id=' + userInfo.userId)"
              style="margin-right: 10px"
              :fit="'cover'"
              :size="30"
              :src="userInfo.avatarUrl"
            />
            <el-popover
              ref="userInfoPopoverRef"
              placement="bottom-end"
              popper-class="infoPopperClass"
              effect="dark"
              :width="280"
              trigger="click"
              :hide-after="50"
            >
              <template #reference>
                <span style="display:flex;align-items:center">
                  {{ userInfo.nickname }}
                  <el-icon style="margin-left: 5px"><CaretBottom /></el-icon>
                </span>
              </template>
              <div class="popperContainer">
                <div class="topContainer">
                  <div class="item">
                    <div @click="toDetailPage('/UserEvents?id='+userInfo.userId)" class="itemBox">
                      <div>{{ userDetail.eventCount }}</div>
                      <div class="itemText">动态</div>
                    </div>
                  </div>
                  <div class="item">
                    <div @click="toDetailPage('/UserFollow?id='+userInfo.userId)" class="itemBox">
                      <div>{{ userDetail.follows }}</div>
                      <div class="itemText">关注</div>
                    </div>
                  </div>
                  <div class="item">
                    <div @click="toDetailPage('/UserFans?id='+userInfo.userId)" class="itemBox">
                      <div>{{ userDetail.followeds }}</div>
                      <div class="itemText">粉丝</div>
                    </div>
                  </div>
                </div>
                <div class="bottomContainer">
                  <div class="item">
                    <div class="itemTitle">
                      <el-icon style="margin-right: 5px" :size="22"
                        ><Notebook
                      /></el-icon>
                      等级
                    </div>
                    <div>{{ level }}</div>
                  </div>
                  <div class="item">
                    <div class="itemTitle">
                      <el-icon style="margin-right: 5px" :size="22"
                        ><Headset
                      /></el-icon>
                      累计听歌
                    </div>
                    <div>{{ listenSongs }}</div>
                  </div>
                  <div @click="toDetailPage('/UserInfoEdit')" class="item">
                    <div class="itemTitle">
                      <el-icon style="margin-right: 5px" :size="22"
                        ><Edit
                      /></el-icon>
                      个人信息设置
                    </div>
                    <div>
                      <el-icon><ArrowRight /></el-icon>
                    </div>
                  </div>
                  <div @click="loginOutEvent" class="item">
                    <div class="itemTitle">
                      <el-icon style="margin-right: 5px" :size="22"
                        ><Link
                      /></el-icon>
                      退出登录
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </el-popover>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  getCurrentInstance,
  ref,
  watch
} from "vue";
import bus from "vue3-eventbus";
import { getUserDetail, loginOut } from "@/network/LoginDialog/loginDialog";
import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";
import {
  getHotSearch,
  getSearchDefault,
  getSearchRecommend,
} from "@/network/MusicNavBar/musicNavBar";

let timer: any;

export default defineComponent({
  name: "",
  setup() {
    const _this: any = getCurrentInstance();
    const router = useRouter();
    const userInfoPopoverRef = ref();
    const searchPopoverRef = ref();
    const data = reactive({
      userInfo: <any>{
        userId: 0,
      },
      userDetail: {},
      level: 0,
      listenSongs: 0,
      searchRecommentList: <any>[],
      searchDefault: "",
      searchText: "",
      searchList: <any>[],
      isSearch: false,
    });

    const toDetail = (e: any, t: string) => {
      searchPopoverRef.value.hide()
      switch(t) {
        case "songs":
          return "歌曲";
        case "artists":
          return router.push('/SingerDetail?id='+e);
        case "albums":
          return "专辑";
        case "playlists":
          return router.push('/SheetDetail?id='+e);;
      }
    }
    const clickSearch = (key: string) => {
      searchPopoverRef.value.hide()
      data.searchText = key
      router.push('/SearchResult?key='+key)
    }
    const toSearch = () => {
      if (data.searchText != '') {
        searchPopoverRef.value.hide()
        router.push('/SearchResult?key='+data.searchText.trim())
      }
    }

    const recommendType = (e: string) => {
      switch (e) {
        case "songs":
          return "歌曲";
        case "artists":
          return "歌手";
        case "albums":
          return "专辑";
        case "playlists":
          return "歌单";
      }
    };

    const getRecommend = () => {
      getSearchRecommend({
        keywords: data.searchText.trim(),
      }).then((res: any) => {
        let r = res.data.result;
        data.searchRecommentList = [];
        for (const item of r.order) {
          data.searchRecommentList.push({
            type: item,
            children: [],
          });
        }
        for (const key in r) {
          if (key != "order") {
            for (const item of data.searchRecommentList) {
              if (key == item.type) {
                item.children = [...r[key]];
                break;
              }
            }
          }
        }
      });
    };

    const searchChange = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        if (data.searchText != "") {
          getRecommend();
        } else {
          data.searchRecommentList = [];
        }
      }, 500);
    };

    const toDetailPage = (p: string) => {
      router.push(p);
      userInfoPopoverRef.value.hide();
    };

    // 打开登录弹窗
    const toLogin = () => {
      _this.proxy.$toLogin();
    };

    // 获取用户相关数据
    const getData = () => {
      let id = localStorage.getItem("id");
      let d = localStorage.getItem("data");
      if (id && d) {
        data.userInfo = JSON.parse(
          decodeURIComponent(
            window.atob(localStorage.getItem("data") as string)
          )
        );
        if (data.userInfo) {
          getUserDetail({
            uid: data.userInfo.userId as number,
          }).then((res: any) => {
            data.level = res.data.level;
            data.listenSongs = res.data.listenSongs;
            data.userDetail = res.data.profile;
          });
        }
      }
    };

    // 退出登录
    const loginOutEvent = () => {
      userInfoPopoverRef.value.hide();
      loginOut({
        cookie: localStorage.getItem("cookie") as string,
      }).then((res: any) => {
        if (res.data.code == 200) {
          localStorage.removeItem("cookie");
          localStorage.removeItem("data");
          localStorage.removeItem("id");
          bus.emit("loginOut");
          data.userInfo = {
            userId: 0,
          };
          ElNotification({
            message: "退出账户成功",
            type: "success",
            customClass: "darkNotice",
          });
          location.reload()
        }
      });
    };

    watch(() => router.currentRoute.value.query.key, (n) => {
      data.searchText = n as string
    })
    onMounted(() => {
      bus.on("loginStatus", () => {
        getData();
      });

      getData();

      getHotSearch().then((res: any) => {
        data.searchList = res.data.data;
      });

      getSearchDefault().then((res: any) => {
        data.searchDefault = res.data.data.showKeyword;
      });
    });
    return {
      ...toRefs(data),
      toSearch,
      clickSearch,
      loginOutEvent,
      toLogin,
      toDetailPage,
      searchChange,
      toDetail,
      recommendType,
      userInfoPopoverRef,
      searchPopoverRef,
      router,
    };
  },
});
</script>

<style lang='less'>
.searchInfoContainer {
  .title {
    font-weight: bold;
    color: #fff;
    margin-bottom: 10px;
  }
  .hotListContainer {
    .searchItem {
      padding: 10px 0;
      display: flex;
      align-items: center;
      cursor: pointer;
      &:hover {
        background: @hoverColor;
      }
      .itemIndex {
        width: 30px;
        min-width: 30px;
        font-weight: bold;
      }
      .itemInfo {
        display: flex;
        align-items: center;
        min-height: 40px;
        color: #fff;
        font-size: 13px;
        font-weight: bold;
        .itemName {
          width: 350px;
          display: flex;
          align-items: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          span {
            font-size: 12px;
            color: @fontColor;
            margin-left: 5px;
            display: flex;
            align-items: center;
            img {
              width: 15px;
              opacity: 0.7;
              margin-right: 4px;
            }
          }
        }
        img {
          width: 30px;
          margin-left: 10px;
        }
      }
      .itemContent {
        width: 350px;
        font-size: 12px;
        color: @fontColor;
        margin-top: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .recommentListContainer {
    .recommendItem {
      font-size: 13px;
      .itemTitle {
        padding: 8px 30px;
        display: flex;
        align-items: center;
        position: relative;
        font-weight: bold;
        font-size: 14px;
        img {
          width: 20px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 5px;
        }
      }
      .item {
        padding: 8px 30px;
        color: #fff;
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:hover {
          background-color: @hoverColor;
        }
      }
    }
  }
}

.infoPopperClass.is-dark {
  background-color: #292929 !important;
  .el-popper__arrow::before {
    border: 1px solid #292929 !important;
  }
}
.infoPopperClass.is-light {
  background-color: #292929 !important;
}
.infoPopperClass.is-light .el-popper__arrow::before {
  border: 1px solid #292929 !important;
}
.el-popper.is-light .el-popper__arrow::before {
  background: #292929 !important;
  border: 1px solid #292929 !important;
}
.infoPopperClass.is-dark .el-popper__arrow::before {
  background: #292929 !important;
  border: 1px solid #292929 !important;
}
.popperContainer {
  .topContainer {
    display: flex;
    align-items: center;
    .item {
      flex: 1;
      text-align: center;
      .itemBox {
        padding: 8px 0;
        font-weight: bold;
        font-size: 17px;
        cursor: pointer;
        &:hover {
          background-color: @hoverColor;
        }
        .itemText {
          font-size: 13px;
          color: @fontColor;
        }
      }
    }
  }
  .bottomContainer {
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        background: @hoverColor;
      }
      .itemTitle {
        display: flex;
        align-items: center;
        font-size: 13px !important;
        color: @fontColor;
      }
    }
  }
}

#musicNavBar {
  height: 55px;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  background-color: @color;
  box-sizing: border-box;
  border-bottom: 2px solid @themeColor;
  display: flex;

  .navbarContainer {
    flex: 1;
    padding: 0 30px;
    display: flex;
    align-items: center;
    color: #fff;
    .leftLogo {
      flex: 2;
      letter-spacing: 2px;
      font-size: 22px;
      font-weight: bold;
    }
    .centerSearch {
      flex: 6;
      display: flex;
      .searchContainer {
        display: flex;
        align-items: center;
        padding: 5px 15px;
        background-color: @greyColor;
        border-radius: 20px;
        position: relative;

        img {
          width: 17px;
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
        }
        input {
          padding-left: 25px;
          background: transparent;
          border: 0;
          outline: none;
          color: #fff;
        }
      }
    }
    .rightInfo {
      flex: 2;
      display: flex;
      justify-content: flex-end;
      .userInfo {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 13px;
        cursor: pointer;
        img {
          width: 25px;
          margin-right: 7px;
        }
      }
      .userData {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .dataBox {
          display: flex;
          align-items: center;
          font-size: 13px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
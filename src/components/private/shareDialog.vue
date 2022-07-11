<template>
  <div id="shareDialog">
    <el-dialog
      custom-class="shareDialogClass"
      :width="'450px'"
      v-model="visible"
      :modal="false"
      draggable
    >
      <div class="diglogTitle">分享到云音乐动态</div>
      <div class="diglogTextBox">
        <textarea maxlength="200" v-model="comment"></textarea>
        <div class="functionList">
          <el-popover
            ref="emojiPopoverRef"
            placement="bottom"
            :width="300"
            trigger="click"
            popper-class="dialogPopperClass"
            :hide-after="0"
          >
            <template #reference>
              <img src="~images/shareDialog/emoji.png" alt="" />
            </template>
            <div class="emojiContainer">
              <div
                @click="emojiClick(item)"
                v-for="(item, index) in emoji"
                :key="index"
                class="emojiItem"
              >
                {{ item }}
              </div>
            </div>
          </el-popover>
          <el-popover
            ref="userPopoverRef"
            placement="bottom"
            :width="150"
            trigger="click"
            popper-class="dialogPopperClass"
            :hide-after="0"
          >
            <template #reference>
              <img
                style="width: 29px"
                src="~images/shareDialog/aite.png"
                alt=""
              />
            </template>
            <div class="userListContainer">
              <el-scrollbar height="150px">
                <div
                  @click="userClick(item.nickname)"
                  v-for="item in userList"
                  :key="item.userId"
                  class="userItem"
                >
                  <el-avatar
                    style="margin-right: 5px"
                    :size="25"
                    :src="item.avatarUrl"
                  />
                  <div class="name">
                    {{ item.nickname }}
                  </div>
                </div>
                <div v-if="isMore" @click="loadMore" class="loadMore">
                  加载更多
                </div>
              </el-scrollbar>
            </div>
          </el-popover>
        </div>
      </div>
      <div
        v-if="type != 'event' && type != 'edit' && type != 'search'"
        class="dialogInfoBox"
      >
        <el-avatar
          style="margin-left: 7px"
          shape="square"
          :size="30"
          :fit="'cover'"
          :src="infoImage"
        />
        <span class="target">{{ filterType(type) }}</span>
        <div class="name">
          {{ infoName }}
        </div>
      </div>
      <div
        @click="searchResource"
        style="cursor: pointer"
        v-else-if="type == 'edit'"
        class="dialogInfoBox"
      >
        <el-avatar
          v-if="infoImage && infoImage != ''"
          style="margin-left: 7px"
          shape="square"
          :size="30"
          :fit="'cover'"
          :src="infoImage"
        />
        <img
          v-else
          style="width: 30px; margin-right: 7px"
          src="~images/shareDialog/musicEvent.png"
          alt=""
        />
        <span v-if="id && id != ''" class="target">{{
          filterType(selectType)
        }}</span>
        <div class="name">
          {{ infoName && infoName != "" ? infoName : "给动态配上音乐吧" }}
        </div>
      </div>
      <div v-else-if="type == 'search'" class="dialogInfoSearchBox">
        <el-popover
          popper-class="dialogPopperClass"
          placement="bottom"
          :width="390"
          trigger="focus"
          :hide-after="50"
          @hide="type = 'edit'"
        >
          <template #reference>
            <input
              ref="searchInputRef"
              v-model="searchInfo"
              placeholder="搜索 单曲 / 歌手 / 专辑 / 歌单 / 播客"
              type="text"
            />
          </template>
          <div class="cateList">
            <div
              @click="toggleSearchType(index)"
              v-for="(item, index) in searchCateList"
              :key="item.id"
              :class="[
                searchCateIndex == index ? 'activeCateItem' : '',
                'cateItem',
              ]"
            >
              {{ item.text }}
            </div>
          </div>
          <el-scrollbar height="220px">
            <div v-if="searchResult.length" class="searchResultContainer">
              <searchSongItem
                @itemClick="itemClick"
                v-if="searchResult.length && searchCateIndex == 0"
                v-for="(item, index) in searchResult"
                :key="item.id"
                :i="index"
                :name="item.name"
                :singer="item.artists"
              ></searchSongItem>
              <searchSheetItem
                @itemClick="itemClick"
                v-else-if="searchResult.length && searchCateIndex == 1"
                v-for="(item, index) in searchResult"
                :key="item.id"
                :i="index"
                :name="item.name"
                :img="item.coverImgUrl"
                :creator="item.creator.nickname"
              ></searchSheetItem>
              <searchMvItem
                @itemClick="itemClick"
                v-else-if="searchResult.length && searchCateIndex == 2"
                v-for="(item, index) in searchResult"
                :key="item.id"
                :i="index"
                :name="item.name"
                :img="item.cover"
                :playCount="item.playCount"
              ></searchMvItem>
              <searchAudioItem
                @itemClick="itemClick"
                v-else-if="searchResult.length && searchCateIndex == 3"
                v-for="(item, index) in searchResult"
                :key="item.id"
                :i="index"
                :name="item.name"
                :img="item.picUrl"
                :playCount="item.playCount"
                :category="item.category"
              ></searchAudioItem>
              <searchProgramItem
                @itemClick="itemClick"
                v-else-if="searchResult.length && searchCateIndex == 4"
                v-for="(item, index) in searchResult"
                :key="item.resourceId"
                :i="index"
                :name="item.baseInfo.name"
                :img="item.baseInfo.coverUrl"
                :likedCount="item.baseInfo.likedCount"
              ></searchProgramItem>
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 110px;
              "
              v-else
            >
              暂无数据
            </div>
          </el-scrollbar>
        </el-popover>
      </div>
      <div class="dialogBtnBox">
        <div @click="shareContentEvent" class="shareBtn">分享</div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  ref,
  watch,
  nextTick,
} from "vue";
import {
  ElDialog,
  ElPopover,
  ElScrollbar,
  ElAvatar,
  ElNotification,
} from "element-plus";
import { getFollowList } from "@/network/UserInfo/userFollow";
import emoji from "@/static/emoji";
import { shareContent, shareUserEvent } from "@/network/UserInfo/userEvents";
import { getSearchRes } from "@/network/Follow/follow";
import bus from "vue3-eventbus";
import searchSongItem from "@/components/private/searchSongItem.vue";
import searchSheetItem from "@/components/private/searchSheetItem.vue";
import searchMvItem from "@/components/private/searchMvItem.vue";
import searchAudioItem from "@/components/private/searchAudioItem.vue";
import searchProgramItem from "@/components/private/searchProgramItem.vue";

let timer: any;

export default defineComponent({
  name: "shareDialog",
  components: {
    ElDialog,
    ElPopover,
    ElScrollbar,
    ElAvatar,
    searchSongItem,
    searchSheetItem,
    searchMvItem,
    searchAudioItem,
    searchProgramItem,
  },
  setup() {
    const searchInputRef = ref();
    const emojiPopoverRef = ref();
    const userPopoverRef = ref();
    const data = reactive({
      searchInfo: "",
      searchCateIndex: 0,
      searchCateList: <any>[
        { id: 1, text: "单曲" },
        { id: 1000, text: "歌单" },
        { id: 1004, text: "MV" },
        { id: 1009, text: "播客" },
        { id: 2000, text: "声音" },
      ],
      searchResult: <any>[],
      searchOffset: 0,
      selectType: "",
      visible: false,
      emoji: <any>[],
      userList: <any>[],
      offset: 0,
      isMore: true,
      comment: "",
      infoImage: "",
      infoName: "",
      type: "",
      id: "",
      uid: "",
    });

    watch(
      () => data.visible,
      (n) => {
        if (!n) {
          data.comment = "";
          data.offset = 0
          data.searchInfo = ''
          data.infoImage = ''
          data.infoName = ''
          data.id = ''
          data.isMore = true
          data.selectType = ''
          data.searchCateIndex = 0
        }
      }
    );

    watch(
      () => data.searchInfo,
      (n) => {
        if (timer) clearTimeout(timer);
        if (n != "") {
          timer = setTimeout(() => {
            getSearchData();
          }, 500);
        } else {
          data.searchResult = [];
        }
      }
    );

    const itemClick = (e: any) => {
      switch (e.type) {
        case "song":
          let name = "";
          for (const item of e.singer) {
            name += item.name + " ";
          }
          data.infoName = e.name + " - " + name;
          data.selectType = e.type;
          data.id = data.searchResult[e.i].id;
          break;
        case "playlists":
          data.infoName = e.name + " - " + e.creator;
          data.infoImage = e.img;
          data.selectType = "playlist";
          data.id = data.searchResult[e.i].id;
          break;
        case "mv":
          data.infoName = `${e.name} - 播放量：${e.playCount}次`;
          data.infoImage = e.img;
          data.selectType = e.type;
          data.id = data.searchResult[e.i].id;
          break;
        case "djradio":
          data.infoName = `${e.name} - 播放量：${e.playCount}次`;
          data.infoImage = e.img;
          data.selectType = e.type;
          data.id = data.searchResult[e.i].id;
          break;
        case "djprogram":
          data.infoName = `${e.name} - 点赞量：${e.likedCount}次`;
          data.infoImage = e.img;
          data.selectType = e.type;
          data.id = data.searchResult[e.i].baseInfo.id;
          break;
      }
      data.searchInfo = "";
      data.type = "edit";
    };

    // 获取搜索数据
    const getSearchData = () => {
      getSearchRes({
        keywords: data.searchInfo,
        limit: 15,
        offset: data.searchOffset * 15,
        type: data.searchCateList[data.searchCateIndex].id,
      }).then((res: any) => {
        let temp = "";
        switch (data.searchCateIndex) {
          case 0:
            temp = "songs";
            break;
          case 1:
            temp = "playlists";
            break;
          case 2:
            temp = "mvs";
            break;
          case 3:
            temp = "djRadios";
            break;
          case 4:
            temp = "resources";
            break;
        }

        if (data.searchCateIndex != 4) {
          if (res.data.result[temp]) {
            data.searchResult = [
              ...data.searchResult,
              ...res.data.result[temp],
            ];
          }
        } else {
          data.searchResult = [
            ...data.searchResult,
            ...res.data.data.resources,
          ];
        }
      });
    };

    // 切换搜索类型
    const toggleSearchType = (e: number) => {
      data.searchCateIndex = e;
      data.searchOffset = 0;
      data.searchResult = [];
      getSearchData();
    };

    const searchResource = () => {
      data.type = "search";
      nextTick(() => {
        searchInputRef.value.focus();
      });
    };

    // 点击表情
    const emojiClick = (i: string) => {
      data.comment += i;
      emojiPopoverRef.value.hide();
    };

    const filterType = (e: string) => {
      switch (e) {
        case "song":
          return "歌曲";
        case "playlist":
        case "playlists":
          return "歌单";
        case "mv":
          return "MV";
        case "djradio":
          return "播客";
        case "djprogram":
          return "节目";
      }
    };

    // 用户点击
    const userClick = (i: string) => {
      data.comment += `@${i} `;
      emojiPopoverRef.value.hide();
    };

    // 加载用户数据
    const loadMore = () => {
      getData();
    };

    // 获取用户列表
    const getData = () => {
      getFollowList({
        limit: 10,
        offset: data.offset * 10,
      }).then((res: any) => {
        data.isMore = res.data.more;
        data.offset++;
        data.userList = [...data.userList, ...res.data.follow];
      });
    };

    // 打开弹窗
    const openShareDialog = (
      id: string,
      type: string,
      name: string,
      image: string,
      uid: string
    ) => {
      data.visible = true;
      data.type = type;
      data.id = id;
      data.infoName = name;
      data.infoImage = image;
      data.uid = uid;
    };

    const shareContentEvent = () => {
      if (
        data.type != "event" &&
        data.type != "search" &&
        data.type != "edit"
      ) {
        shareContent({
          id: data.id,
          type: data.type,
          msg: data.comment,
        }).then((res: any) => {
          if (res.data.code == 200) {
            ElNotification({
              message: "分享动态成功",
              type: "success",
              customClass: "darkNotice",
            });
            data.comment = "";
            data.visible = false;
          } else {
            ElNotification({
              message: "分享动态失败",
              type: "error",
              customClass: "darkNotice",
            });
          }
        });
      } else if (data.type == "edit") {
        if (data.id != "") {
          shareContent({
            id: data.id,
            type: data.selectType,
            msg: data.comment,
          }).then((res: any) => {
            if (res.data.code == 200) {
              ElNotification({
                message: "分享动态成功",
                type: "success",
                customClass: "darkNotice",
              });
              data.visible = false;
            } else {
              ElNotification({
                message: "分享动态失败",
                type: "error",
                customClass: "darkNotice",
              });
            }
          });
        } else {
          ElNotification({
            message: "请选择分享的歌曲或者歌单",
            type: "warning",
            customClass: "darkNotice",
          });
        }
      } else if (data.type == "event") {
        shareUserEvent({
          uid: data.uid,
          evId: data.id,
          forwards: data.comment,
        }).then((res: any) => {
          if (res.data.code == 200) {
            ElNotification({
              message: "分享动态成功",
              type: "success",
              customClass: "darkNotice",
            });
            bus.emit("refreshData");
            data.comment = "";
            data.visible = false;
          } else {
            ElNotification({
              message: "分享动态失败",
              type: "error",
              customClass: "darkNotice",
            });
          }
        });
      }
    };

    onMounted(() => {
      data.emoji = emoji;

      getData();
    });

    return {
      ...toRefs(data),
      openShareDialog,
      loadMore,
      emojiClick,
      userClick,
      filterType,
      shareContentEvent,
      searchResource,
      toggleSearchType,
      getSearchData,
      itemClick,
      emojiPopoverRef,
      userPopoverRef,
      searchInputRef,
    };
  },
});
</script>

<style lang='less'>
.dialogPopperClass {
  .emojiContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 5px;
    text-align: center;
    font-size: 16px;
    .emojiItem {
      cursor: pointer;
      padding: 3px 3px 5px;
      &:hover {
        background-color: @hoverColor;
      }
    }
  }
  .userListContainer {
    .userItem {
      font-size: 12px;
      display: flex;
      align-items: center;
      padding: 6px 0;
      cursor: pointer;
      .name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .loadMore {
      padding: 7px 0;
      width: 100%;
      text-align: center;
      font-size: 12px;
      margin-top: 5px;
      cursor: pointer;
      &:hover {
        background-color: @hoverColor;
      }
    }
  }
  .cateList {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    .activeCateItem {
      color: @themeColor;
      font-weight: bold;
    }
    .cateItem {
      text-align: center;
      flex: 1;
      cursor: pointer;
    }
  }
  .searchResultContainer {
    margin-top: 15px;
  }
}

.dialogPopperClass.is-light {
  background-color: #292929 !important;
  border: 1px solid #292929 !important;
}
.shareDialogClass {
  background-color: #3f3f3f !important;
  .el-dialog__headerbtn .el-dialog__close {
    font-size: 24px;
  }
  .el-dialog__body {
    padding: 20px;
  }
  .el-dialog__headerbtn:hover .el-dialog__close {
    color: @themeColor;
  }
  .diglogTitle {
    color: #fff;
    font-weight: bold;
    font-size: 15px;
    text-align: center;
  }
  .diglogTextBox {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #565555;
    textarea {
      width: 100%;
      height: 80px;
      border: 0;
      outline: none;
      resize: none;
      background-color: transparent;
      color: #fff;
      font-size: 15px;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .functionList {
      display: flex;
      align-items: center;
      img {
        width: 30px;
        cursor: pointer;
        margin-right: 6px;
      }
    }
  }
  .dialogInfoBox {
    padding: 7px 10px;
    display: flex;
    align-items: center;
    border-left: 1px solid #565555;
    border-right: 1px solid #565555;
    border-bottom: 1px solid #565555;
    .name {
      font-size: 13px;
      width: 300px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .target {
      font-size: 12px;
      color: @themeColor;
      border: 1px solid @themeColor;
      padding: 4px 8px;
      transform: scale(0.8);
      margin-left: 6px;
    }
  }
  .dialogBtnBox {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    .shareBtn {
      padding: 7px 20px;
      color: #fff;
      border-radius: 30px;
      font-size: 12px;
      background-color: @themeColor;
      cursor: pointer;
    }
  }
  .dialogInfoSearchBox {
    padding: 7px 14px;
    border-left: 1px solid #565555;
    border-right: 1px solid #565555;
    border-bottom: 1px solid #565555;
    input {
      width: 100%;
      height: 28px;
      background: transparent;
      color: #fff;
      border: 0;
      outline: none;
    }
  }
}
</style>
<template>
  <div id="musicList">
    <table>
      <thead v-if="columns && columns.length">
        <tr class="theadTr">
          <td style="width: 3%"></td>
          <td v-if="like | download" style="width: 4%">操作</td>
          <td
            :style="{ width: item.width }"
            v-for="(item, index) in columns"
            :key="item.key"
          >
            {{ item.title }}
          </td>
        </tr>
      </thead>
      <tbody v-if="songList && columnSlot">
          <tr
            @dblclick="toPlayMusic(i1)"
            v-contextmenu:songContextRef
            :data-index="i1"
            class="songItem"
            v-for="(item, i1) in songList"
            :key="i1"
          >
            <td style="width: 3%; text-align: center; color: #949494">
              {{ i1 + 1 < 10 ? "0" + (i1 + 1) : i1 + 1 }}
            </td>
            <td style="width: 3%" v-if="like | download">
              <div class="iconBox">
                <img
                  v-if="download"
                  class="icon"
                  src="~images/common/download.png"
                  alt=""
                />
              </div>
            </td>
            <td
              :style="{ width: columns[i2].width }"
              v-for="(att, i2) in columnSlot"
              :key="i2"
            >
              <div class="tableItem">
                <slot :content="item" :index="i1" :name="att" />
              </div>
            </td>
          </tr>
      </tbody>
    </table>
  </div>
  <v-contextmenu @show="menuOpenEvent" ref="songContextRef">
    <v-contextmenu-item @click="commentList">
      <div class="contextItem">
        <img class="contextIcon" src="~images/common/comment.png" alt="" />
        查看评论
      </div>
    </v-contextmenu-item>
    <v-contextmenu-submenu v-if="isLogin" title="">
      <template v-slot:title>
        <div class="contextItem">
          <img class="contextIcon" src="~images/menuList/sheet.png" alt="" />
          收藏到歌单
        </div>
      </template>
      <el-scrollbar height="200px">
        <v-contextmenu-item @click="createNewSheet">
          <div class="contextItem">
            <img class="contextIcon" src="~images/menuList/plus.png" alt="" />
            创建新歌单
          </div>
        </v-contextmenu-item>
        <v-contextmenu-item
          v-if="userSheet.length"
          @click="menuItemClick('add', item.id)"
          v-for="(item, index) in userSheet"
          :key="item.id"
        >
          <div class="contextItem">
            <img
              v-if="index == 0"
              class="contextIcon"
              src="~images/menuList/like.png"
              alt=""
            />
            <img
              v-else
              class="contextIcon"
              src="~images/menuList/sheet.png"
              alt=""
            />
            {{ item.name }}
          </div>
        </v-contextmenu-item>
      </el-scrollbar>
    </v-contextmenu-submenu>
    <v-contextmenu-submenu v-if="isLogin" title="">
      <template v-slot:title>
        <div class="contextItem">
          <img class="contextIcon" src="~images/common/chat.png" alt="" />
          分享给好友
        </div>
      </template>
      <el-scrollbar height="200px">
        <v-contextmenu-item
          v-if="contactorList.length"
          @click="userItemClick(index)"
          v-for="(item, index) in contactorList"
          :key="item.id"
        >
          <div class="contextItem">
            <img
              style="width: 25px; border-radius: 50%; margin-right: 5px"
              :src="item.avatarUrl"
              alt=""
            />
            {{ item.nickname }}
          </div>
        </v-contextmenu-item>
      </el-scrollbar>
    </v-contextmenu-submenu>
    <v-contextmenu-item v-if="isMe" @click="menuItemClick('del')">
      <div class="contextItem">
        <img class="contextIcon" src="~images/common/delete.png" alt="" />
        从歌单中删除
      </div>
    </v-contextmenu-item>
    <v-contextmenu-item @click="menuItemShare">
      <div class="contextItem">
        <img class="contextIcon" src="~images/common/share.png" alt="" />
        分享到动态
      </div>
    </v-contextmenu-item>
  </v-contextmenu>
</template>

<script lang='ts'>
import {
  defineComponent,
  computed,
  reactive,
  toRefs,
  ref,
  watch,
  onMounted,
  getCurrentInstance,
} from "vue";
import { getUserSheet } from "@/network/MenuList/menuList";
import useLogin from "@/hooks/useLogin";
import { setSheetSong } from "@/network/SheetDetail/sheetDetail";
import { useRouter } from "vue-router";
import bus from "vue3-eventbus";
import { ElNotification } from "element-plus";
import { getRecentContractor } from "@/network/Message/privateMessage";

export default defineComponent({
  props: ["columns", "data", "like", "download", "isMe"],
  name: "musicList",
  setup(props) {
    const _this: any = getCurrentInstance();
    const router = useRouter();
    const songContextRef = ref();
    const data = reactive({
      columnSlot: <any>[],
      index: 0,
      userSheet: <any>[],
      songList: <any>[],
      contactorList: <any>[],
      list: <any>[],
      isLogin: useLogin(false),
    });
    // 私信分享
    const userItemClick = (e: number) => {
      if (useLogin()) {
        _this.proxy.$toMessage(
          data.songList[data.index].id,
          "song",
          data.songList[data.index].name,
          data.songList[data.index].al.picUrl,
          data.contactorList[e].userId,
          data.contactorList[e].nickname
        );
      }
    };
    // 播放音乐
    const toPlayMusic = (e: number) => {
      bus.emit("playMusic", {
        data: props.data,
        index: e,
      });
    };
    // 创建新歌单
    const createNewSheet = () => {
      bus.emit("createSheet");
    };
    // 菜单打开
    const menuOpenEvent = (e: number) => {
      data.index = e;
    };
    // 歌曲添加/删除
    const menuItemClick = (type: string, id: string) => {
      if (useLogin()) {
        if (type == "del") {
          setSheetSong({
            op: type,
            pid: router.currentRoute.value.query.id as string,
            tracks: props.data[data.index].id,
          }).then((res: any) => {
            if (res.data.status == 200) {
              ElNotification({
                message: "歌曲已从歌单删除",
                type: "success",
                customClass: "darkNotice",
              });
              data.songList.splice(data.index, 1);
              bus.emit("updateCount", res.data.body.count);
            } else {
              ElNotification({
                message: "歌曲删除失败",
                type: "error",
                customClass: "darkNotice",
              });
            }
          });
        } else {
          setSheetSong({
            op: type,
            pid: id,
            tracks: props.data[data.index].id,
          }).then((res: any) => {
            if (res.data.status == 200) {
              ElNotification({
                message: "歌曲已添加到歌单",
                type: "success",
                customClass: "darkNotice",
              });
            } else {
              ElNotification({
                message: "歌曲添加失败",
                type: "error",
                customClass: "darkNotice",
              });
            }
          });
        }
      }
    };
    // 歌曲分享
    const menuItemShare = () => {
      if (useLogin()) {
        _this.proxy.$toShare(
          props.data[data.index].id,
          "song",
          props.data[data.index].name
        );
      }
    };
    // 查看评论
    const commentList = () => {
      router.push(`/commentList?id=${data.songList[data.index].id}&type=song`);
    };

    const getData = () => {
      data.userSheet = [];
      let _id = decodeURIComponent(
        window.atob(localStorage.getItem("id") as string)
      );
      getUserSheet({
        uid: _id,
        limit: 999,
        offset: 0,
      }).then((res: any) => {
        for (const item of res.data.playlist) {
          if (_id == item.userId) {
            data.userSheet.push(item);
          }
        }
      });
    };

    if (data.isLogin) {
      getRecentContractor().then((res: any) => {
        data.contactorList = res.data.data.follow;
      });
    }

    data.columnSlot = computed(() => {
      const filterColumns =
        props.columns.length &&
        props.columns.map((v: any) => {
          return v.slot;
        });
      return filterColumns;
    });

    watch(
      () => props.data,
      (n) => {
        data.songList = n;
        data.list = [];
        for (const item of n) {
          data.list.push({
            name: item.name,
            id: item.id,
          });
        }
        console.log(data.list);
      },
      { immediate: true }
    );

    onMounted(() => {
      if (data.isLogin) {
        getData();
      }

      // 监听创建歌单成功回调
      bus.on("refreshSheetData", () => {
        getData();
      });
    });

    return {
      songContextRef,
      userItemClick,
      commentList,
      toPlayMusic,
      createNewSheet,
      menuOpenEvent,
      menuItemClick,
      menuItemShare,
      useLogin,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#musicList {
  table {
    width: 100%;
    font-size: 13px;
    .theadTr {
      background-color: var(--tableColor);
    }
    thead {
      color: @fontColor;
    }
    td {
      padding: 8px 0;
    }
    tbody {
      .songItem:nth-child(even) {
        background-color: var(--tableColor);
      }
      tr {
        user-select: none;
        cursor: pointer;
        &:hover {
          background-color: var(--hoverColor) !important;
        }
      }
      .iconBox {
        display: flex;
        align-items: center;
        img {
          width: 15px;
        }
        .icon {
          opacity: 0.4;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
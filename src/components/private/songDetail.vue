<template>
  <div :class="[show ? 'showPanel' : '']" id="songDetail">
    <el-scrollbar height="100%">
      <div class="detailContainer">
        <div style="display: flex; width: 100%">
          <div class="infoItem leftCDImage">
            <div class="CDImageContainer">
              <img
                :class="[isPlay ? 'playStatus' : '', 'tool']"
                src="~images/songDetail/tool.png"
                alt=""
              />
              <div
                :class="[
                  isPlay ? '' : 'pauseCoverCDAnimation',
                  'coverCDContainer',
                  'coverCDAnimation',
                ]"
              >
                <img
                  @click="isPlay = !isPlay"
                  class="cd"
                  src="~images/songDetail/cd.png"
                  alt=""
                />
                <img class="cover" :src="musicInfo.al.picUrl" alt="" />
              </div>
            </div>
          </div>
          <div class="centerTextList">
            <div class="songTitle">
              {{ musicInfo.name }}
              <targetList
                :mv="musicInfo.mv"
                :sq="musicInfo.sq"
                :vip="musicInfo.fee == 1"
              ></targetList>
            </div>
            <div v-if="musicInfo.alia.length" class="songTip">
              <span v-for="(item, index) in musicInfo.alia" :key="index">{{
                item
              }}</span>
            </div>
            <div
              style="margin-bottom: 20px"
              v-if="musicInfo.ar.length"
              class="songSinger"
            >
              <span
                @click="toSinger(item.id)"
                v-for="item in musicInfo.ar"
                :key="item.id"
              >
                {{ item.name }}&nbsp;
              </span>
              -
              <span @click="toAlbum(musicInfo.al.id)">{{
                musicInfo.al.name
              }}</span>
            </div>
            <el-scrollbar height="400px">
              <p
                v-for="item in lyricList"
                v-html="item.c == '\n' ? '<br/>' : item.c"
                :key="item.t"
                class="lyricItem"
              ></p>
            </el-scrollbar>
          </div>
          <div class="infoItem rightOtherInfo">
            <div class="otherInfoContainer">
              <div v-if="similarSongList.length" class="similarSongList">
                <div class="listTitle">相似歌曲</div>
                <div
                  v-for="item in similarSongList"
                  :key="item.id"
                  class="songItem"
                >
                  <el-avatar
                    shape="square"
                    :size="40"
                    :fit="'contain'"
                    :src="item.album.picUrl"
                  />
                  <div class="itemName">{{ item.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="commentContainer">
          <commentArea @commentEvent="commentEvent"></commentArea>
          <div v-if="hotCommentList.length">
            <div class="title">热门评论</div>
            <commentItem
              v-for="item in hotCommentList"
              :key="item.commentId"
              :avatarUrl="item.user.avatarUrl"
              :time="item.time"
              :likedCount="item.likedCount"
              :content="item.content"
              :nickname="item.user.nickname"
              :userId="item.user.userId"
              :beReplied="item.beReplied"
              :liked="item.liked"
              :id="id"
              :cid="item.commentId"
              :type="3"
            ></commentItem>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, defineAsyncComponent } from "vue";
import bus from "vue3-eventbus";
import { useRouter } from "vue-router";
import {
  getSimilarSong,
  getSongLyric,
  getSongComment,
} from "@/network/SongDetail/songDetail";
const targetList = defineAsyncComponent(
  () => import("../common/targetList.vue")
);
const commentArea = defineAsyncComponent(
  () => import("../common/commentArea.vue")
);
const commentItem = defineAsyncComponent(() => import("./commentItem.vue"));

export default defineComponent({
  name: "songDetail",
  components: {
    targetList,
    commentArea,
    commentItem,
  },
  setup() {
    const router = useRouter();
    const data = reactive({
      show: true,
      musicInfo: <any>{},
      isPlay: false,
      similarSongList: <any>[],
      lyricList: <any>[],
      offset: 1,
      comments: <any>[],
      hotCommentList: <any>[],
    });

    // 格式化歌词
    const setLyric = (lrc: any) => {
      var oLRC: any = [];
      if (lrc.length == 0) return;
      var lrcs = lrc.split("\n"); //用回车拆分成数组 (每一句歌词都用换行隔开了)
      for (let i in lrcs) {
        //遍历歌词数组
        lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
        var arr = lrcs[i].match(/\[(\d+:.+?)\]/g); //提取时间字段，可能有多个
        var start = 0;
        for (let k in arr) {
          start += arr[k].length; //计算歌词位置 长度叠加
        }
        var content = lrcs[i].substring(start); //获取歌词内容 相当于减去时间字符串的长度剩下的就是内容
        for (let k in arr) {
          var t = arr[k].substring(1, arr[k].length - 1); //取[]间的内容
          // var t = arr[k]
          var s = t.split(":"); //分离:前后文字 便于计算成毫秒数
          oLRC.push({
            //对象{t:时间,c:歌词}加入ms数组
            // t: t,
            t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
            c: content === "" ? "\n" : content,
          });
        }
      }
      oLRC.sort(function (a: any, b: any) {
        //按时间顺序排序
        return a.t - b.t;
      });
      data.lyricList = oLRC;
      console.log(data.lyricList);
    };
    // 获取相关数据
    const getData = () => {
      getSimilarSong({
        id: data.musicInfo.id,
      }).then((res: any) => {
        data.similarSongList = res.data.songs;
      });

      getSongLyric({
        id: data.musicInfo.id,
      }).then((res: any) => {
        setLyric(res.data.lrc.lyric);
      });

      getSongComment({
        id: data.musicInfo.id,
        limit: 30,
        offset: (data.offset - 1) * 30,
      }).then((res: any) => {
        data.hotCommentList = res.data.hotComments;
        data.comments = res.data.comments;
      });
    };
    // 评论
    const commentEvent = () => {};
    // 页面跳转
    const toSinger = (e: number) => {
      data.show = false;
      router.push("/SingerDetail?id=" + e);
    };
    const toAlbum = (e: number) => {
      data.show = false;
      router.push("/AlbumDetail?id=" + e);
    };

    let r: any = localStorage.getItem("music");
    if (r) {
      data.musicInfo = JSON.parse(decodeURIComponent(window.atob(r)));
      getData();
    }
    if (data.show) {
      document.documentElement.style.overflowY = "hidden";
      document.documentElement.style.overflowX = "hidden";
    } else {
      document.documentElement.style.overflowY = "auto";
      document.documentElement.style.overflowX = "auto";
    }

    bus.on("showPanel", () => {
      data.show = !data.show;
      if (data.show) {
        document.documentElement.style.overflowY = "hidden";
        document.documentElement.style.overflowX = "hidden";
      } else {
        document.documentElement.style.overflowY = "auto";
        document.documentElement.style.overflowX = "auto";
      }
    });

    return {
      router,
      commentEvent,
      toSinger,
      toAlbum,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>

</style>
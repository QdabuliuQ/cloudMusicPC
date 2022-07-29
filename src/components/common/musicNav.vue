<template>
  <div :class="[show ? 'showPanel' : '']" id="songDetail">
    <el-scrollbar
      v-if="musicList.length"
      ref="panelScrollContainerRef"
      height="100%"
    >
      <img
        @click="show = false"
        class="downIcon"
        src="~images/songDetail/down.png"
        alt=""
      />
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
                <img class="cd" src="~images/songDetail/cd.png" alt="" />
                <img
                  class="cover"
                  :src="musicList[activeIndex].al.picUrl"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="centerTextList">
            <div class="songTitle">
              {{ musicList[activeIndex].name }}
              <targetList
                :mv="musicList[activeIndex].mv"
                :sq="musicList[activeIndex].sq"
                :vip="musicList[activeIndex].fee == 1"
              ></targetList>
            </div>
            <div
              v-if="
                musicList[activeIndex].alia &&
                musicList[activeIndex].alia.length
              "
              class="songTip"
            >
              <span
                v-for="(item, index) in musicList[activeIndex].alia"
                :key="index"
                >{{ item }}</span
              >
            </div>
            <div
              style="margin-bottom: 20px"
              v-if="musicInfo.ar && musicList[activeIndex].ar.length"
              class="songSinger"
            >
              <span
                @click="toSinger(item.id)"
                v-for="item in musicList[activeIndex].ar"
                :key="item.id"
              >
                {{ item.name }}&nbsp;
              </span>
              -
              <span @click="toAlbum(musicList[activeIndex].al.id)">{{
                musicInfo.al.name
              }}</span>
            </div>
            <el-scrollbar ref="lyricListRef" height="400px">
              <p
                @click="setProgressEvent(item.t)"
                v-if="lyricList.length"
                v-for="(item, index) in lyricList"
                v-html="item.c == '\n' ? '<br/>' : item.c"
                :key="item.t"
                :class="[
                  lyricIndex == index ? 'activeLyric' : '',
                  item.t > dt ? 'disableLyric' : '',
                  'lyricItem',
                ]"
              ></p>
              <p v-else>纯音乐，请欣赏</p>
            </el-scrollbar>
          </div>
          <div class="infoItem rightOtherInfo">
            <div class="otherInfoContainer">
              <div v-if="similarSongList.length" class="similarSongList">
                <div class="listTitle">相似歌曲</div>
                <div
                  v-for="(item, index) in similarSongList"
                  :key="item.id"
                  class="songItem"
                  @click="similarMusicClick(index)"
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
          <loading v-if="!commentList.length && total != 0"></loading>
          <emptyContent v-else-if="total == 0"></emptyContent>
          <div v-else>
            <div style="margin-bottom: 30px">
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
                :id="musicInfo.id"
                :cid="item.commentId"
                :type="0"
              ></commentItem>
            </div>
            <div>
              <div ref="musicCommentTitleRef" class="title">最新评论</div>
              <commentItem
                v-for="item in commentList"
                :key="item.commentId"
                :avatarUrl="item.user.avatarUrl"
                :time="item.time"
                :likedCount="item.likedCount"
                :content="item.content"
                :nickname="item.user.nickname"
                :userId="item.user.userId"
                :beReplied="item.beReplied"
                :liked="item.liked"
                :id="musicInfo.id"
                :cid="item.commentId"
                :type="0"
              ></commentItem>
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 20px;
              "
            >
              <el-pagination
                @current-change="pageChange"
                :current-page="offset"
                :page-size="30"
                background
                layout="prev, pager, next"
                :total="total"
              />
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
  <div class="bottomProgressContainer">
    <div class="progressContainer">
      <div v-if="musicList.length" class="leftMusicInfo">
        <div class="musicInfo">
          <div class="musicImage">
            <img
              @click="toDetail"
              :src="musicList[activeIndex].al.picUrl"
              alt=""
            />
          </div>
          <div class="musicDetail">
            <div class="musicName">
              {{ musicList[activeIndex].name }}
            </div>
            <div class="musicUser">
              <span v-for="item in musicList[activeIndex].ar" :key="item.id"
                >{{ item.name }}&nbsp;&nbsp;</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="centerMusicPro">
        <div class="progressBox">
          <div class="topBtnList">
            <div class="btnContainer">
              <img
                @click="mode = 2"
                style="width: 28px"
                title="列表循环"
                v-show="mode == 1"
                src="~images/songDetail/list_recycle.png"
                alt=""
              />
              <img
                @click="mode = 3"
                style="width: 28px"
                title="单曲循环"
                v-show="mode == 2"
                src="~images/songDetail/one_recycle.png"
                alt=""
              />
              <img
                @click="mode = 1"
                style="width: 28px"
                title="随机循环"
                v-show="mode == 3"
                src="~images/songDetail/random.png"
                alt=""
              />
            </div>
            <div class="btnContainer">
              <img
                @click="toggleMusic('last')"
                style="width: 30px"
                src="~images/common/last.png"
                alt=""
              />
            </div>
            <div class="btnContainer">
              <img
                v-if="!isPlay"
                @click="toPlayMusic(true)"
                style="width: 30px"
                src="~images/common/play.png"
                alt=""
              />
              <img
                v-else
                @click="toStopMusic(false)"
                style="width: 30px"
                src="~images/common/stop.png"
                alt=""
              />
            </div>
            <div class="btnContainer">
              <img
                @click="toggleMusic('next')"
                style="width: 30px"
                src="~images/common/next.png"
                alt=""
              />
            </div>
            <div class="btnContainer">
              <img
                @click="lyricDialog = !lyricDialog"
                style="width: 17px"
                title="打开歌词"
                v-show="!lyricDialog"
                src="~images/songDetail/lyric.png"
                alt=""
              />
              <img
                @click="lyricDialog = !lyricDialog"
                style="width: 17px"
                title="关闭歌词"
                v-show="lyricDialog"
                src="~images/songDetail/lyricActive.png"
                alt=""
              />
            </div>
          </div>
          <div v-if="musicList.length" class="bottomProgress">
            <span class="time">{{ nowPlayTime }}</span>
            <el-slider
              @click="setProgressEvent(-1)"
              ref="musicProgressRef"
              height="5px"
              size="small"
              input-size="small"
              v-model="musicProgress"
              :show-tooltip="false"
            />
            <span class="time">{{ duration }}</span>
          </div>
        </div>
      </div>
      <div v-if="musicList.length" class="rightMusicSetting">
        <el-tooltip
          class="box-item"
          effect="dark"
          placement="top"
          :show-tooltip="false"
        >
          <img src="~images/common/shout.png" alt="" />
          <template #content>
            <el-slider
              v-model="volume"
              :show-tooltip="false"
              vertical
              height="100px"
            />
          </template>
        </el-tooltip>
        <img
          @click="showDrawer = true"
          style="width: 20px; height: 20px"
          src="~images/common/list.png"
          alt=""
        />
      </div>
    </div>
  </div>
  <audio
    ref="audioRef"
    @ended="endedEvent"
    @timeupdate="timeupdateEvent"
    :src="musicUrl"
  ></audio>
  <el-drawer v-model="showDrawer" title="当前播放">
    <el-scrollbar height="100%">
      <tableList
        :flag="true"
        @itemClick="itemClick"
        :columns="columns"
        :data="musicList"
      >
        <template v-slot:icon="{ content, index }">
          <div style="display: flex; align-items: center">
            <img
              style="width: 13px"
              v-if="activeIndex == index - 1"
              src="~images/songDetail/play_red.png"
              alt=""
            />
          </div>
        </template>
        <template v-slot:name="{ content }">
          <div class="songName">
            <div class="name">
              {{ content.name }}
              <span v-for="(item, index) in content.alia" :key="index">
                ({{ item }})&nbsp;&nbsp;
              </span>
            </div>
            <targetList
              :mv="content.mv"
              :sq="content.sq"
              :vip="content.fee == 1"
            ></targetList>
          </div>
        </template>
        <template v-slot:ar="{ content }">
          <div class="singerList">
            <span
              class="infoItem clickItem"
              v-for="item in content.ar"
              :key="item.id"
              @click="router.push('/SingerDetail?id=' + item.id)"
              >{{ item.name }}&nbsp;&nbsp;</span
            >
          </div>
        </template>
        <template v-slot:dt="{ content }">
          <div class="time" style="text-align: center">
            {{ $formatTime(content.dt) }}
          </div>
        </template>
        <template v-slot:ope="{ content, index }">
          <div class="ope">
            <img
              title="从列表中删除"
              @click.stop="deleteMusic(index)"
              style="width: 14px"
              src="~images/common/delete.png"
              alt=""
            />
          </div>
        </template>
      </tableList>
    </el-scrollbar>
  </el-drawer>
  <teleport to="body">
    <div class="lyricFloatPanel" v-if="lyricDialog && lyricList.length">
      <div class="lyricActiveItem">
        <div class="lyricContent">
          {{lyricList[lyricIndex].c}}
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  defineAsyncComponent,
  ref,
  watch,
  nextTick,
  onBeforeUnmount,
} from "vue";
import bus from "vue3-eventbus";
import { useRouter } from "vue-router";
import {
  getSimilarSong,
  getSongLyric,
  getSongComment,
  getSongUrl,
} from "@/network/SongDetail/songDetail";
import { ElNotification } from "element-plus";
import { commentResource } from "@/network/UserInfo/userEvents";
const targetList = defineAsyncComponent(
  () => import("../common/targetList.vue")
);
const commentArea = defineAsyncComponent(
  () => import("../common/commentArea.vue")
);
const commentItem = defineAsyncComponent(
  () => import("../private/commentItem.vue")
);
const tableList = defineAsyncComponent(() => import("./tableList.vue"));
const loading = defineAsyncComponent(() => import("./loading.vue"));
const emptyContent = defineAsyncComponent(() => import("./emptyContent.vue"));

let vPer: any;
let aPer: any;
let domList: any;
let time: number = 0;
let timer: any;

export default defineComponent({
  name: "musicNav",
  components: {
    targetList,
    commentArea,
    tableList,
    commentItem,
    loading,
    emptyContent,
  },
  setup() {
    const audioRef = ref();
    const lyricListRef = ref();
    const musicProgressRef = ref();
    const musicCommentTitleRef = ref();
    const panelScrollContainerRef = ref();
    const router = useRouter();
    const data = reactive({
      isPlay: false,
      musicProgress: 0,
      volume: 100,
      musicInfo: <any>{},
      mid: "", // 音乐id
      show: false, // 是否显示panel
      similarSongList: <any>[], // 相似歌曲
      lyricList: <any>[], // 歌词
      offset: 1, // 页数
      commentList: <any>[], // 评论
      hotCommentList: <any>[], // 热门评论
      total: -1, // 评论总数
      musicUrl: "", // 音乐url
      nowPlayTime: "00:00",
      duration: "",
      dt: 0,
      lyricIndex: -1,
      lyricScrollIndex: 0, // 歌词索引
      musicList: <any>[], // 音乐列表
      activeIndex: 0, // 歌曲索引
      showDrawer: false, // 是否显示抽屉
      columns: [
        { title: "图标", width: "8%", key: "icon", slot: "icon" },
        { title: "名称", width: "50%", key: "name", slot: "name" },
        { title: "歌手", width: "15%", key: "ar", slot: "ar" },
        { title: "时间", width: "15%", key: "dt", slot: "dt" },
        { title: "操作", width: "8%", key: "ope", slot: "ope" },
      ],
      mode: 1, // 歌曲播放模式
      lyricDialog: true,
    });

    // 滚动位置
    const scrollLyric = () => {
      let t: number = domList[data.lyricIndex].offsetTop;
      if (t > 200) {
        lyricListRef.value.setScrollTop(
          t - 200 + domList[data.lyricIndex].clientHeight
        );
      } else {
        lyricListRef.value.setScrollTop(0);
      }
    };
    // 计算相关数据
    const computeData = () => {
      if (audioRef.value) {
        vPer = audioRef.value.duration / 100;
        aPer = 100 / audioRef.value.duration;
      }
    };

    // 更新时间
    const getTime = (t: number) => {
      if (audioRef.value) {
        data.musicProgress = aPer * audioRef.value.currentTime;
        let min = Math.floor(t / 60);
        let second = Math.floor(t % 60);
        data.nowPlayTime = `${min < 10 ? "0" + min : min}:${
          second < 10 ? "0" + second : second
        }`;
      }
    };
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
            t: parseFloat(
              (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3)
            ),
            c: content === "" ? "\n" : content,
          });
        }
      }
      oLRC.sort(function (a: any, b: any) {
        //按时间顺序排序
        return a.t - b.t;
      });
      data.lyricList = oLRC;
      nextTick(() => {
        domList = document.querySelectorAll(".lyricItem");
      });
    };
    // 获取评论
    const getComment = (type?: string) => {
      getSongComment({
        id: data.musicList[data.activeIndex].id,
        limit: 30,
        offset: (data.offset - 1) * 30,
      }).then((res: any) => {
        if (type == "all") {
          data.total = res.data.total;
          data.hotCommentList = res.data.hotComments;
        }
        data.commentList = res.data.comments;
      });
    };
    // 获取相关数据
    const getData = (play?: boolean) => {
      if (data.musicList.length) {
        getSongUrl({
          id: data.musicList[data.activeIndex].id,
        }).then((res: any) => {
          data.musicUrl = res.data.data[0].url;
          audioRef.value.oncanplay = function () {
            if (audioRef.value) {
              let min = Math.floor(audioRef.value.duration / 60);
              let second = Math.floor(audioRef.value.duration % 60);
              data.duration = `${min < 10 ? "0" + min : min}:${
                second < 10 ? "0" + second : second
              }`;
              data.dt = audioRef.value.duration;
              computeData();
            }
          };
          if (play) {
            data.isPlay = true;
            setTimeout(() => {
              audioRef.value.play();
            }, 200);
          }
        });

        getSongLyric({
          id: data.musicList[data.activeIndex].id,
        }).then((res: any) => {
          setLyric(res.data.lrc.lyric);
        });
        computeData();
        if (data.show) {
          getSimilarSong({
            id: data.musicList[data.activeIndex].id,
          }).then((res: any) => {
            data.similarSongList = res.data.songs;
          });
          getComment("all");
        }
      }
    };

    // 清除数据
    const cleanData = () => {
      data.lyricIndex = -1;
      data.lyricScrollIndex = 0;
      data.musicProgress = 0;
      data.isPlay = false;
      audioRef.value ? audioRef.value.pause() : 0;
      audioRef.value ? (audioRef.value.currentTime = 0) : 0;
      lyricListRef.value?.setScrollTop(0);
    };
    // 清除定时器
    const cleanInterval = () => {
      if (timer) {
        for (let i = 1; i <= timer; i++) {
          clearInterval(i);
        }
      }
    };

    const methods = {
      // 删除歌曲
      deleteMusic(e: number) {
        data.musicList.splice(e - 1, 1);
        cleanData();
        getData(true);
      },

      // 切换歌曲
      toggleMusic(type: string) {
        if (data.musicList.length) {
          if (type == "last") {
            if (data.activeIndex == 0) {
              data.activeIndex = data.musicList.length - 1;
            } else {
              data.activeIndex--;
            }
          } else if (type == "next") {
            if (data.activeIndex == data.musicList.length - 1) {
              data.activeIndex = 0;
            } else {
              data.activeIndex++;
            }
          }
          cleanData();
          getData(true);
        }
      },

      // 切换歌曲
      itemClick(e: any) {
        data.showDrawer = false;
        data.activeIndex = e.index;
        cleanData();
        setTimeout(() => {
          getData(true);
        }, 300);
      },
      // 相似音乐
      similarMusicClick(e: number) {
        data.similarSongList.al = data.similarSongList.album;
        data.similarSongList.ar = data.similarSongList.artists;
        for (const item of data.similarSongList) {
          item.al = item.album;
          item.ar = item.artists;
        }
        data.musicList = data.similarSongList;

        data.activeIndex = e;
        cleanData();
        getData(true);
      },

      // 进度条切换
      setProgressEvent(e: number) {
        if (audioRef.value.play) {
          audioRef.value.pause();
        }
        let t: any;
        if (e == -1) {
          t = Math.floor(data.musicProgress * vPer);
        } else {
          t = e;
          if (t <= data.dt) {
            data.musicProgress = t * aPer;
          } else {
            ElNotification({
              message: "歌曲试听部分结束，请开通会员",
              type: "warning",
              customClass: "darkNotice",
            });
          }
        }

        if (t <= audioRef.value.duration) {
          audioRef.value.currentTime = t;
          getTime(t); // 设置时间
          let flag: boolean = false;
          // 遍历歌词 查找当前歌词
          for (const [index, item] of data.lyricList.entries()) {
            if (item.t >= t) {
              // 找到当前歌词的下一句
              flag = true; // 修改判断条件
              data.lyricIndex = e == -1 ? index - 1 : index; // 修改歌词索引
              data.lyricScrollIndex = e == -1 ? index : index + 1;
              scrollLyric(); // 滚动歌词
              break;
            }
          }
          if (!flag) {
            // 没有找到当前歌词的下一句 说明是最后一句歌词
            data.lyricIndex = data.lyricList.length - 1; // 修改索引
            data.lyricScrollIndex = data.lyricList.length;
            scrollLyric();
          }
          if (audioRef.value.pause) {
            audioRef.value.play();
            data.isPlay = true;
          }
        }
      },

      // 音乐终止
      endedEvent() {
        data.isPlay = false;
        data.musicProgress = 100;
        cleanInterval();
        cleanData();
        switch (data.mode) {
          // 列表循环
          case 1:
            methods.toggleMusic("next");
            break;
          // 单曲循环
          case 2:
            audioRef.value ? audioRef.value.play() : 0;
            break;
          // 随机播放
          case 3:
            let n: number = data.activeIndex;
            let r: number = Math.floor(Math.random() * data.musicList.length);
            // 防止获取到相同的索引
            while (n == r) {
              r = Math.floor(Math.random() * data.musicList.length);
            }
            data.activeIndex = r;
            getData(true);
        }
      },

      // 监听音乐
      timeupdateEvent() {
        let t = parseInt(audioRef.value.currentTime);
        if (time != t) {
          time = t;
          getTime(time);
        }
        // 滚动歌词
        let count = 5;

        timer = setInterval(function () {
          console.log(555);

          if (
            audioRef.value.currentTime >
              data.lyricList[data.lyricScrollIndex]?.t &&
            audioRef.value.currentTime <
              data.lyricList[data.lyricScrollIndex + 1]?.t
          ) {
            data.lyricIndex++;
            data.lyricScrollIndex++;
            scrollLyric();
          }
          if (count == 0) {
            clearInterval(timer);
          } else {
            count--;
          }
        }, 50);
      },

      toPlayMusic(e: boolean) {
        if (data.musicList.length) {
          if (data.musicProgress == 100) {
            cleanData();
          }
          data.isPlay = e;
          audioRef.value.play();
        }
      },

      toStopMusic(e: boolean) {
        data.isPlay = e;
        cleanInterval();
        if (data.musicList.length) {
          audioRef.value.pause();
        }
      },

      toDetail() {
        data.show = !data.show;
      },

      // 页面跳转
      toSinger(e: number) {
        data.show = false;
        router.push("/SingerDetail?id=" + e);
      },
      toAlbum(e: number) {
        data.show = false;
        router.push("/AlbumDetail?id=" + e);
      },
      // 评论
      commentEvent(e: { content: string; cid: number }) {
        if (e.cid) {
          commentResource({
            t: 2,
            type: 0,
            id: parseInt(data.mid),
            content: e.content,
            commentId: e.cid,
          }).then((res: any) => {
            if (res.data.code == 200) {
              setTimeout(() => {
                data.offset = 1;
                getComment();
              }, 300);
            }
          });
        } else {
          commentResource({
            t: 1,
            type: 0,
            id: parseInt(data.mid),
            content: e.content,
          }).then((res: any) => {
            if (res.data.code == 200) {
              res.data.comment.likedCount = 0;
              data.commentList.unshift(res.data.comment);
            }
          });
        }
      },
      // 切换评论页码
      pageChange(e: number) {
        data.offset = e;
        getComment();

        panelScrollContainerRef.value.setScrollTop(
          musicCommentTitleRef.value.offsetTop - 15
        );
      },
    };

    bus.on("playMusic", (e: any) => {
      if (e.data.length) {
        data.musicList = e.data;
        data.activeIndex = e.index;
        cleanData();
        data.lyricList.length = 0;
        data.commentList.length = 0;
        getData(true);
        data.musicProgress = 0;
        data.isPlay = true;
      }
    });

    watch(
      () => data.show,
      (n) => {
        if (n) {
          if (!data.lyricList.length || !data.commentList.length) {
            getData();
          }
          document.documentElement.style.overflowY = "hidden";
          document.documentElement.style.overflowX = "hidden";
        } else {
          document.documentElement.style.overflowY = "auto";
          document.documentElement.style.overflowX = "auto";
        }
      }
    );

    watch(
      () => data.volume,
      (n) => {
        audioRef.value.volume = data.volume / 100;
      }
    );

    watch(
      () => router.currentRoute.value.name,
      () => {
        if (data.show) {
          data.show = false;
        }
      }
    );

    onBeforeUnmount(() => {
      cleanData();
      audioRef.value.pause();
      cleanInterval();
    });

    return {
      audioRef,
      lyricListRef,
      musicProgressRef,
      musicCommentTitleRef,
      panelScrollContainerRef,
      ...toRefs(data),
      ...methods,
    };
  },
});
</script>

<style lang='less'>
.lyricFloatPanel {
  width: 700px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 100px;
  text-align: center;
  border-radius: 12px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.47);
  }
  .lyricActiveItem {
    padding: 24px 60px;
    font-size: 31px;
    .lyricContent {
      width: 100%;
      background-image: linear-gradient(white, @themeColor);
      -webkit-background-clip: text;
      color: transparent;
    }
  }
}
.el-drawer {
  width: 400px !important;
  background-color: #292929;
  table {
    border-spacing: 0 6px;
  }
  td:first-child {
    padding-left: 10px;
  }
  td:last-child {
    padding-right: 10px;
  }
  td {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .songName {
    display: flex;
    align-items: center;
    .name {
      max-width: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .singerList {
    width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: @fontColor;
  }
  .time {
    text-align: right;
    color: @fontColor;
  }
  .el-drawer__body {
    padding: 0 0 20px;
  }
  .el-drawer__title {
    color: #fff;
    font-weight: bold;
  }
  .el-drawer__close-btn:hover i {
    color: @themeColor;
  }
}
.el-popper {
  padding: 10px 12px !important;
  .el-slider__runway {
    height: 4px;
    background-color: #363639;
    margin: 0 7px !important;
  }
  .el-slider__bar {
    height: 4px;
    background-color: @themeColor;
  }
  .el-slider__button {
    height: 12px;
    width: 12px;
    border: solid 2px @themeColor;
  }
}
.bottomProgressContainer {
  height: 70px;
  position: fixed;
  z-index: 102;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: @color;
  box-sizing: border-box;
  border-top: 2px solid #4c4c4c;
  .progressContainer {
    padding: 8px 30px;
    display: flex;
    align-items: center;
    .leftMusicInfo {
      flex: 2;

      .musicInfo {
        display: flex;
        align-items: center;
      }
      .musicImage {
        width: 50px;
        height: 50px;
        border-radius: 6px;
        object-fit: contain;
        img {
          cursor: pointer;
          width: 100%;
          height: 100%;
        }
      }
      .musicDetail {
        color: #fff;
        font-size: 14px;
        margin-left: 10px;
        .musicName {
          max-width: 200px;
          min-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .musicUser {
          font-size: 12px;
          margin-top: 3px;
        }
      }
    }
    .centerMusicPro {
      flex: 6;
      display: flex;
      align-items: center;
      justify-content: center;
      .progressBox {
        .topBtnList {
          margin-top: 3px;
          height: 30px;
          justify-content: space-evenly;
          display: flex;
          align-items: center;
        }
        .btnContainer {
          height: 100%;
          margin: 0 20px;
          display: flex;
          align-items: center;
          img {
            cursor: pointer;
          }
        }
        .bottomProgress {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 500px;
          .time {
            color: @fontColor;
            font-size: 12px;
          }
          .el-slider {
            width: 75%;
            margin: 0 10px;
            height: 20px;
          }
          .el-slider__button-wrapper {
            top: -16px;
          }
          .el-slider__runway {
            height: 4px;
            background-color: #363639;
          }
          .el-slider__bar {
            height: 4px;
            background-color: @themeColor;
          }
          .el-slider__button {
            height: 12px;
            width: 12px;
            border: solid 2px @themeColor;
          }
        }
      }
    }
    .rightMusicSetting {
      flex: 2;
      display: flex;
      justify-content: flex-end;
      img {
        width: 23px;
        margin-right: 20px;
        cursor: pointer;
      }
    }
  }
}
#songDetail {
  width: 100%;
  position: fixed;
  left: 0;
  top: 100%;
  background-color: #2b2b2b;
  z-index: 101;
  height: calc(100vh - 55px - 69px);
  transition: 0.3s top linear;
  .downIcon {
    position: absolute;
    left: 30px;
    top: 10px;
    width: 45px;
    cursor: pointer;
    opacity: 0.7;
  }
  .detailContainer {
    padding: 30px 150px;
    min-width: 1060px;
    .infoItem {
      flex: 1;
    }
    .leftCDImage {
      display: flex;
      .CDImageContainer {
        position: relative;
        @keyframes rotateAnimation {
          0% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .coverCDAnimation {
          animation: rotateAnimation 20s linear infinite;
        }
        .pauseCoverCDAnimation {
          animation-play-state: paused;
        }
        .coverCDContainer {
          transform-origin: 50% 50%;
          width: 270px;
          position: relative;
          z-index: 2;
          margin-top: 100px;
          .cover {
            width: 70%;
            position: absolute;
            z-index: 1;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          .cd {
            width: 100%;
            position: relative;
            z-index: 2;
          }
        }

        .playStatus {
          transform: rotate(22deg) !important;
        }
        .tool {
          z-index: 3;
          position: absolute;
          left: 50%;
          top: 33px;
          transform-origin: 0 0;
          width: 100px;
          transition: 0.4s transform linear;
        }
      }
    }
    .centerTextList {
      flex: 1.5;
      text-align: center;
      .el-scrollbar {
        height: 400px;
      }
      .songTitle {
        font-size: 20px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
      }
      .songTip {
        margin-bottom: 10px;
        color: @fontColor;
        font-size: 13px;
      }
      .songSinger {
        margin-bottom: 10px;
        font-size: 13px;
        color: @fontColor;
        span {
          cursor: pointer;
          &:hover {
            color: @themeColor;
          }
        }
      }
      .disableLyric {
        color: #4c4c4c !important;
      }
      .lyricItem {
        margin: 20px 0;
        font-size: 14px;
        color: @fontColor;
        transition: 0.2s all linear;
        position: relative;
        cursor: pointer;
        &:hover {
          color: #fff;
        }
      }
      .activeLyric {
        color: #fff !important;
        font-weight: bold;
        font-size: 15px;
      }
    }
    .rightOtherInfo {
      display: flex;
      justify-content: flex-end;
      .otherInfoContainer {
        width: 270px;
        margin-top: 100px;
        .listTitle {
          font-size: 15px;
          font-weight: bold;
          margin-bottom: 8px;
        }
        .similarSongList {
          width: 100%;
          margin-bottom: 30px;

          .songItem {
            display: flex;
            margin-bottom: 8px;
            cursor: pointer;
            &:hover {
              background: @hoverColor;
            }
            .itemName {
              margin-left: 8px;
              font-size: 13px;
              width: 80%;
              display: flex;
              align-items: center;
              color: @fontColor;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .songUserList {
          width: 100%;
        }
      }
    }
    .commentContainer {
      width: 70%;
      margin: 20px auto;
      .title {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 10px;
      }
    }
  }
}
.showPanel {
  top: 55px !important;
}
</style>
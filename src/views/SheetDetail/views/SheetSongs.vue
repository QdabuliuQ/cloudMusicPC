<template>
  <div
    :infinite-scroll-disabled="disableScroll"
    :infinite-scroll-immediate="false"
    :infinite-scroll-delay="700"
    v-infinite-scroll="loadData"
    id="SheetSongs"
  >
    <loading v-if="!songList.length"></loading>
    <table v-else>
      <thead>
        <tr>
          <td style="width: 3%"></td>
          <td style="width: 4%">操作</td>
          <td style="width: 35%">标题</td>
          <td style="width: 20%">歌手</td>
          <td style="width: 20%">专辑</td>
          <td style="width: 10%">时间</td>
        </tr>
      </thead>
      <tbody>
        <tr class="songItem" v-for="(item, index) in songList" :key="index">
          <td style="width: 3%; text-align: center; color: #949494">
            {{ index + 1 < 10 ? "0" + (index + 1) : index + 1 }}
          </td>
          <td style="width: 4%">
            <div class="iconBox">
              <img
                class="icon"
                style="margin-right: 10px; position: relative; top: 1px"
                src="~images/common/unlike.png"
                alt=""
              />
              <img class="icon" src="~images/common/download.png" alt="" />
            </div>
          </td>
          <td style="width: 35%">
            <div class="nameBox">
              {{ item.name }}
              <span
                style="color: #949494"
                v-if="item.alia && item.alia.length"
                v-for="al in item.alia"
                :key="al"
              >
                ({{ al }})&nbsp;&nbsp;
              </span>
              <img v-if="item.mv" src="~images/recommend/mvIcon.png" alt="" />
            </div>
          </td>
          <td class="info artInfo" style="width: 20%">
            <div>
              <span v-for="art in item.ar">{{ art.name }}&nbsp;&nbsp;</span>
            </div>
          </td>
          <td class="info albumInfo" style="width: 20%">
            <div>
              <span>{{ item.al.name }}</span>
            </div>
          </td>
          <td class="info" style="width: 10%">{{ $formatTime(item.dt) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { getSheetSongs } from "@/network/SheetDetail/SheetDetail";
import { useRouter } from "vue-router";
import { InitData } from "@/types/SheetDetail/SheetSongs";
import loading from "@/components/common/loading.vue";

export default defineComponent({
  name: "SheetSongs",
  components: {
    loading
  },
  setup() {
    const data = reactive(new InitData());
    const router = useRouter();

    const loadData = () => {
      getData();
    };
    const getData = () => {
      getSheetSongs({
        id: router.currentRoute.value.query.id as string,
        offset: data.offset * 20,
        limit: 20,
      }).then((res: any) => {
        if (res.data.songs.length) {
          data.offset++;
          data.songList = [...data.songList, ...res.data.songs];
        } else {
          data.disableScroll = true;
        }
      });
    };

    onMounted(() => {
      getData();
    });
    return {
      ...toRefs(data),
      loadData,
    };
  },
});
</script>

<style lang='less'>
#SheetSongs {
  width: 100%;
  table {
    width: 100%;
    font-size: 13px;
    thead {
      color: @fontColor;
    }
    td {
      padding: 8px 0;
    }
    tbody {
      .songItem:nth-child(even) {
        background-color: #2c2c2c;
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
      .nameBox {
        display: flex;
        align-items: center;
        img {
          width: 20px;
          margin-left: 8px;
          opacity: 0.5;
          &:hover {
            opacity: 1;
          }
        }
      }
      tr {
        cursor: pointer;
        &:hover {
          background-color: @hoverColor !important;
        }
      }
      .info {
        color: @fontColor;
      }
      .artInfo {
        div {
          width: 230px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        span {
          cursor: pointer;
          &:hover {
            color: #fff;
          }
        }
      }
      .albumInfo {
        div {
          width: 230px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          span {
            cursor: pointer;
            &:hover {
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
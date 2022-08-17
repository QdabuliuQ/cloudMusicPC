<template>
  <div id="SearchTexts">
    <loading v-if="!textList.length && total != 0"></loading>
    <emptyContent v-else-if="total == 0"></emptyContent>
    <musicList :columns="columns" :data="textList" v-else>
      <template v-slot:name="{ content }">
        <div class="infoBox">
          <div class="infoName">
            {{ content.name }}
            <targetList
              :mv="content.mv"
              :sq="content.sq"
              :vip="content.fee == 1"
            ></targetList>
          </div>
          <div class="textList">
            <p
              v-for="(item, index) in content.open
                ? content.lyrics
                : content.shortLtyrice
                ? content.shortLtyrice
                : content.lyrics"
              v-html="item"
              :key="index"
            ></p>
          </div>
        </div>
      </template>
      <template v-slot:ar="{ content }">
        <div class="infoData">
          <span v-for="(item, index) in content.ar" :key="index">
            {{ item.name }}&nbsp;&nbsp;
          </span>
        </div>
      </template>
      <template v-slot:al="{ content }">
        <div class="infoData">{{ content.al.name }}</div>
      </template>
      <template v-slot:dt="{ content }">
        <div class="infoData">{{ $formatTime(content.dt) }}</div>
      </template>
      <template v-slot:ope="{ content,index }">
        <div class="infoBtn">
          <div
            class="more"
            @click="content.open = !content.open"
            v-if="content.lyrics.length > 3"
          >
            {{ !content.open ? "展开" : "收起" }}歌词
          </div>
          <div class="copy" @click="copyContent(content.lyrics, index)">复制歌词</div>
        </div>
      </template>
    </musicList>
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
import musicList from "@/components/common/musicList.vue";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import targetList from "@/components/common/targetList.vue";
import { getSearchData } from "@/network/SearchResult/searchResult";
import { useRouter } from "vue-router";
import { InitData } from "@/types/SearchResult/SearchTexts";
import { ElNotification } from "element-plus";

export default defineComponent({
  name: "SearchTexts",
  components: {
    musicList,
    loading,
    emptyContent,
    targetList,
  },
  setup() {
    const router = useRouter();
    const data = reactive(new InitData());

    // 复制
    const copyContent = (e: string[], index: number) => {
      let regex = /(<([^>]+)>)/ig
      let contents = "";
      for (var i = 0; i < e.length; i++) {
        contents += e[i].replace(regex, "") + "\n";
      }
      
      const textarea = document.createElement("textarea");
      textarea.value = contents;
      document.body.appendChild(textarea);
      textarea.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
      }
      document.body.removeChild(textarea);
      ElNotification({
        message: '复制歌词成功',
        type: 'success',
        customClass: "darkNotice",
      })
    };
    // 切换页码
    const pageChange = (e: number) => {
      window.scrollTo(0, 0);
      data.offset = e;
      getData();
    };
    // 获取数据
    const getData = () => {
      getSearchData({
        keywords: router.currentRoute.value.query.key as string,
        limit: 30,
        offset: (data.offset - 1) * 30,
        type: 1006,
      }).then((res: any) => {
        data.total = res.data.result.songCount;
        data.textList = res.data.result.songs;
        for (const item of data.textList) {
          item.open = false;
          if (item.lyrics.length > 3) {
            item.shortLtyrice = item.lyrics.slice(0, 4);
          }
        }
        console.log(data.textList);
      });
    };
    getData();

    return {
      copyContent,
      pageChange,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#SearchTexts {
  table {
    td {
      // text-align: center;
      vertical-align: text-top;
    }
  }
  .infoName {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .infoData {
    color: @fontColor;
    &:hover {
      color: var(--textColor);
    }
  }
  .textList {
    color: @fontColor;
    p {
      margin: 5px 0;
    }
    b {
      color: var(--nameColor);
    }
  }
  .infoBtn {
    display: flex;
    align-items: center;
    div {
      font-size: 11px;
      padding: 7px 14px;
      border: 1px solid @fontColor;
      border-radius: 30px;
      margin-right: 7px;
      &:hover {
        background: var(--hoverColor);
      }
    }
  }
}
</style>
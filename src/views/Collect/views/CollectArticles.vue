<template>
  <div id="CollectArticles">
    <loading v-if="articleList.length == 0 && total != 0"></loading>
    <emptyContent v-else-if="total == 0"></emptyContent>
    <div v-else>
      <div v-for="item in articleList" :key="item.id" class="collectItem">
        <el-image style="width: 100px; height: 55px" :src="item.rectanglePicUrl" :fit="'contain'" />
        <div class="name">
          {{ item.title }}
        </div>
        <div class="author item">by&nbsp;
          <span>{{ item.author }}</span>
        </div>
        <div class="count item">阅读{{ item.readCount }}</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import { InitData } from "@/types/Collect/CollectArticles";
import { getCollectArticles } from "@/network/Collect/collect";

export default defineComponent({
  name: 'CollectArticles',
  components: {
    loading,
    emptyContent,
  },
  setup() {
    const data = reactive(new InitData())

    const getData = () => {
      getCollectArticles({
        limit: 15,
        offset: (data.offset - 1) * 15
      }).then((res: any) => {
        data.total = res.data.count
        data.articleList = res.data.data
      })
    }

    onMounted(() => {
      getData()
    })
    return {
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#CollectArticles {
  .collectItem {
    padding: 8px 0;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
    &:nth-child(even) {
      background-color: #2c2c2c;
    }
    &:hover {
      background-color: @hoverColor;
    }
    .name {
      flex: 4;
      margin-left: 12px;
    }
    .item {
      flex: 1;
      font-size: 13px;
      text-align: center;
      color: @fontColor;
      span {
        cursor: pointer;
        &:hover {
          color: #fff;
        }
      }
    }
  }
}
</style>
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
      <tbody v-if="data && columnSlot">
        <tr class="songItem" v-for="(item, i1) in data" :key="i1">
          <td style="width: 3%; text-align: center; color: #949494">
            {{ i1 + 1 < 10 ? "0" + (i1 + 1) : i1 + 1 }}
          </td>
          <td style="width: 4%" v-if="like | download">
            <div class="iconBox">
              <img
                v-if="like"
                class="icon"
                style="margin-right: 5px; position: relative; top: 1px"
                src="~images/common/unlike.png"
                alt=""
              />
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
              <slot :content="item" :name="att" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed, reactive, toRefs } from "vue";

export default defineComponent({
  props: ["columns", "data", "like", "download"],
  name: "musicList",
  setup(props) {
    const data = reactive({
      columnSlot: <any>[],
    });

    data.columnSlot = computed(() => {
      const filterColumns =
        props.columns.length &&
        props.columns.map((v: any) => {
          return v.slot;
        });
      return filterColumns;
    });

    return {
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
      background-color: #2c2c2c;
    }
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
      tr {
        cursor: pointer;
        &:hover {
          background-color: @hoverColor !important;
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
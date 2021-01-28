<template>
  <div style="padding: 10px">
    <!--使用draggable组件-->
    <div>点击第一列数字进行拖动，其他列拖拽无效</div>
    <a href="http://www.itxst.com/vue-draggable/fiamvqam.html" target="_blank" rel="noopener noreferrer">http://www.itxst.com/vue-draggable/fiamvqam.html</a>
    
    <h4>{{ drag ? "拖拽中" : "拖拽停止" }}</h4>

    <table class="itxst">
      <draggable
        v-model="myArray"
        animation="500"
        force-fallback="true"
        handle=".move"
        @start="onStart"
        @end="onEnd"
        :move="checkMove"
      >
        <tr v-for="item in myArray" :key="item.id">
          <td style="width: 50px" class="move">{{ item.id }}</td>
          <td style="width: 250px">{{ item.name }}</td>
        </tr>
      </draggable>
    </table>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "Table",
  //注册draggable组件
  components: {
    draggable,
  },
  data() {
    return {
      drag: false,

      //定义要被拖拽对象的数组,对数组结构也没特殊要求
      //元素被拖拽后数组里面对象的顺序也会随着改变
      myArray: [
        { people: "cn", id: 1, name: "www.itxst.com" },
        { people: "cn", id: 2, name: "www.baidu.com" },
        { people: "cn", id: 3, name: "www.taobao.com" },
        { people: "us", id: 4, name: "www.google.com" },
      ],
    };
  },
  methods: {
    //开始拖拽事件
    onStart() {
      this.drag = true;
    },
    //拖拽结束事件
    onEnd() {
      this.drag = false;
    },
    checkMove(evt) {
      console.log(evt);
      return true;
    },
  },
};
</script>

<style lang="less" scoped>
/*定义要拖拽元素的样式*/
table.itxst {
  color: #333333;
  border: #ddd solid 1px;
  border-collapse: collapse;
}
table.itxst th {
  border: #ddd solid 1px;
  padding: 8px;
  background-color: #dedede;
}
table.itxst td {
  border: #ddd solid 1px;
  padding: 8px;
  background-color: #ffffff;
}
table.itxst tr {
  cursor: pointer;
}
table.itxst td.move:hover {
  cursor: move;
}
</style>
<template>
  <div class="many">
    <h3>多列拖拽：两列组件设置相同的group名就可以相互拖拽了</h3>
    <a href="http://www.itxst.com/vue-draggable/fueijmfy.html" target="_blank" rel="noopener noreferrer">http://www.itxst.com/vue-draggable/fueijmfy.html</a>
   
    <h4>{{ drag ? "拖拽中" : "拖拽停止" }}</h4>

    <section class="itxst">
      <div class="col">
        <div class="title" >国内网站</div>
        <draggable v-model="arr1" group="site"  animation="300" dragClass="dragClass"  ghostClass="ghostClass" chosenClass="chosenClass" @start="onStart" @end="onEnd">
            <transition-group>
              <div class="item" v-for="item in arr1" :key="item.id">{{item.name}}</div>
            </transition-group>
        </draggable> 
      </div>

      <div class="col">
        <div class="title" >你可以把左边的元素拖到右边</div>
        <draggable v-model="arr2" group="site" animation="300" dragClass="dragClass"  ghostClass="ghostClass" chosenClass="chosenClass" @start="onStart" @end="onEnd">
            <transition-group>
              <div class="item" v-for="item in arr2" :key="item.id">{{item.name}}</div>
            </transition-group>
        </draggable> 
      </div>
    </section>

  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "Many",
  //注册draggable组件
  components: {
    draggable,
  },
  data() {
    return {
      drag: false,

      //定义要被拖拽对象的数组,对数组结构也没特殊要求
      //元素被拖拽后数组里面对象的顺序也会随着改变
      arr1:[
        {id:1,name:'www.itxst.com'},
        {id:2,name:'www.jd.com'},
        {id:3,name:'www.baidu.com'},
        {id:4,name:'www.taobao.com'}
        ],

      arr2:[
        {id:6,name:'www.google.com'},
        {id:7,name:'www.msn.com'},
        {id:8,name:'www.ebay.com'},
        {id:9,name:'www.yahoo.com'}
        ] 
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
  },
};
</script>

<style lang="less" scoped>
/*定义要拖拽元素的样式*/
.ghostClass{
  background-color:  blue !important;
}
.chosenClass{
  background-color: red !important;
  opacity: 1!important;
}
.dragClass{
  background-color: blueviolet !important;
  opacity: 1 !important;
  box-shadow:none !important;
  outline:none !important;
  background-image:none !important;
}
.itxst{
  margin: 10px;
  
}
.title{
  padding: 6px 12px;
}
.col{
  width: 40%;
  flex: 1;
  padding: 10px;
  border: solid 1px #eee;
  border-radius:5px ;
  float: left;
}
.col+.col{
 margin-left: 10px;
}

.item{
  padding: 6px 12px;
  margin: 0px 10px 0px 10px;
  border:  solid 1px #eee;
   background-color: #f1f1f1;
}
.item:hover{
  background-color: #fdfdfd;
  cursor: move;
}
.item+.item{
  border-top:none ;
  margin-top: 6px;
}
</style>
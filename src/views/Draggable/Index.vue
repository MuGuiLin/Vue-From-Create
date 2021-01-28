<template>
  <div>
    <div id="nav">    
      <router-link to="/draggable">单列拖拽</router-link> |
      <router-link to="/draggable/many">多列拖拽</router-link> |
       <router-link to="/draggable/table">表格拖拽</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Draggable",
};
</script>

<style lang="scss" scoped>
</style>
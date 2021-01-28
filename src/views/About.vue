<template>
  <Layout>
    <Header>Header</Header>
    <Layout>
      <Sider hide-trigger>Sider</Sider>
      <Content>
        <div class="about">
          <h1>This is an about page</h1>
          <Row>
            <RadioGroup v-model="buttonSize" type="button">
              <Radio label="large">Large</Radio>
              <Radio label="default">Default</Radio>
              <Radio label="small">small</Radio>
            </RadioGroup>
            <!-- <Col span="12">
              <RadioGroup v-model="buttonSize" type="button">
                <Radio label="large">Large</Radio>
                <Radio label="default">Default</Radio>
                <Radio label="small">small</Radio>
              </RadioGroup>
            </Col> -->
            <!-- <Col span="12">col-12</Col> -->
          </Row>
        </div>
      </Content>
    </Layout>
    <Footer>Footer</Footer>
  </Layout>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      buttonSize: "large",
    };
  },
};
</script>

<style lang="less">
</style>

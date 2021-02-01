<template>
  <div class="create">
    <header class="header">
      <h4>{{ drag ? "拖拽中" : "拖拽停止" }}</h4>
    </header>
    <section class="container">
      <menu class="menu">
        <h3 class="form-ctrl-h3">表单控件</h3>
        <draggable
          :list="dragModel"
          animation="1000"
          v-bind="{
            group: { name: 'drag-drap', pull: 'clone', put: false },
            sort: false,
          }"
          :move="moveCommand"
          @start="onStart"
          @end="onEnd"
        >
          <transition-group>
            <div
              class="form-ctrl-drag"
              v-for="(menu, index) in dragModel"
              :key="index"
            >
              <Button type="primary" :icon="menu.icon">{{ menu.title }}</Button>
            </div>
          </transition-group>
        </draggable>
      </menu>
      <main class="main">
        <Form
          :model="drapForm"
          :label-width="form.labelWidth"
          :inline="form.inline"
          :label-position="form.labelPosition"
        >
          <draggable
            v-model="drapModel"
            group="drag-drap"
            animation="300"
            dragClass="drag-class"
            ghostClass="ghost-class"
            chosenClass="chosen-class"
            :move="moveCommand"
            @add="addCommand"
            @start="startCommand"
            @end="endCommand"
          >
            <template v-for="item in drapModel">
              <!-- 输入框 -->
              <div
                v-if="'input' === item.type && 'text' === item.props.type"
                :key="item.key"
              >
                <FormItem :label="item.title">
                  <Input
                    type="text"
                    v-model="item.value"
                    :placeholder="item.props.placeholder"
                  />
                </FormItem>
              </div>

              <!-- 文本域 -->
              <div
                v-if="'input' === item.type && 'textarea' === item.props.type"
                :key="item.key"
              >
                <FormItem :label="item.title">
                  <Input
                    type="textarea"
                    v-model="item.props.value"
                    :rows="4"
                    :placeholder="item.props.placeholder"
                  />
                </FormItem>
              </div>

              <!-- 文本域 -->
              <div v-if="'DatePicker' === item.type" :key="item.key">
                <FormItem :label="item.title">
                  <DatePicker
                    type="date"
                    :placeholder="item.props.placeholder"
                  ></DatePicker>
                </FormItem>
              </div>

              <!-- 单选框 -->
              <div v-if="'radio' === item.type" :key="item.key">
                <FormItem :label="item.title">
                  <RadioGroup v-model="item.value">
                    <Radio
                      v-for="o in item.options"
                      :key="o.value"
                      :label="o.value"
                      :disabled="o.disabled || false"
                      >{{ o.label }}</Radio
                    >
                  </RadioGroup>
                </FormItem>
              </div>

              <!-- 复选框 -->
              <div v-if="'checkbox' === item.type" :key="item.key">
                <FormItem :label="item.title">
                  <CheckboxGroup v-model="item.value">
                    <Checkbox
                      v-for="o in item.options"
                      :key="o.value"
                      :label="o.value"
                      :disabled="o.disabled || false"
                      >{{ o.label }}</Checkbox
                    >
                  </CheckboxGroup>
                </FormItem>
              </div>

              <!-- 开关 -->
              <div v-if="'switch' === item.type" :key="item.key">
                <FormItem :label="item.title">
                  <Switch v-model="item.value" size="large" />
                  <!-- <Switch size="large" style="width: 200px">
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                  </Switch> -->
                </FormItem>
              </div>

              <!-- 下拉框 -->
              <div v-if="'select' === item.type" :key="item.key">
                <FormItem :label="item.title">
                  <Select v-model="item.value">
                    <Option
                      v-for="o in item.options"
                      :value="o.value"
                      :key="o.value"
                      >{{ o.label }}</Option
                    >
                  </Select>
                </FormItem>
              </div>
            </template>
          </draggable>
        </Form>
      </main>
      <aside class="attr">
        <Tabs @on-click="attrTabClick">
          <TabPane label="配置项" icon="md-settings">
            <div class="setup-form">
              <form-create
                v-model="setupForm.model"
                :rule="setupForm.rule"
                :option="setupForm.option"
              ></form-create>
            </div>
          </TabPane>
          <TabPane label="数据源" icon="md-cloud-outline"> </TabPane>
          <TabPane label="预 览" icon="md-options">
            <div class="view-form">
              <form-create
                v-model="viewForm.model"
                :rule="viewForm.rule"
                :option="viewForm.option"
              ></form-create>
            </div>
          </TabPane>
        </Tabs>
      </aside>
    </section>
  </div>
</template>

<script>
import { config } from "./drag.config.js";
import draggable from "vuedraggable";
export default {
  name: "Create",
  components: {
    draggable,
  },
  data() {
    return {
      drag: "",
      element: {},

      dragModel: config,
      drapModel: [],

      form: {
        //是否开启行内表单模式
        inline: false,
        //表单域标签的位置，可选值为 left、right、top
        labelPosition: "left",
        //表单域标签的宽度，所有的 FormItem 都会继承 Form 组件的 label-width 的值
        // labelPosition为"top"时,需要手动设置 labelWidth 为 undefined
        labelWidth: 100,
        //是否显示校验错误信息
        showMessage: true,
        //原生的 autocomplete 属性，可选值为 off 或 on
        autocomplete: "off",
        //所有带有 size 属性的组件的尺寸，默认为不设置，详见各组件默认的 size 值。可选值为 default、small 或 large。
        size: "large",
      },
      drapForm: {},

      setupForm: {
        // 实例对象
        model: {},

        //生成规则
        rule: [
          {
            type: "radio",
            title: "布局方式",
            field: "layout",
            value: "",
            options: [
              { value: "1", label: "行内样式" },
              { value: "2", label: "块级样式" },
            ],
            on: {
              input: (e) => {
                if ("行内样式" == e) {
                  this.form.inline = true;
                  this.form.labelPosition = "left";
                  this.form.labelWidth = 125;
                } else {
                  this.form.inline = false;
                  this.form.labelPosition = "top";
                  this.form.labelWidth = undefined;
                }
              },
            },
          },
          {
            type: "radio",
            title: "标签对齐",
            field: "labelLayout",
            value: "",
            options: [
              { value: "1", label: "靠左对齐" },
              { value: "2", label: "靠右对齐" },
            ],
            on: {
              input: (e) => {
                this.form.labelPosition = "靠左对齐" == e ? "left" : "right";
              },
            },
          },
          {
            type: "input",
            title: "标签宽度",
            className: "",
            field: "labelWidth",
            value: 100,
            props: {
              // input的表单类型 <input type="">：注：有些表单类型form-create和element-ui专门做成了组件，可以在上面的type中直接用，所以下面有些类型如（radio）在这里会无效哦！！

              // text	默认。定义单行输入字段，用户可在其中输入文本。默认是 20 个字符。
              // button	定义可点击的按钮（大多与 JavaScript 使用来启动脚本）
              // checkbox	定义复选框。
              // color	定义拾色器。
              // date	定义日期字段（带有 calendar 控件）
              // datetime	定义日期字段（带有 calendar 和 time 控件）
              // datetime-local	定义日期字段（带有 calendar 和 time 控件）
              // month	定义日期字段的月（带有 calendar 控件）
              // week	定义日期字段的周（带有 calendar 控件）
              // time	定义日期字段的时、分、秒（带有 time 控件）
              // email	定义用于 e-mail 地址的文本字段
              // file	定义输入字段和 "浏览..." 按钮，供文件上传
              // hidden	定义隐藏输入字段
              // image	定义图像作为提交按钮
              // number	定义带有 spinner 控件的数字字段
              // password	定义密码字段。字段中的字符会被遮蔽。
              // radio	定义单选按钮。
              // range	定义带有 slider 控件的数字字段。
              // reset	定义重置按钮。重置按钮会将所有表单字段重置为初始值。
              // search	定义用于搜索的文本字段。
              // submit	定义提交按钮。提交按钮向服务器发送数据。
              // tel	定义用于电话号码的文本字段。
              // url	定义用于 URL 的文本字段。
              type: "number",
            },
            on: {
              input: (e) => {
                this.form.labelWidth = e;
              },
            },
          },
        ],

        // 参数配置
        option: {
          // 显示重置表单按扭
          resetBtn: false,
          submitBtn: {
            long: false,
            show: false,
          },

          // 表单整体显示规则配置
          form: {
            //是否开启行内表单模式
            inline: false,
            //表单域标签的位置，可选值为 left、right、top
            labelPosition: "top",
            //表单域标签的宽度，所有的 FormItem 都会继承 Form 组件的 label-width 的值
            // labelPosition为"top"时,需要手动设置 labelWidth 为 undefined
            labelWidth: undefined,
            //是否自动在 label 名称后添加冒号
            labelColon: true,
            //是否显示校验错误信息
            showMessage: true,
            //原生的 autocomplete 属性，可选值为 off 或 on
            autocomplete: "off",
            //所有带有 size 属性的组件的尺寸，默认为不设置，详见各组件默认的 size 值。可选值为 default、small 或 large。
            size: undefined,
          },

          // 表单提交按扭事件
          onSubmit: (formData) => {
            alert(JSON.stringify(formData));
            console.log("获取表单中的数据：", formData);
            //   按钮进入提交状态
            this.fApi.btn.loading();
            //   重置按钮禁用
            this.fApi.resetBtn.disabled();
            //   按钮进入可点击状态
            this.fApi.btn.finish();
          },
        },
      },

      viewForm: {
        // 实例对象
        model: {},

        // 表单生成规则数组对象  生成规则：http://www.form-create.com/v2/guide/rule.html
        // 生成规则数组中一个对象就是一个表单项（是一个json对象），在里面可以对应的表单名称、类型、属性、值、样式、类名、是否必填、错误提示等。
        rule: [
          //   {
          //     type: "input",
          //     name: "",
          //     icon: "md-stopwatch",
          //     title: "文本域",
          //     className: "",
          //     field: "",
          //     value: "",
          //     props: {
          //       type: "textarea",
          //       placeholder: "请输入文本！",
          //     },
          //   },
          //   {
          //     type: "checkbox",
          //     name: "",
          //     icon: "md-checkbox",
          //     title: "复选框",
          //     className: "",
          //     field: "checkbox",
          //     value: [],
          //     options: [
          //       { label: "吃喝", value: 1 },
          //       { label: "上班", value: 2, disabled: true },
          //       { label: "旅游", value: 3 },
          //       { label: "运动", value: 4 },
          //       { label: "学习", value: 5, disabled: true },
          //     ],
          //   },
        ],

        // 组件参数配置
        option: {
          // 显示重置表单按扭
          resetBtn: false,

          // 表单整体显示规则配置
          form: {
            //是否开启行内表单模式
            inline: false,
            //表单域标签的位置，可选值为 left、right、top
            labelPosition: "left",
            //表单域标签的宽度，所有的 FormItem 都会继承 Form 组件的 label-width 的值
            // labelPosition为"top"时,需要手动设置 labelWidth 为 undefined
            labelWidth: 100,
            //是否显示校验错误信息
            showMessage: true,
            //原生的 autocomplete 属性，可选值为 off 或 on
            autocomplete: "off",
            //所有带有 size 属性的组件的尺寸，默认为不设置，详见各组件默认的 size 值。可选值为 default、small 或 large。
            size: undefined,
          },

          // 表单提交按扭事件
          onSubmit: (formData) => {
            alert(JSON.stringify(formData));
            console.log("获取表单中的数据：", formData);
            //   按钮进入提交状态
            this.fApi.btn.loading();
            //   重置按钮禁用
            this.fApi.resetBtn.disabled();
            //   按钮进入可点击状态
            this.fApi.btn.finish();
          },
        },
      },
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
    moveCommand(e) {
      //   console.log(e.draggedContext);
      // 容器之间不能同级拖入
      this.element = e.draggedContext.element;
      console.log(111111111111, this.element);
      if (
        e.draggedContext.element.type === "container" &&
        e.relatedContext.element
      ) {
        return false;
      }
      // 其他组件不能与容器同级拖入
      if (e.relatedContext.list) {
        return (
          !e.relatedContext.list.filter((item) => item.type === "container")
            .length > 0
        );
      }
    },

    startCommand(e) {
      console.log("移动中....", e);
    },

    endCommand(e) {
      console.log("结束移动...", e);
    },

    addCommand(e) {
      console.log("add---------", e);

      //   const newIndex = e.newIndex;
      //   const local = this.data[newIndex];
      //   this.$set(this.data, newIndex, {
      //     ...local,
      //     key: `${local.type}_${new Date().getTime()}`,
      //   });
      //   if (e.pullMode === "clone") {
      //     this.$set(this.data, newIndex, {
      //       ...this.outil.agn(this.data[newIndex]),
      //     });
      //   }
      //   this.localSelector = this.data[newIndex];
    },
    moveCommand2(e) {
      console.log("menu", e);
      // 目标是容器不可拖入
      // console.log('来源', e.draggedContext.element.type)
      if (
        e.relatedContext.element &&
        e.relatedContext.element.type === "container"
      ) {
        return false;
      }

      // 布局容器不允许容器停靠
      if (
        e.draggedContext.element.type === "container" &&
        e.relatedContext.element
      ) {
        return false;
      }
    },
    attrTabClick(tab) {
      if (2 === tab && 0 < this.drapModel.length) {
        this.viewForm.rule = this.drapModel;
        console.log(this.viewForm.rule);
      }
    },
  },
};
</script>

<style lang="less">
.create {
  .header {
    height: 50px;
  }
  .container {
    display: flex;
    height: 80vh;
    border: 1px solid #dcdee2;
    .menu {
      width: 300px;
      min-width: 300px;
      border-right: 1px solid #dcdee2;
      //   background-color: #24292e;

      .form-ctrl-h3 {
        padding: 20px 10px 0px;
        text-align: left;
      }

      .form-ctrl-drag {
        float: left;
        margin: 10px;

        .ivu-btn {
          width: 129px;
          font-size: 15px;
          text-align: left;
          cursor: move;

          .ivu-icon {
            font-size: 20px;
          }
        }
      }
    }
    .main {
      flex: 1;
      background-color: #fafafa;
      .ivu-form {
        box-sizing: border-box;
        margin: 10px;

        height: calc(100% - 20px);
        background-color: white;
        outline: 2px dashed #95a3b7;
        > div {
          padding-top: 0.1px;
          height: 100%;
          overflow-y: auto;
          .ivu-form-item {
            display: block;
            margin: 10px 6px;
            padding: 5px;
            text-align: left;
            outline: 1px dashed #95a3b7;
          }
        }

        .drag-class {
          background: goldenrod;
          height: 30px;
          font-size: 0;
          > * {
            display: none;
          }
        }

        .ghost-class {
          outline: 1px dashed #95a3b7;
          height: 50px;
          font-size: 0;
          > * {
            display: none;
          }
        }
        .chosen-class {
          background-color: blueviolet;
          height: 50px;
          font-size: 0;
          > * {
            display: none;
          }
        }
      }
    }
    .attr {
      width: 300px;
      min-width: 300px;
      border-left: 1px solid #dcdee2;
      //   background-color: #24292e;

      .setup-form,
      .view-form {
        padding: 10px;
        text-align: left;
      }
    }
  }
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #f9f9f9;
}

::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: #1890ff;
}
</style>
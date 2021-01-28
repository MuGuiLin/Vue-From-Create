<template>
  <div class="form">
    Form-Create
    <h1>
      组件模式：使用&lt;form-create>&lt;/form-create> 或 &lt;FormCreate />
      标签来创建（生成）表单
    </h1>

    <br />
    <a href="http://www.form-create.com/v2/guide/rule.html" target="_blank">表单 rule[] 生成规则</a>

    <br />
    <br />
    
    <Row>
        <Button size="large" type="success" @click="generateFormFn"  icon="ios-download-outline" >根据JSON生成表单</Button>
        <Button size="large" type="primary" @click="ajaxSetDataFn" icon="md-edit">Ajax请求初始化表单</Button>
        <Button size="large" type="info" @click="getFormModelFn" icon="md-s-promotion">获取表单Model对象</Button>
    </Row>

    <br />
    <h3>使用&lt;form-create>&lt;/form-create>标签来创建（生成）表单：</h3>
    <form-create v-model="fApi" :rule="rule" :option="option"></form-create>

    <br />
    <!-- <h3>使用&lt;FormCreate /> 标签来创建（生成）表单：</h3> -->
    <!-- <FormCreate v-model="fApi" :rule="rule" :option="option" /> -->
  </div>
</template>

<script>
export default {
  name: "Form",
  components: {},
  data() {
    return {
      // 实例对象
      fApi: {},

      // 表单生成规则数组对象  生成规则：http://www.form-create.com/v2/guide/rule.html
      // 生成规则数组中一个对象就是一个表单项（是一个json对象），在里面可以对应的表单名称、类型、属性、值、样式、类名、是否必填、错误提示等。
      rule: [
        {
          type: "input", // 生成组件的名称(就是表单的名称：如input，radio，checkbox，select，slider等)
          field: "userName", // 表单组件的字段名称(就是表单的name属性，注：该必须唯一),自定义组件可以不配置
          className: "user-name-dom", // 设置组件的class属性
          title: "用户名称：", // 组件的名称, 选填
          value: "", // 表单组件的字段值(就是表单的value值),自定义组件可以不用设置
          props: {
            placeholder: "请输入用户名称！",
            disabled: false,
            readonly: false,
            clearable: true, // 是否显示清空按钮
          },
          validate: [
            {
              trigger: "blur",
              required: true,
              message: "用户名称不能为空！",
            },
          ],
          col: {
            md: { span: 12 },
          },
        },

        {
          type: "input",
          field: "password",
          title: "用户密码：",
          value: "666",
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

            type: "password",
            placeholder: "请输入用户密码！",
          },
          col: {
            md: { span: 12 },
          },
        },

        {
          type: "input",
          field: "summary",
          title: "个人简介：",
          value: "",
          props: {
            type: "textarea",
            rows: 3,
            placeholder: "请输入个人简介！",
          },
        },

        {
          type: "radio",
          field: "sex",
          title: "性 别：",
          value: 0,
          options: [
            { label: "先 生", value: 1 },
            { label: "女 士", value: 2 },
            { label: "人 妖", value: 3, disabled: true },
            { label: "未 知", value: 0 },
          ],
        },

        {
          type: "checkbox",
          field: "hobby",
          title: "爱 好：",
          value: [1, 3],
          options: [
            { label: "吃喝", value: 1 },
            { label: "上班", value: 2, disabled: true },
            { label: "旅游", value: 3 },
            { label: "运动", value: 4 },
            { label: "学习", value: 5, disabled: true },
          ],
        },

        {
          type: "select",
          field: "address",
          title: "想去哪里：",
          value: 6,
          col: {
            //   sx: {span: 24}
            md: { span: 10 },
          },
          options: [
            { label: "内国走走", value: 1 },
            { label: "呆在公司", value: 2, disabled: true },
            { label: "非洲美洲", value: 3 },
            { label: "港澳台游", value: 4 },
            { label: "东南亚游", value: 5 },
            { label: "澳洲旅游", value: 6 },
            { label: "自驾游", value: 7 },
          ],
        },

        {
          type: "select",
          field: "address2",
          title: "想多选点：",
          value: [3, 5],
          col: {
            md: { span: 14 },
          },
          props: {
            multiple: true,
            placement: "bottom",
          },
          options: [
            { label: "内国走走", value: 1 },
            { label: "呆在公司", value: 2, disabled: true },
            { label: "非洲美洲", value: 3 },
            { label: "港澳台游", value: 4 },
            { label: "东南亚游", value: 5 },
            { label: "澳洲旅游", value: 6 },
            { label: "自驾游", value: 7 },
          ],
        },
      ],

      // 组件参数配置
      option: {
        // 显示重置表单按扭
        resetBtn: true,

        // 表单提交按扭事件
        onSubmit: (formData) => {
          alert(JSON.stringify(formData));

          console.log("获取表单中的数据：", formData);

          //按钮进入提交状态
          //   this.fApi.btn.loading();

          //重置按钮禁用
          //   this.fApi.resetBtn.disabled();

          //按钮进入可点击状态
          //   this.fApi.btn.finish();
        },
      },
    };
  },
  mounted() {
    // 这里模拟ajax从后端返回数据后，如果渲染表单数据
    window.setTimeout(() => {
      //   this.ajaxSetDataFn();
    }, 5000);
  },
  methods: {
    // 设置表单数据
    ajaxSetDataFn() {
      this.fApi.setValue({
        userName: "沐枫",
        password: "123456",
        summary: "我是请后端返回来的个人简介",
        sex: 1,
        hobby: [3, 4],
        address: 5,
        address2: [1, 4, 7],
        volume: 35,
        jiajie: 56,
        color: "#000DFF",
        dateTime: ["2020-02-01", "2020-02-30"],
        rateNumber: 4,
        offon: false,
        imgFile: [
          "https://inews.gtimg.com/newsapp_ls/0/11673675668_295195/0",
          "https://inews.gtimg.com/newsapp_ls/0/11673508745_295195/0",
        ],
      });
    },

    // 生成表单
    generateFormFn() {
      //   this.rule = [{}];
      this.rule.push(
        {
          type: "slider",
          field: "volume",
          title: "音量大小：",
          value: 60,
          //value: [25, 80],  // 和range: true 时一起使用
          props: {
            min: 0,
            max: 100,
            showTip: "always",
            range: false, // 起始分段
          },
        },

        {
          type: "InputNumber",
          field: "jiajie",
          title: "商品增减：",
          value: 0,
          col: {
            md: { span: 12 },
          },
          validate: [
            {
              required: true,
              //   min: 1,
              message: "商品数里至少为1",
              trigger: "change",
            },
          ],
        },

        {
          type: "ColorPicker",
          field: "color",
          title: "喜欢颜色：",
          value: "#00b102",
          col: {
            md: { span: 12 },
          },
          props: {
            alpha: true,
          },
        },

        {
          type: "DatePicker",
          field: "dateTime",
          title: "起止日期：",
          value: ["2020-04-20", new Date()],
          props: {
            type: "daterange",
            // format: "yyyy-MM-dd HH:mm:ss",
            format: "yyyy-MM-dd",
            placeholder: "请选择起止日期",
          },
        },

        {
          type: "rate",
          field: "rateNumber",
          title: "评分效果：",
          value: 3,
          props: {
            count: 8,
            allowHalf: true, // 是否可选半星
          },
          validate: [
            {
              required: true,
              type: "number",
              min: 4,
              message: "请大于3颗星",
              trigger: "change",
            },
          ],
          control: [
            {
              handle: function (val) {
                console.log(val + "颗星");
              },
            },
          ],
        },

        {
          type: "switch",
          field: "offon",
          title: "打开关闭：",
          value: true,
          col: {
            md: { span: 6 },
          },
          props: {
            trueValue: true,
            falseValue: false,
            slot: {
              open: "开启",
              close: "关闭",
            },
          },
        },

        {
          type: "upload",
          field: "imgFile",
          title: "图片上传：",
          value: [
            "https://inews.gtimg.com/newsapp_ls/0/11673471712_295195/0",
            "http://file.lotkk.com/form-create.png",
            "https://inews.gtimg.com/newsapp_ls/0/11673643537_295195/0",
          ],
          col: {
            md: { span: 18 },
          },
          validate: [
            {
              required: true,
              type: "array",
              min: 1,
              message: "请上传1张图片",
              trigger: "change",
            },
          ],
          props: {
            type: "select",
            uploadType: "image", // file
            name: "userPhoto", // name属性
            multiple: true, // 是否可多选
            allowRemove: true,
            accept: "image/*", // 上传文件类型
            format: ["jpg", "jpeg", "png", "gif"], // 上传文件格式
            maxSize: 2048, // 上传文件大小最大值
            maxLength: 5, // 上传文件数量最大值
            action: "http://www.upimage.com/imguploadApi", // 上传后端接收API接口
            onSuccess: function (res) {
              console.log(res);
              return ""; // 上传成功回调函数
            },
          },
        }
      );
    },

    //获取Form表单 model对象
    getFormModelFn() {
      console.log("Form表单 model对象：", this.fApi.model());
    },

    getUserNameChange(e) {
      console.log(e);
      this.$nextTick(() => {
        this.rule[2].value = this.rule[0].value;
      });
      console.log(this.fApi.getValue("userName"));
    },
  },
};
</script>

<style lang="less">
</style>
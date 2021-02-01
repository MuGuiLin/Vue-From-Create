/**
 * form-create v2内置组件
 */
// hidden
// input
// inputNumber
// checkbox
// radio
// switch
// select
// autoComplete
// cascader
// colorPicker
// datePicker
// timePicker
// rate
// slider
// upload
// tree
// frame
// group

const config = [
    {
        type: "title",
        name: "",
        icon: "md-options",
        title: "标题",
        className: "",
        field: "",
        value: "",
    },
    {
        type: "layout",
        name: "",
        icon: "md-pricetags",
        title: "布局",
        className: "",
    },
    {
        type: "input",
        name: "",
        icon: "logo-bitcoin",
        title: "输入框",
        className: "",
        field: "",
        value: "",
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
            type: "text",
            placeholder: "请输入文本！",
        },
    },
    {
        type: "input",
        name: "",
        icon: "md-stopwatch",
        title: "文本域",
        className: "",
        field: "",
        value: "",
        props: {
            type: "textarea",
            placeholder: "请输入文本！",
        },
    },
    {
        type: "switch",
        name: "",
        icon: "ios-switch",
        title: "开关",
        className: "",
        field: "",
        value: "",
    },
    {
        type: "select",
        name: "",
        icon: "ios-arrow-dropdown-circle",
        title: "下拉框",
        className: "",
        field: "",
        value: "",
        props: {
            placeholder: "请选择！",
        },
        options: [
            { label: "选项1", value: 1 },
            { label: "选项2", value: 2, disabled: true },
            { label: "选项3", value: 3 },
        ],
    },
    {
        type: "radio",
        name: "",
        icon: "md-radio-button-on",
        title: "单选框",
        className: "",
        field: "",
        value: "",
        options: [
            { label: "选项1", value: 1 },
            { label: "选项2", value: 2, disabled: true },
            { label: "选项3", value: 3 },
        ],
    },
    {
        type: "checkbox",
        name: "",
        icon: "md-checkbox",
        title: "复选框",
        className: "",
        field: "",
        value: [],
        options: [
            { label: "选项1", value: 1 },
            { label: "选项2", value: 2 },
            { label: "选项3", value: 3 },
        ],
    },
    {
        type: "DatePicker",
        name: "",
        icon: "ios-calendar",
        title: "日期",
        className: "",
        field: "",
        value: "",
        props: {
            placeholder: "请输选择日期！",
        },
    },
    {
        type: "table",
        name: "",
        icon: "ios-grid",
        title: "表格",
        className: "",
        field: "",
        value: "",
    },
    {
        type: "vue-editor",
        name: "",
        icon: "ios-create",
        title: "富文本",
        className: "",
        field: "editor",
        value: "",
    },
];

export {
    config
};
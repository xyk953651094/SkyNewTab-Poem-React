import {getDevice} from "./publicFunctions";

export let themeArray: ({ bodyBackgroundColor: string; fontColor: string; svgColor: string[]; }[]) = [
    // 深色
    {'bodyBackgroundColor': '#5C2223', 'fontColor': '#F9F871', 'svgColor':['#EAC557', '#D19546', '#AF693B', '#874330']},  // 暗玉紫
    {'bodyBackgroundColor': '#2D0C13', 'fontColor': '#F9F871', 'svgColor':['#E5BB55', '#C38445', '#965438', '#622C29']},  // 茄皮紫
    // {'bodyBackgroundColor': '#7A7374', 'fontColor': '#FFE3EC', 'svgColor':['#FBD0FF', '#C29AF2', '#F05E84', '#8A66B9']},  // 锌灰(不好看)
    {'bodyBackgroundColor': '#4A5E65', 'fontColor': '#F9F871', 'svgColor':['#AAE180', '#6BC48F', '#47A392', '#448084']},  // 月兰
    // 浅色
    {'bodyBackgroundColor': '#EEA2A4', 'fontColor': '#2F4858', 'svgColor':['#CA8CA4', '#9F7B9D', '#746B8D', '#4D5A75']},  // 牡丹粉
    {'bodyBackgroundColor': '#EF498B', 'fontColor': '#2F4858', 'svgColor':['#BF52A0', '#895AA3', '#575A94', '#365378']},  // 扁豆花红
    {'bodyBackgroundColor': '#E9D7DF', 'fontColor': '#276860', 'svgColor':['#C9BDCF', '#A0A7BF', '#7192A9', '#447E89']},  // 丁香淡紫
    {'bodyBackgroundColor': '#F7C173', 'fontColor': '#2F4858', 'svgColor':['#AAB467', '#689F70', '#368477', '#276670']},  // 肉色
    {'bodyBackgroundColor': '#0EB0C9', 'fontColor': '#F9F871', 'svgColor':['#B8F283', '#7AE69D', '#3BD7B5', '#00C5C5']},  // 孔雀蓝
    {'bodyBackgroundColor': '#57C3C2', 'fontColor': '#F9F871', 'svgColor':['#C7F482', '#9AEB98', '#75E0AC', '#5CD2BB']},  // 石绿
    {'bodyBackgroundColor': '#D8E3E7', 'fontColor': '#7B5362', 'svgColor':['#BAC7D2', '#A4AABD', '#948DA4', '#886F85']},  // 云峰白
    {'bodyBackgroundColor': '#FDEDDE', 'fontColor': '#45455D', 'svgColor':['#9BAB9B', '#6D8B84', '#48696F', '#2F4858']},  // 荷花白、青黛
    {'bodyBackgroundColor': '#C29F8F', 'fontColor': '#2F4858', 'svgColor':['#B08889', '#957584', '#73657C', '#50576D']},  // 脏橘
];

// 常用变量
export let device = getDevice();  // 获取当前设备类型

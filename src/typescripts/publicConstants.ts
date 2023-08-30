import {getDevice} from "./publicFunctions";
import {PreferenceDataInterface} from "./publicInterface";

export const themeArray: ({ majorColor: string; minorColor: string; svgColors: string[]; }[]) = [
    // 深色
    {
        'majorColor': '#5C2223',
        'minorColor': '#F9F871',
        'svgColors': ['#EAC557', '#D19546', '#AF693B', '#874330']
    },  // 暗玉紫
    {
        'majorColor': '#2D0C13',
        'minorColor': '#F9F871',
        'svgColors': ['#E5BB55', '#C38445', '#965438', '#622C29']
    },  // 茄皮紫
    // {'majorColor': '#7A7374', 'minorColor': '#FFE3EC', 'svgColors':['#FBD0FF', '#C29AF2', '#F05E84', '#8A66B9']},  // 锌灰(不好看)
    {
        'majorColor': '#4A5E65',
        'minorColor': '#F9F871',
        'svgColors': ['#AAE180', '#6BC48F', '#47A392', '#448084']
    },  // 月兰
    // 浅色
    {
        'majorColor': '#EEA2A4',
        'minorColor': '#2F4858',
        'svgColors': ['#CA8CA4', '#9F7B9D', '#746B8D', '#4D5A75']
    },  // 牡丹粉
    {
        'majorColor': '#EF498B',
        'minorColor': '#2F4858',
        'svgColors': ['#BF52A0', '#895AA3', '#575A94', '#365378']
    },  // 扁豆花红
    {
        'majorColor': '#E9D7DF',
        'minorColor': '#276860',
        'svgColors': ['#C9BDCF', '#A0A7BF', '#7192A9', '#447E89']
    },  // 丁香淡紫
    {
        'majorColor': '#F7C173',
        'minorColor': '#2F4858',
        'svgColors': ['#AAB467', '#689F70', '#368477', '#276670']
    },  // 肉色
    {
        'majorColor': '#0EB0C9',
        'minorColor': '#F9F871',
        'svgColors': ['#B8F283', '#7AE69D', '#3BD7B5', '#00C5C5']
    },  // 孔雀蓝
    {
        'majorColor': '#57C3C2',
        'minorColor': '#F9F871',
        'svgColors': ['#C7F482', '#9AEB98', '#75E0AC', '#5CD2BB']
    },  // 石绿
    {
        'majorColor': '#D8E3E7',
        'minorColor': '#7B5362',
        'svgColors': ['#BAC7D2', '#A4AABD', '#948DA4', '#886F85']
    },  // 云峰白
    {
        'majorColor': '#FDEDDE',
        'minorColor': '#45455D',
        'svgColors': ['#9BAB9B', '#6D8B84', '#48696F', '#2F4858']
    },  // 荷花白、青黛
    {
        'majorColor': '#C29F8F',
        'minorColor': '#2F4858',
        'svgColors': ['#B08889', '#957584', '#73657C', '#50576D']
    },  // 脏橘
];

// 中国窗体
export const chinaWindow = [
    "icon-chuangge1",
    "icon-chuangge3",
    "icon-chuangge4",
    "icon-chuangge5",
    "icon-chuangge7",
    "icon-chuangge9",
    "icon-chuangge10",
    "icon-chuangge11",
    "icon-chuangge12",
    "icon-chuangge13",
    "icon-chuangge14",
    "icon-chuangge15",
    "icon-chuangge16",
]

// 中国窗体
export const chinaObject = [
    "icon-chaye",
    "icon-huaping",
    "icon-huaping1",
    "icon-meihua",
    "icon-facaishu",
    "icon-chuxiye",
]

export let defaultPreferenceData: PreferenceDataInterface = {
    searchEngine: "bing",
    simpleMode: false,
}

// 常用变量
export const device = getDevice();  // 获取当前设备类型

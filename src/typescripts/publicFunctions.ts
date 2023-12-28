import "jquery-color"
import {chinaObject, chinaWindow, darkThemeArray, defaultPreferenceData, lightThemeArray} from "./publicConstants";
import {PreferenceDataInterface} from "./publicInterface";

const $ = require("jquery");

// 网络请求
export function httpRequest(headers: object, url: string, data: object, method: "GET" | "POST") {
    return new Promise(function (resolve, reject) {
        $.ajax({
            headers: headers,
            url: url,
            type: method,
            data: data,
            timeout: 5000,
            success: (resultData: any) => {
                resolve(resultData);
            },
            error: function () {
                reject();
            }
        });
    })
}

// 获取日期与时间
export function getTimeDetails(param: Date) {
    let year: string | number = param.getFullYear();
    let month: string | number = param.getMonth() + 1;
    let day: string | number = param.getDate();
    let hour: string | number = param.getHours();
    let minute: string | number = param.getMinutes();
    let second: string | number = param.getSeconds();
    let week: string | number = param.getDay();
    let localeDate: string = param.toLocaleString("zh-Hans-u-ca-chinese");

    year = year.toString();
    month = month < 10 ? ("0" + month) : month.toString();
    day = day < 10 ? ("0" + day) : day.toString();
    hour = hour < 10 ? ("0" + hour) : hour.toString();
    minute = minute < 10 ? ("0" + minute) : minute.toString();
    second = second < 10 ? ("0" + second) : second.toString();
    switch (week) {
        case 0:
            week = "周日";
            break;
        case 1:
            week = "周一";
            break;
        case 2:
            week = "周二";
            break;
        case 3:
            week = "周三";
            break;
        case 4:
            week = "周四";
            break;
        case 5:
            week = "周五";
            break;
        case 6:
            week = "周六";
            break;
        default:
            week = "";
    }

    return {
        year: year, month: month, day: day, hour: hour, minute: minute, second: second,
        showWeek: week,
        showDate: year + "/" + month + "/" + day,
        showDate2: year + "." + month + "." + day,
        showDate3: year + month + day,
        showDate4: year + "年" + month + "月" + day + "日",
        showDate5: year + "-" + month + "-" + day,
        showTime: hour + ":" + minute,
        showDetail: year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second,
        showLocaleDate: "农历" + localeDate.split(" ")[0] + "日"
    };
}

// 根据当前时间段返回问候语
export function getGreetContent() {
    let hour = new Date().getHours();

    const greets = {
        morning: "朝霞满",
        noon: "正当午",
        afternoon: "斜阳下",
        evening: "日暮里",
        night: "见星辰",
        daybreak: "又一宿"
    };

    if (hour >= 0 && hour < 6) {          // 凌晨
        return greets.daybreak;
    } else if (hour >= 6 && hour < 11) {   // 上午
        return greets.morning;
    } else if (hour >= 11 && hour < 14) {  // 中午
        return greets.noon;
    } else if (hour >= 14 && hour < 17) {  // 下午
        return greets.afternoon;
    } else if (hour >= 17 && hour < 20) {   // 傍晚
        return greets.evening;
    } else {                               // 夜晚
        return greets.night;
    }
}

// 获取问候语图标 className
export function getGreetIcon() {
    let hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {   // 上午
        return "bi bi-sunrise";
    } else if (hour >= 12 && hour < 18) {  // 下午
        return "bi bi-sunset";
    } else {                               // 夜晚
        return "bi bi-moon-stars";
    }
}

// 获取天气图标className
export function getWeatherIcon(weatherInfo: string) {
    if (weatherInfo.indexOf("晴") !== -1) {
        return "bi bi-sun"
    } else if (weatherInfo.indexOf("阴") !== -1) {
        return "bi bi-cloud"
    } else if (weatherInfo.indexOf("云") !== -1) {
        return "bi bi-clouds"
    } else if (weatherInfo.indexOf("雨") !== -1) {
        return "bi bi-cloud-rain"
    } else if (weatherInfo.indexOf("雾") !== -1) {
        return "bi bi-cloud-fog"
    } else if (weatherInfo.indexOf("霾") !== -1) {
        return "bi bi-cloud-haze"
    } else if (weatherInfo.indexOf("雪") !== -1) {
        return "bi bi-cloud-snow"
    } else if (weatherInfo.indexOf("雹") !== -1) {
        return "bi bi-cloud-hail"
    } else {
        return ""
    }
}

// 获取中国窗体
export function getWindowClassName() {
    let arrayLength = chinaWindow.length;
    let index = Math.floor(Math.random() * arrayLength);
    return chinaWindow[index];
}

export function getObjectClassName() {
    let arrayLength = chinaObject.length;
    let index = Math.floor(Math.random() * arrayLength);
    return chinaObject[index];
}

// 随机显示多彩颜色主题
export function setColorTheme() {
    let currentHour = parseInt(getTimeDetails(new Date()).hour);
    let themeArray = lightThemeArray;
    if (currentHour > 18 || currentHour < 6) {  // 夜间显示深色背景
        themeArray = darkThemeArray;
    }

    let randomNum = Math.floor(Math.random() * themeArray.length);
    let body = document.getElementsByTagName("body")[0];
    body.style.backgroundColor = themeArray[randomNum].majorColor;    // 设置body背景颜色

    return {
        "majorColor": themeArray[randomNum].majorColor,
        "minorColor": themeArray[randomNum].minorColor,
        "svgColors": themeArray[randomNum].svgColors,
    };  // 返回各组件背景颜色
}

// 根据图片背景颜色获取元素反色效果
export function getReverseColor(color: string) {
    color = "0x" + color.replace("#", '');
    let newColor = "000000" + (0xFFFFFF - parseInt(color)).toString(16);
    return "#" + newColor.substring(newColor.length - 6, newColor.length);
}

// 根据图片背景颜色改变字体颜色效果
export function getFontColor(color: string) {
    let rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    if (rgb) {
        let r = parseInt(rgb[1], 16);
        let g = parseInt(rgb[2], 16);
        let b = parseInt(rgb[3], 16);
        let gray = Math.round(r * 0.299 + g * 0.587 + b * 0.114);
        if (gray > 128) {
            return "#000000";
        } else {
            return "#ffffff";
        }
    } else {
        return "#ffffff";
    }
}

// 判断设备型号
export function getDevice() {
    let ua = navigator.userAgent;
    if (ua.indexOf("iPhone") > -1) {
        return "iPhone"
    } else if (ua.indexOf("iPad") > -1) {
        return "iPad"
    } else if (ua.indexOf("Android") > -1) {
        return "Android"
    } else {
        return ""
    }
}

export function getSearchEngineDetail(searchEngine: string) {
    let searchEngineName: string;
    let searchEngineValue: string;
    let searchEngineUrl: string;
    let searchEngineIconUrl: string;
    switch (searchEngine) {
        case "bing":
            searchEngineName = "必应";
            searchEngineValue = "bing";
            searchEngineUrl = "https://www.bing.com/search?q=";
            searchEngineIconUrl = "https://www.bing.com/favicon.ico";
            break;
        case "google":
            searchEngineName = "谷歌";
            searchEngineValue = "google";
            searchEngineUrl = "https://www.google.com/search?q=";
            searchEngineIconUrl = "https://www.google.com/favicon.ico";
            break;
        default:
            searchEngineName = "必应";
            searchEngineValue = "bing";
            searchEngineUrl = "https://www.bing.com/search?q=";
            searchEngineIconUrl = "https://www.bing.com/favicon.ico";
            break;
    }
    return {
        "searchEngineName": searchEngineName,
        "searchEngineValue": searchEngineValue,
        "searchEngineUrl": searchEngineUrl,
        "searchEngineIconUrl": searchEngineIconUrl
    };
}

// 补全设置数据
export function fixPreferenceData(preferenceData: PreferenceDataInterface) {
    let isFixed = false;
    if (!preferenceData.searchEngine) {
        preferenceData.searchEngine = defaultPreferenceData.searchEngine;
        isFixed = true;
    }
    if (!preferenceData.buttonShape) {
        preferenceData.buttonShape = defaultPreferenceData.buttonShape;
        isFixed = true;
    }
    if (preferenceData.simpleMode === undefined || preferenceData.simpleMode === null) {
        preferenceData.simpleMode = defaultPreferenceData.simpleMode;
        isFixed = true;
    }
    if (preferenceData.displayAlert === undefined || preferenceData.displayAlert === null) {
        preferenceData.displayAlert = defaultPreferenceData.displayAlert;
        isFixed = true;
    }

    if (isFixed) {
        localStorage.setItem("preferenceData", JSON.stringify(preferenceData));  // 重新保存设置
    }
    return preferenceData;
}

export function getPreferenceDataStorage() {
    let tempPreferenceData = localStorage.getItem("preferenceData");
    if (tempPreferenceData === null) {
        localStorage.setItem("preferenceData", JSON.stringify(defaultPreferenceData));
        return defaultPreferenceData;
    } else {
        return fixPreferenceData(JSON.parse(tempPreferenceData));  // 检查是否缺少数据
    }
}

export function getHolidayDataStorage() {
    let tempHolidayData = localStorage.getItem("lastHoliday");
    if (tempHolidayData !== null) {
        return JSON.parse(tempHolidayData);
    } else {
        return null;
    }
}

export function btnMouseOver(color: string, e: any) {
    e.currentTarget.style.backgroundColor = color;
    e.currentTarget.style.color = getFontColor(color);
}

export function btnMouseOut(color: string, e: any) {
    e.currentTarget.style.backgroundColor = "transparent";
    e.currentTarget.style.color = getFontColor(color);
}

// 修改菜单栏表单控件时变化主题颜色
export function resetRadioColor(selectedRadio: string | undefined, allRadios: string[], themeColor: string) {
    // 重置所有不是当前选中的选项的颜色
    for (let i = 0; i < allRadios.length; i++) {
        let currentRadio = $("#" + allRadios[i]);
        if (selectedRadio && allRadios[i] !== selectedRadio) {
            currentRadio.next().css({"borderColor": "#d9d9d9", "backgroundColor": "#ffffff"});
            currentRadio.parent().next().css({"fontWeight": "normal", "textDecoration": "none"});
        }
        else {
            currentRadio.next().css({ "borderColor": themeColor, "backgroundColor": themeColor });
            currentRadio.parent().next().css({"color": themeColor, "fontWeight": "bold", "textDecoration": "underline"});
        }
    }
}

export function resetSwitchColor(element: string, checked: boolean, themeColor: string) {
    if (!checked) {
        $(element).children(".ant-switch-inner").css("backgroundColor", "rgb(0, 0, 0, 0)");
    }
    else {
        $(element).children(".ant-switch-inner").css("backgroundColor", themeColor)
            .find(".ant-switch-inner-checked").css("color", getFontColor(themeColor));
    }
}
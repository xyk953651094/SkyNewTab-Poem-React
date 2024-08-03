/* global chrome */  /* 加上这行才能使用 chrome */
/* global browser */
function getBrowserType() {
    const userAgent = navigator.userAgent;

    const browserDetection = {
        "Chrome": userAgent.includes("Chrome") && userAgent.includes("Safari") && !userAgent.includes("Edg"),
        "Edge": userAgent.includes("Edg"),
        "Firefox": userAgent.includes("Firefox"),
        "Safari": !userAgent.includes("Chrome") && userAgent.includes("Safari"),
    };

    for (const browser in browserDetection) {
        if (browserDetection[browser]) {
            return browser;
        }
    }
    return "Other";
}

function forbiddenWeb(url) {
    if (["Chrome", "Edge"].indexOf(browserType) !== -1) {
        chrome.storage.local.get(["focusMode", "filterList", "focusEndTimeStamp"]).then((result) => {
            let focusMode = result.focusMode;
            let filterList = result.filterList;
            let focusEndTimeStamp = result.focusEndTimeStamp;
            if (focusMode === true && filterList !== null && filterList.length > 0) {  // 已开启专注模式且有过滤列表
                if (focusEndTimeStamp === 0 || (focusEndTimeStamp > 0 && Date.now() < focusEndTimeStamp)) {  // 时间在专注时段内
                    let isInBlackList = false;
                    for (let i = 0; i < filterList.length; i++) {
                        if (url.indexOf(filterList[i].domain) !== -1) {
                            isInBlackList = true;
                        }
                    }

                    if (isInBlackList === true) {
                        chrome.tabs.update({url: browserType + "://newtab"});
                    }
                }
            }
        });
    }
    else if (["Firefox", "Safari"].indexOf(browserType) !== -1) {
        browser.storage.local.get(["focusMode", "filterList", "focusEndTimeStamp"]).then((result) => {
            let focusMode = result.focusMode;
            let filterList = result.filterList;
            let focusEndTimeStamp = result.focusEndTimeStamp;
            if (focusMode === true && filterList !== null && filterList.length > 0) {  // 已开启专注模式且有过滤列表
                if (focusEndTimeStamp === 0 || (focusEndTimeStamp > 0 && Date.now() < focusEndTimeStamp)) {  // 时间在专注时段内
                    let isInBlackList = false;
                    for (let i = 0; i < filterList.length; i++) {
                        if (url.indexOf(filterList[i].domain) !== -1) {
                            isInBlackList = true;
                        }
                    }

                    if (isInBlackList === true) {
                        browser.tabs.update({url: "./mainPage.html"});
                    }
                }
            }
        });
    }
}

const browserType = getBrowserType();
if (["Chrome", "Edge"].indexOf(browserType) !== -1) {
    chrome.tabs.onUpdated.addListener(function (tabID, changeInfo, tab) {
        if(changeInfo.url) {
            forbiddenWeb(changeInfo.url);
        }
    });
}
else if (["Firefox", "Safari"].indexOf(browserType) !== -1) {
    browser.tabs.onUpdated.addListener(
        function (tabID, changeInfo, tab) {
            if(changeInfo.url) {
                forbiddenWeb(changeInfo.url);
            }
        }
    )
}
else {
    console.log("该功能不支持当前的浏览器，请使用 Chrome、Edge、Firefox、Safari")
}
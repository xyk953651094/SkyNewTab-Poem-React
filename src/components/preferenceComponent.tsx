import React, {useEffect, useState} from "react";
import {Button, Drawer, Space, Tooltip} from "antd";
import {MoreOutlined} from "@ant-design/icons";
import {getFontColor} from "../typescripts/publicFunctions";
import {device} from "../typescripts/publicConstants";
import PreferenceLinkComponent from "../preferenceComponents/preferenceLinkComponent";
import PreferenceInfoComponent from "../preferenceComponents/preferenceInfoComponent";
import PreferenceFooterComponent from "../preferenceComponents/preferenceFooterComponent";
import PreferenceEmailComponent from "../preferenceComponents/preferenceEmailComponent";
import PreferenceFunctionComponent from "../preferenceComponents/preferenceFunctionComponent";

function PreferenceComponent(props: any) {
    const [displayDrawer, setDisplayDrawer] = useState(false);
    const [drawerPosition, setDrawerPosition] = useState<"right" | "bottom">("right");

    function showDrawerBtnOnClick() {
        setDisplayDrawer(true);
    }

    function drawerOnClose() {
        setDisplayDrawer(false);
    }

    useEffect(() => {
        // 屏幕适配
        if (device === "iPhone" || device === "Android") {
            setDrawerPosition("bottom")
        }
    }, [])

    return (
        <>
            <Tooltip title={"菜单栏"} placement={"bottomRight"} color={props.minorColor}>
                <Button type={"text"} shape={"circle"} icon={<MoreOutlined/>} size={"large"}
                        onClick={showDrawerBtnOnClick}
                        id={"preferenceBtn"}
                        className={"componentTheme poemFont"}
                        style={{backgroundColor: props.minorColor, color: getFontColor(props.minorColor)}}
                />
            </Tooltip>
            <Drawer
                title={"菜单栏"}
                size={"default"}
                width={380}
                height={500}
                placement={drawerPosition}
                onClose={drawerOnClose}
                open={displayDrawer}
                closeIcon={false}
                headerStyle={{color: getFontColor(props.minorColor), borderBottomColor: getFontColor(props.minorColor)}}
                drawerStyle={{backgroundColor: props.minorColor}}
                maskStyle={{backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}
                footer={
                    <PreferenceFooterComponent
                        majorColor={props.majorColor}
                        minorColor={props.minorColor}/>
                }
                footerStyle={{
                    backgroundColor: props.minorColor,
                    borderTopColor: getFontColor(props.minorColor),
                    textAlign: "center"
                }}
            >
                <Space direction={"vertical"} size={"large"}>
                    <PreferenceFunctionComponent
                        majorColor={props.majorColor}
                        minorColor={props.minorColor}
                        getPreferenceData={props.getPreferenceData}
                    />
                    <PreferenceLinkComponent
                        majorColor={props.majorColor}
                        minorColor={props.minorColor}
                    />
                    <PreferenceInfoComponent
                        majorColor={props.majorColor}
                        minorColor={props.minorColor}
                    />
                    <PreferenceEmailComponent
                        majorColor={props.majorColor}
                        minorColor={props.minorColor}
                    />
                </Space>
            </Drawer>
        </>
    );
}

export default PreferenceComponent;
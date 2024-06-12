import React, {useEffect, useState} from "react";
import {Button, Drawer, Space, Tooltip} from "antd";
import {MenuOutlined} from "@ant-design/icons";
import {getFontColor} from "../typescripts/publicFunctions";
import {device} from "../typescripts/publicConstants";
import MenuInfoComponent from "../menuComponents/menuInfoComponent";
import MenuFooterComponent from "../menuComponents/menuFooterComponent";
import MenuContactComponent from "../menuComponents/menuContactComponent";
import MenuPreferenceComponent from "../menuComponents/menuPreferenceComponent";
import MenuHeaderComponent from "../menuComponents/menuHeaderComponent";
import MenuToTopComponent from "../menuComponents/menuToTopComponent";

function MenuComponent(props: any) {
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
    }, [props.preferenceData.buttonShape])

    return (
        <>
            <Tooltip title={"菜单栏"} placement={"bottomRight"} color={props.minorColor}>
                <Button type={"text"} shape={props.preferenceData.buttonShape === "round" ? "circle" : "default"}
                        icon={<MenuOutlined style={{fontSize: "16px"}}/>} size={"large"}
                        onClick={showDrawerBtnOnClick}
                        id={"preferenceBtn"}
                        className={"componentTheme poemFont"}
                        style={{backgroundColor: props.minorColor, color: getFontColor(props.minorColor)}}
                />
            </Tooltip>
            <Drawer
                size={"default"}
                width={400}
                height={500}
                placement={drawerPosition}
                onClose={drawerOnClose}
                open={displayDrawer}
                closeIcon={false}
                title={
                    <MenuHeaderComponent
                        majorColor={props.majorColor}
                        minorColor={props.minorColor}
                        preferenceData={props.preferenceData}
                    />
                }
                footer={
                    <MenuFooterComponent
                        majorColor={props.majorColor}
                        minorColor={props.minorColor}
                        preferenceData={props.preferenceData}
                    />
                }
                styles={{
                    mask: {backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"},
                    header: {color: getFontColor(props.minorColor), borderBottomColor: getFontColor(props.minorColor)},
                    content: {backgroundColor: props.minorColor},
                    footer: {
                        backgroundColor: props.minorColor,
                        borderTopColor: getFontColor(props.minorColor),
                        textAlign: "center"
                    }
                }}
            >
                <Space direction={"vertical"} size={"large"} id={"drawerContent"}>
                    <MenuPreferenceComponent
                        majorColor={props.majorColor}
                        minorColor={props.minorColor}
                        svgColors={props.svgColors}
                        getPreferenceData={props.getPreferenceData}
                    />
                    <MenuInfoComponent
                        majorColor={props.majorColor}
                        minorColor={props.minorColor}
                        preferenceData={props.preferenceData}
                    />
                    <MenuContactComponent
                        majorColor={props.majorColor}
                        minorColor={props.minorColor}
                        preferenceData={props.preferenceData}
                    />
                    <MenuToTopComponent
                        majorColor={props.majorColor}
                        minorColor={props.minorColor}
                        preferenceData={props.preferenceData}
                    />
                </Space>
            </Drawer>
        </>
    );
}

export default MenuComponent;
import React from "react";
import {Button, Space} from "antd";
import {StarOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, getFontColor} from "../typescripts/publicFunctions";

function MenuFooterComponent(props: any) {
    return (
        <Space>
            <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<StarOutlined/>}
                    href={"https://afdian.net/a/xyk953651094"} target={"_self"}
                    onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                    onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                    className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                如果喜欢这款插件，请考虑捐助或五星好评
            </Button>
        </Space>
    );
}

export default MenuFooterComponent;
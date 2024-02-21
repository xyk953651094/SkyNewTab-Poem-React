import React from "react";
import {Button, Space} from "antd";
import {StarOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, getFontColor} from "../typescripts/publicFunctions";

function MenuFooterComponent(props: any) {
    return (
        <Space>
            <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<StarOutlined/>}
                    onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                    onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                    className={"poemFont"} style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                如果喜欢这款插件，请在插件商店五星好评
            </Button>
        </Space>
    );
}

export default MenuFooterComponent;
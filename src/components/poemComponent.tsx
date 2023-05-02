import React, {useEffect, useState} from 'react';
import "../stylesheets/poemComponent.scss";
const poemRequest = require('jinrishici');

function PoemComponent(props: any) {
    const [poemContent, setPoemContent] = useState("海上生明月，天涯共此时");
    const [poemAuthor, setPoemAuthor] = useState("【唐】张九龄 ·《望月怀远》");

    useEffect(() => {
        poemRequest.load((result: any) => {
            setPoemContent(result.data.content);
            setPoemAuthor("【" + result.data.origin.dynasty + "】" +
                result.data.origin.author + " ·" +
                "《" + result.data.origin.title + "》"
            );
        });
    }, []);

    return (
        <div id="poemDiv" style={{color: props.fontColor}}>
            <p id="poemContent" className="poem-font" >{poemContent}</p>
            <p id="poemAuthor" className="poem-font" >{poemAuthor}</p>
        </div>
    );
}

export default PoemComponent;
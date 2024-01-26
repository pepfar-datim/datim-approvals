import React, {useState} from 'react';
import {Button} from "@material-ui/core";

const cutOff = 300;

const styles={
    button: {
        display: 'block'
    }
};

function renderText(text:string, showMore:boolean){
    if (showMore) return text;
    else return text.substr(0, cutOff)+'...';
}

function renderShowMoreButton(showMore: boolean, setShowMore:(boolean)=>void){
    if (!showMore) return <Button size="small" onClick={()=>setShowMore(true)} style={styles.button}>Show more</Button>;
}

export default function ShowMore({text}:{text:string}) {
    let [showMore, setShowMore] = useState(false);
    if (!text) return null;
    if (text.length<cutOff) return <React.Fragment>{text}</React.Fragment>;
    return <React.Fragment>
        {renderText(text, showMore)}
        {renderShowMoreButton(showMore,setShowMore)}
    </React.Fragment>;
}
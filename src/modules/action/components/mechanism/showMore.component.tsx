import React, {useState} from 'react';
import {Button} from "@material-ui/core";

const cutOff = 300;

function renderText(text:string, showMore:boolean){
    if (showMore) return text;
    else return text.substr(0, cutOff)+'...';
}

function renderShowMoreButton(showMore: boolean, setShowMore:(boolean)=>void){
    if (!showMore) return <Button size="small" onClick={()=>setShowMore(true)}>Show more</Button>
}

export default function ShowMore({text}:{text:string}) {
    let [showMore, setShowMore] = useState(false);
    if (text.length<cutOff) return <React.Fragment>{text}</React.Fragment>;
    return <React.Fragment>
        {renderText(text, showMore)}
        {renderShowMoreButton(showMore,setShowMore)}
    </React.Fragment>;
}
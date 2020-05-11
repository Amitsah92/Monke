import React, {useState, useEffect} from 'react';

export default function QuizTimer(){
    const[time, setTime] = useState({ms:0, s:0, m:30, h:0});

    useEffect(()=>{
        start();
    },[])

    const start = () => {
        run();
        setInterval(run,10);
    }

    var updateMs = time.ms, updateS = time.s, updateM = time.m, updateH = time.h;

    const run = () =>{
        if(updateM === 0){
            updateH--;
            updateM=60;
        }
        if(updateS === 0){
            updateM--;
            updateS = 60
        }
        if(updateMs === 0){
            updateS--;
            updateMs = 100;
        }
        updateMs--;
        setTime({ms:updateMs, s:updateS, m:updateM, h:updateH});
    };

    return(
        <div>
            <span>{(time.h >= 10)? time.h:"0"+time.h}</span>&nbsp;:&nbsp;
            <span>{(time.m >= 10)? time.m:"0"+time.m}</span>&nbsp;:&nbsp;
            <span>{(time.s >= 10)? time.s:"0"+time.s}</span>&nbsp;:&nbsp;
            <span>{(time.ms >= 10)? time.ms:"0"+time.ms}</span>
        </div>
    )
}
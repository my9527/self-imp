
// import { resolve } from "node:path";
// import { setTimeout } from "node:timers";
// import { useCallback, useEffect, useState } from "react";

import { useEffect, useState } from "react"


export default function PageBody({ category }: { category: string}) {

    
    const [info, updateInfo] = useState({
        name:'',
        description: ''
    })

    useEffect(() => {
         new Promise(resolve => {
            setTimeout(() => {
                updateInfo({
                    name: 'name:' + Date.now(),
                    description: 'this is description'
                })
            }, 1000 * 2)
        })
    }, [category])





    return (
        <div>
            <p>category: {category}</p>
            <p>{info.name}</p>
            <p>{info.description}</p>
        </div>
    )



}
import {useEffect} from "react";
import Left from "./Left";
import "./index.css"
import Center from "./Center";
import Right from "./Right";

export default function Home() {
    useEffect(() => {
        document.title = '首页'
    }, [])
    
    return <div className="root">
        <Left/>
        <main>
            {/*<Center/>*/}
            {/*<Right/>*/}
        </main>
    </div>
}
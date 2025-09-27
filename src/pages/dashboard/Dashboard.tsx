import {  forwardRef, memo, useCallback, useRef, useState } from "react";

// 子组件
import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {

}

const CustomInput = memo(forwardRef<HTMLInputElement, Props>((props, ref) => {
    console.log('ref',ref);
    return <input ref={ref} {...props} onChange={props.onChange} />;
})) 
CustomInput.displayName = "CustomInput";




export default function Dashboard() {
    const inputRef = useRef<HTMLInputElement>(null); // ✅ 使用 useRef
    
    const focusInput = () => {
        inputRef.current && inputRef.current.focus();
    };

    const [first, setfirst] = useState('');
   const [n, setNum] = useState(0)

    const handleinputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setfirst(e.target.value);
    }, []);

    const handleClick = ()=>{
        setNum(n+1)
        console.log('click')
    }
    
    return <div>
         <div onClick={handleClick}>dashboard {first}</div>
         <CustomInput ref={inputRef} placeholder="输入内容" onChange={handleinputChange}/>
         <button onClick={focusInput}>聚焦</button>
    </div>
    
}
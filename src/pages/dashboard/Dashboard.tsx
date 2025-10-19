import { useRef, useState } from "react";



interface Props extends React.InputHTMLAttributes<HTMLInputElement>, React.RefAttributes<HTMLInputElement> {

}



const CustomInput = (props: Props) => {
    console.log('ref',props.ref);
    return <input ref={props.ref} {...props} onChange={props.onChange} />;
}
CustomInput.displayName = "CustomInput";



export default function Dashboard() {
    const inputRef = useRef<HTMLInputElement>(null); // ✅ 使用 useRef
    
    const focusInput = () => {
        inputRef.current && inputRef.current.focus();
    };

   const [first, setfirst] = useState('');
   const [n, setNum] = useState(0)

    const handleinputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setfirst(e.target.value);
    }

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
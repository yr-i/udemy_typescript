// ReactNode: どんなデータでもOK
// ReactElement: DOMのみ
import { useState, ReactNode, MouseEvent } from "react";

interface Props {
    message: string;
    children: ReactNode;
}
function ChildComp ({message, children}: Props) {
    const [count, setCount] = useState<number | string>(0);
    const handleClick = (e: MouseEvent) => {
        setCount(e.clientY)
    }
    return (
        <div>
            <h2>ChildComp</h2>
            <p>{message}</p>
            {children}
            <p>count: {count}</p>
            <button onClick={handleClick}>+1</button>
        </div>
    )
}
export default ChildComp;
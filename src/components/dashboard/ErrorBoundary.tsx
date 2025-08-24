import { useRouteError } from "react-router"

export default function ErrorBoundary(){
    const error = useRouteError() as Error
    return <div className=" text-center" >
        <h1>ErrorBoundary</h1>
        <pre>{error?.message}</pre>
    </div>
}
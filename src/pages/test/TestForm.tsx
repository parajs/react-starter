import {  useFetcher } from "react-router";

export default function Test(){
    //  const { message } = useLoaderData();
     let fetcher = useFetcher();
     let busy = fetcher.state !== "idle";
    console.log('fetcher.data', fetcher.data)
    return <div className=" text-center flex justify-center " >
                <h1>TestForm</h1>
                {/* <div>{message}</div> */}
                <fetcher.Form method="post" action="/testForm/123">
                    <input className="border " type="text" name="title" />
                    <button type="submit">
                        {busy ? "Saving..." : "Save"}
                    </button>
                    
                </fetcher.Form>
                <button onClick={()=>{
                    fetcher.load('/testForm/123')   }}>Load Data</button>
           </div>
}
import { Form, useLoaderData } from "react-router";

export default function Test(){
     const { message } = useLoaderData();
    return <div >
                <h1>Test</h1>
                <div>{message}</div>
                <Form action="/test/123" method="post">
                    <input type="text" name="title" />
                    <button type="submit">Submit</button>
                </Form>
                
           </div>
}
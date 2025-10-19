import { ConditionalWrapper, Content, DataProvider, Footer, Header,  Tab, Tabs } from "@/components/test/Test";
import { Form, useLoaderData } from "react-router";
// 使用
export default function Test(){
    //  const { message } = useLoaderData();
    return <div >
                <h1>Test</h1>
                {/* <div>{message}</div> */}
               <div>
                <ConditionalWrapper condition={true}>
                    <button>Click me</button>
                </ConditionalWrapper>
                <DataProvider>
                {(data) => {
                    if (!data) return <div>Loading...</div>;
                    return <div>{data.message}</div>;
                }}
                </DataProvider>
                <Tabs>
                    <Tab title="First">
                        <h2>First Tab Content</h2>
                    </Tab>
                    <Tab title="Second">
                        <h2>Second Tab Content</h2>
                    </Tab>
                    <div>chenzhen</div>
                </Tabs>
                <Header />
                <Content />
                <Footer/>
               </div>
                <Form action="/test/123" method="post">
                    <input type="text" name="title" />
                    <button type="submit">Submit</button>
                </Form>
                
           </div>
}


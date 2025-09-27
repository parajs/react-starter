import { popularCurrencies } from "@/api";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from 'react-i18next';
import Reactsvg from '@/assets/react.svg?react';


export default function Home(){
     const { token } = useUserStore()
    const { t } = useTranslation();
    const query = useQuery({ 
        queryKey: ['todos',], 
        queryFn: ()=> popularCurrencies({limint: 20}),
        enabled: false, // disable this query from automatically running
        
    })

    const getCurrencies = ()=>{
        query.refetch()
    }

    let listContent = null;
    if(query.isLoading){
        listContent = <div>Loading...</div> 
    }else if(query.isError){
        listContent = <div>Error: {(query.error as Error).message}</div>
    }else if(query.data){   
        listContent = <ul>
            {query.data.currencies.map((item: any) => (
                <li className="py-3" key={item.id}>{item.name} ({item.ticker}): ${item.network}</li>
            ))}
        </ul>            
    }
   return <div>
            <Reactsvg />
            <div>Home</div>
            <title>chenzhen</title>
            <meta name="description" content="this is chenzhen's website" />
            <div>{ token}</div>
            <h1>{t('common:welcome')}</h1>
            <p>{t('home:subtitle')}</p>
            <button>{t('common:buttons.save')}</button>
            <Button className="mb-5" onClick={getCurrencies}>click me</Button>
            <div className="border p-4 rounded-2xl">{ listContent }</div>
        </div>
}
import { popularCurrencies } from "@/api";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from 'react-i18next';

export default function Home(){
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
         Home
         <h1>{t('common:welcome')}</h1>
        <p>{t('home:subtitle')}</p>
        <button>{t('common:buttons.save')}</button>
        <Button className="mb-5" onClick={getCurrencies}>click me</Button>
        <div className="border p-4 rounded-2xl">{ listContent }</div>
    </div>
}
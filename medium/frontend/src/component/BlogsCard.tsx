interface BlogCardsProps {
    authorName:string;
    title:string;
    content:string;
    publishedDate:string;
}

export const BlogsCard =({authorName,title,content,publishedDate}:BlogCardsProps)=>{
    
    return(
        <div className="border-b-2 border-slate-200 max-w-lg p-4" >
            <div className="flex flex-row my-2">
                <div className="mr-2 flex flex-col justify-center">
                    <Avatar name={authorName}/>
                </div>
                <div className="font-medium ">
                    {authorName} .
                </div>
                <div className="ml-2  font-normal text-gray-600">
                    {publishedDate}
                </div>
            </div>
            <div className="font-bold text-2xl my-2">
                {title}
            </div>
            <div className="text-xl my-4">
                {content.slice(0,100)+"..."}
            </div>
            <div className="text-gray-600 my-4">
                {`${Math.ceil(content.length/100)} minute(s) read`}
            </div>
        </div>
    )
}
export function Avatar({name}:{name:string;}){
    return(
        
<div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
</div>

    )
}


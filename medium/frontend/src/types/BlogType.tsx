export interface BlogType{
    likes: number;
    content:string;
    title:string;
    id:string;
    publishedDate:Date;
    author:{
        name:string;
    };
}
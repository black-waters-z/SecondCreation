export enum HotTime{
    day="每日最热",
    week="每周最热",
    month="每月最热"
}

export enum ArticleModule{
    write="同人文",
    paint="同人图",
    candy="原作糖点",
    communicate="交友灌水",
    video="同人剪辑"
}

export interface RankArticle{
    title:string,
    author:string,
    ispic:boolean
}

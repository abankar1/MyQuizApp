export interface Question{
    qId:number,
    question: string,
    options:[
        string,
        string,
        string,
        string
    ],
    answer: number
}
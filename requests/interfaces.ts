export interface ITrainingData {
    clientId: string
    clientSecret: string
    documentsAndAnswers: IDocumentsAndAnswers
    defaultResponses: string[]
}

export interface IDocumentsAndAnswers {
    documents: IDocument[]
    answers: IAnswer[]
}

export interface IDocument {
    languageCode: string
    inputText: string
    intentName: string
    addedBy: string
}

export interface IAnswer {
    languageCode: string
    intentName: string
    answerText: string
    addedBy: string
}
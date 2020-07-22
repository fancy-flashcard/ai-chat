export interface IDocument {
    languageCode: string
    inputText: string
    intentName: string
  }
  
  export interface IAnswer {
    languageCode: string
    intentName: string
    answerText: string
  }
  
  export interface IDocumentsAndAnswers {
    documents: IDocument[]
    answers: IAnswer[]
  }
  
  export interface ITrainingData {
    documentsAndAnswers: IDocumentsAndAnswers
    defaultResponses: string[]
  }
  
export interface IMessage {
  text: string,
  resp: string,
  time: string
}

export interface IRegistrationResult {
  newClientSecret: string
}
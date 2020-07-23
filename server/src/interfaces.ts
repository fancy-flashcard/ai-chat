import { NLProcessor } from "./nlprocessor";

export interface IDocument {
    inputText: string
    intentName: string
  }
  
  export interface IAnswer {
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

export interface INLProcessorHandle {
  clientId: string,
  nlprocessor: NLProcessor
}
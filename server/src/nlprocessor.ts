
import { INLProcessorHandle, ITrainingData } from './interfaces'
import { Persistency } from './persistency';

const { NlpManager } = require('node-nlp');

export class NLProcessor {

    public static handles: INLProcessorHandle[] = []

    public static getInstance(clientId: string, languageCode: string): NLProcessor {
        let handle = NLProcessor.handles.filter((e: INLProcessorHandle) => e.clientId === clientId)[0]

        if (handle === undefined) {
            const trainingData = Persistency.getTrainingData(clientId, 'abc')
            const newHandle: INLProcessorHandle = {
                clientId,
                nlprocessor: new NLProcessor(languageCode, trainingData)
            }

            NLProcessor.handles.push(newHandle)
            handle = newHandle
        }

        return handle.nlprocessor
    }

    private readonly manager: any
    
    public static loadNLProcessors() {
        const allRegisteredClients: any[] = Persistency.getAllRegisteredClients()
        
        for (const entry of allRegisteredClients){
            NLProcessor.getInstance(entry.clientId, entry.languageCode)
        }
    }
    
    private readonly languageCode: string

    public constructor(languageCode: string, trainingData: ITrainingData) {
        this.languageCode = languageCode

        this.manager = new NlpManager({ languages: [languageCode] });

        setTimeout(async() => {
            await this.train(trainingData)
        }, 1) // sometimes we need some async tricks
    }

    public async train(trainingData: ITrainingData): Promise<void> {

        for (const document of trainingData.documentsAndAnswers.documents){
            this.manager.addDocument(this.languageCode, document.inputText, document.intentName);
        }
        for (const answer of trainingData.documentsAndAnswers.answers){
            this.manager.addAnswer(this.languageCode, answer.intentName, answer.answerText);
        }

        await this.manager.train();
        this.manager.save();

    }


    public async process(input: string, languageCode: string): Promise<any> {
        return this.manager.process(languageCode, input);
    }

}
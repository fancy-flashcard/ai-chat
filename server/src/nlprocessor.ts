
import { INLProcessorHandle } from './interfaces'
import { Persistency } from './persistency';

const { NlpManager } = require('node-nlp');

export class NLProcessor {

    public static handles: INLProcessorHandle[] = []

    public static getInstance(clientId: string, languageCode: string): NLProcessor {
        let handle = NLProcessor.handles.filter((e: INLProcessorHandle) => e.clientId === clientId)[0]

        if (handle === undefined) {
            const newHandle: INLProcessorHandle = {
                clientId,
                nlprocessor: new NLProcessor(languageCode)
            }

            NLProcessor.handles.push(newHandle)
            handle = newHandle
        }

        return handle.nlprocessor
    }

    private readonly manager

    public static loadNLProcessors() {
        const allRegisteredClients: any[] = Persistency.getAllRegisteredClients()

        for (const entry of allRegisteredClients){
            NLProcessor.getInstance(entry.clientId, entry.languageCode)
        }
    }

    public constructor(languageCode: string) {
        this.manager = new NlpManager({ languages: [languageCode] });

        setTimeout(async() => {
            await this.manager.train();
            this.manager.save();
        }, 1) // sometimes we need some async tricks
    }

    public train() {
        this.manager.addDocument('en', 'goodbye for now', 'greetings.bye');
        this.manager.addDocument('en', 'bye bye take care', 'greetings.bye');
        this.manager.addDocument('en', 'okay see you later', 'greetings.bye');
        this.manager.addDocument('en', 'bye for now', 'greetings.bye');
        this.manager.addDocument('en', 'i must go', 'greetings.bye');
        this.manager.addDocument('en', 'hello', 'greetings.hello');
        this.manager.addDocument('en', 'hi', 'greetings.hello');
        this.manager.addDocument('en', 'howdy', 'greetings.hello');

        // Train also the NLG
        this.manager.addAnswer('en', 'greetings.bye', 'Till next time');
        this.manager.addAnswer('en', 'greetings.bye', 'see you soon!');
        this.manager.addAnswer('en', 'greetings.hello', 'Hey there!');
        this.manager.addAnswer('en', 'greetings.hello', 'Greetings!');

        // Train and save the model.
    }


    public async process(input: string, languageCode: string): Promise<any> {
        return this.manager.process(languageCode, input);
    }

}
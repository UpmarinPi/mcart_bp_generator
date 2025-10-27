import {ObserverSubject} from "../Observer";

// web workerで実行したいものはこれを呼び出し、RequestProcessingを実行する
export class WebWorkerHelper<T = any> {
    private worker: Worker;
    onWorkOver: ObserverSubject<T>;
    message: string;

    constructor(message: string) {
        this.worker = new Worker(new URL('./WebWorker.ts', import.meta.url), {type: 'module'});
        this.onWorkOver = new ObserverSubject();
        this.message = message;
    }

    public RequestProcessing(process: (event: MessageEvent<T>) => T) {

        this.worker.onmessage = (event: MessageEvent<T>) => {
            const result = process(event);
            this.onWorkOver.notify(result);
        };
        this.worker.postMessage(this.message);
    }

    public Terminate(){
        this.worker.terminate();
    }
}

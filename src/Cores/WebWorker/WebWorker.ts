import {ObserverSubject} from "../Observer";

// web workerで実行したいものはこれを呼び出し、RequestProcessingを実行する
export class WebWorkerSystem<T> {
    private worker: Worker;
    onWorkOver: ObserverSubject<T>;
<<<<<<< Updated upstream
    messageType: string;

    constructor(messageType: string) {
        this.worker = new Worker(new URL('./Internal_WebWorker.ts', import.meta.url), {type: 'module'});
        this.onWorkOver = new ObserverSubject();
        this.messageType = messageType;
=======

    constructor() {
        this.worker = new Worker(new URL('./Internal_WebWorker.ts', import.meta.url), {type: 'module'});
        this.onWorkOver = new ObserverSubject();
>>>>>>> Stashed changes
    }

    public RequestProcessing(process: (e: Event) => T) {

<<<<<<< Updated upstream
        this.worker.onmessage = (event) => {
            process(event.data);
            console.log(event.data);
        };
        this.worker.postMessage(this.messageType);
=======
        this.worker.addEventListener('start', (event) => {
            let returnValue = process(event);
            this.onWorkOver.notify(returnValue);
        });
        this.worker.postMessage('start');
>>>>>>> Stashed changes
    }
}

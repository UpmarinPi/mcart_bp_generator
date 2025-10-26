<<<<<<< Updated upstream

export {};

export class Internal_WebWorker {

    // constructor() {
    //     self.onmessage = this.handleMessage.bind(this);
    // }
    // private handleMessage(event: MessageEvent) {
    //     const data = event.data;
    //     console.log('Worker received:', data);
    //
    //     const result = this.process(data);
    //
    //     (self as DedicatedWorkerGlobalScope).postMessage(result);
    // }
}

=======
/* eslint-disable no-restricted-globals */
export {}; // ESMとして扱う

const ctx: DedicatedWorkerGlobalScope = self as unknown as DedicatedWorkerGlobalScope;

ctx.onmessage = (event) => {
    console.log(event.data + "を取得");
};
>>>>>>> Stashed changes

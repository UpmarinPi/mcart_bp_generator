export{};

globalThis.onmessage = (e: MessageEvent) => {
    const data = e.data;
    // ここで受け取ったデータに応じて処理を実行
    const result = `Worker received: ${data}`;
    console.log(result);
    globalThis.postMessage(result);
};
self.onmessage = (event: MessageEvent) => {
  const { id } = event.data ?? {};
  self.postMessage({ id, status: "pending", message: "PDF worker scaffold" });
};

self.onmessage = (event: MessageEvent) => {
  const { id } = event.data ?? {};
  self.postMessage({ id, status: "pending", message: "ZIP worker scaffold" });
};

export type ISignalHanlder<S, D> = (srouce: S, data: D) => void
export type IAsyncSignalHanlder<S, D> = (srouce: S, data: D) => Promise<void>

export class Signal<S, D> {
  private handlers: Array<ISignalHanlder<S, D>> = []

  public on(handler: ISignalHanlder<S, D>): void {
    this.handlers.push(handler)
  }

  public off(handler: ISignalHanlder<S, D>): void {
    this.handlers = this.handlers.filter((h) => h !== handler)
  }

  public trigger(source: S, data: D, signalQueue: SignalQueue): void {
    signalQueue.push(this)
    ;[...this.handlers].forEach((h) => h(source, data))
  }
}

export class AsyncSignal<S, D> {
  private handlers: Array<(source: S, data: D) => Promise<void>> = []

  public on(handler: IAsyncSignalHanlder<S, D>): void {
    this.handlers.push(handler)
  }

  public off(handler: IAsyncSignalHanlder<S, D>): void {
    this.handlers = this.handlers.filter((h) => h !== handler)
  }

  public async trigger(source: S, data: D): Promise<void> {
    this.handlers.slice(0).map((h) => h(source, data))
  }

  public async triggerAwait(source: S, data: D, signalQueue: SignalQueue): Promise<void> {
    signalQueue.push(this)
    const promises = this.handlers.slice(0).map((h) => h(source, data))
    await Promise.all(promises)
  }
}

export type CommonSignal = Signal<any, any> | AsyncSignal<any, any>

export class SignalQueue {
  private queue: Array<CommonSignal> = []
  public push(signal: CommonSignal) {
    this.queue.push(signal)
  }
  public concat(signals: CommonSignal[]) {
    this.queue.concat(signals)
  }
  public pop() {
    this.queue.pop()
  }
}

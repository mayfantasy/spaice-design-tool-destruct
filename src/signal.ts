export type ISignalHanlder<S, D> = (srouce: S, data: D) => void
export type ISignalHanlders<S, D> = { [handler: string]: ISignalHanlder<S, D> }

export class Signal<S, D> {
  private handlers: Array<ISignalHanlder<S, D>> = []

  public on(handler: ISignalHanlder<S, D>): void {
    this.handlers.push(handler)
  }

  public off(handler: ISignalHanlder<S, D>): void {
    this.handlers = this.handlers.filter((h) => h !== handler)
  }

  public trigger(source: S, data: D): void {
    ;[...this.handlers].forEach((h) => h(source, data))
  }
}

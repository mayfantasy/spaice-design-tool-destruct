export enum IEditor2DToolType {
  WALL = 'WALL',
  ROOM = 'ROOM',
}
export interface IEditor2DState {
  currentSelectedTool: IEditor2DToolType | null
}

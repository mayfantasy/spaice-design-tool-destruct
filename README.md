### Setup a store slice (take *editorSlice* for example)

1. Create editor/reducer.ts
```
export const editorReducer = {
  addBoxObject: (state: IEditorState, action: PayloadAction<IBoxState>) => {
    state.currentObjects = [...state.currentObjects, action.payload]
  },
}
```

2. Create editor/store.ts  
    2.1. Create slice name  
    ```
    export const SPLICE_NAME = 'editor'
    ```
    2.2. Create initial state  
    ```
    export const editorInitialState: IEditorState = {
      currentObjects: [],
    }
    ```
    2.3. Create store slice  
    ```
    export const editorSlice = createSlice({
      name: SPLICE_NAME,
      initialState: editorInitialState,
      reducers: editorReducer,
    })
    ```
    2.4. Create store selector  
    ```
    export const selectEditorState = (state: IStoreState) => state.editorState
    ```
    2.5. Create action creators
    ```
    export const editorActionCreators = editorSlice.actions
    ```

3. Add to store.ts  
    3.1. Add to reducer
    ```
    const reducer = combineReducers({
      ...
      editorState: undoable(editorSlice.reducer),
      ...
    })
    ```
    3.2 Add to initial state
    ```
    const initialState = {
      ...
      editorState: editorInitialState as any as StateWithHistory<IEditorState>,
      ...
    }
    ```

### How to use the store  
```
export const Editor = () => {

  const currentObjects = useSelector(selectEditorState)
  const dispatch = useDispatch()
  
  return (
    <div>
      ...
    </div>
  )
}
```

### Store objects location in Redux after a move (undo-able)
1. Detect mesh/group's moved position (world)
2. Dispatch the position (world) to the store
3. Control the transformer's position (local) by that stored mesh position  
* Note: 1. Must make sure that Transformer's parent is scene, so that it's local position equals to the world's position. 2. The Transformer is the parent of the mesh/group
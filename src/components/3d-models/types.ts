import { Dispatch } from 'redux'
import { IBoxState } from './Box/types'

export type IThreeDModelObjectState = IBoxState

export interface IObjectControlProps {
  /**
   * [orbit] need to be passed down because some mouse controls on the object
   * need to pause the orbit control
   */
  orbit: React.MutableRefObject<any>
  /**
   * [dispatch] needs to be passed down because some models are created dynamically,
   * redux context might NOT be available for the hook when the hook gets initialized
   */
  dispatch: Dispatch
}

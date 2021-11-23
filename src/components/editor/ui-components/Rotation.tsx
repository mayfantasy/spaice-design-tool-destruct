interface IProps {
  rotation: THREE.Euler
}
export const Rotation = (props: IProps) => {
  const { rotation } = props
  return (
    <span>
      <span className="mr-2">x({rotation.x.toFixed(4)})</span>
      <span className="mr-2">y({rotation.y.toFixed(4)})</span>
      <span className="mr-2">z({rotation.z.toFixed(4)})</span>
      <span className="mr-2">z({rotation.order})</span>
    </span>
  )
}

interface IProps {
  scale: THREE.Vector3
}
export const Scale = (props: IProps) => {
  const { scale } = props
  return (
    <div>
      <span className="mr-2">x({scale.x.toFixed(4)})</span>
      <span className="mr-2">y({scale.y.toFixed(4)})</span>
      <span className="mr-2">z({scale.z.toFixed(4)})</span>
    </div>
  )
}

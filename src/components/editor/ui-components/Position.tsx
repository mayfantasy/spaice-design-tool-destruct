interface IProps {
  position: THREE.Vector3
}
export const Position = (props: IProps) => {
  const { position } = props
  return (
    <div>
      <span className="mr-2">x({position.x.toFixed(4)})</span>
      <span className="mr-2">y({position.y.toFixed(4)})</span>
      <span className="mr-2">z({position.z.toFixed(4)})</span>
    </div>
  )
}

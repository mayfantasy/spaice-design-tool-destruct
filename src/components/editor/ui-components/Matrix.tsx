interface IProps {
  matrix: THREE.Matrix4
}
export const Matrix = (props: IProps) => {
  const { matrix } = props
  const matrixArray = matrix.toArray()
  const rows = [matrixArray.slice(0, 4), matrixArray.slice(4, 8), matrixArray.slice(8, 12), matrixArray.slice(12, 16)]
  return (
    <div>
      {rows.map((r, i) => (
        <span key={i}>
          {r.map((c, j) => (
            <span className="inline-block w-16" key={j}>
              {c.toFixed(4)}
            </span>
          ))}
          <br />
        </span>
      ))}
    </div>
  )
}

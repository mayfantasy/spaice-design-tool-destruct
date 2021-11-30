import { Layer, Line } from 'react-konva'

const GRID_SIZE = 20

export const Grid = () => {
  return (
    <Layer>
      {Array.apply(1, Array(Math.round(window.innerWidth / 2 / GRID_SIZE))).map((l, i) => (
        <>
          <Line
            key={i + 'x'}
            points={[i * GRID_SIZE, -window.innerHeight / 2, i * GRID_SIZE, window.innerHeight / 2]}
            stroke="#ddd"
            strokeWidth={i === 0 ? 2 : 1}
          />
          {i !== 0 && (
            <Line
              key={-i + 'x'}
              points={[-i * GRID_SIZE, -window.innerHeight / 2, -i * GRID_SIZE, window.innerHeight / 2]}
              stroke="#ddd"
              strokeWidth={1}
            />
          )}
          <Line
            key={i + 'y'}
            points={[-window.innerWidth / 2, i * GRID_SIZE, window.innerWidth / 2, i * GRID_SIZE]}
            stroke="#ddd"
            strokeWidth={i === 0 ? 2 : 1}
          />
          {i !== 0 && (
            <Line
              key={-i + 'y'}
              points={[-window.innerWidth / 2, -i * GRID_SIZE, window.innerWidth / 2, -i * GRID_SIZE]}
              stroke="#ddd"
              strokeWidth={1}
            />
          )}
        </>
      ))}
    </Layer>
  )
}

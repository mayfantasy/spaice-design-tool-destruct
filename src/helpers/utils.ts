import randomstring from 'randomstring'

/**
 * Replacing a list's item's property, targeted by it's id
 *
 * @param list The list used to find an item and replace
 * @param id The id of the target item
 * @param replaceKey The property name the target item needs to be replaced
 * @param replace The property value the target item need to be replaced
 * @returns A new list
 */
export const findByIdAndReplaceProperty = <L extends { id: string }, T>(list: L[], id: string, replaceKey: string, replace: T) => {
  const index = list.findIndex((o) => o.id === id)
  const newList = [...list.slice(0, index), { ...list[index], [replaceKey]: replace }, ...list.slice(index + 1, list.length)]
  return newList
}

/**
 *
 * @returns A random string
 */
export const idGen = () => {
  return randomstring.generate()
}

/**
 * Replacing a list's item's property, targeted by it's id
 *
 * @param list The list used to find an item and replace
 * @param id The id of the target item
 * @param replaceKey The property name the target item needs to be replaced
 * @param replace The property value the target item need to be replaced
 * @returns A new list
 */
export const findObjectByIdAndReplaceProperty = <L extends { id: string }, T>(list: L[], id: string, replaceKey: string, replace: T) => {
  const index = list.findIndex((o) => o.id === id)
  const newList = [...list.slice(0, index), { ...list[index], [replaceKey]: replace }, ...list.slice(index + 1, list.length)]
  return newList
}

export const findObjectById = <L extends { id: string }>(list: L[], id: string) => {
  return list.find((l) => l.id === id) || null
}

/**
 * Update a property in a list of objects to a same value
 *
 * @param list The target object list
 * @param key The key that needs to be updated
 * @param value The new value for that key
 * @returns
 */
export const setPropertyForAllObjects = <L, T>(list: L[], key: string, value: T) => {
  return [...list.map((o) => ({ ...o, [key]: value }))]
}

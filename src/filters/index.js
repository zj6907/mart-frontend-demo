export function truncate(words, count) {
  if (words == null || words.length == 0) return null
  return words.split(" ").splice(0, count).join(" ")
}

export function getValueAtPath(obj, path) {
  return path
    .split(".") // Split the path string by '.'
    .reduce((acc, part) => (acc ? acc[part] : undefined), obj) // Traverse the path
}

export const generateId = () => {
  // Generate a unique random number using the current time
  const timestamp = new Date().getTime()

  // Generate a random number between 0 and 9999
  const random = Math.floor(Math.random() * 10000)

  // Combine the timestamp and random number to create the ID
  const id = `${timestamp}${random}`

  return id
}

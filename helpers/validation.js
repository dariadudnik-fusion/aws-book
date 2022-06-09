exports.validateMethod = (method, type) => {
  if (method !== type) {
    throw new Error("The requested method not allowed");
  }
}
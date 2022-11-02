class MathUtil {
  static getRandomNo() {
    const min = 100
    const max = 999
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}

function getDate (firestoreDate) {
  return new Date(
    firestoreDate.seconds * 1000
    + firestoreDate.nanoseconds / 1000000,).toLocaleDateString();
}

export default MathUtil
export {getDate}

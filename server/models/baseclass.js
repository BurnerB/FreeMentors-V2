
class BaseClass {
  constructor(payload = null) {
    this.payload = payload;
  }

  static async findBy(key, value, database) {
    const obj = database.find((o) => o[key] === value);
    if (obj) {
      return obj;
    }
    return false;
  }
}
export default BaseClass;

export class SortUtil {
  /**
   * Sorts an array of objects by a specified key in either ascending or descending order.
   *
   * @param array - The array to sort.
   * @param key - The key to sort by.
   * @param order - The order to sort ('asc' or 'desc').
   * @returns The sorted array.
   */
  static sortArrayByKey<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
    // Validate the order parameter
    if (order !== 'asc' && order !== 'desc') {
      throw new Error("Order must be 'asc' or 'desc'.");
    }

    return array.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      if (valueA < valueB) {
        return order === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return order === 'asc' ? 1 : -1;
      }
      return 0; // values are equal
    });
  }

  /**
  * Sorts an array of objects by specified keys in either ascending or descending order.
  *
  * @param array - The array to sort.
  * @param keys - An array of keys to sort by.
  * @param order - The order to sort ('asc' or 'desc') for each key.
  * @returns The sorted array.
  */
  static sortArrayByKeys<T>(
    array: T[],
    keys: (keyof T)[],
    order: ('asc' | 'desc')[]
  ): T[] {
    // Validate order array length
    if (keys.length !== order.length) {
      throw new Error("The number of keys must match the number of order specifications.");
    }

    return array.sort((a, b) => {
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const valueA = a[key];
        const valueB = b[key];

        if (valueA < valueB) {
          return order[i] === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
          return order[i] === 'asc' ? 1 : -1;
        }
        // If values are equal, continue to the next key
      }
      return 0; // All keys are equal 
    });
  }
}

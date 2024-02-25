import { CookieType } from "../variables/cookie-types.variables";

/**
 * Utility class that handles cookies
 *
 * **PS:** Cookie value aren't overridden
 *
 * @example
 *
 * ```js
  * document.cookie = "test1 = a";
  
  * document.cookie = "test2 = b";
  *
  * console.log(document.cookie) //Returns "test1=a;test2=b"
 * ```
 */
class CookieService {
  /**
   *
   * @param {any} name Name of the cookie
   * @param {any} value Value of the cookie
   * @param {boolean} cookieCanExpire Boolean to know if the cookie can expire
   * @returns {string} Cookie-string that was created
   *
   * @static
   */
  static setCookie(
    name: any,
    value: any,
    cookieCanExpire: boolean = false
  ): string {
    if (cookieCanExpire) {
      //Gets the time in ms from the next week
      const todayInMilliseconds: number = new Date().getTime();
      const sevenDaysInMilliseconds: number = 604_800_000;

      //Gets the actual date
      const nextWeekDate: Date = new Date(
        todayInMilliseconds + sevenDaysInMilliseconds
      );
      return (document.cookie = `${name}=${value}; expires="${nextWeekDate}"; sameSite=strict"`);
    }

    return (document.cookie = `${name}=${value}; sameSite=strict`);
  }

  /**
   * Retrieves a cookie by its name
   *
   * @param {string} cookieNameToFind Name of the cookie
   * @returns {null | { name:string, value:any }} Null or an object with the the name and the value of cookie
   * @static
   */
  static getCookieByName(
    cookieNameToFind: string,
    parseCookies: boolean = false
  ): null | CookieType {
    //We get all the cookies
    const cookiesArray = this.getAllCookies(
      false,
      parseCookies
    ) as CookieType[];

    //We iterate through the array of cookies and find the cookie wanted
    for (const cookieObject of cookiesArray) {
      const { name, value } = cookieObject;

      const cookieHasBeenFound: boolean = name === cookieNameToFind;

      if (cookieHasBeenFound) {
        return cookieObject;
      }
    }

    return null;
  }

  /**
   * Changes the value of a cookie by its name
   *
   * @param {string} nameOfCookie Name of the cookie
   * @param {any} newValue New value for the cookie
   * @returns {void}
   * @static
   */
  static patchCookieValue(nameOfCookie: string, newValue: any): void {
    document.cookie = `${nameOfCookie}=${newValue}`;
  }

  /**
   * Deletes a cookie by their name
   *
   * @param {string} nameOfCookie Name of the cookie to delete
   * @returns {void}
   * @static
   */
  static deleteCookieByName(nameOfCookie: string): void {
    document.cookie = `${nameOfCookie}=0; expires=${new Date(0)}`;
  }

  /**
   * Gets all cookies stored in the website
   * Returns either a string or an array of objects with the cookie name and value
   *
   * @param {boolean} rawCookies Boolean to know if the cookies retrieved need to be in a string
   * @returns {string | {name:string, value:any}} Either a string or an array of objects containing the cookies
   * @static
   */
  static getAllCookies(
    rawCookies: boolean = false,
    parseCookies: boolean = false
  ): string | CookieType[] {
    if (rawCookies) {
      return document.cookie;
    }

    const rawArrayOfCookies: string[] = document.cookie.split("; ");
    const formattedArrayOfCookies: CookieType[] = [];

    for (const cookie of rawArrayOfCookies) {
      let [name, value] = cookie.split("=") as [string, any];

      value = decodeURIComponent(value);

      value =
        parseCookies && this.isParseable(value) ? JSON.parse(value) : value;

      formattedArrayOfCookies.push({ name, value });
    }

    return formattedArrayOfCookies;
  }

  /**
   * Deletes all cookies stored in the website
   *
   * @returns {void}
   * @static
   */
  static deleteAllCookies(): void {
    let rawArrayOfCookies: string[] = document.cookie.split(";");

    for (const cookie of rawArrayOfCookies) {
      let name: string = cookie.split("=")[0];

      document.cookie = `${name}=0; expires=${new Date(0)}`;
    }
  }

  /**
   * Verifies whether a given JSON string can be parsed.
   *
   * @param value - The JSON string to evaluate.
   * @returns {boolean} True if parsing succeeds, otherwise False.
   */
  private static isParseable(value: any): boolean {
    try {
      JSON.parse(value);

      return true;
    } catch (error) {
      return false;
    }
  }
}

export default CookieService;

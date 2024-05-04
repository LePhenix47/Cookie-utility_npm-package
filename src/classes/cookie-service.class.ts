import { CookieOptions, CookieType } from "../variables/cookie-types.variables";

/**
 * Utility class for managing cookies.
 *
 * @class
 *
 * @author
 *  [Younes LAHOUITI](https://github.com/LePhenix47)
 */
class CookieService {
  /**
   * Sets a cookie with the specified name, value, and options.
   *
   * @param {any} name - The name of the cookie.
   * @param {any} value - The value of the cookie.
   * @param {CookieOptions} options - The options for the cookie (optional).
   * @returns The string representation of the cookie.
   *
   * @example
   * // Example usage:
   *CookieService.setCookie("myCookie", "myValue", {
   *  expires: new Date(new Date() + 7 * 24 * 60 * 60 * 1_000), // Expires in 7 days
   *  domain: ".example.com",
   *  path: "/",
   *  secure: true,
   *  httpOnly: true,
   *  sameSite: "Strict",
   *});
   */
  static setCookie(name: any, value: any, options: CookieOptions): string {
    this.isWindowObjectAvailable();

    // * Construct the cookie string with name and value
    let cookieString: string = `${name}=${value}`;

    // * Add optional parameters if provided
    if (!options) {
      return (document.cookie = cookieString);
    }

    const { expires, domain, path, secure, httpOnly, sameSite } = options;
    // * Expiry date
    if (expires) {
      const expiresAtDate: Date = new Date(expires);
      cookieString += `; expires=${expiresAtDate.toUTCString()}`;
    }

    // * Domain
    if (domain) {
      cookieString += `; domain=${domain}`;
    }

    // * Path
    if (path) {
      cookieString += `; path=${path}`;
    }

    // * Secure flag
    if (secure) {
      cookieString += `; secure`;
    }

    // * HTTPOnly flag
    if (httpOnly) {
      cookieString += `; HttpOnly`;
    }

    // * SameSite attribute
    if (sameSite) {
      cookieString += `; SameSite=${sameSite}`;
    }

    // * Set the cookie
    return (document.cookie = cookieString);
  }

  /**
   * Retrieves a cookie by its name.
   * If the optional `parseCookies` parameter is set to `true`, then the returned value will be parsed into a JavaScript object. Otherwise, it returns an object with the `name` and `value` properties.
   *
   * @param cookieNameToFind - The name of the cookie to retrieve.
   * @param parseCookies - Optional flag indicating whether to parse the cookie value into a JavaScript object. Default is `false`.
   * @returns An object representing the requested cookie, or `null` if no such cookie exists.
   * @static
   */
  static getCookieByName<TValue>(
    cookieNameToFind: string,
    parseCookies: boolean = false
  ): null | CookieType<TValue> {
    this.isWindowObjectAvailable();

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
    this.isWindowObjectAvailable();

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
    this.isWindowObjectAvailable();

    document.cookie = `${nameOfCookie}=0; expires=${new Date(0)}`;
  }

  /**
   * Retrieves all cookies stored in the current website. By default, the function returns an array of objects representing the cookies. However, if the `rawCookies` parameter is set to `true`, then the function instead returns a single string containing all the cookies.
   *
   * @param rawCookies - Optional flag indicating whether to return the cookies in their original string format. Default is `false`.
   * @param parseCookies - Optional flag indicating whether to parse the cookie values into JavaScript objects. Ignored when `rawCookies` is `true`. Default is `false`.
   * @returns A string or an array of objects representing the cookies.
   */
  static getAllCookies(
    rawCookies: boolean = false,
    parseCookies: boolean = false
  ): string | CookieType[] {
    this.isWindowObjectAvailable();

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
    this.isWindowObjectAvailable();

    let rawArrayOfCookies: string[] = document.cookie.split(";");

    for (const cookie of rawArrayOfCookies) {
      let name: string = cookie.split("=")[0];

      document.cookie = `${name}=null; expires=${new Date(0)}`;
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

  private static isWindowObjectAvailable(): null | void {
    const windowObjectIsUnavailable: boolean = typeof window === "undefined";
    if (windowObjectIsUnavailable) {
      console.warn("window object is unavailable");

      return null;
    }
  }
}

export default CookieService;

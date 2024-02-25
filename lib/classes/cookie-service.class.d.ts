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
declare class CookieService {
    /**
     *
     * @param {any} name Name of the cookie
     * @param {any} value Value of the cookie
     * @param {boolean} cookieCanExpire Boolean to know if the cookie can expire
     * @returns {string} Cookie-string that was created
     *
     * @static
     */
    static setCookie(name: any, value: any, cookieCanExpire?: boolean): string;
    /**
     * Retrieves a cookie by its name.
     * If the optional `parseCookies` parameter is set to `true`, then the returned value will be parsed into a JavaScript object. Otherwise, it returns an object with the `name` and `value` properties.
     *
     * @param cookieNameToFind - The name of the cookie to retrieve.
     * @param parseCookies - Optional flag indicating whether to parse the cookie value into a JavaScript object. Default is `false`.
     * @returns An object representing the requested cookie, or `null` if no such cookie exists.
     * @static
     */
    static getCookieByName(cookieNameToFind: string, parseCookies?: boolean): null | CookieType;
    /**
     * Changes the value of a cookie by its name
     *
     * @param {string} nameOfCookie Name of the cookie
     * @param {any} newValue New value for the cookie
     * @returns {void}
     * @static
     */
    static patchCookieValue(nameOfCookie: string, newValue: any): void;
    /**
     * Deletes a cookie by their name
     *
     * @param {string} nameOfCookie Name of the cookie to delete
     * @returns {void}
     * @static
     */
    static deleteCookieByName(nameOfCookie: string): void;
    /**
     * Retrieves all cookies stored in the current website. By default, the function returns an array of objects representing the cookies. However, if the `rawCookies` parameter is set to `true`, then the function instead returns a single string containing all the cookies.
     *
     * @param rawCookies - Optional flag indicating whether to return the cookies in their original string format. Default is `false`.
     * @param parseCookies - Optional flag indicating whether to parse the cookie values into JavaScript objects. Ignored when `rawCookies` is `true`. Default is `false`.
     * @returns A string or an array of objects representing the cookies.
     */
    static getAllCookies(rawCookies?: boolean, parseCookies?: boolean): string | CookieType[];
    /**
     * Deletes all cookies stored in the website
     *
     * @returns {void}
     * @static
     */
    static deleteAllCookies(): void;
    /**
     * Verifies whether a given JSON string can be parsed.
     *
     * @param value - The JSON string to evaluate.
     * @returns {boolean} True if parsing succeeds, otherwise False.
     */
    private static isParseable;
}
export default CookieService;

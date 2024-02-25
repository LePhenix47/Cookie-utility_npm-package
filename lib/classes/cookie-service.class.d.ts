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
     * Retrieves a cookie by its name
     *
     * @param {string} cookieNameToFind Name of the cookie
     * @returns {null | { name:string, value:any }} Null or an object with the the name and the value of cookie
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
     * Gets all cookies stored in the website
     * Returns either a string or an array of objects with the cookie name and value
     *
     * @param {boolean} rawCookies Boolean to know if the cookies retrieved need to be in a string
     * @returns {string | {name:string, value:any}} Either a string or an array of objects containing the cookies
     * @static
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

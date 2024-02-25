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
var CookieService = /** @class */ (function () {
    function CookieService() {
    }
    /**
     *
     * @param {any} name Name of the cookie
     * @param {any} value Value of the cookie
     * @param {boolean} cookieCanExpire Boolean to know if the cookie can expire
     * @returns {string} Cookie-string that was created
     *
     * @static
     */
    CookieService.setCookie = function (name, value, cookieCanExpire) {
        if (cookieCanExpire === void 0) { cookieCanExpire = false; }
        if (cookieCanExpire) {
            //Gets the time in ms from the next week
            var todayInMilliseconds = new Date().getTime();
            var sevenDaysInMilliseconds = 604800000;
            //Gets the actual date
            var nextWeekDate = new Date(todayInMilliseconds + sevenDaysInMilliseconds);
            return (document.cookie = "".concat(name, "=").concat(value, "; expires=\"").concat(nextWeekDate, "\"; sameSite=strict\""));
        }
        return (document.cookie = "".concat(name, "=").concat(value, "; sameSite=strict"));
    };
    /**
     * Retrieves a cookie by its name.
     * If the optional `parseCookies` parameter is set to `true`, then the returned value will be parsed into a JavaScript object. Otherwise, it returns an object with the `name` and `value` properties.
     *
     * @param cookieNameToFind - The name of the cookie to retrieve.
     * @param parseCookies - Optional flag indicating whether to parse the cookie value into a JavaScript object. Default is `false`.
     * @returns An object representing the requested cookie, or `null` if no such cookie exists.
     * @static
     */
    CookieService.getCookieByName = function (cookieNameToFind, parseCookies) {
        if (parseCookies === void 0) { parseCookies = false; }
        //We get all the cookies
        var cookiesArray = this.getAllCookies(false, parseCookies);
        //We iterate through the array of cookies and find the cookie wanted
        for (var _i = 0, cookiesArray_1 = cookiesArray; _i < cookiesArray_1.length; _i++) {
            var cookieObject = cookiesArray_1[_i];
            var name_1 = cookieObject.name, value = cookieObject.value;
            var cookieHasBeenFound = name_1 === cookieNameToFind;
            if (cookieHasBeenFound) {
                return cookieObject;
            }
        }
        return null;
    };
    /**
     * Changes the value of a cookie by its name
     *
     * @param {string} nameOfCookie Name of the cookie
     * @param {any} newValue New value for the cookie
     * @returns {void}
     * @static
     */
    CookieService.patchCookieValue = function (nameOfCookie, newValue) {
        document.cookie = "".concat(nameOfCookie, "=").concat(newValue);
    };
    /**
     * Deletes a cookie by their name
     *
     * @param {string} nameOfCookie Name of the cookie to delete
     * @returns {void}
     * @static
     */
    CookieService.deleteCookieByName = function (nameOfCookie) {
        document.cookie = "".concat(nameOfCookie, "=0; expires=").concat(new Date(0));
    };
    /**
     * Retrieves all cookies stored in the current website. By default, the function returns an array of objects representing the cookies. However, if the `rawCookies` parameter is set to `true`, then the function instead returns a single string containing all the cookies.
     *
     * @param rawCookies - Optional flag indicating whether to return the cookies in their original string format. Default is `false`.
     * @param parseCookies - Optional flag indicating whether to parse the cookie values into JavaScript objects. Ignored when `rawCookies` is `true`. Default is `false`.
     * @returns A string or an array of objects representing the cookies.
     */
    CookieService.getAllCookies = function (rawCookies, parseCookies) {
        if (rawCookies === void 0) { rawCookies = false; }
        if (parseCookies === void 0) { parseCookies = false; }
        if (rawCookies) {
            return document.cookie;
        }
        var rawArrayOfCookies = document.cookie.split("; ");
        var formattedArrayOfCookies = [];
        for (var _i = 0, rawArrayOfCookies_1 = rawArrayOfCookies; _i < rawArrayOfCookies_1.length; _i++) {
            var cookie = rawArrayOfCookies_1[_i];
            var _a = cookie.split("="), name_2 = _a[0], value = _a[1];
            value = decodeURIComponent(value);
            value =
                parseCookies && this.isParseable(value) ? JSON.parse(value) : value;
            formattedArrayOfCookies.push({ name: name_2, value: value });
        }
        return formattedArrayOfCookies;
    };
    /**
     * Deletes all cookies stored in the website
     *
     * @returns {void}
     * @static
     */
    CookieService.deleteAllCookies = function () {
        var rawArrayOfCookies = document.cookie.split(";");
        for (var _i = 0, rawArrayOfCookies_2 = rawArrayOfCookies; _i < rawArrayOfCookies_2.length; _i++) {
            var cookie = rawArrayOfCookies_2[_i];
            var name_3 = cookie.split("=")[0];
            document.cookie = "".concat(name_3, "=0; expires=").concat(new Date(0));
        }
    };
    /**
     * Verifies whether a given JSON string can be parsed.
     *
     * @param value - The JSON string to evaluate.
     * @returns {boolean} True if parsing succeeds, otherwise False.
     */
    CookieService.isParseable = function (value) {
        try {
            JSON.parse(value);
            return true;
        }
        catch (error) {
            return false;
        }
    };
    return CookieService;
}());
export default CookieService;

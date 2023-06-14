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
            var sevenDaysInMilliseconds = 1000 * 60 * 60 * 24 * 7;
            //Gets the actual date
            var nextWeekDate = new Date(todayInMilliseconds + sevenDaysInMilliseconds);
            return (document.cookie = "".concat(name, "=").concat(value, "; expires=\"").concat(nextWeekDate, "\"; sameSite=strict\""));
        }
        return (document.cookie = "".concat(name, "=").concat(value, "; sameSite=strict"));
    };
    /**
     * Retrieves a cookie by its name
     *
     * @param {string} cookieNameToFind Name of the cookie
     * @returns {null | { name:string, value:any }} Null or an object with the the name and the value of cookie
     * @static
     */
    CookieService.getCookieByName = function (cookieNameToFind) {
        //We get all the cookies
        var cookiesArray = this.getAllCookies(false);
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
     * Gets all cookies stored in the website
     * Returns either a string or an array of objects with the cookie name and value
     *
     * @param {boolean} rawCookies Boolean to know if the cookies retrieved need to be in a string
     * @returns {string | {name:string, value:any}} Either a string or an array of objects containing the cookies
     * @static
     */
    CookieService.getAllCookies = function (rawCookies) {
        if (rawCookies === void 0) { rawCookies = false; }
        if (rawCookies) {
            return document.cookie;
        }
        var rawArrayOfCookies = document.cookie.split(";");
        var formattedArrayOfCookies = [];
        for (var _i = 0, rawArrayOfCookies_1 = rawArrayOfCookies; _i < rawArrayOfCookies_1.length; _i++) {
            var cookie = rawArrayOfCookies_1[_i];
            var name_2 = cookie.split("=")[0];
            var value = cookie.split("=")[1];
            value = JSON.parse(value);
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
    return CookieService;
}());
export { CookieService };

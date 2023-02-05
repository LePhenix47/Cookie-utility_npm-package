/**
 * Utility class that handles cookies
 *
 * PS: Cookie value aren't overridden
 *
 * example:
 *
 * ```js
  * document.cookie = "test1 = a";
  
  * document.cookie = "test2 = b";
  *
  * console.log(document.cookie) //Returns "test1=a;test2=b"
 * ```
 */
export default class CookieUtility {
  constructor() {}
  /**
   *
   * @param name Name of the cookie
   * @param value Value of the cookie
   * @param cookieCanExpire Boolean to know if the cookie can expire
   * @returns Cookie-string that was created
   */
  setCookie(name, value, cookieCanExpire = false) {
    if (cookieCanExpire) {
      //Gets the time in ms from the next week
      let todayInMilliseconds = new Date().getTime();
      let sevenDaysInMilliseconds = 1000 * 60 * 60 * 24 * 7;

      //Gets the actual date
      let nextWeekDate = new Date(
        todayInMilliseconds + sevenDaysInMilliseconds
      );
      document.cookie = `${name}=${value}; expires="${nextWeekDate}"; sameSite=strict"`;
    }

    return (document.cookie = `${name}=${value}; sameSite=strict`);
  }

  /**
   * Retrieves a cookie by its name
   *
   * @param cookieNameToFind Name of the cookie
   * @returns Null or an object with the the name and the value of cookie
   */
  getCookieByName(cookieNameToFind) {
    //We get all the cookies
    const cookiesArray = this.getAllCookies(false);

    //We iterate through the array of cookies and find the cookie wanted
    for (const cookieObject of cookiesArray) {
      const { name, value } = cookieObject;

      const cookieHasBeenFound = name === cookieNameToFind;

      if (cookieHasBeenFound) {
        return cookieObject;
      }
    }

    return null;
  }

  /**
   * Changes the value of a cookie by its name
   *
   * @param nameOfCookie Name of the cookie
   * @param newValue New value for the cookie
   */
  patchCookieValue(nameOfCookie, newValue) {
    document.cookie = `${nameOfCookie}=${newValue}`;
  }

  /**
   * Deletes a cookie by their name
   *
   * @param nameOfCookie Name of the cookie to delete
   */
  deleteCookieByName(nameOfCookie) {
    document.cookie = `${nameOfCookie}=0; expires=${new Date(0)}`;
  }

  /**
   * Gets all cookies stored in the website
   * Returns either a string or an array of objects with the cookie name and value
   *
   * @param rawCookies Boolean to know if the cookies retrieved need to be in a string
   * @returns Either a string or an array of objects containing the cookies
   */
  getAllCookies(rawCookies = false) {
    if (rawCookies) {
      return document.cookie;
    }

    let rawArrayOfCookies = document.cookie.split(";");
    const formattedArrayOfCookies = [];

    for (const cookie of rawArrayOfCookies) {
      let name = cookie.split("=")[0];
      let value = cookie.split("=")[1];

      formattedArrayOfCookies.push({ name, value });
    }

    return formattedArrayOfCookies;
  }

  /**
   * Deletes all cookies stored in the website
   *
   * @returns void
   */
  deleteAllCookies() {
    let rawArrayOfCookies = document.cookie.split(";");

    for (const cookie of rawArrayOfCookies) {
      let name = cookie.split("=")[0];

      document.cookie = `${name}=0; expires=${new Date(0)}`;
    }
  }
}

module.exports = CookieUtility;

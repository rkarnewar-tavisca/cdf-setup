export class XhrInterceptor {
  static intercept(): void {
    const origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method: string, url: string) {
      // TO DO: Keep this commented when you check-in. This is only to test locally with stage after 11.30pm IST
      //  if (url.indexOf('/user/session/create') > -1) {
      //   arguments[1] = 'https://orxe-api.stage.cnxloyalty.com/api/orxe/v1.0/user/session/create';
      // }
      origOpen.apply(this, arguments);
    };
  }
}

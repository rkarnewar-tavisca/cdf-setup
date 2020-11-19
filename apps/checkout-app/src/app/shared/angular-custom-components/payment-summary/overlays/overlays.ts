export abstract class Overlay {
  private ORVERLAY_HASH = '#overlay';
  /**
   * Data required for overlay
   */
  public data: any;

  /**
   *
   */
  public isOpen = false;

  /**
   * Opens the overlay based on the overlayId
   */
  public open() {
    const self = this;
    window.location.hash = this.ORVERLAY_HASH;
    self.isOpen = true;
    window.addEventListener(
      'hashchange',
      function handler(e) {
        if (e.oldURL.endsWith(self.ORVERLAY_HASH)) {
          self.isOpen = false;
          if (window.location.href.endsWith(self.ORVERLAY_HASH)) {
            history.back();
          }
        }
      },
      false
    );
  }

  /**
   * Closes the opened overlay based on the overlayId
   */
  public close() {
    this.isOpen = false;
    if (window.location.href.endsWith(this.ORVERLAY_HASH)) {
      window.location.hash = '';
    }
  }
}

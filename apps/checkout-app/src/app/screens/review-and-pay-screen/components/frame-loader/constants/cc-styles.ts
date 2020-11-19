/**
 * These styles would be consumed by card number PCI component.
 * Here we have taken values from current theme and could be override based on requirement
 */

export const CC_STYLES = `:root{--border-radius:4px}
:root{--spacing-01:2px;--spacing-02:4px;--spacing-04:12px;--spacing-05:16px;--spacing-09:48px;--spacing-12:72px}
:root{
  --global-font-family:"Proxima Nova",sans-serif;
  --secondary:#0a57a1;
  --tertiary:#13294e;
  --error:#d9222a;
  --neutral:#ffffff;
  --primary-text:#242c38;
  --secondary-text:#505660;
  --tertiary-text:#6a7078;
  --disabled-text:#969da4
}
body,html{
  font-family:var(--global-font-family);
  font-size:var(--global-em-size);
  line-height:1.5rem
}
:root{--global-em-size:10px;--font-weight-semi-bold:600;--font-weight-regular:400}`;

import Color from 'color';

export function setThemeColor() {
  const primaryColor = '#0453f3';
  const color = Color(primaryColor);
  document.documentElement.style.setProperty('--ant-primary-color', color.hex());
  document.documentElement.style.setProperty('--ant-primary-color-hover', color.lighten(0.2).hex());
  document.documentElement.style.setProperty('--ant-primary-color-active', color.darken(0.2).hex());
  // document.documentElement.style.setProperty('--ant-primary-color-disabled', color.lighten(0.4));
  document.documentElement.style.setProperty('--ant-primary-color-outline', 'rgb(4 83 243 / 20%)');
  document.documentElement.style.setProperty(
    '--ant-primary-color-deprecated-bg',
    color.lighten(0.5).hex()
  );
  document.documentElement.style.setProperty(
    '--ant-primary-color-deprecated-border',
    color.lighten(0.3).hex()
  );
  document.documentElement.style.setProperty('--ant-primary-1', color.lighten(1).hex());
  document.documentElement.style.setProperty('--ant-primary-2', color.lighten(0.8).hex());
  document.documentElement.style.setProperty('--ant-primary-3', color.lighten(0.6).hex());
  document.documentElement.style.setProperty('--ant-primary-4', color.lighten(0.4).hex());
  document.documentElement.style.setProperty('--ant-primary-5', color.lighten(0.2).hex());
  document.documentElement.style.setProperty('--ant-primary-6', color.hex());
  document.documentElement.style.setProperty('--ant-primary-7', color.darken(0.2).hex());
  document.documentElement.style.setProperty('--ant-primary-8', color.darken(0.4).hex());
  document.documentElement.style.setProperty('--ant-primary-9', color.darken(0.6).hex());
  document.documentElement.style.setProperty('--ant-primary-10', color.darken(0.8).hex());

  document.documentElement.style.setProperty(
    '--ant-primary-color-deprecated-l-35',
    color.lighten(0.35).hex()
  );
  document.documentElement.style.setProperty(
    '--ant-primary-color-deprecated-l-20',
    color.lighten(0.2).hex()
  );
  document.documentElement.style.setProperty(
    '--ant-primary-color-deprecated-t-20',
    color.lighten(0.2).hex()
  );
  document.documentElement.style.setProperty(
    '--ant-primary-color-deprecated-t-50',
    color.lighten(0.5).hex()
  );
  document.documentElement.style.setProperty(
    '--ant-primary-color-deprecated-f-12',
    color.fade(0.12)
  );
  document.documentElement.style.setProperty(
    '--ant-primary-color-active-deprecated-f-30',
    color.fade(0.3)
  );
  document.documentElement.style.setProperty(
    '--ant-primary-color-active-deprecated-d-02',
    color.lighten(0.8).hex()
  );
  document.documentElement.style.setProperty('--ant-info-color', color.hex());
  document.documentElement.style.setProperty(
    '--ant-info-color-deprecated-bg',
    color.lighten(0.8).hex()
  );
  document.documentElement.style.setProperty(
    '--ant-info-color-deprecated-border',
    color.lighten(0.6).hex()
  );
}

function getColorsVar(prefix, ...name) {
  return name.reduce((colors, curr) => {
    const varName = prefix ? `${prefix}${curr}` : curr;
    colors[curr] = `var(--${varName})`;

    return colors;
  }, {});
}

const base = getColorsVar(
  null,
  'primary',
  'secondary',
  'danger',
  'green',
  'warning'
);
const backgroundColor = getColorsVar(
  'bg-',
  'dark',
  'default',
  'light',
  'lighter',
  'input',
  'input-dark',
  'card'
);
const textColor = getColorsVar('text-', 'default', 'light', 'lighter');

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './components/**/*.vue',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.js'
    ],
    options: {
      whitelist: [
        'light-theme',
        'table-ui',
        'tooltip-ui',
        'vue-popover-theme',
        'swiper-wrapper',
        'toasted',
        'dark-theme'
      ],
      whitelistPatterns: [
        /swiper/,
        /dark-theme/,
        /light-theme/,
        /vue-popover-theme/,
        /mdi-icon/,
        /toasted/,
        /vue-popover-theme/,
        /chart-container/,
        /graph-svg-tip/,
        /-(leave|enter|appear)(|-(to|from|active))$/
      ],
      whitelistPatternsChildren: [/wrapper/, /swiper-wrapper/]
    }
  },
  theme: {
    borderRadius: {
      sm: '0.125rem',
      default: '0.25rem',
      md: '0.5rem',
      lg: '0.9375rem',
      full: '9999px'
    },
    extend: {
      colors: base,
      backgroundColor,
      textColor
    },
    container: {
      padding: '2rem',
      center: true
    }
  },
  variants: {
    boxShadow: ['group-hover']
  }
};

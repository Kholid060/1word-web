<script>
export default {
  props: {
    direction: {
      type: String,
      default: 'bottom',
      validator(value) {
        return ['top', 'right', 'bottom', 'left'].includes(value);
      }
    }
  },
  render(h) {
    return h(
      'transition',
      {
        props: {
          ...this.$attrs,
          name: `slide-${this.direction}`
        }
      },
      this.$slots.default
    );
  }
};
</script>
<style lang="scss" scoped>
$directions: (
  'top': translateY(-10px),
  'right': translateX(10px),
  'bottom': translateY(10px),
  'left': translateX(-10px)
);

@each $direction, $translate in $directions {
  .slide-#{$direction}-enter-active,
  .slide-#{$direction}-leave-active {
    transition: all 300ms ease;
  }
  .slide-#{$direction}-enter,
  .slide-#{$direction}-leave-to {
    transform: $translate;
    opacity: 0;
  }
}
</style>

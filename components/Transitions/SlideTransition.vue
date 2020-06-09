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
$directions: 'top', 'right', 'bottom', 'left';

@mixin transitionClass($direction, $transformValue) {
  .slide-#{$direction}-enter-active,
  .slide-#{$direction}-leave-active {
    transition: all 300ms ease;
  }
  .slide-#{$direction}-enter,
  .slide-#{$direction}-leave-to {
    transform: $transformValue;
    opacity: 0;
  }
}

@each $direction in $directions {
  @if $direction === 'top' {
    @include transitionClass($direction, translateY(-10px));
  } @else if $direction == 'right' {
    @include transitionClass($direction, translateX(10px));
  } @else if $direction == 'bottom' {
    @include transitionClass($direction, translateY(10px));
  } @else if $direction == 'left' {
    @include transitionClass($direction, translateX(-10px));
  }
}
</style>

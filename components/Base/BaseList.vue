<script>
import '~/assets/scss/components/_list.scss';

export default {
  name: 'ListUi',
  props: {
    dense: Boolean,
    active: Boolean,
    disabled: Boolean,
    tag: {
      type: String,
      default: 'div'
    },
    to: [String, Object],
    hover: {
      type: Boolean,
      default: true
    }
  },
  render(h) {
    const prefixEl = this.$slots.prefix
      ? h(
          'div',
          {
            staticClass: 'prefix'
          },
          this.$slots.prefix
        )
      : '';

    return h(
      this.tag,
      {
        staticClass: 'list-ui',
        class: {
          dense: this.dense,
          active: this.active,
          hover: this.hover,
          disabled: this.disabled
        },
        props: {
          to: this.to
        },
        on: {
          ...this.$listeners
        }
      },
      [prefixEl, this.$slots.default]
    );
  }
};
</script>

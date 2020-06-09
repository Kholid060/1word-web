<script>
import '~/assets/scss/components/_card.scss';

export default {
  name: 'CardUi',
  props: {
    outline: Boolean,
    hover: Boolean,
    small: Boolean,
    disabled: Boolean,
    large: Boolean,
    noPaddingContent: Boolean,
    height: [String, Number],
    width: [String, Number]
  },
  render(h) {
    const { image, header, footer } = this.$slots;

    const CardImage = image
      ? h(
          'div',
          {
            staticClass: 'card-ui__image',
            on: {
              click: (event) => this.$emit('click:image', event)
            }
          },
          image
        )
      : null;

    const CardHeader = header
      ? h(
          'div',
          {
            staticClass: 'card-ui__header flex items-center'
          },
          header
        )
      : null;

    const CardFooter = footer
      ? h(
          'div',
          {
            staticClass: 'card-ui__footer flex items-center'
          },
          footer
        )
      : null;

    const CardContent = h(
      'div',
      {
        staticClass: 'card-ui__content',
        class: {
          'no-padding': this.noPaddingContent
        },
        on: {
          click: () => this.$emit('click:content')
        }
      },
      this.$slots.default
    );

    return h(
      'div',
      {
        staticClass: 'card-ui relative',
        class: {
          'hover:shadow-xl is-hover': this.hover,
          border: this.outline,
          small: this.small,
          large: this.large,
          disabled: this.disabled
        },
        style: {
          height: this.height,
          width: this.width
        },
        on: {
          click: (event) => this.$emit('click', event)
        }
      },
      [CardImage, CardHeader, CardContent, CardFooter]
    );
  }
};
</script>

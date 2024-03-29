import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Raleway',
    body: 'Nunito',
  },
  colors: {
    brand: {
      '50': '#889CC9',
      '100': '#7A91C3',
      '200': '#5E7AB6',
      '300': '#4965A2',
      '400': '#3D5386',
      '500': '#30426A',
      '600': '#2D3E63',
      '700': '#1F2A43',
      '800': '#0D121D',
      '900': '#000000',
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'sm',
      },
      defaultProps: {
        colorScheme: 'brand',
      },
    },
    Input: {
      baseStyle: {
        size: 'sm',
        borderRadius: 'sm',
      },
    },
    Select: {
      baseStyle: {
        size: 'sm',
        borderRadius: 'sm',
      },
    },
  },
});

export default theme;

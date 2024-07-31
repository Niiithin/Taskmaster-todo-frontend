/* Relative Imports */
import { pxToRem } from "utility/formatFontSize";

// ----------------------------------------------------------------------

type FontSizeMeasurement = {
  sm: number;
  md: number;
  lg: number;
};

// ----------------------------------------------------------------------

/**
 * To set fontsize according to the width of the screen.
 *
 * @param sm - small font size
 * @param md - medium font size
 * @param lg - large font size
 * @returns font size based on the width of the screen
 */
function responsiveFontSizes({ sm, md, lg }: FontSizeMeasurement): any {
  return {
    "@media (min-width:768px)": {
      fontSize: pxToRem(sm),
    },
    "@media (min-width:1024px)": {
      fontSize: pxToRem(md),
    },
    "@media (min-width:1440px)": {
      fontSize: pxToRem(lg),
    },
  };
}

/* Constants */
const fonts: any = {
  Poppins_Regular: "Poppins-Regular",
  Poppins_Semibold: "Poppins-SemiBold",
  Poppins_Medium: "Poppins-Medium",
  Poppins_Light: "Poppins-Light",
};

const typography: any = {
  fontFamily: fonts.Poppins_Regular,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  fonts,
  h1: {
    fontFamily: fonts.Poppins_SemiBold,
    fontWeight: 600,
    lineHeight: 1,
    fontSize: pxToRem(46),
    ...responsiveFontSizes({ sm: 46, md: 48, lg: 50 }),
  },
  h2: {
    fontFamily: fonts.Poppins_SemiBold,
    fontWeight: 600,
    lineHeight: 1,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontFamily: fonts.Poppins_SemiBold,
    fontWeight: 600,
    lineHeight: 1,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
  },
  h4: {
    fontFamily: fonts.Poppins_SemiBold,
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
  },
  h5: {
    fontFamily: fonts.Poppins_Medium,
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 28, lg: 30 }),
  },
  h6: {
    fontFamily: fonts.Poppins_SemiBold,
    fontWeight: 600,
    lineHeight: 28 / 18,
    fontSize: pxToRem(12),
    ...responsiveFontSizes({ sm: 14, md: 16, lg: 18 }),
  },
  subtitle1: {
    fontFamily: fonts.Poppins_SemiBold,
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(22),
  },
  subtitle2: {
    fontFamily: fonts.Poppins_SemiBold,
    fontWeight: 500,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },

  body1: {
    lineHeight: 1.5,
    fontWeight: 600,
    fontSize: pxToRem(16),
  },
  body2: {
    lineHeight: 1.5,
    fontWeight: 600,
    fontSize: pxToRem(14),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  button: {
    fontWeight: "normal",
    lineHeight: 1.2,
    fontSize: pxToRem(14),
    textTransform: "capitalize",
  },
};

export default typography;

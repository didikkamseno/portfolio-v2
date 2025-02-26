import { globalFontFace, style } from "@vanilla-extract/css"
// @ts-ignore
import interVariableWoff2 from "../assets/fonts/inter-latin.var.woff2"
// @ts-ignore
import crimsonProVariableWoff2 from "../assets/fonts/crimson-pro-latin.var.woff2"

const interUI = `Inter`
const crimsonPro = `Crimson Pro`

globalFontFace(interUI, {
  fontWeight: `400 700`,
  fontDisplay: `swap`,
  fontStyle: `normal`,
  src: `url(${interVariableWoff2}) format("woff2")`,
  unicodeRange: `U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD`,
})

globalFontFace(crimsonPro, {
  fontStyle: `normal`,
  fontWeight: `600 800`,
  fontDisplay: `swap`,
  src: `url(${crimsonProVariableWoff2}) format('woff2')`,
  unicodeRange: `U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD`,
})

export const fonts = {
  body: `'${interUI}', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  heading: `'${crimsonPro}', ui-serif, Cambria, "Times New Roman", Times, serif`,
  mono: `SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
}

export const bodyFontFamilyClass = style({
  fontFamily: fonts.body,
})

export const headingFontFamilyClass = style({
  fontFamily: fonts.heading,
})

export const monoFontFamilyClass = style({
  fontFamily: fonts.mono,
})

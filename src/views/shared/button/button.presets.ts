import { ViewStyle, TextStyle } from "react-native"
import { color } from "../../../theme/color"
import { spacing } from "../../../theme/spacing"

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[2],
  borderRadius: 4,
  justifyContent: "center",
  alignItems: "center",
}

const BASE_TEXT: TextStyle = {
  paddingHorizontal: spacing[2],
  fontSize: 15,
  fontWeight: "bold",
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets = {
  /**
   * A smaller piece of secondard information.
   */
  primary: { ...BASE_VIEW, backgroundColor: color.palette.bahamaBlue } as ViewStyle,
  primarySmall: {
    ...BASE_VIEW,
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[1],
    backgroundColor: color.palette.bahamaBlue,
  } as ViewStyle,
  delete: { ...BASE_VIEW, backgroundColor: color.palette.angry } as ViewStyle,
  deleteSmall: {
    ...BASE_VIEW,
    backgroundColor: color.palette.angry,
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[1],
  } as ViewStyle,
  disabled: { ...BASE_VIEW, backgroundColor: color.palette.mediumGrey } as ViewStyle,
}

export const textPresets = {
  primary: { ...BASE_TEXT, color: color.palette.white } as TextStyle,
  primarySmall: { ...BASE_TEXT, color: color.palette.white, fontSize: 14 } as TextStyle,
  delete: { ...BASE_TEXT, color: color.palette.white } as TextStyle,
  deleteSmall: { ...BASE_TEXT, color: color.palette.white, fontSize: 14 } as TextStyle,
  disabled: { ...BASE_TEXT, color: color.palette.white } as TextStyle,
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets

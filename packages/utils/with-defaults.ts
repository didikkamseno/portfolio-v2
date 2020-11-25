import { PluginOptions } from "gatsby"

/**
 * Set default values for all theme options
 * @param themeOptions - Incoming options
 * @returns Default values unless options are specified
 */
export const withDefaults = (themeOptions: PluginOptions) => {
  const writingSource = (themeOptions.writingSource as string) || `content/writing`
  const writingPath = (themeOptions.writingPath as string) || `/writing`
  const writingPrefix = (themeOptions.writingPrefix as string) || `/writing`
  const tagPath = (themeOptions.tagPath as string) || `/tags`
  const tagPrefix = (themeOptions.tagPrefix as string) || `/tags`
  const formatString = (themeOptions.formatString as string) || `YYYY-MM-DD`

  return {
    writingSource,
    writingPath,
    writingPrefix,
    tagPath,
    tagPrefix,
    formatString,
  }
}

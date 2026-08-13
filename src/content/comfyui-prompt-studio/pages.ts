import { setDocPages } from './helpers'
import { characterPages } from './sections/character'
import { formatAndLintPages } from './sections/format-and-lint'
import { galleryPages } from './sections/gallery'
import { generatePages } from './sections/generate'
import { gettingStartedPages } from './sections/getting-started'
import { hubPages } from './sections/hub'
import { imageToolsPages } from './sections/image-tools'
import { integrationPages } from './sections/integration'
import { introductionPages } from './sections/introduction'
import { mediaPages } from './sections/media'
import { modelsPages } from './sections/models'
import { storiesPages } from './sections/stories'
import { studioPages } from './sections/studio'

/** Documentation pages for ComfyUI Prompt Studio */
export const DOC_PAGES = [
  ...storiesPages,
  ...hubPages,
  ...introductionPages,
  ...gettingStartedPages,
  ...generatePages,
  ...formatAndLintPages,
  ...characterPages,
  ...imageToolsPages,
  ...mediaPages,
  ...studioPages,
  ...galleryPages,
  ...modelsPages,
  ...integrationPages,
]

setDocPages(DOC_PAGES)

export {
  CPS_GITHUB,
  CPS_LIVE,
  getAllPages,
  getPageBySlug,
  getSections,
  slugKey,
  slugToPath,
} from './helpers'

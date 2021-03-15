import seo from './fragments/seo'
import images from './fragments/images'
export default `query homePageQuery {
    home {
      title
      texte
      ${images}
      ${seo}
    }
  }`

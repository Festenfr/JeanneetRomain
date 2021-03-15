const canUseWebP = () => {
    var elem = document.createElement('canvas')

    if (elem.getContext && elem.getContext('2d')) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0
    }
    return false
}
const sizeAndFormatImage = (url, awsUrl, width) => {
    console.log(width)
    let size = ''
    if (width < 500) size = 'small_'
    else if (width < 750) size = 'medium_'
    else size = 'large_'
    let imageName = url
        .replace('.webp', '')
        .replace('.jpg', '')
        .replace(awsUrl, '')
    let format = canUseWebP() ? '.webp' : '.jpg'
    return `${awsUrl}${size}${imageName}${format}`
}
export default sizeAndFormatImage

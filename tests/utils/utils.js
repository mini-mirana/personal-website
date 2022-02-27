// eslint-disable-next-line no-unused-vars
function getConfig() {
  return {
    diffDirection: 'vertical',
    // useful on CI (no need to retrieve the diff image, copy/paste image content from logs)
    dumpDiffToConsole: true,
    // use SSIM to limit false positive
    // https://github.com/americanexpress/jest-image-snapshot#recommendations-when-using-ssim-comparison
    comparisonMethod: 'ssim'
  }
}

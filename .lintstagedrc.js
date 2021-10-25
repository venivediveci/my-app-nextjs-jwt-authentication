module.exports = {
  '**/*.js?(x)': filenames => {
    console.log('lint-staged %%%%%%%%%%%%')
    return `next lint --fix --file ${filenames
      .map(file => file.split(process.cwd())[1])
      .join(' --file ')}`
  },
}

const { createDir } = require('../utils/io');

const main = async() => {
  console.log(await createDir("testDir"));
}

main();

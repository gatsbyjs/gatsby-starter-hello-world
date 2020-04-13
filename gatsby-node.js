const fs = require("fs-extra")

console.dir(process.env)

exports.onPostBuild = async () => {
  await fs.copy("./functions", "./public/functions")
}

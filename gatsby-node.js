const fs = require("fs-extra")

exports.onPostBuild = async () => {
  await fs.copy("./functions", "./public/functions")
}

const Netlify = require("netlify")
const path = require("path")

const client = new Netlify(process.env.ACCESS_TOKEN)

async function publish() {
  // TODO: your siteID
  await client.deploy(process.env.NETLIFY_SITE_ID, `public`, {
    fnDir: `public/functions`,
    syncFileLimit: 500,
    statusCb(update) {
      console.log(update)
    },
  })
}

publish()

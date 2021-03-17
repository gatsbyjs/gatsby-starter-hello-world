
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
       alias: {
          path: require.resolve("path-browserify"),
		  crypto: require.resolve("crypto-browserify"),
      },
       fallback: {
		    "fs": false,
		    "tls": false,
		    "net": false,
		    "path": false,
		    "zlib": false,
		    "http": false,
		    "https": false,
		    "stream": false,
		    "crypto": false,
       }
    }
  })
}
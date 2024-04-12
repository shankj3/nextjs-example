/** @type {import('next').NextConfig} */
// const nextConfig = {
//     productionBrowserSourceMaps: true,
//     webpack: (config) => {
//         config.devtool = 'nosources-source-map'
//     }
// }
import RollbarSourcemapPlugin from "rollbar-sourcemap-webpack-plugin"
// const RollbarSourcemapPlugin = require('rollbar-sourcemap-webpack-plugin');
// import withSourceMaps from "@zeit/next-source-maps"

// replace `<ROLLBAR_ACCESS_TOKEN>` with your Rollbar access token
const ROLLBAR_ACCESS_TOKEN = process.env.ROLLBAR_SERVER_TOKEN;

const nextConfig = {
    productionBrowserSourceMaps: true,
    webpack: (config, { dev, webpack, buildId }) => {
        if (!dev) {
            /* eslint-disable-next-line no-param-reassign */
            // config.output.futureEmitAssets = false;
            config.devtool = 'nosources-source-map'
            const codeVersion = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
            console.log(ROLLBAR_ACCESS_TOKEN, codeVersion)
            config.plugins.push(
                new RollbarSourcemapPlugin({
                    accessToken: ROLLBAR_ACCESS_TOKEN,
                    version: codeVersion,
                    publicPath: 'https://nextjs-example-beta-ten.vercel.app/_next/'
                })
            );
        }

    return config;
  }
}

export default nextConfig;

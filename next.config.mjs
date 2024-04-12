/** @type {import('next').NextConfig} */
import RollbarSourcemapPlugin from "rollbar-sourcemap-webpack-plugin"
import { DeleteSourceMapsPlugin } from 'webpack-delete-sourcemaps-plugin'


// this is an environment variable I added to my vercel - it isn't prefixed 
// with NEXT_PUBLIC, which is good because we only need it for the build process 
// cuz this ist he public token 
const ROLLBAR_ACCESS_TOKEN = process.env.ROLLBAR_SERVER_TOKEN;

const nextConfig = {
    webpack: (config, { dev, webpack, buildId }) => {
        if (!dev) {
            // THIS IS IMPORTANT!! We are telling next right now 
            // to build the source maps, but you do not want them exposed 
            // to any old random!! this will make it so that it cannot be used 
            // to look at your code from any ol' browser, it'll keep operating as 
            // you already had it configured
            config.devtool = 'hidden-source-map'
            // this is already exposed by vercel
            const codeVersion = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;

            config.plugins.push(
                new RollbarSourcemapPlugin({
                    accessToken: ROLLBAR_ACCESS_TOKEN,
                    version: codeVersion,
                    publicPath: 'https://nextjs-example-beta-ten.vercel.app/_next/'
                })
            );
            config.plugins.push(
                new DeleteSourceMapsPlugin()
            )
        }

    return config;
  }
}

export default nextConfig;

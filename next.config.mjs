/** @type {import('next').NextConfig} */
import RollbarSourcemapPlugin from "rollbar-sourcemap-webpack-plugin"

// this is an environment variable I added to my vercel - it isn't prefixed 
// with NEXT_PUBLIC, which is good because we only need it for the build process 
// cuz this ist he public token 
const ROLLBAR_ACCESS_TOKEN = process.env.ROLLBAR_SERVER_TOKEN;

const nextConfig = {
    productionBrowserSourceMaps: true,
    webpack: (config, { dev, webpack, buildId }) => {
        if (!dev) {
            // THIS IS IMPORTANT 
            config.devtool = 'hidden-source-map'
            // this is already exposed by vercel
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

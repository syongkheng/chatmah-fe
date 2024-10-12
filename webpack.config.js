import Dotenv from 'dotenv-webpack';
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export default {
  mode: "development", // or 'production'
  entry: "./src/main.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Add a rule for TypeScript files
        exclude: /node_modules/,
        use: {
          loader: "ts-loader", // Use ts-loader for TypeScript
        },
      },
      {
        test: /\.(js|jsx)$/, // Existing rule for JavaScript files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Resolve these extensions
  },
  plugins: [new BundleAnalyzerPlugin(), new Dotenv()],
};

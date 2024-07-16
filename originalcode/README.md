# Sigma Plugin Development Guide

This template is a simple example of how to create custom plugins for Sigma

## Getting Started

Sigma plugins are run using an `<iframe>` in the Sigma web interface.
The plugin is loaded into the iframe and has access to the Sigma API.
Sigma recommends using React to create plugins, but it is not required.
You can use any framework or library you like.
This demo uses React and TypeScript for best compatibility with Sigma.

The plugin must be hosted on a web server and require:

1. The Development URL `http://localhost:5173`
2. The Production URL (provided by Azure Static Web Apps)

We can use Azure Static Web Apps to host our plugin.

To setup the plugin, follow these steps:

```bash
  npm create vite@latest sigma-plugin -- --template react-ts
  cd sigma-plugin
  npm install && npm install @sigmacomputing/plugin d3 @types/d3
  npm run dev
```

The sigma docs say to use create-react-app, but that is deprecated.
We can use Vite to create a new React project with TypeScript.
We can then install the Sigma plugin library and d3 for data visualization.
You can now start developing your plugin.

To run the plugin in Sigma, you need to build the plugin and host it on a web server.
You'll need to install the [swa-cli](https://azure.github.io/static-web-apps-cli/) to deploy the plugin to Azure Static Web Apps.

```bash
   npm install -g @azure/static-web-apps-cli
```

Plugins must be hosted ourselves and cannot be hosted on Sigma's servers.
Host with [Azure Static Web Apps](https://azure.microsoft.com/en-us/products/app-service/static).

This will build the plugin and deploy it to Azure Static Web Apps:

```bash
  npm run build
  swa deploy dist --no-use-keychain -n sigma-plugin
```

The flag `--no-use-keychain` will prompt you to login to Azure.
If you don't want to login each time, you can remove this flag.

You can now register the plugin with Sigma using the production URL.

Here's a demo plugin that shows a simple bar chart:
[Demo Plugin](https://app.sigmacomputing.com/copeland/workbook/workbook-3ko374lfsTGhOXu9SFa4uz?:link_source=share)

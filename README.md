![Meaningfulcode Logo](public/favicon-32x32.png)

# MeaningfulCode / frontend

This repository holds the frontend code of [meaningfulcode.org](https://meaningfulcode.org).

The goal of this website is to promote **meaningful** and opensource **projects** that accept new contributors, willing to make a difference. Projects are regrouped in different categories: Health, Education, Environment, Society, and Humanitarian.

## Contributing & Supporting

Contributors are very welcome, to help us you can:

- ➕ [Suggest impactful projects](https://github.com/Meaningful-Code/meaningfulcode-frontend/issues/new?assignees=&labels=meaningful+project&template=meaningful_project.md&title=Meaningful+project%3A+): Finding those is tough, this is the best way to help
- 💻 Contribute to the project: UI, Frontend, Backend. Feel free to ask on [Discord](https://discord.gg/KPAm7wd7fJ)
- ❤️ [Sponsor the development](https://github.com/sponsors/pixep)

But you can also...

- 🐛 [Report an issue](https://github.com/Meaningful-Code/meaningfulcode-frontend/issues/new?assignees=&labels=bug&template=bug_report.md&title=Bug%3A+)
- 💡 [Suggest a new feature](https://github.com/Meaningful-Code/meaningfulcode-frontend/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=Feature%3A+)
- 💬 Or just let us know what you think on the [Discord](https://discord.gg/KPAm7wd7fJ)!

## Build

### Stack

The project uses:
- Frontend: Typescript with [React](https://reactjs.org/) and [Material UI]([https://react.semantic-ui.com/](https://mui.com/material-ui/)).
- Backend (available separately): Node & Express (Typescript), AWS Lambda & DynamoDB.
- Hosting: the full solution currently runs on Vercel.

The rest of the instructions on this page focus on the frontend.

### Setup

The following steps guide you to setup your environment

1. Install [Node 18](https://nodejs.org/en/download/package-manager/)
1. Install [yarn](https://classic.yarnpkg.com/lang/en/docs/install)
1. Clone this repository, and run `yarn install`

### Development build

From the project folder, simply run `REACT_APP_FORCE_API=stub npm start` to start the frontend with fake projects.

The `REACT_APP_FORCE_API` environment variable can be set to

- `stub`,
- `local`: API expected at `http://localhost:3001`,
- or `prod`.

### Production build

To test a production build, simply run:

1. `yarn build`
1. `npm install -g serve`
1. `serve -s build`

## License

This project is licensed under GPL-v3.

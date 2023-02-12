![Meaningfulcode Logo](public/favicon-32x32.png)

# MeaningfulCode / frontend

This repository holds the frontend code of [meaningfulcode.org](https://meaningfulcode.org).

The goal of this website is to promote **meaningful** and opensource **projects** that accept new contributors, willing to make a difference. Projects are regrouped in different categories: Health, Education, Environment, Society, and Humanitarian.

## Contributing / Help wanted!

Contributors are very welcome, to help us you can:

- [Suggest meaningul projects](https://github.com/Meaningful-Code/meaningfulcode-frontend/issues/new?assignees=&labels=meaningful+project&template=meaningful_project.md&title=Meaningful+project%3A+): Finding those is tough, this is the best way to help
- Be part of the team
  - UX and Graphical design
  - Frontend/Backend dev
  - Reach out on GitHub or [Discord](https://discord.gg/KPAm7wd7fJ)

But you can also...

- [Report an issue](https://github.com/Meaningful-Code/meaningfulcode-frontend/issues/new?assignees=&labels=bug&template=bug_report.md&title=Bug%3A+)
- [Suggest a new feature](https://github.com/Meaningful-Code/meaningfulcode-frontend/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=Feature%3A+)
- Contribute to the code base directly
  - Something doesn't work? Create a pull request with your changes!
  - Have a look at opened tickets, feel free to ask if you have any doubts regarding the changes you want to push

## Build

This frontend is based on [React](https://reactjs.org/), [Semantic UI](https://react.semantic-ui.com/), and [Isotope](https://isotope.metafizzy.co/).

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

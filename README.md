# API template.

## To begin development, you need
- node 8+
- `npm` (comes with node) or `yarn`

## Downloading dependancies
- do `npm i` (or) `yarn` in the current directory

## Beginning Developement
The project uses `typescript` coupled with `nodemon` therefore any changes to the code will restart the node process
```
// npm users
npm run dev

// yarn users
yarn dev
```

## For production build
```
npm run build // yarn build
```
## For swagger docs
```
npm run swagger // yarn swagger
```

## For config
check the `dev.env` for environmental variables.

check the `log4js.json` for log config.

check the `swagger` directory for swagger documentation.

check the `tsconfig.json` for typescript config.

check the `tslint.json` for typescript linter config.

### Recommended editor
`vscode`
https://code.visualstudio.com/



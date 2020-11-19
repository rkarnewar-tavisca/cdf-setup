# orxe-ui

orxe-ui (CDF initiative to combine repos)

### To get started with this repo follow the below migration instructions:

##### Basic pointers for migrating to CDF structure

###### MicroApp

- Currently MicroApp are already in a monorepo format. So copy the microapp inside `packages\` you want to migrate and paste it inside `apps\` folder here.

- All the dependencies from the microapp monorepo (from root `package.json` to the one inside microapp) should be moved to root `package.json` of CDF repository. Check if it already exist and the version. CDF should always follow the updated and stable version of any or our core packages.

- Since there will be multiple MicroApps we have already moved `tsconfig.json` and `webpack.externals.js` from root of Microapp's monorepo to a shared folder `apps\shared\microapp-base-utils\`. So we need to update there path in `tsconfig.app.json` and `build:custom` command in `package.json` of the MicroApp.

###### Shell

- Copy the shell repository content to its respective folder in CDF workspace inside `apps\` folder.

- All the dependencies from the shell repository should be moved to root `package.json` of CDF workspace. Check if it already exist and the version. CDF should always follow the updated and stable version of any or our core packages.

- Update every `node_modules` path inside `angular.json` pointing to the root `node_modules` of CDF workspace.

- `Shell SDK` has been moved to `tools\sdk\shell-sdk`. So if there is a shell-sdk library inside shell workspace please remove that and update the path inside `tsconfig.json` pointing to Shell SDK inside `tools\sdk\shell-sdk`.

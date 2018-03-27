# 2sxc-inpage notes for developers

## Karma test runner

### karma2 is not working with npm v 3.3.4 that comes with VS2017

VS2017 has separate npm installed in folder like:
c:\Program Files (x86)\Microsoft Visual Studio\2017\Enterprise\Web\External
c:\Program Files (x86)\Microsoft Visual Studio\2017\Enterprise\Web\External\node_modules\.bin\

Solution is to config VS to use regular updated version of **npm** that is usual installed in folder like:
C:\Program Files\nodejs\

Add this path at top of the list that is configured via VS2017 Tools > Options > Projects & Solutions > External Web Tools like is explained in 
https://www.ryadel.com/en/visual-studio-2015-update-nodejs-andor-npm-latest-version/

### karma.config.js part to fix references to $ and $2sxc

I added reference to jquery and 2sxc js files with in our 2sxc DNN 7.4.2 installation (so out of 2sxc-inpage project folder).

```javascript
    files: [
      '../2sxc-dnn742/Website/Resources/Libraries/jQuery/01_09_01/jquery.js', // resolve $
      '../2sxc-dnn742/Website/DesktopModules/ToSIC_SexyContent/Js/2sxc.api.min.js', // resolve $2sxc
```

### run 

#### contionus test mode

```cmd
C:\Projects\2sxc-inpage> karma start
```

#### single test run

```cmd
C:\Projects\2sxc-inpage> karma start --single-run
```
### karma and webpack
There is version of karma.config.js that is using webpack.
It is not our default, because it is slower than default one.
It is still in project in case that we need more advanced configuration in future.

```cmd
C:\Projects\2sxc-inpage> karma start karma.config-webpack.js
```


## webpack static module bundler 

After bounding, it will copy of all files from **./dist/** to **C:/Projects/2sxc-dnn742/Website/DesktopModules/ToSIC_SexyContent/dist/inpage**, **images** and **lib** folders.

Our **webpack.config.js** supports bundling for Development or Production (depending on process.env.NODE_ENV, but 'development' is default).

### Development

- currently bundles only ts & js files to support watch mode
- bundling of *.css, and other assets is skipped

### Production

- bundles all ts/js and css files
- currently all css files are minimized (but only min.css have to be minimized)
- currently do not work in watch mode

### TypeDoc

Documentation can be auto-generated in **./docs** folder, but you have to change variable **generateTypedocDocumentation** to **true**.
For faster webpack execution during development it is not enabled by default.

```javascript
var generateTypedocDocumentation = false;
```

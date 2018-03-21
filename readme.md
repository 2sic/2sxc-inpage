# 2sxc-inpage

## Notes

### karma2 is not working with npm v 3.3.4 that comes with VS2017

VS2017 has separate npm installed in folder like:
c:\Program Files (x86)\Microsoft Visual Studio\2017\Enterprise\Web\External
c:\Program Files (x86)\Microsoft Visual Studio\2017\Enterprise\Web\External\node_modules\.bin\

Solution is to config VS to use general npm that is usual installed in folder like:
C:\Program Files\nodejs\

Add this path at top of the list that is configured in VS2017 Tools > Options > Projects & Solutions > External Web Tools like is explained in 
https://www.ryadel.com/en/visual-studio-2015-update-nodejs-andor-npm-latest-version/


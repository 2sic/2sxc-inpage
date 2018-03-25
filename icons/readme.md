# 2sxc In-Page Icon Pack

Icons used in the UI of 2sxc

## Icon tooling & Update Process

We use [fontello](http://www.fontello.com) to build the icon library. To update the library, this is the process:

1. go to fontello
1. unzip (with password - see notes) the config.json and upload to fontello
1. make your changes
1. download resulting zip and copy all the files into this icons folder
1. _todo: document how they are then included in the build process_

## My icon sources are

1. fonts in fontello, mostly font-awesome - usually SIL licence
1. Glyphicon halflings, which is the bootstrap license
1. Font Awesome 5 Pro - 2sic has a license to use these, but we can't distribute the whole library, just the selective icons we use in 2sxc-inpage

## Note about zipping & encryption of the config.json

The config.json is uploaded to fontello whenever we want to make modifications to the font. As it contains icons from the Font-Awesome pro-pack, it's zip-encrypted with a password. Please remember to always do this. The config.json (unencrypted) should never be uploaded into the public git repo.

Only the iJungleboy (or his password-safe) knows the password
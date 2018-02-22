#!/bin/bash

#
# This script can be used to build an .ipa file from your device build.
# Recent versions of iTunes disallow importing .ipa files, so this script
# can also be used to share .ipa versions with customers (OTA).
#

appc run -p ios -T device
cd build/iphone/build/Products/Debug-iphoneos
mkdir Payload
mv KitchenSink.app "Payload/$1.app"
zip -r "$1.ipa" Payload/
rm -rf Payload/
open .

#!/usr/bin/env node

import fs from "fs-extra";
import l8 from "@l8js/l8";
import { fileURLToPath } from "url";

const
    cwd = fileURLToPath(new URL("../../../../", import.meta.url)),
    pkg = fs.readJsonSync(`${cwd}/package.json`),
    packageName = pkg.sencha?.name || "[package name not found]",
    packageRoot = `${cwd}`,
    buildDir = `${packageRoot}/build`,
    deployDir = `${buildDir}/deploy`,
    files = [
        [`${packageRoot}/package.json`, `${deployDir}/package.json`],
        `${buildDir}/${packageName}.js`,
        [`${buildDir}/resources/${packageName}-all.css`, `${deployDir}/${packageName}.css`],
        [`${buildDir}/resources/${packageName}.conf.json`, `${deployDir}/${packageName}.conf.json`],
        [`${buildDir}/resources/css-vars.js`, `${deployDir}/css-vars.js`]
    ];


console.log(
    `
...bundling ${packageName}...
                                         .' '.           __
                                .        .   .          (__\\_
.-.                  .-..-.      .         .         . -{{_(|8)
: :                  : :: :       ' .  . ' ' .  . '     (__/                 
: \`-. .-..-.,-.,-. .-' :: :   .--. ,-.,-.,-. .--. 
' .; :: :; :: ,. :' .; :: :_ ' '_.': ,. ,. :' '_.'
\`.__.'\`.__.':_;:_;\`.__.'\`.__;\`.__.':_;:_;:_;\`.__.'
    `

);

fs.mkdirpSync(deployDir);

files.forEach(file => {

    let source = file, dest;

    if (l8.isArray(file)) {
        source = file[0];
        dest  = file[1];
    }

    if (!dest) {
        dest = `${deployDir}/${source.split("/").pop()}`;
    }

    fs.copySync(source, dest);

});


console.log("Done!");

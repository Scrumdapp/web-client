// stole and edited from https://gist.github.com/karpolan/2c573b5767bc9b65db9936c7fad4daac
module.exports = {
    printWidth: 80, // max 120 chars in line, code is easy to read
    useTabs: false, // use spaces instead of tabs
    tabWidth: 2, // "visual width" of of the "tab"
    trailingComma: "all", // add trailing commas in objects, arrays, etc.
    semi: true, // add ; when needed
    singleQuote: false, // '' for stings instead of ""
    bracketSpacing: true, // import { some } ... instead of import {some} ...
    arrowParens: 'always', // braces even for single param in arrow functions (a) => { }
    jsxSingleQuote: false, // "" for react props, like in html
    bracketSameLine: false, // pretty JSX
    endOfLine: 'lf', // 'lf' for linux, 'crlf' for windows, we need to use 'lf' for git
};

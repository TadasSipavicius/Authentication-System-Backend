// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { onFuncPrefixMatchingCreate } = require("./funcPrefixMatching");
// eslint-disable-next-line no-undef
module.exports = {
    rules: {
        "func-prefix-matching": {
            create: onFuncPrefixMatchingCreate,
        },
    },
};
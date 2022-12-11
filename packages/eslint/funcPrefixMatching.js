const onFuncPrefixMatchingCreate = (context) => {

  return {
    VariableDeclarator: (node) => {
        if(node.id.name.length < 4){
            context.report(node, 'Variable must be at least 3 char long')
        }
    }
  };
};
// eslint-disable-next-line no-undef
module.exports = { onFuncPrefixMatchingCreate };
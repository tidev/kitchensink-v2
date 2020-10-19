'use strict';

module.exports = {
  meta: {
    type: 'problem'
  },
  create (context) {
    function checkCallee (callee, node) {
      if (callee.type === 'Identifier' && callee.name === 'expect') {
        context.report({
          node,
          message: 'expect(...) used without assertion'
        })
      }
    }
    return {
      ReturnStatement(node) {
        if (
          node.argument && node.argument.type === 'CallExpression' &&
          node.argument.callee
        ) {
          checkCallee(node.argument.callee, node.argument);
        }
      },
      ExpressionStatement(node) {
        let {expression} = node;
        if (!expression || expression.type !== 'CallExpression')
          return;

        let {callee} = expression;
        checkCallee(callee, node);
      }
    };
  }
};

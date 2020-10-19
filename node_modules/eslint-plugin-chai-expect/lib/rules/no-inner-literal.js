'use strict';

const findExpectCall = require('../util/find-expect-call');

module.exports = {
  meta: {
    type: 'problem'
  },
  create (context) {
    function checkMemberOrCallExpression (expression) {
      if (expression.type !== 'MemberExpression' && expression.type !== 'CallExpression')
        return;

      let expect = findExpectCall(expression);
      if (!expect)
        return;

      let args = expect.arguments;
      let [firstArgument] = args;
      if (!firstArgument)
        return;

      let value;
      if (firstArgument.type === 'Literal' || firstArgument.type === 'BigIntLiteral') {
        value = firstArgument.raw;
      } else if (firstArgument.type === 'Identifier' && [
        'undefined', 'NaN', 'Infinity'
      ].includes(firstArgument.name)) {
        value = firstArgument.name;
      } else if (firstArgument.type === 'ThisExpression') {
        value = 'this';
      } else if (
        firstArgument.type === 'UnaryExpression' &&
        firstArgument.argument.type === 'Identifier' &&
        firstArgument.argument.name === 'Infinity'
      ) {
        value = `${firstArgument.operator}Infinity`;
      } else {
        return;
      }

      context.report({
        node: firstArgument,
        message: `\`${value}\` used in expect()`
      });
    }
    return {
      ReturnStatement(node) {
        if (
          node.argument && node.argument.type === 'CallExpression' &&
          node.argument.callee
        ) {
          checkMemberOrCallExpression(node.argument);
        } else if (node.argument && node.argument.type === 'MemberExpression') {
          checkMemberOrCallExpression(node.argument);
        }
      },
      ExpressionStatement(node) {
        let {expression} = node;
        checkMemberOrCallExpression(expression);
      }
    };
  }
};

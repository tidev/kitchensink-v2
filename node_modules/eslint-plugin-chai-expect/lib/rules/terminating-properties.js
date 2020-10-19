'use strict';

const findExpectCall = require('../util/find-expect-call');

const PROPERTY_TERMINATORS = [
  'ok',
  'true',
  'false',
  'null',
  'undefined',
  'exist',
  'empty',
  'arguments'
];

module.exports = {
  meta: {
    type: 'problem'
  },
  create (context) {
    let options = context.options[0] || {};
    let additionalTerminators = options.properties || [];
    let validTerminators = [...PROPERTY_TERMINATORS, ...additionalTerminators];

    function checkUseAsFunction (expression) {
      if (expression.type !== 'CallExpression')
        return;

      let {callee} = expression;
      if (callee.type !== 'MemberExpression')
        return;

      let {property} = callee;
      if (property.type !== 'Identifier' || !validTerminators.includes(property.name))
        return;

      let expectCall = findExpectCall(callee.object);
      if (!expectCall)
        return;

      let source = context.getSourceCode();

      let calleeText = source.getText(callee);
      let expectText = source.getText(expectCall);
      let assertionText = calleeText.substr(expectText.length + 1);

      context.report({
        node: property,
        message: `"${assertionText}" used as function`
      });
    }

    return {
      ReturnStatement(node) {
        let {argument} = node;
        if (argument) {
          checkUseAsFunction(argument);
        }
      },
      ExpressionStatement (node) {
        let {expression} = node;
        checkUseAsFunction(expression);
      }
    };
  }
};

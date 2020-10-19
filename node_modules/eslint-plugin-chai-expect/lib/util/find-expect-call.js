module.exports = function findExpectCall(node) {
  if (node.type === 'CallExpression') {
    if (node.callee.type === 'Identifier' && node.callee.name === 'expect') {
      return node;
    }
    if (node.callee.type === 'MemberExpression') {
      return findExpectCall(node.callee.object);
    }
  }

  if (node.type === 'MemberExpression') {
    return findExpectCall(node.object);
  }
};

# Disallow Unused Variables (alloy/no-unused-vars)

Extension of ESLint's [no-unused-vars](https://github.com/eslint/eslint/blob/master/docs/rules/no-unused-vars.md) that also looks up variable used in view files.

See the [ESLint's repo]([no-unused-vars](https://github.com/eslint/eslint/blob/master/docs/rules/no-unused-vars.md)) for full documentation.


Examples of **incorrect** code for this rule:

```js
/*eslint no-unused-vars: "error"*/

const unusedVariable = 42;

function unusedFunction() {
    console.log('Unused!');
};

function onClick() {
    console.log('You clicked me!');
}
```

```xml
<Alloy>
    <Label onClick"onClick"/>
</Alloy>
```

Examples of **correct** code for this rule:


```js
/*eslint no-unused-vars: "error"*/

const usedVariable = 42;
// Used as the onClick handler in view file
function onClick() {
    console.log(usedVariable);
}
```

```xml
<Alloy>
    <Label onClick"onClick"/>
</Alloy>
```
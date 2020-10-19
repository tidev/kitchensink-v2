# Changelog

## v2.2.0 (2020-07-08)

#### :rocket: Enhancement
* [#106](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/106) Add support for ESLint@7 as a peerDependency ([@epmatsw](https://github.com/epmatsw))

#### :house: Internal
* [#113](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/113) Fix CI builds ([@Turbo87](https://github.com/Turbo87))
* [#99](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/99) Add `meta.type` ([@brettz9](https://github.com/brettz9))

#### Committers: 3
- Brett Zamir ([@brettz9](https://github.com/brettz9))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))
- Will Stamper ([@epmatsw](https://github.com/epmatsw))


## v2.1.0 (2019-12-07)

#### :rocket: Enhancement
* [#84](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/84) Add `no-inner-literal` rule ([@brettz9](https://github.com/brettz9))
* [#76](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/76) Add ESLint peer dependency ([@brettz9](https://github.com/brettz9))
* [#71](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/71) Add `recommended` config ([@brettz9](https://github.com/brettz9))
* [#81](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/81) no-inner-compare: Add support for `expect(a != b).to.equal(true)` ([@brettz9](https://github.com/brettz9))

#### :bug: Bug Fix
* [#88](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/88) Allow `terminating-properties` with `ReturnStatement` ([@brettz9](https://github.com/brettz9))
* [#87](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/87) Allow `return` with `no-inner-compare` ([@brettz9](https://github.com/brettz9))

#### :memo: Documentation
* [#78](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/78) Adjust README ([@brettz9](https://github.com/brettz9))

#### :house: Internal
* [#85](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/85) Use ES6 template literals for multiline testing code ([@brettz9](https://github.com/brettz9))
* [#77](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/77) CI: Add ESLint 6 to test matrix ([@brettz9](https://github.com/brettz9))
* [#82](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/82) Use ES6 syntax features ([@brettz9](https://github.com/brettz9))
* [#83](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/83) npm: Add recommended package.json fields (contributors, dependencies) ([@brettz9](https://github.com/brettz9))

#### Committers: 1
- Brett Zamir ([@brettz9](https://github.com/brettz9))


## v2.0.1 (2018-10-13)

#### :rocket: Enhancement
* [#35](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/35) Add `.npmignore` file ([@Turbo87](https://github.com/Turbo87))

#### Committers: 1
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))


## v2.0.0 (2018-10-13)

#### :boom: Breaking Change
* [#27](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/27) Drop support for Node.js 4 and below ([@Turbo87](https://github.com/Turbo87))

#### :rocket: Enhancement
* [#32](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/32) CI: Add ESLint 5 to the test matrix ([@Turbo87](https://github.com/Turbo87))

#### :house: Internal
* [#34](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/34) CI: Simplify job definition ([@Turbo87](https://github.com/Turbo87))
* [#33](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/33) tests: Use same `espree` version as the `eslint` dependency ([@Turbo87](https://github.com/Turbo87))
* [#31](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/31) Use yarn instead of npm ([@Turbo87](https://github.com/Turbo87))

#### Committers: 1
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))


## v1.2.0 (2018-10-13)

#### :rocket: Enhancement
* [#19](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/19) Allow additional terminating properties to be configured ([@whamondg](https://github.com/whamondg))
* [#21](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/21) Test against eslint version 4 ([@thughes](https://github.com/thughes))

#### :bug: Bug Fix
* [#26](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/26) Fix expect finder utility ([@brokentone](https://github.com/brokentone))

#### :memo: Documentation
* [#24](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/24) Document installation of this package as a devDependency ([@astorije](https://github.com/astorije))
* [#23](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/23) Document terminating-properties rule ([@whamondg](https://github.com/whamondg))

#### :house: Internal
* [#16](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/16) Ignore ESLint updates on greenkeeper ([@Turbo87](https://github.com/Turbo87))

#### Committers: 5
- Gordon Whamond ([@whamondg](https://github.com/whamondg))
- Jérémie Astori ([@astorije](https://github.com/astorije))
- Kenton Jacobsen ([@brokentone](https://github.com/brokentone))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))
- Tom Hughes ([@thughes](https://github.com/thughes))


## v1.1.1

- `terminating-properties`: Fix condition


## v1.1.0

- Add `no-inner-compare` rule
- Add `terminating-properties` rule


## v1.0.0

- Add `missing-assertion` rule

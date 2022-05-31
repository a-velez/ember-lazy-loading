# Instructions

```
mkdir ember-test
cd ember-test
ember new ember-app
ember addon ember-addon
```

## Install embroider in the two projects

In addon project:
```
npm install @embroider/addon-shim 
npm install -D @embroider/addon-dev
```

In ember project:

```
npm install -D @embroider/test-setup @embroider/compat @embroider/webpack
```

## Change in ember-cli-build.js

Replace the line
```
return app.toTree();
```

for
```
const { Webpack } = require('@embroider/webpack');

return require('@embroider/compat').compatBuild(app, Webpack, {
  staticAddonTestSupportTrees: true,
  staticAddonTrees: true,
  staticHelpers: true,
  staticModifiers: true,
  staticComponents: true,
});
```

## Install ember addon

```
cd ember-app
ember install ../ember-addon
```

## Adding components

In ember app:

```
ember g component lazy —with-component-class
```

lazy.hbs content:

```
<button {{on 'click' this.loadComponent}}>
  Load
    {{@product.name}}
</button>

{{#if this.TheComponent}}
    <this.TheComponent />
{{/if}}

{{#if this.error}}
    {{this.error}}
{{/if}}
```

lazy.js content:

```
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class LazyComponent extends Component {
  @tracked TheComponent;
  @tracked error;
  loadComponent = async () => {
    this.error = null;
    try {
      let importedModule = await import('ember-addon/components/demo');
      this.TheComponent = importedModule.default;
    } catch (e) {
            this.error = e;
        }	
    };
}
```

## In our application.hbs

```
<Lazy />
```

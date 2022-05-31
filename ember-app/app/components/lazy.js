import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class LazyComponent extends Component {
  @tracked TheComponent;
  @tracked error;
  loadComponent = async () => {
    this.error = null;

    try {
      console.log(this.args.path);
      let importedModule = await import('ember-addon/components/demo');
      // let importedModule = await import(this.args.path);

      this.TheComponent = importedModule.default;
    } catch (e) {
      this.error = e;
    }
  };
}

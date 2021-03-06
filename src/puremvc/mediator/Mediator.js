// This file is part of LeanES.
//
// LeanES is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// LeanES is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with LeanES.  If not, see <https://www.gnu.org/licenses/>.

import type { MediatorInterface } from '../interfaces/MediatorInterface';

export default (Module) => {

  const {
    Notifier,
    assert,
    initialize, partOf, meta, property, method, nameBy
  } = Module.NS;

  @initialize
  @partOf(Module)
  class Mediator extends Notifier implements MediatorInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property _mediatorName: string = null;

    @property _viewComponent: ?any = null;

    @method getMediatorName(): string {
      return this._mediatorName;
    }

    @method setName(asName: string): void {
      this._mediatorName = asName;
    }

    @method getName(): string {
      return this._mediatorName;
    }

    @method getViewComponent(): ?any {
      return this._viewComponent;
    }

    @method setViewComponent(aoViewComponent: ?any): void {
      this._viewComponent = aoViewComponent;
    }

    @property get view(): ?any {
      return this.getViewComponent();
    }

    @property set view(aoViewComponent: ?any): ?any {
      this.setViewComponent(aoViewComponent);
      return aoViewComponent;
    }

    @method getProxy(asProxyName: string): ProxyInterface {
      return this.facade.retrieveProxy(asProxyName);
    }

    @method addProxy(aoProxy: ProxyInterface): void {
      this.facade.registerProxy(aoProxy);
    }

    @method listNotificationInterests(): Array { return []; }

    @method handleNotification<T = ?any>(aoNotification: NotificationInterface<T>): ?Promise<void> { return; }

    @method onRegister(): void  { return; }

    @method async onRemove(): Promise<void> { return; }

    @method static async restoreObject(acModule: Class<*>, replica: object): Promise<MediatorInterface> {
      if ((replica != null ? replica.class : void 0) === this.name && (replica != null ? replica.type : void 0) === 'instance') {
        const facade = acModule.NS.ApplicationFacade.getInstance(replica.multitonKey);
        const mediator = facade.retrieveMediator(replica.mediatorName);
        return mediator;
      } else {
        return await super.restoreObject(acModule, replica);
      }
    }

    @method static async replicateObject(instance: MediatorInterface): Promise<object> {
      const replica = await super.replicateObject(instance);
      replica.multitonKey = instance._multitonKey;
      replica.mediatorName = instance.getName();
      return replica;
    }

    constructor() {
      super(... arguments);
      this._mediatorName = this.constructor.name;
    }
  }
}

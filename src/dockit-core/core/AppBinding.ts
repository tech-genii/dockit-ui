import {DockitApp} from "./DockitApp";
import {Bindings} from "./Bindings";
import {DockitResource} from "./DockitResource";

export interface AppBinding<B extends DockitResource> extends Bindings<DockitApp,B>{

}
//import * as APICaballero from 'apicaballero'

declare module 'apicaballero' {
  type HTTPMethod = 'list'|'show'|'update'|'create'|'destroy'

  export interface Routes {
    options: { base_path: string }
    [s: string]: { [s: string]: string }
  }

  export default class APICaballero {
    constructor(routes: Routes);
    list(type: string, pathVars: object, data?: object): Promise<string>
    show(type: string, pathVars: object, data?: object): Promise<string>
    update(type: string, pathVars: object, data?: object): Promise<string>
    create(type: string, pathVars: object, data?: object): Promise<string>
    destroy(type: string, pathVars: object, data?: object): Promise<string>
    private call(method: HTTPMethod, type: string, pathVars: object, data: object): Promise<string>
  }

}

//import * as APICaballero from 'apicaballero'

declare module 'apicaballero' {
  type HTTPMethod = 'list'|'show'|'update'|'create'|'destroy'



  namespace APICaballero {
    export interface Routes {
      options: { base_path: string }
      [s: string]: { [s: string]: string }
    }
  }

  class APICaballero {
    constructor(routes: APICaballero.Routes)
    list(type: string, pathVars: object, data?: object): Promise<object>
    show(type: string, pathVars: object, data?: object): Promise<object>
    update(type: string, pathVars: object, data?: object): Promise<object>
    create(type: string, pathVars: object, data?: object): Promise<object>
    destroy(type: string, pathVars: object, data?: object): Promise<object>
    private call(method: HTTPMethod, type: string, pathVars: object, data: object): Promise<object>
  }

  export = APICaballero

}

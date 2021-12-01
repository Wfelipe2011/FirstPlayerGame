// export function domInjector(seletor: string) {
//   return function(target: any, propertyKey: string) {
//     const getter = function() {
//       const elemento = document.querySelector(seletor);
//       return elemento;
//     };

//     Object.defineProperty(target, propertyKey, { get: getter });
//   };
// }
// exemplo tirando da aula do Flavio Almeida, 3 Modulo TypeScript
// como usar um decorator aplicando uma logica numa propriedade
// inspiração Angular

// com cache
export function domInjector(seletor: string) {
    return function(target: any, propertyKey: string) {
      // ele lembra cache da funçao pai
      let elemento: HTMLElement;
      const getter = function() {
        if (!elemento) {
          elemento = document.querySelector(seletor);
        }
        return elemento;
      };
  
      Object.defineProperty(target, propertyKey, { get: getter });
    };
  }
  
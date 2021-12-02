export function inspect() {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const methodOriginal = descriptor.value; 
    descriptor.value = async function(...args: any[]) {
      console.time(`${propertyKey}`);
      console.log(`--- Método ${propertyKey}`);
      console.log(`---- Parâmetros: ${JSON.stringify(args, null, '\t')}`);
      const result = await methodOriginal.apply(this, args);
      console.log(`----- Retorno: ${JSON.stringify(result, null, '\t')}`);
      console.log('--------- Tempo de execução ----------');
      console.timeEnd(`${propertyKey}`)
    };
  };
}

// estrutura de um decorate
// export function inspect() {
//     return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//       const methodOriginal = descriptor.value;
//       descriptor.value = function(...args: any[]) {
//         const result = methodOriginal.apply(this, args);
//       };
//     };
//   }

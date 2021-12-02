"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inspect = void 0;
function inspect() {
    return function (target, propertyKey, descriptor) {
        const methodOriginal = descriptor.value;
        descriptor.value = async function (...args) {
            console.time(`${propertyKey}`);
            console.log(`--- Método ${propertyKey}`);
            console.log(`---- Parâmetros: ${JSON.stringify(args, null, '\t')}`);
            const result = await methodOriginal.apply(this, args);
            console.log(`----- Retorno: ${JSON.stringify(result, null, '\t')}`);
            console.log('--------- Tempo de execução ----------');
            console.timeEnd(`${propertyKey}`);
        };
    };
}
exports.inspect = inspect;
//# sourceMappingURL=inspect.decorate.js.map
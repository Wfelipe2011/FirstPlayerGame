var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function inspect() {
    return function (target, propertyKey, descriptor) {
        const methodOriginal = descriptor.value;
        descriptor.value = function (...args) {
            return __awaiter(this, void 0, void 0, function* () {
                console.time(`${propertyKey}`);
                console.log(`--- Método ${propertyKey}`);
                console.log(`---- Parâmetros: ${JSON.stringify(args, null, '\t')}`);
                const result = yield methodOriginal.apply(this, args);
                console.log(`----- Retorno: ${JSON.stringify(result, null, '\t')}`);
                console.log('--------- Tempo de execução ----------');
                console.timeEnd(`${propertyKey}`);
            });
        };
    };
}

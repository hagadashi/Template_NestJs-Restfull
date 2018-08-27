export function GetOperationId(model: string, operation: string) {
    const _model = toTitleCase(model).replace(/\s/g, ''); // retira todos os espaços
    const _operation = toTitleCase(operation).replace(/\s/g, ''); //retira todos os espaços

    return{
        title: '',
        operationId: `${_model}_${_operation}`,
    };
}

// -> deixar a primeira letra de cada palavra da string em maiúscula
function toTitleCase(str: string): string {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.replace(word[0], word[0].toUpperCase()))
        .join(' ');
}
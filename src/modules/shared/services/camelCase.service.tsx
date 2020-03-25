function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
}

export function camelCaseToHuman(text:string):string {
    var words = text.match(/[A-Za-z][a-z]*/g) || [];
    return words.map(capitalize).join(" ");
}
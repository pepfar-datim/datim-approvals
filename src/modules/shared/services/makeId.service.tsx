export default function makeId(name:string):string{
    return name.replace(/[^A-z0-9]+/g,'_');
}
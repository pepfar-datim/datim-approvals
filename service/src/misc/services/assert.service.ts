export function assert(condition:boolean, message:string):void {
    if (!condition) throw new Error(`ASSERT failed: `+message);
}
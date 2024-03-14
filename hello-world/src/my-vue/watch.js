export default class Watcher {
    vm;
    getter;
    constructor(vm,updateFunc){
        this.vm = vm;
        this.getter = updateFunc

        //执行updateFunc
        this.get();
    }

    get(){
        const vm = this.vm;
        this.getter.call(vm, vm)
    }
}
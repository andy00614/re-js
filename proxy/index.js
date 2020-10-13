{
    // 空代理
    const target = {
        id: 'target'
    }
    const handler = {};
    const proxy = new Proxy(target,handler)
    console.log(proxy.id === proxy.id) // true
    // 目标对象不等于代理对象
    console.log(target === proxy);
}

{
    // 捕获器 trap
    const target = {
        id: 'target'
    }
    const trap = {
        get() {
            return 'handler override'
        }
    }
    const proxy = new Proxy(target,trap)
    console.log(proxy.id);
    const proxyInstance = Object.create(proxy);
    console.log(proxyInstance.id);
}

{
    // 接收的参数
    const target = {
        foo: 'bar'
    }
    const trap = {
        get(trapTarget,property,receiver) {
            console.log(trapTarget === target);
            console.log(property);
            console.log(receiver === proxy); // 这里为啥不会报错呢，proxy是在下面声明的啊？
        }
    }
    const proxy = new Proxy(target,trap)
    proxy.foo
}

{
    // Reflect
    console.log('-------------------Reflect-------------------');
    const target = {
        'foo': [1,2,3]
    }
    const handler = {
        get(target,property,recivier) {
            let decorator = ''
            if(property === 'foo') {
                decorator = '!!!'
            }
            return Reflect.get(...arguments) + decorator
        }
    }
    const proxy = new Proxy(target,handler)
    console.log(proxy.foo === target.foo);
    console.log(proxy.foo);
}

{
    // 捕获器不变式
    // 当对象的属性不可写不可变得时候，捕获器也不能默认改变其行为
    const target = {}
    Object.defineProperty(target,'foo',{
        configurable: false,
        writable:false,
        value: 'bar'
    })
    const handler = {
        get() {
            return 'qux'
        }
    }
    const proxy = new Proxy(target,handler)
    console.log(proxy.foo) // 会报错
}
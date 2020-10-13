代理：
局限性：代理是一种语言能力，转义程序很多都不能对其进行转义，所以代理和反射必须得百分比支持他们的平台上有用，因此也要准备其后备代码，容易造成冗余(但 vue3 就是这么用的吧)
作用：给目标对象一个替身，可以操作替身来改变目标对象，也可以直接被操作，绕过替身赋予的一些行为
代理和对象的关系: 完全是同一个值的引用，因此无论在代理对象还是目标对象上添加属性都一样的。但是(目标对象 !== 代理对象)
注意： Proxy 没有 prototype，所以 instance Proxy 是无效的

## 捕获器(trap)

### what

捕获器是操作系统的概念，代表程序流中的同步中断，暂停当前程序，执行一段子进程，之后再返回原始程序流。
这里是不是可以做权限用？

### get

####  如何触发？

proxy[property]、proxy.property 或 Object.create(proxy)[property]等操作都
会触发基本的 get()操作以获取属性

```
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
    console.log(proxyInstance.id); // 也会触发
```
### 捕获器接收到的参数
目标对象、查询的属性、代理对象

## Reflect
### what
捕获器的反射，每个捕获方法都包含一个Reflect,每个Reflect都会返回捕获器的默认行为




stash：9.1.5 可撤销代理
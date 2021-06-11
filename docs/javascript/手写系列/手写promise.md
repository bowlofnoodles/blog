# 手写promise

要了解一个 `promise` 怎么实现，我们首先要知道 `promise` 的实现规范，`es6 promise` 的实现规范遵循[Promise/A+规范](https://promisesaplus.com/)

> 自己写了个promise-polyfill，发了个npm包，[es-promise-polyfill](https://github.com/bowlofnoodles/es6-promise-polyfill)
## 手动实现Promise

> 注释中加了一些对于规范的体现说明

``` javascript

// promise三个状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(executor) {
  this.status = PENDING;
  this.value = void 0;
  this.reason = void 0;
  this.onResolvedCallback = [];
  this.onRejectedCallback = [];
  const ctx = this;

  function resolve(value) {
    // then的回调是微任务
    queueMicrotask(function() {
      // 当为PENDING时才做处理，如果已经resolved或者rejected则不回退 2.1
      if (ctx.status === PENDING) {
        ctx.status = FULFILLED;
        ctx.value = value;
        for (let i = 0; i < ctx.onResolvedCallback.length; i++) {
          ctx.onResolvedCallback[i](ctx.value);
        }
      }
    });
  }

  function reject(reason) {
    // then的回调是微任务
    queueMicrotask(function() {
      // 当为PENDING时才做处理，如果已经resolved或者rejected则不回退 2.1
      if (ctx.status === PENDING) {
        ctx.status = REJECTED;
        ctx.reason = reason;
        for (let i = 0; i < ctx.onRejectedCallback.length; i++) {
          ctx.onRejectedCallback[i](ctx.reason);
        }
      }
    });
  }

  try {
    executor(resolve, reject);
  } catch (err) {
    return reject(err);
  }
}

function resolvePromise(promise, x, resolve, reject) {
  // 循环引用 2.3.1
  if (promise === x) return reject(new TypeError('Cycle Chain Detected in promise'));
  // 2.3.2 如果x为一个promise，则返回的promise与x保持状态同步
  if (x instanceof MyPromise) {
    if (x.status === PENDING) {
      return x.then(function(v) {
        return resolvePromise(promise, v, resolve, reject);
      }, reject);
    } else {
      return x.then(resolve, reject);
    }
  }
  // 用于判定是否调用过
  let thenOrThrowCalled = false;
  // 2.3.3 是对象或者函数
  if ((x !== null && typeof x === 'object') || typeof x === 'function') {
    try {
      // 2.3.3.1
      let then = x.then;
      // 2.3.3.3 then是一个函数，尝试promise adopt
      if (typeof then === 'function') {
        // 2.3.3.3.1 && 2.3.3.3.2
        then.call(
          x,
          function rs(y) {
            // 2.3.3.3.3 防止多次调用
            if (thenOrThrowCalled) return;
            thenOrThrowCalled = true;
            return resolvePromise(promise, y, resolve, reject);
          },
          function rj(e) {
            // 2.3.3.3.3 防止多次调用
            if (thenOrThrowCalled) return;
            thenOrThrowCalled = true;
            return reject(e);
          }
        );
      } else {
        // 2.3.3.4 then不是一个函数，直接resolve(x)
        return resolve(x);
      }
      // 2.3.3.2
    } catch (err) {
      // 2.3.3.3.4.1
      if (thenOrThrowCalled) return;
      thenOrThrowCalled = true;
      // 2.3.3.3.4.2
      return reject(err);
    }
  } else {
    // 2.3.4 不是对象也不是函数，直接resolve(x)
    return resolve(x);
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const ctx = this;
  // 可选参数
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  // 可选参数
  onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};

  if (ctx.status === PENDING) {
    // 链式调用 返回新的promise
    let promise2 = new MyPromise(function(resolve, reject) {
      // callback是一个数组 2.2.6/2.2.6.1
      ctx.onResolvedCallback.push(function(value) {
        try {
          let x = onFulfilled(value);
          return resolvePromise(promise2, x, resolve, reject);
        } catch (err) {
          return reject(err);
        }
      });
      // callback是一个数组 2.2.6/2.2.6.2
      ctx.onRejectedCallback.push(function(reason) {
        try {
          let x = onRejected(reason);
          return resolvePromise(promise2, x, resolve, reject);
        } catch (err) {
          return reject(err);
        }
      });
    });
    return promise2;
  }

  if (ctx.status === FULFILLED) {
    // 链式调用 返回新的promise 2.2.7
    let promise2 = new MyPromise(function(resolve, reject) {
      queueMicrotask(function() {
        try {
          let x = onFulfilled(ctx.value);
          return resolvePromise(promise2, x, resolve, reject);
        } catch (err) {
          return reject(err);
        }
      });
    });
    return promise2;
  }

  if (ctx.status === REJECTED) {
    // 链式调用 返回新的promise 2.2.7
    let promise2 = new MyPromise(function(resolve, reject) {
      queueMicrotask(function() {
        try {
          let x = onRejected(ctx.reason);
          return resolvePromise(promise2, x, resolve, reject);
        } catch (err) {
          return reject(err);
        }
      });
    });
    return promise2;
  }
};

// module.exports = MyPromise;

// MyPromise.defer = MyPromise.deferred = function () {
//   let dfd = {};
//   dfd.promise = new MyPromise((resolve, reject) => {
//     dfd.resolve = resolve;
//     dfd.reject = reject;
//   });
//   return dfd;
// };


```
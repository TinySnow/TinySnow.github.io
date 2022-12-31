# Java Threads

## 说明

以下知识点均基于 BiliBili 的 up 主 ==遇见狂神说== 的教学视频。

其个人主页： https://space.bilibili.com/95256449

## 线程的三种编写方式

1. 继承 Thread 类；（不推荐
2. 实现 Runnable 接口，然后开线程，把实现后的接口丢进去；（推荐

- 示例：

```java
new Thread(implementInterfaceName, "name").start;
```

3. 实现 Callable 接口，实现较为复杂，暂作为了解；

## 静态代理模式

## 线程的其它知识

### 线程的停止

1. 执行足够次数；
2. 定义一个线程体使用的标识，在线程体中使用这个标识，当外界有方法使其标识为 false 的时候，线程即停止运行；

### 线程休眠

==每一个对象都有一个锁， sleep 不会释放锁。==

```java
Thread.sleep([time]);
```

### 线程礼让

```java
Thread.yield();
```

礼让即正在执行的线程将资源让出来，与其它线程再次一起竞争。

但是礼让不一定成功，主要看 CPU 的调度。

### 线程强制执行

```java
threadName.join();
```

可以在其他线程执行途中使其强制挂起，执行完此线程，然后原线程才能继续执行。

想象为插队。

### 设置线程优先级

线程的优先级用数字表示,范围从1~10。

```java
// Thread.MIN_PRIORITY = 1
// Thread.MAX_PRIORITY = 10
// Thread.NORM_PRIORITY = 5
theadName.setPriority([int, or constant])
```

==但是优先级再高也有可能不先执行，全靠 CPU 调度。只是说先执行的概率会大一点。==所以就有可能引起性能倒置的问题（即一个优先级高的线程等待一个优先级低的线程释放锁）。

### 守护线程( Daemon Thread )

线程分为用户线程和守护线程。

虚拟机必须保证用户线程执行完毕，但是不用等待守护线程执行完毕。如后台记录操作日志，监控内存，垃圾回收 (Garbage Collection) 等等都是守护线程。

```java
threadName.setDaemon(true);
```

## 线程同步

即多个线程操作同一个资源。同步关键词 ==synchronized== 。线程同步是并发问题的一种解决方法。

### 同步方法及同步块

synchronized 默认锁的是 this (即产生这个对象的类本身), 可以加在方法上，但是这个方法需要进行增删改查。这样即构成同步方法。

synchronized 还可以锁住任何一个对象，只要加在括号里面就可以。这个对象必须涉及到多线程里的增删改查，然后把操作修改的业务代码丢进大括号里，即构成同步块。

```java
//同步方法
private synchronized void aMethod(String params...){ // do something }
  
synchronized ( [Object] ) { // do something to update this Object }
```

### CopyOnWriteArrayList

是一个线程安全的 ArrayList ，在 java.util.concurrent 包下，而经常用的 ArrayList 是不安全的，位于 java.util.List 包下。

### 死锁

两个线程持有对方线程需要的资源，但又不愿意释放而导致的程序卡死的情况，称为死锁。

### Lock 锁

java.util.concurrent.locks.Lock接口是控制多个线程对共享资源进行访问的工具。锁提供了对共享资源的独占访问,每次只能有一个线程对Lock对象加锁，线程开始访问共享资源之前应先获得Lock对象。

ReentrantLock 类实现了Lock,它拥有与 synchronized相同的并发性和内存语义，在实现线程安全的控制中，比较常用的是 Reentrantlock,可以显式加锁、释放锁。

例子：

```java
class Name implements Runnable{
  private final ReentrantLock lock = new ReentrantLock();

 public void aMethod(){
   try{
     lock.lock();                                                       //important
     // do something
   } finally {
     lock.unlock();                                                     //important
   }
 }
}

public class AnotherName{
  public static void main(String[] args){
    Name name = new name;
    new Thread(name).start;
  }
}

```

## 生产者消费者模式

简而言之就是，线程间通信的问题。如何让两个线程间，一个线程通知另一个线程该做什么事情。拿这个例子的字面意思来说，就是消费者提醒生产者生产，生产者提醒消费者去消费的问题。

一般有两种方法，一是管程法，即设立缓冲区；二是信号灯法，即设立标志位(如一个bool)。

### 管程法

- 此处只贴出示例代码，因为很简单，一看就能看懂

```java
package com.tinysnow;

/**
 * @author TinySnow
 */
public class ThreadPoolTest {
    public static void main(String[] args) {
        SynContainer container = new SynContainer();

        new Producer(container).start();
        new Consumer(container).start();
    }
}

/**
 * 此处为了方便直接继承 Thread 类进行多线程并发，将重点落在业务逻辑上
 * 此处为生产者方法
 */
class Producer extends Thread {
    SynContainer container;

    public Producer(SynContainer container) {
        this.container = container;
    }

    /**
     * 生产
     */
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            System.out.println("生产了" + i + "只鸡");
            container.push(new Chicken(i));

        }
    }
}

/**
 * 消费者
 */
class Consumer extends Thread {
    SynContainer container;

    public Consumer(SynContainer container) {
        this.container = container;
    }

    /**
     * 消费
     */
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            System.out.println("消费了-->" + container.pop().id + "只鸡");
        }
    }
}

/**
 * 产品
 */
class Chicken {
    /**
     * 产品编号
      */
    int id;

    public Chicken(int id) {
        this.id = id;
    }
}

/**
 * 缓存区
 */
class SynContainer {
    /**
     * 容器大小
     */
    Chicken[] chickens = new Chicken[10];
    int count = 0;

    /**
     * 放入产品方法
     * @param chicken 将产品放入缓冲区中，也即管程中
     */
    public synchronized void push(Chicken chicken) {
        if (count == chickens.length) {
            //通知消费者消费，生产等待
            try {
                this.wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        //丢入产品
        System.out.println("正在生产第" + chicken.id + "只鸡");
        chickens[count] = chicken;
        count++;
        //通知消费者消费
        notifyAll();
    }

    /**
     * 消费方法
     * @return 返回被消费的产品
     */
    public synchronized Chicken pop() {
        //判断可否消费
        if (count == 0) {
            //等待生产者生产，消费者等待
            try {
                this.wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        count--;
        Chicken chicken = chickens[count];
        System.out.println("正在消费第" + chicken.id + "只鸡");
        chickens[count] = null;
        notifyAll();
        return chicken;
    }
}

```

### 信号灯法

- 此处只贴出示例代码，因为很简单，一看就能看懂

```java
package com.tinysnow;

/**
 * @author TinySnow
 */
public class ThreadPoolTest {

    public static void main(String[] args) {
        TV tv = new TV();
        new Producer2(tv).start();
        new Consumer2(tv).start();
    }
}

/**
 * 生产者，也即演员
 */
class Producer2 extends Thread {
    TV tv;

    public Producer2(TV tv) {
        this.tv = tv;
    }

    @Override
    public void run() {
        for (int i = 0; i < 20; i++) {
            if (i % 2 == 0) {
                tv.play("真中あお");
            } else {
                tv.play("Tessa");
            }
        }
    }
}


/**
 * 消费者，也即观众
 */
class Consumer2 extends Thread {
    TV tv;

    public Consumer2(TV tv) {
        this.tv = tv;
    }

    @Override
    public void run() {
        for (int i = 0; i < 20; i++) {
            tv.watch();
        }
    }
}


/**
 * 产品，也即节目
 */
class TV {
    /**
     * 演员表演，观众等待  T
     * 观众观看，演员等待  F
     */
    boolean flag = true;
    /**
     * 表演的节目
     */
    String voice;

    /**
     * 表演
     * @param voice 表演的节目
     */
    public synchronized void play(String voice) {
        if (!flag) {
            try {
                this.wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println("演员表演了" + voice);
        //通知观众观看
        //通知唤醒
        this.notifyAll();
        this.voice = voice;
        this.flag = !this.flag;
    }

    /**
     * 观看，也即消费
     */
    public synchronized void watch() {
        if (flag) {
            try {
                this.wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println("观众观看了" + voice);
        //通知演员表演
        this.notifyAll();
        this.flag = !this.flag;
    }
}
```

## 线程池

因为线程创建和销毁的开销较大，可以建立一个线程池，需要时从里面拿取，线程任务结束后，又放回线程池里面进行循环利用从而减少开销。

示例代码：

```java
package com.tinysnow;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * @author TinySnow
 */
public class ThreadPoolTest {

    public static void main(String[] args) {
        // 1.建立服务，建立线程池
        // newFixedThreadPool 参数为：线程池大小
        ExecutorService service = Executors.newFixedThreadPool(10);
        // 执行
        service.execute(new MyThread());
        service.execute(new MyThread());
        service.execute(new MyThread());
        service.execute(new MyThread());
        service.execute(new MyThread());
        // 2.关闭链接
        service.shutdown();
    }
}
class MyThread implements Runnable{
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println(Thread.currentThread().getName()+i);
        }
    }
}
```

注意：

在 Alibaba Java Coding Guide Line 中禁止使用 Exeutor 创建线程，需要手动创建线程。目前不清楚其原理，等日后再研究吧。

## 后置 TODO


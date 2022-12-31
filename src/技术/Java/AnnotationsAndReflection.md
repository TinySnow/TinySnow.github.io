# Annotations and Reflection

## Annotations

Annotations are used to sign some methods or classes and so on, they are not only can mention the programmer, but also can work on your code if you used correct form.

### Internal Annotations from JDK

```java
@Override           // It's used to sign the methods form super class, and it can restrict(限制) that                        method is changed in a wrong way.
@Deprecated         // It's used to remind coder that this method has some bad places, or is nor                            recommended. It's also used to remind coder to use another better methods to                          realize their purpose.
@SuppressWarnings   // It's used to eliminate(消除) warnings. It accepts a param, the details can be                          looked up in the documentation.
```

---

### Meta-annotations(元注解)

Meta-annotations are a kind of the basic annotations, they are used to express the usage(用途) of a complex user-defined annotation, such as where can use, and when they lose their effects.

```java
@Target             // Describe the user-defined annotation where it can use, such as method, class,                        field, constructor and so on. It accept a param, a String or an Array, which                          express the effect range. At most of the time, it's usually                                          ElementType.TYPE, ElementType.FIELD, ElementType.METHOD,                                              ElementType.PARAMETER, ElementType.CONSTRUCTOR, ElementType.LOCAL_VARIABLE,                          ElementType.ANNOTATION_TYPE, ElementType.PACKGE.You can search the JDK source                          code or document for more details.
@Retention          // Describe the user-defined annotation when it loses its effect. It accept a                            param, which should be chosen in RetentionPolicy.SOURCE/CLASS/RUNTIME. The                            details can be looked up in the documentation.
                    // RetentionPolicy.SOUCE:
                    // When code is compiled, and target classes have been generated(生成), the effect                        will disappear.
                    // RetentionPolicy.CLASS:
                    // The annotation will still work on target classes. However, when the program                          run, it won't work.
                    // RetentionPolicy.RUNTIME:
                    // The annotation will work at all time(总是).
@Document           // Express that the annotation should be included in the javadoc.
@Inherited          // It aims that the subclasses can inherite the super class. 
```

---

### How to customize a annotation?

```java
/**
 * explanation
 */
@Target(...)
@Retention(...)
@Document(...)
@Inherited(..)
(public) @interface [annotation name] {
  // params list pattern:
  // default rule: if the params have only one, its name probably is 'value'.
  [type] [param name] + () + default [default value];
}
```

---

## Reflection

Java reflection allows program get any class's information by Reflection API when the program is running. And it can operate any object's inner attributes and methods directly. It's the key mechanism(机制) that let Java be a dynamic programming language.

![反射概述](https://git.poker/TinySnow/GithubImageHosting/blob/main/Technology/JavaRelated/反射概述.6js09ipppke8.webp?raw=true)

---

### Where can it reply?

![反射功能](https://git.poker/TinySnow/GithubImageHosting/blob/main/Technology/JavaRelated/反射功能.6w4diihzn1xc.webp?raw=true)

---

### Advantages and Shortcomings

- Advantages

Reflection can create Object and compile dynamically, it provide the flexibility(灵活性) of creating a project.

- Shortcomings

Using Reflection too much will extremely reduce performance.

---

### Main APIs

```java
java.lang.Class
+
java.lang.reflect.Method ...
```

---

### How get the class and new a object?

#### Premise(前提) Class:

```java
package com.tinysnow.Java.MultipurposeClasses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author TinySnow
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private int id;
    private String username;
    private int age;
    private String email;
    private String password;
    private String[] hobbies;
    private String[] relatives;
}
```

---

#### Get class example:

```java
package com.tinysnow.Java.AnnotationsAndReflection;

import java.lang.reflect.Field;

/**
 * @author TinySnow
 */
public class GetReflectedClass {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchFieldException {
      
        Class aClass = Class.forName("com.tinysnow.Java.MultipurposeClasses.User");
      
        Field username = aClass.getDeclaredField("username");
      
        System.out.println(username);
      
    }
}

```

- Result:

![实验截图之一](https://git.poker/TinySnow/GithubImageHosting/blob/main/Technology/JavaRelated/实验截图之一.1g07lbwlmcww.webp?raw=true)


The other ways to get class can be looked up in the first and second photos at the end of this passage, "Appendix".

---

#### Invoke the method through reflection:

---


![反射过程](https://git.poker/TinySnow/GithubImageHosting/blob/main/Technology/JavaRelated/反射过程.68ldyw1e82gw.webp?raw=true)

#### Some thing about setAccessible()

![反射方法](https://git.poker/TinySnow/GithubImageHosting/blob/main/Technology/JavaRelated/反射方法.56gssk43kcn4.webp?raw=true)

if the setAccessible() method is on, the efficiency(效率) will be very low, here is a result that compared with turning off setAccessible() and common way:

![时间比对](https://git.poker/TinySnow/GithubImageHosting/blob/main/Technology/JavaRelated/时间比对.35a01z64mhhc.webp?raw=true)

common way: new an object.

---

#### Get object example:

```java
package com.tinysnow.Java.AnnotationsAndReflection;

/**
 * @author TinySnow
 */
public class GetReflectedObject {
    public static void main(String[] args) {
        try {
            Class aClass = Class.forName("com.tinysnow.Java.MultipurposeClasses.User");
            aClass.newInstance();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InstantiationException e) {
            e.printStackTrace();
        }
    }
}

```

---

#### ==Attention Please:==

The object that comes from the "newInstance" method is a full null object, that is all attributes in the object will be evaluated(赋值) with null, 0, "" and so on.

If you wanna new an object with some attributes or params, please invoke(调用) "getConstructor" or "getDeclaredConstructors" and then use the constructor to new an object you want.

---

#### An example for the above explanation:

```java
package com.tinysnow.Java.AnnotationsAndReflection;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

/**
 * @author TinySnow
 */
public class GetReflectedObject {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException {
      
        Class aClass = Class.forName("com.tinysnow.Java.MultipurposeClasses.User");
      
        Constructor constructor = aClass.getDeclaredConstructor(int.class, String.class,
                int.class, String.class, String.class, String[].class, String[].class);
      
        Object test = constructor.newInstance(1, "真中あお", 114, "ao@514.com", "1919810",
                new String[]{"23", "编曲"}, new String[]{"someone"});
      
        System.out.println(test.toString());
      
    }
}
```

- Result:

![实验截图之二](https://git.poker/TinySnow/GithubImageHosting/blob/main/Technology/JavaRelated/实验截图之二.5lpu2ahf11c0.webp?raw=true)



---

#### About the generic(泛型):

![反射操作泛型](https://git.poker/TinySnow/GithubImageHosting/blob/main/Technology/JavaRelated/反射操作泛型.jj1rwydkikg.webp?raw=true)

---

#### Some place needed memory:

- getXxxxx()                : Can only read the public attributes, methods, constructors and so on.
- getDeclardXxxxx()    : Can read all things although someone is private.

---

### All the types that own a class

![实验截图之三](https://git.poker/TinySnow/GithubImageHosting/blob/main/Technology/JavaRelated/实验截图之三.2b322d9hyneo.webp?raw=true)

By the way, the class of array is complicated, so here gives an example:

![实验截图之四](https://git.poker/TinySnow/GithubImageHosting/blob/main/Technology/JavaRelated/实验截图之四.6h2j09i04veo.webp?raw=true)

---

## Manipulate(操作) annotations through reflection

The approach is almost the same as operating generic. So here only gives an example. If you wanna manipulate generic, please change the method name and params.

```java
package com.tinysnow.Java.AnnotationsAndReflection;

import lombok.Data;

import java.lang.annotation.*;
import java.util.Arrays;

/**
 * @author TinySnow
 */
@Data
@TestAnnotation("baka")
public class OperateAnnotationsThroughReflection {
  
    public static void main(String[] args) {
        OperateAnnotationsThroughReflection reflection =
                new OperateAnnotationsThroughReflection();
      
        Class aClass = reflection.getClass();
      
        Annotation[] annotations = aClass.getAnnotations();
      
        System.out.println(Arrays.toString(annotations));

        // The way to get the value in the annotation
        String value = aClass.getAnnotation(TestAnnotation.class).value();
        System.out.println(value);
    }
  
}

/**
 * @author TinySnow
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@interface TestAnnotation{
    String value() default "Tessa baka";
}

```

---

## Appendix

![获取-Class](https://git.poker/TinySnow/GithubImageHosting/blob/main/Technology/JavaRelated/获取-Class.5uvzgfu42zuo.webp?raw=true)

![获取类实例代码](https://git.poker/TinySnow/GithubImageHosting/blob/main/Technology/JavaRelated/获取类实例代码.4ltaqczxzngg.webp?raw=true)


![类的加载过程](https://git.poker/TinySnow/GithubImageHosting/blob/main/Technology/JavaRelated/类的加载过程.22vgv3nfe5s0.webp?raw=true)


![类加载与-ClassLoader](https://git.poker/TinySnow/GithubImageHosting/blob/main/Technology/JavaRelated/类加载与-ClassLoader.218l4pkqf19c.webp?raw=true)


![类初始化的时刻](https://git.poker/TinySnow/GithubImageHosting/blob/main/Technology/JavaRelated/类初始化的时刻.59s1fhb8mpds.webp?raw=true)


![类加载器的作用](https://git.poker/TinySnow/GithubImageHosting/blob/main/Technology/JavaRelated/类加载器的作用.2id62gftxh6o.webp?raw=true)



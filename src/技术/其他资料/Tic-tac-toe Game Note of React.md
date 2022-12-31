# Tic-tac-toe Game Note of React

> The translation of title in Chinese: 井字棋游戏——关于 React 的笔记

## Note

### About the constructor

> Original text:
> In [JavaScript classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), you need to always call `super` when defining the constructor of a subclass. All React component classes that have a `constructor` should start with a `super(props)` call.

### About communication

- To collect data from multiple children, or to have two child  components communicate with each other, you need to declare the shared  state in their parent component instead. The parent component can pass  the state back down to the children by using props; this keeps the child components in sync with each other and with the parent component.

### About the  immutability

> Original text:
> Detecting changes in mutable objects is difficult because they are  modified directly. This detection requires the mutable object to be  compared to previous copies of itself and the entire object tree to be  traversed.
> The main benefit of immutability is that it helps you build pure components in React. Immutable data can easily determine if changes have been made, which helps to determine when a component requires re-rendering.

- We must keep some history data about user during coding to avoid that user can not back to previous step. That is to say, we must find some ways to save this kind of extra data. So the immutability is extremely important and significant.

### About the key of dynamic lists

> Original text:
> **It’s strongly recommended that you assign proper keys whenever you build dynamic lists.** If you don’t have an appropriate key, you may want to consider restructuring your data so that you do.
> If no key is specified, React will present a warning and use the  array index as a key by default. Using the array index as a key is  problematic when trying to re-order a list’s items or inserting/removing list items. Explicitly passing `key={i}` silences the warning but has the same problems as array indices and is not recommended in most cases.
> Keys do not need to be globally unique; they only need to be unique between components and their siblings


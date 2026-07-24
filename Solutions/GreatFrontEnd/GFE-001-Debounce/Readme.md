# GFE-001: Implement Debounce Function

## Description
Implement a `debounce` function in TypeScript that delays invoking `func` until after `wait` milliseconds have elapsed since the last time the debounced function was invoked. Highly essential for optimizing search input handlers and scroll listeners.

## Complexity
- **Time Complexity:** O(1) per call
- **Space Complexity:** O(1) auxiliary space (single timer handle closure)

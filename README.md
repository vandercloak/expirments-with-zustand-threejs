This function joins the create and immer function calls shown in this example into one function. Its a small adjustment, but one that just feels cleaner. Would love to hear any feedback! Search createImmerStore to see it in action.

Before:

```jsx
import create from "zustand"
import { immer } from "zustand/middleware/immer"

const useStore = create(immer((set) => ({
  bees: 0,
  addBees: (by) => set((state) => { state.bees += by }),
})))
```

After:

```jsx
import create from "zustand"
import { createImmerStore } from "zustand/middleware/immer"

const useStore = createImmerStore((set) => ({
  bees: 0,
  addBees: (by) => set((state) => { state.bees += by }),
}))
```
import { createStore } from "@stencil/store";

const { state, onChange  } = createStore({
  session: null
});

onChange('session', value => {
  state.session = value;
});
export default state;
const addAnotherMatch = document.getElementsByClassName("lws-addMatch");
const matchContainer = document.getElementsByClassName("all-matches");
const resetButton = document.getElementsByClassName("lws-reset");

const incrementField = document.getElementById("increment-field-0");
const decrementField = document.getElementById("decrement-field-0");
const totalResult = document.getElementById("total-result-0");

// INITIAL STATE
const initialState = {
  counters: [
    {
      id: 0,
      value: 0,
    },
  ],
};

// ACTION IDENTIFIERS
const ADDCOUNTER = "addCounter";
const INCREMENT = "increment";
const DECREMENT = "decrement";
const RESET = "restCounter";

// ACTION INCREMENT
const increment = ({ id, value }) => {
  return {
    type: INCREMENT,
    payload: {
      id: id,
      value: value,
    },
  };
};

// ACTION DECREMENT
const decrement = ({ id, value }) => {
  return {
    type: DECREMENT,
    payload: {
      id: id,
      value: value,
    },
  };
};

// ACTION ADD COUNTER
const addCounterAction = () => {
  return {
    type: ADDCOUNTER,
    payload: {
      id: store.getState().counters.length,
      value: 0,
    },
  };
};

// ACTION RESET
const restCounterAction = () => {
  return {
    type: RESET,
  };
};

// COUNTER REDUCER
const CounterReducer = (state = initialState, action) => {
  if (action.type === INCREMENT) {
    return {
      ...state,
      counters: state.counters.map((p) => {
        if (p.id === action.payload.id) {
          return {
            ...p,
            value: p.value + action.payload.value,
          };
        } else {
          return p;
        }
      }),
    };
  }
  if (action.type === DECREMENT) {
    return {
      ...state,
      counters: state.counters.map((p) => {
        if (p.id === action.payload.id) {
          if (p.value >= action.payload.value) {
            return {
              ...p,
              value: p.value - action.payload.value,
            };
          } else {
            return p;
          }
        } else {
          return p;
        }
      }),
    };
  }
  if (action.type === ADDCOUNTER) {
    return {
      ...state,
      counters: [...state.counters, action.payload],
    };
  }
  if (action.type === RESET) {
    return {
      ...state,
      counters: state.counters.map((p) => {
        return {
          ...p,
          value: 0,
        };
      }),
    };
  } else {
    return state;
  }
};

// CREATE STORE
const store = Redux.createStore(CounterReducer);

// RENDER FUNCTION
const render = () => {
  const state = store.getState();
  state.counters.map((p) => {
    document.getElementById(`total-result-${p.id}`).innerText =
      p.value.toString();
  });
};

// UPDATE UI ON STATE CHANGE
render();

// SUBSCRIBE TO STORE
store.subscribe(render);

// ADD NEW MATCH
const newCounter = () => {
  const newCounterDiv = document.createElement("div");
  store.getState().counters.map((p) => {
    newCounterDiv.innerHTML = `
    <div class="match">
      <div class="wrapper">
        <button class="lws-delete">
          <img src="./image/delete.svg" alt="" />
        </button>
        <h3 class="lws-matchName">Match ${p.id + 2}</h3>
      </div>
      <div class="inc-dec">
        <form class="incrementForm">
          <h4>Increment</h4>
          <input 
          type="number" 
          name="increment" 
          class="lws-increment" 
          id="increment-field-${ p.id + 1 }" 
          onkeypress={incrementFunc(event,${p.id + 1})} />
        </form>
        <form class="decrementForm">
          <h4>Decrement</h4>
          <input 
          type="number" 
          name="decrement" 
          id="decrement-field-${ p.id + 1 }" 
          class="lws-decrement" 
          onkeypress={decrementFunc(event,${p.id + 1})} />
        </form>
      </div>
      <div class="numbers">
        <h2 id="total-result-${p.id + 1}" class="lws-singleResult">120</h2>
      </div>
    </div>`;
  });
  matchContainer[0].appendChild(newCounterDiv);
};

// INCREMENT FUNCTION
const incrementFunc = (event, id) => {
  const IncrementField = document.getElementById(`increment-field-${id}`);
  if (event.key === "Enter") {
    event.preventDefault();
    const value = IncrementField.value;
    store.dispatch(increment({ id: id, value: Number(value) }));
    IncrementField.value = "";
  }
};

// DECREMENT FUNCTION
const decrementFunc = (event, id) => {
  const DecrementField = document.getElementById(`decrement-field-${id}`);
  if (event.key === "Enter") {
    event.preventDefault();
    const value = DecrementField.value;
    store.dispatch(decrement({ id: id, value: Number(value) }));
    DecrementField.value = "";
  }
};

// ADD MORE MATCH
addAnotherMatch[0].addEventListener("click", () => {
  newCounter();
  store.dispatch(addCounterAction());
});

// RESET FUNCTION
resetButton[0].addEventListener("click", () => {
  store.dispatch(restCounterAction());
});

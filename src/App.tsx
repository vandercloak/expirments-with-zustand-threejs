import { createImmerStore } from "./create-immer-store";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

type Bear = {
  name: string;
  age: number;
  color: "brown" | "black" | "white";
  hibernating: "💤" | "👀";
};

type Cave = {
  bears: Array<Bear>;
  getBearIdx: (name: string) => number;
  addBears: (bear: Bear) => void;
  removeBear: (idx: number) => void;
};

const useStore = createImmerStore<Cave>((set, get, api) => ({
  bears: [],
  getBearIdx: (name) => {
    return get().bears.findIndex((b) => b.name === name);
  },
  addBears: (bear: Bear) => {
    return set((state) => {
      state.bears.push(bear);
    });
  },
  removeBear: (idx: number) => {
    return set((state) => {
      if (idx === -1) {
        return;
      }
      state.bears.splice(idx, 1);
    });
  },
}));

const bears: Array<Bear> = [
  {
    name: "Gilbert",
    age: 12,
    color: "brown",
    hibernating: "👀",
  },
];

function App() {
  const caveStore = useStore();
  return (
    <div>
      <div>
        🐻{" "}
        {/* {bears.map((bear) => (
          <div>{bear.name}</div>
        ))} */}
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Color</th>
            <th>Hibernating</th>
          </tr>
        </thead>
        <tbody>
          {bears.map((bear, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{bear.name}</td>
              <td>{bear.age}</td>
              <td>{bear.color}</td>
              <td>{bear.hibernating}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;

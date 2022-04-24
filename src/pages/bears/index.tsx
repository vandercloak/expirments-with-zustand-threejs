import { createImmerStore } from "../../store/create-immer-store";
import BearTable from "./components/table";
import BearCanvas from "./components/canvas";
import { Container, Row, Col } from "react-bootstrap";

export type BearType = "brown" | "white" | "koala";
export const bearTypeArr: BearType[] = ["brown", "white", "koala"];
export type Bear = {
  name: string;
  type: BearType;
  id: number;
};

interface BearStore {
  bears: Array<Bear>;
  getBearIndex: (id: number) => number;
  getBear: (id: number) => Bear | undefined;
  addBear: (bear: Bear) => void;
  deleteBear: (idx: number) => void;
}

export const useBears = createImmerStore<BearStore>((set, get, api) => ({
  bears: [],
  getBearIndex: (id) => {
    return get().bears.findIndex((bear) => bear.id === id);
  },
  getBear: (id) => {
    return get().bears.find((bear) => bear.id === id);
  },
  addBear: (bear: Bear) => {
    return set((state) => {
      state.bears.push(bear);
    });
  },
  deleteBear: (id: number) => {
    return set((state) => {
      const index = api.getState().getBearIndex(id);
      if (index === -1) {
        // No bear to delete.
        return;
      }
      state.bears.splice(index, 1);
    });
  },
}));

function BearContainer() {
  return (
    <Row className="mt-5 mx-1">
      <Col xs={8}>
        <BearTable />
      </Col>
      <Col xs={4}>
        <BearCanvas />
      </Col>
    </Row>
  );
}

export default BearContainer;

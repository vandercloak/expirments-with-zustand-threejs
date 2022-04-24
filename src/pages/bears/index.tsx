import { createImmerStore } from "../../store/create-immer-store";
import BearTable from "./components/bear-table";
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
  getBear: (id: number) => { bear: Bear; index: number } | undefined;
  addBear: (bear: Bear) => void;
  removeBear: (idx: number) => void;
}

export const useBears = createImmerStore<BearStore>((set, get, api) => ({
  bears: [],
  getBear: (id) => {
    const bears = get().bears;
    const bearIdx = bears.findIndex((bear) => bear.id === id);
    if (bearIdx === -1) {
      return;
    }
    return { index: bearIdx, bear: bears[bearIdx] };
  },
  addBear: (bear: Bear) => {
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

function BearContainer() {
  return (
    <Container>
      <Row>
        <Col xs={8}>
          <BearTable />
        </Col>
        <Col xs={4}>
          <BearCanvas />
        </Col>
      </Row>
    </Container>
  );
}

export default BearContainer;

import { List } from "react-window";

import type {
  RowComponentProps,
} from "react-window";

const data = Array.from(
  { length: 10000 },
  (_, i) => `Item ${i + 1}`
);

console.log(data);


type CustomRowProps = {
  data: string[];
};

const Row = ({
  index,
  style,
  data,
}: RowComponentProps<CustomRowProps>) => {
  return (
    <div style={style}>
      {data[index]}
    </div>
  );
};

const VirtualizedList = () => {
  return (
    <div
      style={{
        height: 500,
        width: 300,
      }}
    >
      <List
        rowCount={data.length}
        rowHeight={50}
        rowComponent={Row}
        rowProps={{ data }}
        overscanCount={5}
      />
    </div>
  );
};

export default VirtualizedList;
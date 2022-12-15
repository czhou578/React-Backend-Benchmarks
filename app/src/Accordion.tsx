import { useState } from "react";
import { Accordion, Icon } from "semantic-ui-react";

interface Props {
  jsTime: number;
  jsData: object;
  goTime: number;
  goData: object;
  pythonTime: number;
  pythonData: any;
}

export default function AccordionExampleFluid(props: Props) {
  const { jsTime, goTime, pythonTime, pythonData, goData, jsData } = props;

  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <Accordion styled>
      <Accordion.Title
        active={activeIndex === 0}
        index={0}
        onClick={(e, data) => {
          setActiveIndex(data.index as number);
        }}
      >
        <Icon name="dropdown" />
        JavaScript Run
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
        <h2>Completion Time</h2>
        <h3>{jsTime} ms</h3>
        <h2 style={{ marginBottom: "20px" }}>Data Returned</h2>

        {jsData ? JSON.stringify(jsData, null, 2) : null}
      </Accordion.Content>

      <Accordion.Title
        active={activeIndex === 1}
        index={1}
        onClick={(e, data) => {
          setActiveIndex(data.index as number);
        }}
      >
        <Icon name="dropdown" />
        Golang Run
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 1}>
        <h2>Completion Time</h2>
        <h3>{goTime} ms</h3>
        <h2 style={{ marginBottom: "20px" }}>Data Returned</h2>

        {goData ? JSON.stringify(goData, null, 2) : null}
      </Accordion.Content>

      <Accordion.Title
        active={activeIndex === 2}
        index={2}
        onClick={(e, data) => {
          setActiveIndex(data.index as number);
        }}
      >
        <Icon name="dropdown" />
        Python Run
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 2}>
        <h2>Completion Time</h2>
        <h3>{pythonTime} ms</h3>
        <h2 style={{ marginBottom: "20px" }}>Data Returned</h2>
        {pythonData ? JSON.stringify(pythonData, null, 2) : null}
      </Accordion.Content>
    </Accordion>
  );
}

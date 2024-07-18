import { Accordion } from "semantic-ui-react";

interface Props {
  jsTime: number;
  jsData: object;
  goTime: number;
  goData: object;
  pythonTime: number;
  pythonData: any;
  javaTime: number;
  javaData: object;
}

export default function AccordionExampleFluid(props: Props) {
  const { jsTime, goTime, pythonTime, javaTime, pythonData, goData, jsData, javaData } = props;

  const panels = [
    {
      key: 1,
      title: "JavaScript Run",
      content: (
        <Accordion.Content>
          <h2>Completion Time</h2>
          <h3>{jsTime} ms</h3>
          <h2 style={{ marginBottom: "20px" }}>Data Returned</h2>

          {jsData ? JSON.stringify(jsData, null, 2) : null}
        </Accordion.Content>
      ),
    },
    {
      key: 2,
      title: "Go Run",
      content: (
        <Accordion.Content>
          <h2>Completion Time</h2>
          <h3>{goTime} ms</h3>
          <h2 style={{ marginBottom: "20px" }}>Data Returned</h2>

          {goData ? JSON.stringify(goData, null, 2) : null}
        </Accordion.Content>
      ),
    },
    {
      key: 3,
      title: "Python Run",
      content: (
        <Accordion.Content>
          <h2>Completion Time</h2>
          <h3>{pythonTime} ms</h3>
          <h2 style={{ marginBottom: "20px" }}>Data Returned</h2>

          {pythonData ? JSON.stringify(pythonData, null, 2) : null}
        </Accordion.Content>
      ),
    },
    {
      key: 4,
      title: "Java Run",
      content: (
        <Accordion.Content>
          <h2>Completion Time</h2>
          <h3>{javaTime} ms</h3>
          <h2 style={{ marginBottom: "20px" }}>Data Returned</h2>

          {javaData ? JSON.stringify(javaData, null, 2) : null}
        </Accordion.Content>
      ),
    },    
  ];

  return (
    <Accordion
      styled
      exclusive={false}
      defaultActiveIndex={[-1]}
      panels={panels}
    />
  );
}

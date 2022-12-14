import { useState } from "react";
import { Accordion, Icon } from "semantic-ui-react";

interface Props {
  jsTime: object;
  goTime: object;
  pythonTime: object;
}

export default function AccordionExampleFluid(props: Props) {
  // const { jsTime, goTime, pythonTime } = props;

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
        {/* <h2>{jsTime.length != 0 ? jsTime : null}</h2> */}
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
        <p>
          There are many breeds of dogs. Each breed varies in size and
          temperament. Owners often select a breed of dog that they find to be
          compatible with their own lifestyle and desires from a companion.
        </p>
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
        <p>
          Three common ways for a prospective owner to acquire a dog is from pet
          shops, private owners, or shelters.
        </p>
        <p>
          A pet shop may be the most convenient way to buy a dog. Buying a dog
          from a private owner allows you to assess the pedigree and upbringing
          of your dog before choosing to take it home. Lastly, finding your dog
          from a shelter, helps give a good home to a dog who may not find one
          so readily.
        </p>
      </Accordion.Content>
    </Accordion>
  );
}

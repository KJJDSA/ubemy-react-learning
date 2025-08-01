import { useState } from 'react';


import { EXAMPLES } from '../data.js';
import Section from './Section.jsx';
import Taps from './Tabs.jsx';
import TabButton from './TabButton.jsx';

export default function Examples() {
  const [selectedTopic, setSelectedTopic] = useState();

  function handleSelect(selectedButton) {
    // selectedButton => 'components', 'jsx', 'props', 'state'
    setSelectedTopic(selectedButton);
    // console.log(selectedTopic);
  }

  console.log('APP COMPONENT EXECUTING');

  let tabContent = <p>Please select a topic.</p>;

  if (selectedTopic) {
    tabContent = (
      <div id="tab-content">
        <h3>{EXAMPLES[selectedTopic].title}</h3>
        <p>{EXAMPLES[selectedTopic].description}</p>
        <pre>
          <code>{EXAMPLES[selectedTopic].code}</code>
        </pre>
      </div>
    );
  }
  return (
        <Section title="Examples" id="examples">
          <Taps 
            // ButtonsContainer="menu" // ul, div, section, 컴포넌트 Section도 가능하다.
            buttons={ // 슬롯 속성으로 버튼을 전달한다. 흔한 패턴이라고 함
              <>
                <TabButton
                  isSelected={selectedTopic === 'components'}
                  onClick={() => handleSelect('components')}
                >
                  Components
                </TabButton>
                <TabButton
                  isSelected={selectedTopic === 'jsx'}
                  onClick={() => handleSelect('jsx')}
                >
                  JSX
                </TabButton>
                <TabButton
                  isSelected={selectedTopic === 'props'}
                  onClick={() => handleSelect('props')}
                >
                  Props
                </TabButton>
                <TabButton
                  isSelected={selectedTopic === 'state'}
                  onClick={() => handleSelect('state')}
                >
                  State
                </TabButton>
              </>
          }>
            {tabContent}
        </Taps>
        </Section>
  )
}
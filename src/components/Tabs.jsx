import { Fragment } from "react/jsx-runtime"
import TabButton from './TabButton.jsx';

export default function Tabs({selectedTopic, onSeclect, children}) {
  return (
    <Fragment>
      <menu>
        <TabButton
          isSelected={selectedTopic === 'components'}
          onClick={() => onSeclect('components')}
        >
          Components
        </TabButton>
        <TabButton
          isSelected={selectedTopic === 'jsx'}
          onClick={() => onSeclect('jsx')}
        >
          JSX
        </TabButton>
        <TabButton
          isSelected={selectedTopic === 'props'}
          onClick={() => onSeclect('props')}
        >
          Props
        </TabButton>
        <TabButton
          isSelected={selectedTopic === 'state'}
          onClick={() => onSeclect('state')}
        >
          State
        </TabButton>
      </menu>
      {children} {/* 부모컴포넌트에서 제어하는게 낫다. */}
    </Fragment>
  )
}
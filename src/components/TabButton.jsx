export default function TabButton({ children, isSelected, ...props }) { // 나머지 매개변수 : https://ko.javascript.info/rest-parameters-spread
  console.log('TABBUTTON COMPONENT EXECUTING');
  return (
    <li>
      <button className={isSelected ? 'active' : undefined} {...props}>
        {children}
      </button>
    </li>
  );
}

interface Props {
    data: any[],
    renderItem: (item: any) => any
}

const ListRenderer: React.FC<Props> = ({ data, renderItem }) => {
    return (
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {renderItem(item)}
          </li>
        ))}
      </ul>
    );
  };
  
export default ListRenderer;
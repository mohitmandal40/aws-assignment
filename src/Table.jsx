function Table({ graph }) {
  return (
    <div style={{ height: '400px', overflow: 'auto' }}>
      <table
        border={1}
        style={{
          borderCollapse: 'collapse',
          padding: '10px',
        }}
      >
        <thead>
          <tr>
            <th>Identity Type</th>
            <th>Resource Type</th>
            <th>Permissions</th>
          </tr>
        </thead>
        <tbody>
          {graph.map((item, index) => (
            <tr key={index}>
              <td>{item.identity.type}</td>
              <td>{item.resource.type}</td>
              <td>{item.permissions.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

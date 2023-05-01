import { useEffect, useState } from 'react';
import './App.css';
import Table from './Table';
import Histogram from './Histogram';

interface IdentityTypeCounts {
  [key: string]: number;
}

interface ResourceTypeCounts {
  [key: string]: number;
}

type IdentityType = 'user' | 'role' | 'group';

interface Identity {
  type: IdentityType;
  id: string;
  lastActive: string;
}

type ResourceType = 's3 bucket' | 'RDS instance' | 'EC2 instance';

interface Resource {
  type: ResourceType;
  id: string;
  lastActive: string;
}

interface GraphEntry {
  identity: Identity;
  permissions: string[];
  resource: Resource;
}

const identityTypes: IdentityType[] = ['user', 'role', 'group'];
const resourceTypes: ResourceType[] = [
  's3 bucket',
  'RDS instance',
  'EC2 instance',
];

function App() {
  const [graphData, setGraphData] = useState<GraphEntry[]>([]);
  const [identityTypeFilter, setIdentityTypeFilter] = useState('');
  const [identityIdFilter, setIdentityIdFilter] = useState('');
  const [identityLastActiveFilter, setIdentityLastActiveFilter] = useState('');
  const [resourceTypeFilter, setResourceTypeFilter] = useState('');
  const [resourceIdFilter, setResourceIdFilter] = useState('');
  const [resourceLastActiveFilter, setResourceLastActiveFilter] = useState('');
  const [permissionsFilter, setPermissionsFilter] = useState('');

  useEffect(() => {
    const identities: Identity[] = [];
    for (let i = 1; i <= 20; i++) {
      const identity: Identity = {
        type: identityTypes[Math.floor(Math.random() * identityTypes.length)],
        id: `identity_${i}`,
        lastActive: `05/01/2023`,
      };
      identities.push(identity);
    }

    const resources: Resource[] = [];
    for (let i = 1; i <= 50; i++) {
      const formattedDate = new Date(
        Date.now() - Math.floor(Math.random() * 31536000000 * 2)
      )
        .toLocaleDateString('en-GB')
        .replace(/\//g, '-');
      const resource: Resource = {
        type: resourceTypes[Math.floor(Math.random() * resourceTypes.length)],
        id: `resource_${i}`,
        lastActive: formattedDate,
      };
      resources.push(resource);
    }

    const graph: GraphEntry[] = [];
    identities.forEach((identity) => {
      resources.forEach((resource) => {
        const graphEntry: GraphEntry = {
          identity,
          permissions: ['ListBucket', 'PutObject', 'GetObject', 'DeleteObject'],
          resource,
        };
        graph.push(graphEntry);
      });
    });

    setGraphData(graph);
  }, []);

  console.log('aslkdfjlsad', graphData);

  const filteredData = graphData?.filter((item) => {
    const identity = item.identity;
    const typeMatch = identity.type.includes(identityTypeFilter);
    const idMatch = identity.id.includes(identityIdFilter);
    const lastActiveMatch = identity.lastActive.includes(
      identityLastActiveFilter
    );

    const resource = item.resource;
    const resourceTypeMatch = resource.type.includes(resourceTypeFilter);
    const resourceIdMatch = resource.id.includes(resourceIdFilter);
    const resourceLastActiveMatch = resource.lastActive.includes(
      resourceLastActiveFilter
    );

    const permissionMatch = item.permissions.some((permission) => {
      return permission.includes(permissionsFilter);
    });

    return (
      typeMatch &&
      idMatch &&
      lastActiveMatch &&
      resourceTypeMatch &&
      resourceIdMatch &&
      resourceLastActiveMatch &&
      permissionMatch
    );
  });

  const identityTypeCounts: IdentityTypeCounts = {};
  const resourceTypeCounts: ResourceTypeCounts = {};

  filteredData.forEach((item) => {
    const identityType = item.identity.type;
    const resourceType = item.resource.type;

    if (!identityTypeCounts[identityType]) {
      identityTypeCounts[identityType] = 1;
    } else {
      identityTypeCounts[identityType]++;
    }

    if (!resourceTypeCounts[resourceType]) {
      resourceTypeCounts[resourceType] = 1;
    } else {
      resourceTypeCounts[resourceType]++;
    }
  });

  return (
    <div>
      <div>
        <h3 style={{ margin: 0 }}>Filters:</h3>
        <label>Identity Type:</label>
        <input
          type="text"
          value={identityTypeFilter}
          onChange={(e) => setIdentityTypeFilter(e.target.value)}
        />
        <br />
        <label>Identity ID:</label>
        <input
          type="text"
          value={identityIdFilter}
          onChange={(e) => setIdentityIdFilter(e.target.value)}
        />
        <br />
        <label>Identity Last Active:</label>
        <input
          type="text"
          value={identityLastActiveFilter}
          onChange={(e) => setIdentityLastActiveFilter(e.target.value)}
        />
        <br />

        <label>Resource Type:</label>
        <input
          type="text"
          value={resourceTypeFilter}
          onChange={(e) => setResourceTypeFilter(e.target.value)}
        />
        <br />
        <label>Resource ID:</label>
        <input
          type="text"
          value={resourceIdFilter}
          onChange={(e) => setResourceIdFilter(e.target.value)}
        />
        <br />
        <label>Resource Last Active:</label>
        <input
          type="text"
          value={resourceLastActiveFilter}
          onChange={(e) => setResourceLastActiveFilter(e.target.value)}
        />
        <br />
        <label>Permissions:</label>
        <input
          type="text"
          value={permissionsFilter}
          onChange={(e) => setPermissionsFilter(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <div>
          <Histogram
            dataGraph={identityTypeCounts}
            heading={'Group By Identities Type'}
          />
          <Histogram
            dataGraph={resourceTypeCounts}
            heading={'Group By Resources Type'}
          />
        </div>

        <Table graph={filteredData} />
      </div>
    </div>
  );
}

export default App;

# BingMap

## Center

```jsx
import React from 'react';
import { BingMap, setConfig } from 'map.jsx';

setConfig({
  bingMapApiKey:
    'AmaJse0LMtAHWktKP2ew2c_NNcKEDFem3a1MWEu8xN0_fNn-alxc7q1BlLEgcQtD',
});

const point = {
  latitude: 9.55322726031735,
  longitude: 100.0556427929686,
};

const style = {
  minHeight: '250px',
};

export default () => <BingMap center={point} style={style} />;
```

## Points

```jsx
import React from 'react';
import { BingMap, setConfig } from 'map.jsx';

setConfig({
  bingMapApiKey:
    'AmaJse0LMtAHWktKP2ew2c_NNcKEDFem3a1MWEu8xN0_fNn-alxc7q1BlLEgcQtD',
});

const pointA = {
  address: 'A',
  latitude: 9.55322726031735,
  longitude: 100.0556427929686,
};

const pointB = {
  address: 'B',
  latitude: 9.55328272603175,
  longitude: 100.075642792966,
};

const style = {
  minHeight: '250px',
};

export default () => <BingMap points={[pointA, pointB]} style={style} />;
```

## Walking

```jsx
import React from 'react';
import { BingMap, setConfig } from 'map.jsx';

setConfig({
  bingMapApiKey:
    'AmaJse0LMtAHWktKP2ew2c_NNcKEDFem3a1MWEu8xN0_fNn-alxc7q1BlLEgcQtD',
});

const pointA = {
  address: 'A',
  latitude: 9.55322726031735,
  longitude: 100.0556427929686,
};

const pointB = {
  address: 'B',
  latitude: 9.55328272603175,
  longitude: 100.075642792966,
};

const style = {
  minHeight: '250px',
};

export default () => <BingMap walking={[pointA, pointB]} style={style} />;
```

## Driving

```jsx
import React from 'react';
import { BingMap, setConfig } from 'map.jsx';

setConfig({
  bingMapApiKey:
    'AmaJse0LMtAHWktKP2ew2c_NNcKEDFem3a1MWEu8xN0_fNn-alxc7q1BlLEgcQtD',
});

const pointA = {
  address: 'A',
  latitude: 9.55322726031735,
  longitude: 100.0556427929686,
};

const pointB = {
  address: 'B',
  latitude: 9.55328272603175,
  longitude: 100.075642792966,
};

const style = {
  minHeight: '250px',
};

export default () => <BingMap driving={[pointA, pointB]} style={style} />;
```

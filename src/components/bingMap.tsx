import React from 'react';
import { loadBingMapApi, Microsoft } from '../loaders/bingMapApi';

export interface LatLng {
  address?: string;
  latitude: number;
  longitude: number;
}

interface IMapProps {
  apiKey?: string;
  className?: string;
  style?: object;
  aerial?: boolean;
  zoom?: number;
  center?: LatLng;
  points?: LatLng[];
  walking?: LatLng[];
  driving?: LatLng[];
  transit?: LatLng[];
}

const defaultProps = {
  zoom: 14,
  customMapStyle: {
    elements: {
      area: { fillColor: '#b6e591' },
      water: { fillColor: '#75cff0' },
      tollRoad: { fillColor: '#a964f4', strokeColor: '#a964f4' },
      arterialRoad: { fillColor: '#ffffff', strokeColor: '#d7dae7' },
      road: { fillColor: '#ffa35a', strokeColor: '#ff9c4f' },
      street: { fillColor: '#ffffff', strokeColor: '#ffffff' },
      transit: { fillColor: '#000000' },
    },
    settings: {
      landColor: '#efe9e1',
    },
  },
};

export default class extends React.PureComponent<
  IMapProps & typeof defaultProps,
  any
> {
  static defaultProps = defaultProps;
  private mapRef = React.createRef<HTMLDivElement>();
  private map: any;

  render() {
    return (
      <div
        ref={this.mapRef}
        className={this.props.className}
        style={this.props.style}
      />
    );
  }

  componentDidMount() {
    loadBingMapApi(this.props.apiKey).then(() => {
      this.initMap();
      this.walking();
      this.transit();
      this.driving();
      this.addPoint();
      this.setCenter();
    });
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.dispose();
    }
  }

  private initMap() {
    const { aerial, customMapStyle } = this.props;
    this.map = new Microsoft.Maps.Map(this.mapRef.current, {
      ...(!aerial
        ? {}
        : {
            mapTypeId: Microsoft.Maps.MapTypeId.aerial,
          }),
      customMapStyle,
    });
  }

  private setCenter() {
    // @ts-ignore
    const { center: { latitude, longitude } = {}, zoom } = this.props;
    if (latitude && longitude) {
      this.map.setView({
        center: new Microsoft.Maps.Location(latitude, longitude),
        zoom,
      });
    } else {
      this.setFitView();
    }
  }

  private setFitView() {
    const {
      points = [],
      walking = [],
      driving = [],
      transit = [],
    } = this.props;
    const locations = [
      ...points.map(
        ({ latitude, longitude }) =>
          new Microsoft.Maps.Location(latitude, longitude),
      ),
      ...walking.map(
        ({ latitude, longitude }) =>
          new Microsoft.Maps.Location(latitude, longitude),
      ),
      ...driving.map(
        ({ latitude, longitude }) =>
          new Microsoft.Maps.Location(latitude, longitude),
      ),
      ...transit.map(
        ({ latitude, longitude }) =>
          new Microsoft.Maps.Location(latitude, longitude),
      ),
    ];
    setTimeout(() => {
      this.map.setView({
        padding: 10,
        // eslint-disable-next-line new-cap
        bounds: new Microsoft.Maps.LocationRect.fromLocations(locations),
      });
    }, 1000);
  }

  private addPoint() {
    const { points = [] } = this.props;
    if (Array.isArray(points) && points.length) {
      points.forEach(({ latitude, longitude, address }) => {
        const pushpin = new Microsoft.Maps.Pushpin(
          new Microsoft.Maps.Location(latitude, longitude),
          {
            title: address,
          },
        );
        const layer = new Microsoft.Maps.Layer();
        layer.add(pushpin);
        this.map.layers.insert(layer);
      });
    }
  }

  private walking() {
    const { walking = [] } = this.props;
    if (Array.isArray(walking) && walking.length) {
      this.route(walking, 'walking');
    }
  }

  private transit() {
    const { transit = [] } = this.props;
    if (Array.isArray(transit) && transit.length) {
      this.route(transit, 'transit');
    }
  }

  private driving() {
    const { driving = [] } = this.props;
    if (Array.isArray(driving) && driving.length) {
      this.route(driving, 'driving');
    }
  }

  private route(
    route: any,
    type = 'walking' as 'walking' | 'driving' | 'transit',
  ) {
    if (Array.isArray(route) && route.length) {
      Microsoft.Maps.loadModule('Microsoft.Maps.Directions', () => {
        const directionsManager = new Microsoft.Maps.Directions.DirectionsManager(
          this.map,
        );
        directionsManager.setRequestOptions({
          maxRoutes: 1,
          routeDraggable: false,
          routeMode: Microsoft.Maps.Directions.RouteMode[type],
        });
        route.forEach(({ address, latitude, longitude }) => {
          directionsManager.addWaypoint(
            new Microsoft.Maps.Directions.Waypoint({
              address,
              isViaPoint: !address,
              location: new Microsoft.Maps.Location(latitude, longitude),
            }),
          );
        });
        directionsManager.setRenderOptions({
          itineraryContainer: document.getElementById('printoutPanel'),
        });
        directionsManager.calculateDirections();
      });
    }
  }
}

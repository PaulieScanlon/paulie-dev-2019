import React, { useRef, useState, useEffect, Fragment } from 'react';
import { useFrame } from '@react-three/fiber';
import { GradientTexture } from '@react-three/drei';

import * as THREE from 'three';

const getVertex = (lat, lng, radius) => {
  const vector = new THREE.Vector3().setFromSpherical(
    new THREE.Spherical(radius, THREE.MathUtils.degToRad(90 - lat), THREE.MathUtils.degToRad(lng))
  );
  return vector;
};

const Cylinder = ({ lat, lng, cap, radius }) => {
  if (lat === 0.0 && lng === 0.0) return null;

  const look = getVertex(Math.PI, lng, radius);

  const height = cap / 2;
  const y = Math.sign(lat) > 0 ? height : -height;
  const colors =
    Math.sign(lat) > 0
      ? ['rgba(253, 65, 122, 0.1)', 'rgba(253, 65, 122, 0.5)', 'rgba(253, 65, 122, 1)']
      : ['rgba(253, 65, 122, 1)', 'rgba(253, 65, 122, 0.5)', 'rgba(253, 65, 122, 0.1)'];

  return (
    <mesh
      position={getVertex(lat, lng, radius)}
      scale={0.011}
      onUpdate={(self) => [self.geometry.translate(0, y, 0), self.lookAt(look)]}
    >
      <cylinderGeometry args={[0.5, 0.5, cap, 10, 1, true]} />
      <meshBasicMaterial transparent={true}>
        <GradientTexture stops={[0.1, 0.5, 0.9]} colors={colors} />
      </meshBasicMaterial>
    </mesh>
  );
};

const ThreeLatLong = () => {
  const maxY = 85; // > 1 make the cylinder scale on the y

  const mesh = useRef(null);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState(null);

  useFrame(() => {
    if (!isLoading) return;
    return (mesh.current.rotation.x += 0.15), (mesh.current.rotation.z += 0.15);
  });

  useEffect(() => {
    const getLatLong = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/ua-analytics');
        const results = await response.json();

        if (!response.ok) {
          throw new Error('Bad request');
        }

        if (isMounted) {
          setLocations(results.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getLatLong();
  }, []);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <mesh scale={0.05} ref={mesh}>
          <torusGeometry args={[0.8, 0.2, 16, 100]} />
          <meshPhongMaterial color="#f056c7" />
        </mesh>
      ) : (
        <group>
          {locations.map((data, index) => {
            const { lat, lng, count } = data;
            const cap = count > maxY ? maxY : count;
            return <Cylinder key={index} lat={lat} lng={lng} cap={cap} radius={1.06} />;
          })}
        </group>
      )}
    </Fragment>
  );
};

export default ThreeLatLong;

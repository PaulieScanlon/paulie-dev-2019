import React from 'react';

const ThreeSphere = () => {
  return (
    <mesh>
      <sphereGeometry args={[1, 32]} />
      <meshStandardMaterial color="#19172c" transparent={true} opacity={0.9} />
    </mesh>
  );
};

export default ThreeSphere;

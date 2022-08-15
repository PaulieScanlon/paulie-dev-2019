import React from 'react';

const ThreeSphere = () => {
  return (
    <mesh>
      <sphereGeometry args={[1, 32]} />
      <meshStandardMaterial color="#1e1c33" transparent={true} opacity={0.6} />
    </mesh>
  );
};

export default ThreeSphere;

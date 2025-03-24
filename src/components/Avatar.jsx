import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Avatar() {
  const { scene } = useGLTF('/avatar.glb');
  return <primitive object={scene} scale={1.5} />;
}

function AvatarScene() {
  return (
    <Canvas camera={{ position: [0, 2, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, 5]} />
      <Avatar />
      <OrbitControls />
    </Canvas>
  );
}

export default AvatarScene;

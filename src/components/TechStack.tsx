import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

type TechItem = {
  label: string;
  color: string;
};

const techItems: TechItem[] = [
  { label: "Golang", color: "#5eead4" },
  { label: "Python", color: "#f59e0b" },
  { label: "PHP", color: "#a78bfa" },
  { label: "JavaScript", color: "#facc15" },
  { label: "Microservices", color: "#38bdf8" },
  { label: "REST APIs", color: "#22c55e" },
  { label: "Event-Driven Systems", color: "#fb7185" },
  { label: "Kafka", color: "#f97316" },
  { label: "AWS", color: "#f59e0b" },
  { label: "Azure", color: "#60a5fa" },
  { label: "Docker", color: "#38bdf8" },
  { label: "Kubernetes", color: "#818cf8" },
  { label: "Helm", color: "#2dd4bf" },
  { label: "Terraform", color: "#c084fc" },
  { label: "PostgreSQL", color: "#93c5fd" },
  { label: "SQL", color: "#34d399" },
  { label: "ElasticSearch", color: "#a3e635" },
  { label: "CI/CD Pipelines", color: "#fda4af" },
  { label: "Distributed Systems", color: "#67e8f9" },
  { label: "Scalability", color: "#f472b6" },
  { label: "Reliability", color: "#fbbf24" },
];

function createTechTexture(label: string, color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;

  const context = canvas.getContext("2d");
  if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  context.fillStyle = "#09111d";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, `${color}44`);
  gradient.addColorStop(1, "#050810");
  context.fillStyle = gradient;
  context.fillRect(40, 40, canvas.width - 80, canvas.height - 80);

  context.strokeStyle = color;
  context.lineWidth = 14;
  context.strokeRect(54, 54, canvas.width - 108, canvas.height - 108);

  context.fillStyle = color;
  context.textAlign = "center";
  context.textBaseline = "middle";

  const fontSize = label.length > 11 ? 108 : label.length > 8 ? 124 : 148;
  context.font = `700 ${fontSize}px Geist, sans-serif`;

  const words = label.split(" ");
  if (words.length > 1) {
    const firstLine = words.slice(0, Math.ceil(words.length / 2)).join(" ");
    const secondLine = words.slice(Math.ceil(words.length / 2)).join(" ");
    context.fillText(firstLine, canvas.width / 2, canvas.height / 2 - 70);
    context.fillText(secondLine, canvas.width / 2, canvas.height / 2 + 90);
  } else {
    context.fillText(label, canvas.width / 2, canvas.height / 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = techItems.map((item) => ({
  ...item,
  scale:
    item.label.length > 11 ? 1.15 : item.label.length > 8 ? 1 : 0.9,
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = document
        .getElementById("work")!
        .getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const materials = useMemo(() => {
    return spheres.map(({ label, color }) => {
      const texture = createTechTexture(label, color);
      return new THREE.MeshPhysicalMaterial({
        map: texture,
        emissive: new THREE.Color(color),
        emissiveMap: texture,
        emissiveIntensity: 0.35,
        metalness: 0.35,
        roughness: 0.95,
        clearcoat: 0.15,
      });
    });
  }, []);

  return (
    <div className="techstack">
      <h2> My Techstack</h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={materials[i]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;

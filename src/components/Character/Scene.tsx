import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const killHeroTriggers = () => {
  const triggerIds = [
    "hero-landing",
    "character-landing",
    "character-about",
    "character-whatido",
    "career-main",
  ];

  triggerIds.forEach((id) => {
    ScrollTrigger.getById(id)?.kill();
  });
};

const resetCharacterStyles = () => {
  gsap.set(
    [
      ".landing-container",
      ".about-me",
      ".about-section",
      ".whatIDO",
      ".what-box-in",
      ".character-model",
      ".character-rim",
    ],
    { clearProps: "all" }
  );
};

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    if (!canvasDiv.current) return;

    let disposed = false;
    killHeroTriggers();
    resetCharacterStyles();

    const rect = canvasDiv.current.getBoundingClientRect();
    const container = { width: rect.width, height: rect.height };
    const aspect = container.width / container.height;
    const scene = sceneRef.current;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    canvasDiv.current.replaceChildren();
    canvasDiv.current.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    let headBone: THREE.Object3D | null = null;
    let screenLight: THREE.Object3D | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    let loadedCharacter: THREE.Object3D | null = null;
    let removeHoverListeners: (() => void) | void;
    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };
    let debounce: number | undefined;
    let animationFrameId = 0;

    const clock = new THREE.Clock();
    const light = setLighting(scene);
    const progress = setProgress((value) => setLoading(value));
    const { loadCharacter } = setCharacter(renderer, scene, camera);

    const resizeHandler = () => {
      if (loadedCharacter) {
        handleResize(renderer, camera, canvasDiv, loadedCharacter);
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => {
        mouse = { x, y };
      });
    };

    const touchMoveHandler = (event: TouchEvent) => {
      handleTouchMove(event, (x, y) => {
        mouse = { x, y };
      });
    };

    const onTouchStart = (event: TouchEvent) => {
      const element = event.target as HTMLElement;
      debounce = window.setTimeout(() => {
        element?.addEventListener("touchmove", touchMoveHandler);
      }, 200);
    };

    const onTouchEnd = () => {
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    const landingDiv = document.getElementById("landingDiv");
    document.addEventListener("mousemove", onMouseMove);
    landingDiv?.addEventListener("touchstart", onTouchStart);
    landingDiv?.addEventListener("touchend", onTouchEnd);

    loadCharacter().then((gltf) => {
      if (!gltf || disposed) return;

      const animations = setAnimations(gltf);
      removeHoverListeners = hoverDivRef.current
        ? animations.hover(gltf, hoverDivRef.current) || undefined
        : undefined;
      mixer = animations.mixer;
      loadedCharacter = gltf.scene;

      scene.add(loadedCharacter);
      headBone = loadedCharacter.getObjectByName("spine006") || null;
      screenLight = loadedCharacter.getObjectByName("screenlight") || null;

      progress.loaded().then(() => {
        if (disposed) return;

        window.setTimeout(() => {
          if (disposed) return;
          light.turnOnLights();
          animations.startIntro();
        }, 2500);
      });

      window.addEventListener("resize", resizeHandler);
    });

    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate);

      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
      }

      if (screenLight) {
        light.setPointLight(screenLight);
      }

      const delta = clock.getDelta();
      mixer?.update(delta);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      disposed = true;
      progress.clear();
      killHeroTriggers();
      resetCharacterStyles();
      window.clearTimeout(debounce);
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeHandler);
      document.removeEventListener("mousemove", onMouseMove);
      landingDiv?.removeEventListener("touchstart", onTouchStart);
      landingDiv?.removeEventListener("touchend", onTouchEnd);
      landingDiv?.removeEventListener("touchmove", touchMoveHandler);
      removeHoverListeners?.();
      scene.clear();
      renderer.dispose();

      if (canvasDiv.current?.contains(renderer.domElement)) {
        canvasDiv.current.removeChild(renderer.domElement);
      }

      canvasDiv.current?.replaceChildren();
    };
  }, [setLoading]);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
        <div className="character-hover" ref={hoverDivRef}></div>
      </div>
    </div>
  );
};

export default Scene;

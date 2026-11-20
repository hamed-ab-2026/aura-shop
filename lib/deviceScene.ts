/* A procedural 3D model of the Aura Vent (black cabinet with a blue filter stripe and vents, a corrugated hose and an LED
   ring at the nozzle) and the 7-second intro animation used by the loading screen. Loaded on demand with three.js. */

import * as THREE from "three";

export interface DeviceScene {
    /** Draws the frame for time t (seconds since the intro started). */
    render: (t: number) => void;
    resize: () => void;
    dispose: () => void;
}

const BLUE = 0x2f3fe0;
const smooth = (a: number, b: number, x: number) => {
    const k = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return k * k * (3 - 2 * k);
};

/** Canvas texture with the white "AURA VENT" label. */
function labelTexture() {
    const c = document.createElement("canvas");
    c.width = 512; c.height = 128;
    const g = c.getContext("2d")!;
    g.fillStyle = "#f4f5ff"; g.fillRect(0, 0, 512, 128);
    g.fillStyle = "#2f3fe0"; g.font = "800 74px system-ui, sans-serif"; g.textAlign = "center"; g.textBaseline = "middle";
    g.fillText("AURA VENT", 256, 68);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
}

/** Soft round sprite used for the LED glow, the floor shadow and the vapour particles. */
function radialTexture(inner: string, outer: string) {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d")!;
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, inner); grd.addColorStop(1, outer);
    g.fillStyle = grd; g.fillRect(0, 0, 128, 128);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
}

function buildDevice() {
    const device = new THREE.Group();
    const body = new THREE.MeshStandardMaterial({color: 0x15161a, roughness: 0.38, metalness: 0.55});
    const dark = new THREE.MeshStandardMaterial({color: 0x050506, roughness: 0.9});
    const blue = new THREE.MeshStandardMaterial({color: BLUE, roughness: 0.3, metalness: 0.2, emissive: BLUE, emissiveIntensity: 0.25});
    const steel = new THREE.MeshStandardMaterial({color: 0xb8bcc8, roughness: 0.25, metalness: 0.9});

    // Cabinet with a slight bevel look from a thin dark top plate.
    const W = 1.05, H = 1.2, D = 1.05, FEET = 0.1;
    const cabinet = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), body);
    cabinet.position.y = FEET + H / 2;
    device.add(cabinet);
    const top = new THREE.Mesh(new THREE.BoxGeometry(W * 1.01, 0.03, D * 1.01), dark);
    top.position.y = FEET + H;
    device.add(top);

    // Adjustable feet.
    const footGeo = new THREE.CylinderGeometry(0.07, 0.09, FEET, 20);
    for (const [x, z] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
        const f = new THREE.Mesh(footGeo, dark);
        f.position.set(x * (W / 2 - 0.12), FEET / 2, z * (D / 2 - 0.12));
        device.add(f);
    }

    // Front: blue filter stripe, vent slots and screws. Side: AURA VENT label.
    const front = D / 2 + 0.004;
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(W * 0.84, 0.1, 0.01), blue);
    stripe.position.set(0, FEET + H * 0.47, front);
    device.add(stripe);
    const slotGeo = new THREE.BoxGeometry(0.13, 0.045, 0.012);
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 5; c++) {
            const s = new THREE.Mesh(slotGeo, dark);
            s.position.set(-0.36 + c * 0.18, FEET + 0.12 + r * 0.085, front);
            device.add(s);
        }
    }
    const screwGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.012, 12);
    screwGeo.rotateX(Math.PI / 2);
    for (const [x, y] of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) {
        const s = new THREE.Mesh(screwGeo, steel);
        s.position.set(x * (W / 2 - 0.05), FEET + H / 2 + y * (H / 2 - 0.05), front + 0.002);
        device.add(s);
    }
    const label = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.105), new THREE.MeshStandardMaterial({map: labelTexture(), roughness: 0.5}));
    label.rotation.y = -Math.PI / 2;
    label.position.set(-W / 2 - 0.004, FEET + H * 0.72, D / 2 - 0.26);
    device.add(label);

    // Corrugated hose: a core tube with ridges along a bending curve.
    const y0 = FEET + H;
    const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, y0, 0),
        new THREE.Vector3(0, y0 + 0.7, 0),
        new THREE.Vector3(0.05, y0 + 1.45, 0.02),
        new THREE.Vector3(-0.15, y0 + 2.0, 0.05),
        new THREE.Vector3(-0.6, y0 + 2.2, 0.1),
        new THREE.Vector3(-0.92, y0 + 1.98, 0.14),
    ]);
    const HOSE_R = 0.17;
    device.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 160, HOSE_R * 0.92, 24), dark));
    const ridgeGeo = new THREE.TorusGeometry(HOSE_R, 0.024, 8, 28);
    const ridgeMat = new THREE.MeshStandardMaterial({color: 0x101114, roughness: 0.35, metalness: 0.4});
    const RIDGES = 58;
    const up = new THREE.Vector3(0, 0, 1);
    for (let i = 1; i < RIDGES; i++) {
        const u = i / RIDGES;
        const ring = new THREE.Mesh(ridgeGeo, ridgeMat);
        ring.position.copy(curve.getPointAt(u));
        ring.quaternion.setFromUnitVectors(up, curve.getTangentAt(u));
        device.add(ring);
    }

    // Nozzle with the LED ring, facing along the end of the hose.
    const end = curve.getPointAt(1);
    const dir = curve.getTangentAt(1);
    const nozzle = new THREE.Group();
    nozzle.position.copy(end);
    nozzle.quaternion.setFromUnitVectors(up, dir);
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.235, 0.21, 0.2, 32, 1, true), steel);
    collar.rotation.x = Math.PI / 2;
    collar.position.z = 0.07;
    nozzle.add(collar);
    const mouth = new THREE.Mesh(new THREE.CircleGeometry(0.2, 32), dark);
    mouth.position.z = 0.05;
    nozzle.add(mouth);
    const ledMat = new THREE.MeshStandardMaterial({color: 0x333744, emissive: 0xe9edff, emissiveIntensity: 0, roughness: 0.2});
    const led = new THREE.Mesh(new THREE.TorusGeometry(0.235, 0.04, 16, 48), ledMat);
    led.position.z = 0.17;
    nozzle.add(led);
    device.add(nozzle);

    return {device, ledMat, nozzle};
}

export function createDeviceScene(canvas: HTMLCanvasElement): DeviceScene {
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: true, powerPreference: "high-performance"});
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);

    scene.add(new THREE.HemisphereLight(0xc9d0ff, 0x08080c, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(3, 5, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight(BLUE, 3.2);
    rim.position.set(-4, 2.5, -3);
    scene.add(rim);
    const fill = new THREE.PointLight(0x7d89ff, 6, 6);
    fill.position.set(2, 1, 2.5);
    scene.add(fill);

    const {device, ledMat, nozzle} = buildDevice();
    const stage = new THREE.Group();
    stage.add(device);
    device.position.set(0.25, 0, 0);
    scene.add(stage);

    // Floor shadow and LED glow (additive sprites instead of a post-processing pass).
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.6), new THREE.MeshBasicMaterial({map: radialTexture("rgba(0,0,0,0.75)", "rgba(0,0,0,0)"), transparent: true, depthWrite: false}));
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.002;
    scene.add(shadow);
    const glowTex = radialTexture("rgba(200,210,255,1)", "rgba(47,63,224,0)");
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({map: glowTex, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false}));
    glow.scale.setScalar(1.6);
    nozzle.add(glow);
    glow.position.z = 0.25;
    const ledLight = new THREE.PointLight(0xdfe4ff, 0, 3);
    ledLight.position.z = 0.3;
    nozzle.add(ledLight);

    // Vapour particles that drift up and get pulled into the nozzle once the LED is on.
    const N = 140;
    const pos = new Float32Array(N * 3);
    const seeds = Array.from({length: N}, () => ({a: Math.random() * Math.PI * 2, r: 0.6 + Math.random() * 1.4, h: Math.random(), s: 0.5 + Math.random()}));
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pMat = new THREE.PointsMaterial({size: 0.09, map: radialTexture("rgba(220,226,255,0.9)", "rgba(125,137,255,0)"), transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false});
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);
    const target = new THREE.Vector3();

    const resize = () => {
        const w = canvas.clientWidth, h = canvas.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        // Pull back on narrow screens so the whole device fits.
        const dist = camera.aspect < 0.8 ? 12 : 9.4;
        camera.position.set(0, 2.2, dist);
        camera.lookAt(0, 1.4, 0);
        camera.updateProjectionMatrix();
    };
    resize();

    const render = (t: number) => {
        const intro = smooth(0, 1.6, t);
        stage.position.y = (1 - intro) * -0.6;
        stage.scale.setScalar(0.88 + intro * 0.12);
        stage.rotation.y = -0.9 + t * 0.6 + Math.sin(t * 0.8) * 0.08;

        // LED powers on with a short flicker.
        const on = smooth(1.8, 2.6, t) * (t < 2.6 ? 0.55 + 0.45 * Math.sin(t * 70) : 1);
        ledMat.emissiveIntensity = on * 3;
        (glow.material as THREE.SpriteMaterial).opacity = on * 0.9;
        ledLight.intensity = on * 5;

        // Vapour: rises around the device, then spirals into the nozzle.
        pMat.opacity = smooth(0.8, 2, t) * (1 - smooth(6.1, 6.7, t));
        const pull = smooth(2.6, 5.8, t);
        nozzle.getWorldPosition(target);
        seeds.forEach((s, i) => {
            const k = (s.h + t * 0.12 * s.s) % 1;
            const a = s.a + t * 0.6 * s.s;
            const fx = Math.cos(a) * s.r, fz = Math.sin(a) * s.r, fy = 0.2 + k * 3.4;
            const p = Math.min(1, pull * (0.6 + s.s * 0.5));
            const sw = (1 - p) * 0.4;
            pos[i * 3] = fx + (target.x - fx) * p + Math.cos(a * 3) * sw * 0.2;
            pos[i * 3 + 1] = fy + (target.y - fy) * p;
            pos[i * 3 + 2] = fz + (target.z - fz) * p;
        });
        pGeo.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    };

    const dispose = () => {
        scene.traverse((o) => {
            const m = o as THREE.Mesh;
            m.geometry?.dispose();
            const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
            mats.forEach((mat) => { (mat as THREE.MeshStandardMaterial).map?.dispose(); mat.dispose(); });
        });
        renderer.dispose();
    };

    return {render, resize, dispose};
}

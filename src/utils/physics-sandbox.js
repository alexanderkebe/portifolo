// ── Matter.js Dynamic Brand Physics Sandbox ──

export function initPhysicsSandbox() {
  const container = document.getElementById('physics-sandbox');
  if (!container) return;

  const btnReset = document.getElementById('sandbox-reset');
  const btnGravity = document.getElementById('sandbox-gravity');
  const btnBurst = document.getElementById('sandbox-burst');

  // SVG Data for each brand (directly using our official, high-fidelity SVGs)
  const brandLogos = {
    react: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/></svg>`,
    angular: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.712 17.711H7.288l-1.204 2.916L12 24l5.916-3.373-1.204-2.916ZM14.692 0l7.832 16.855.814-12.856L14.692 0ZM9.308 0 .662 3.999l.814 12.856L9.308 0Zm-.405 13.93h6.198L12 6.396 8.903 13.93Z"/></svg>`,
    photoshop: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.85 8.42c-.37-.15-.77-.21-1.18-.2-.26 0-.49 0-.68.01-.2-.01-.34 0-.41.01v3.36c.14.01.27.02.39.02h.53c.39 0 .78-.06 1.15-.18.32-.09.6-.28.82-.53.21-.25.31-.59.31-1.03.01-.31-.07-.62-.23-.89-.17-.26-.41-.46-.7-.57zM19.75.3H4.25C1.9.3 0 2.2 0 4.55v14.899c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zm-7.391 11.65c-.399.56-.959.98-1.609 1.22-.68.25-1.43.34-2.25.34-.24 0-.4 0-.5-.01s-.24-.01-.43-.01v3.209c.01.07-.04.131-.11.141H5.52c-.08 0-.12-.041-.12-.131V6.42c0-.07.03-.11.1-.11.17 0 .33 0 .56-.01.24-.01.49-.01.76-.02s.56-.01.87-.02c.31-.01.61-.01.91-.01.82 0 1.5.1 2.06.31.5.17.96.45 1.34.82.32.32.57.71.73 1.14.149.42.229.85.229 1.3.001.86-.199 1.57-.6 2.13zm7.091 3.89c-.28.4-.671.709-1.12.891-.49.209-1.09.318-1.811.318-.459 0-.91-.039-1.359-.129-.35-.061-.7-.17-1.02-.32-.07-.039-.121-.109-.111-.189v-1.74c0-.029.011-.07.041-.09.029-.02.06-.01.09.01.39.23.8.391 1.24.49.379.1.779.15 1.18.15.38 0 .65-.051.83-.141.16-.07.27-.24.27-.42 0-.141-.08-.27-.24-.4-.16-.129-.489-.279-.979-.471-.51-.18-.979-.42-1.42-.719-.31-.221-.569-.51-.761-.85-.159-.32-.239-.67-.229-1.021 0-.43.12-.84.341-1.21.25-.4.619-.72 1.049-.92.469-.239 1.059-.349 1.769-.349.41 0 .83.03 1.24.09.3.04.59.12.86.23.039.01.08.05.1.09.01.04.02.08.02.12v1.63c0 .04-.02.08-.05.1-.09.02-.14.02-.18 0-.3-.16-.62-.27-.96-.34-.37-.08-.74-.13-1.12-.13-.2-.01-.41.02-.601.07-.129.03-.24.1-.31.2-.05.08-.08.18-.08.27s.04.18.101.26c.09.11.209.2.34.27.229.12.47.23.709.33.541.18 1.061.43 1.541.73.33.209.6.49.789.83.16.318.24.67.23 1.029.011.471-.129.94-.389 1.331z"/></svg>`,
    aftereffects: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.54 10.73c-.1-.31-.19-.61-.29-.92s-.19-.6-.27-.89c-.08-.28-.15-.54-.22-.78h-.02c-.09.43-.2.86-.34 1.29-.15.48-.3.98-.46 1.48-.13.51-.29.98-.44 1.4h2.54c-.06-.21-.14-.46-.23-.72-.09-.27-.18-.56-.27-.86zm8.58-.29c-.55-.03-1.07.26-1.33.76-.12.23-.19.47-.22.72h2.109c.26 0 .45 0 .57-.01.08-.01.16-.03.23-.08v-.1c0-.13-.021-.25-.061-.37-.178-.56-.708-.94-1.298-.92zM19.75.3H4.25C1.9.3 0 2.2 0 4.55v14.9c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zm-7.04 16.511h-2.09c-.07.01-.14-.041-.16-.11l-.82-2.4H5.92l-.76 2.36c-.02.09-.1.15-.19.14H3.09c-.11 0-.14-.06-.11-.18L6.2 7.39c.03-.1.06-.19.1-.31.04-.21.06-.43.06-.65-.01-.05.03-.1.08-.11h2.59c.07 0 .12.03.13.08l3.65 10.25c.03.11.001.161-.1.161zm7.851-3.991c-.021.189-.031.33-.041.42-.01.07-.069.13-.14.13-.06 0-.17.01-.33.021-.159.02-.35.029-.579.029-.23 0-.471-.04-.73-.04h-3.17c.039.31.14.62.31.89.181.271.431.48.729.601.4.17.841.26 1.281.25.35-.011.699-.04 1.039-.11.311-.039.61-.119.891-.23.05-.039.08-.02.08.08v1.531c0 .039-.01.08-.021.119-.021.03-.04.051-.069.07-.32.14-.65.24-1 .3-.471.09-.94.13-1.42.12-.761 0-1.4-.12-1.92-.35-.49-.211-.921-.541-1.261-.95-.319-.39-.55-.83-.69-1.31-.14-.471-.209-.961-.209-1.461 0-.539.08-1.07.25-1.59.16-.5.41-.96.75-1.37.33-.4.739-.72 1.209-.95.471-.23 1.03-.31 1.67-.31.531-.01 1.06.09 1.55.31.41.18.77.45 1.05.8.26.34.47.72.601 1.14.129.4.189.81.189 1.22 0 .24-.01.45-.019.64z"/></svg>`,
    figma: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"/></svg>`,
    premiere: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10.15 8.42a2.93 2.93 0 00-1.18-.2 13.9 13.9 0 00-1.09.02v3.36l.39.02h.53c.39 0 .78-.06 1.15-.18.32-.09.6-.28.82-.53.21-.25.31-.59.31-1.03a1.45 1.45 0 00-.93-1.46zM19.75.3H4.25A4.25 4.25 0 000 4.55v14.9c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zm-7.09 11.65c-.4.56-.96.98-1.61 1.22-.68.25-1.43.34-2.25.34l-.5-.01-.43-.01v3.21a.12.12 0 01-.11.14H5.82c-.08 0-.12-.04-.12-.13V6.42c0-.07.03-.11.1-.11l.56-.01.76-.02.87-.02.91-.01c.82 0 1.5.1 2.06.31.5.17.96.45 1.34.82.32.32.57.71.73 1.14.15.42.23.85.23 1.3 0 .86-.2 1.57-.6 2.13zm6.82-3.15v1.95c0 .08-.05.11-.16.11a4.35 4.35 0 00-1.92.37c-.19.09-.37.21-.51.37v5.1c0 .1-.04.14-.13.14h-1.97a.14.14 0 01-.16-.12v-5.58l-.01-.75-.02-.78c0-.23-.02-.45-.04-.68a.1.1 0 01.07-.11h1.78c.1 0 .18.07.2.16a3.03 3.03 0 01.13.92c.3-.35.67-.64 1.08-.86a3.1 3.1 0 011.52-.39c.07-.01.13.04.14.11v.04z"/></svg>`,
    flutter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z"/></svg>`,
    illustrator: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10.53 10.73c-.1-.31-.19-.61-.29-.92-.1-.31-.19-.6-.27-.89-.08-.28-.15-.54-.22-.78h-.02c-.09.43-.2.86-.34 1.29-.15.48-.3.98-.46 1.48-.14.51-.29.98-.44 1.4h2.54c-.06-.211-.14-.46-.23-.721-.09-.269-.18-.559-.27-.859zM19.75.3H4.25C1.9.3 0 2.2 0 4.55v14.9c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zM14.7 16.83h-2.091c-.069.01-.139-.04-.159-.11l-.82-2.38H7.91l-.76 2.35c-.02.09-.1.15-.19.141H5.08c-.11 0-.14-.061-.11-.18L8.19 7.38c.03-.1.06-.21.1-.33.04-.21.06-.43.06-.65-.01-.05.03-.1.08-.11h2.59c.08 0 .12.03.13.08l3.65 10.3c.03.109 0 .16-.1.16zm3.4-.15c0 .11-.039.16-.129.16H16.01c-.1 0-.15-.061-.15-.16v-7.7c0-.1.041-.14.131-.14h1.98c.09 0 .129.05.129.14v7.7zm-.209-9.03c-.231.24-.571.37-.911.35-.33.01-.65-.12-.891-.35-.23-.25-.35-.58-.34-.92-.01-.34.12-.66.359-.89.242-.23.562-.35.892-.35.391 0 .689.12.91.35.22.24.34.56.33.89.01.34-.11.67-.349.92z"/></svg>`
  };

  const brandNames = {
    react: 'React',
    angular: 'Angular',
    photoshop: 'Photoshop',
    aftereffects: 'After Effects',
    figma: 'Figma',
    premiere: 'Premiere Pro',
    flutter: 'Flutter',
    illustrator: 'Illustrator'
  };

  // Define brands to spawn (duplicate to make it crowded and fun!)
  const brandsToSpawn = [
    'react', 'angular', 'photoshop', 'aftereffects',
    'figma', 'premiere', 'flutter', 'illustrator',
    'react', 'photoshop', 'figma', 'aftereffects' // Duplicates
  ];

  // ── Matter.js Destructuring ──
  const { Engine, World, Bodies, Composite, Mouse, MouseConstraint, Runner, Body } = window.Matter;

  // 1. Create Engine
  const engine = Engine.create({
    gravity: { y: 0.9, x: 0 }
  });
  const world = engine.world;

  // 2. Create invisible Renderer (we only use it to feed mouse coordinates & bounds)
  const rect = container.getBoundingClientRect();
  const width = rect.width || 800;
  const height = rect.height || 450;
  let currentWidth = width;
  let currentHeight = height;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  container.appendChild(canvas);

  // 3. Create Walls (Thick enough so bodies never tunnel out)
  const wallThickness = 100;
  const wallOptions = { isStatic: true, friction: 0.2, restitution: 0.6 };

  let ground = Bodies.rectangle(width / 2, height + wallThickness / 2, width * 2, wallThickness, wallOptions);
  let ceiling = Bodies.rectangle(width / 2, -wallThickness / 2, width * 2, wallThickness, wallOptions);
  let leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions);
  let rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions);

  World.add(world, [ground, ceiling, leftWall, rightWall]);

  // 4. Set up Mouse & Mouse Drag Constraint
  const mouse = Mouse.create(canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.1,
      render: { visible: false }
    }
  });
  World.add(world, mouseConstraint);

  // Keep mouse scrolling enabled on mobile/touch screens
  mouseConstraint.mouse.element.removeEventListener('mousewheel', mouseConstraint.mouse.mousewheel);
  mouseConstraint.mouse.element.removeEventListener('DOMMouseScroll', mouseConstraint.mouse.mousewheel);

  // Trackers to sync DOM elements with Matter.js physical bodies
  let trackers = [];

  // Spawn Brand Pill function
  function spawnBrandPill(brand, index) {
    // A. Create DOM Pill
    const pill = document.createElement('div');
    pill.className = 'physics-pill';
    pill.setAttribute('data-brand', brand);
    pill.innerHTML = `${brandLogos[brand]} <span>${brandNames[brand]}</span>`;
    container.appendChild(pill);

    // B. Measure exact size (DOM must be inserted to measure correctly)
    const pillWidth = pill.offsetWidth || 130;
    const pillHeight = pill.offsetHeight || 42;

    // C. Calculate spawn position
    // Distribute them evenly along the top area to prevent overlap glitches
    const colCount = 4;
    const col = index % colCount;
    const row = Math.floor(index / colCount);
    const spawnX = (width / (colCount + 1)) * (col + 1) + (Math.random() - 0.5) * 30;
    const spawnY = 50 + row * 60;

    // D. Create matching rounded capsule/pill physical body
    const body = Bodies.rectangle(spawnX, spawnY, pillWidth, pillHeight, {
      chamfer: { radius: pillHeight / 2 },
      friction: 0.08,
      frictionAir: 0.01,
      restitution: 0.65,
      density: 0.002
    });

    // Random slight rotation to make it feel natural
    Body.setAngle(body, (Math.random() - 0.5) * 0.4);

    World.add(world, body);

    trackers.push({
      body: body,
      dom: pill,
      width: pillWidth,
      height: pillHeight,
      brand: brand
    });
  }

  // Initial Spawn
  brandsToSpawn.forEach((brand, i) => {
    spawnBrandPill(brand, i);
  });

  // 5. Physics Runner & Start Loops
  const runner = Runner.create();
  Runner.run(runner, engine);

  // Track Mouse Movement for Velocity Hover Tossing
  let currentMousePos = { x: 0, y: 0 };
  let lastMousePos = { x: 0, y: 0 };
  let isMouseInContainer = false;

  container.addEventListener('mousemove', (e) => {
    isMouseInContainer = true;
    const containerRect = container.getBoundingClientRect();
    lastMousePos.x = currentMousePos.x;
    lastMousePos.y = currentMousePos.y;
    currentMousePos.x = e.clientX - containerRect.left;
    currentMousePos.y = e.clientY - containerRect.top;
  });

  container.addEventListener('mouseenter', () => {
    isMouseInContainer = true;
  });

  container.addEventListener('mouseleave', () => {
    isMouseInContainer = false;
    document.body.classList.remove('cursor-hover');
  });

  // Touch tracking for mobile swipe-tossing
  container.addEventListener('touchmove', (e) => {
    isMouseInContainer = true;
    const containerRect = container.getBoundingClientRect();
    if (e.touches && e.touches[0]) {
      lastMousePos.x = currentMousePos.x;
      lastMousePos.y = currentMousePos.y;
      currentMousePos.x = e.touches[0].clientX - containerRect.left;
      currentMousePos.y = e.touches[0].clientY - containerRect.top;
    }
  }, { passive: true });

  container.addEventListener('touchend', () => {
    isMouseInContainer = false;
  });

  // 6. DOM Synchronization Loop (Tick)
  window.Matter.Events.on(engine, 'afterUpdate', () => {
    const activeDragBody = mouseConstraint.body;

    // A. Apply mouse/touch hover velocity force (Physics waving/tossing!)
    const dx = currentMousePos.x - lastMousePos.x;
    const dy = currentMousePos.y - lastMousePos.y;
    const mouseSpeed = Math.sqrt(dx * dx + dy * dy);

    if (isMouseInContainer && mouseSpeed > 1.2) {
      trackers.forEach(item => {
        const { body } = item;
        // Don't toss a body currently being dragged
        if (body === activeDragBody) return;

        const bodyDx = body.position.x - currentMousePos.x;
        const bodyDy = body.position.y - currentMousePos.y;
        const dist = Math.sqrt(bodyDx * bodyDx + bodyDy * bodyDy);

        // Attractor/Push radius: 120px
        const effectRadius = 130;
        if (dist < effectRadius) {
          // Calculate force proportional to mouse speed & proximity
          const forceFactor = (1 - dist / effectRadius) * mouseSpeed * 0.00018;
          const force = {
            x: (dx / mouseSpeed) * forceFactor,
            y: (dy / mouseSpeed) * forceFactor
          };
          Body.applyForce(body, body.position, force);
        }
      });
    }

    // In Zero-G, apply a gentle micro-attractor toward center so elements float gracefully and don't drift away completely
    const isZeroG = engine.gravity.y === 0;
    if (isZeroG) {
      const centerX = currentWidth / 2;
      const centerY = currentHeight / 2;
      trackers.forEach(item => {
        const { body } = item;
        const toCenterX = centerX - body.position.x;
        const toCenterY = centerY - body.position.y;
        const dist = Math.sqrt(toCenterX * toCenterX + toCenterY * toCenterY) || 1;
        
        // Exceedingly tiny pull force towards center
        Body.applyForce(body, body.position, {
          x: (toCenterX / dist) * 0.00002 * body.mass,
          y: (toCenterY / dist) * 0.00002 * body.mass
        });

        // Add visual floating angular torque
        body.torque += (Math.random() - 0.5) * 0.0001;
      });
    }

    // B. Sync DOM position, rotation & active classes
    trackers.forEach(item => {
      const { body, dom, width: w, height: h } = item;
      const posX = body.position.x;
      const posY = body.position.y;
      const angle = body.angle;

      // Update transform style 
      dom.style.transform = `translate3d(${posX - w / 2}px, ${posY - h / 2}px, 0px) rotate(${angle}rad)`;

      // Identify if hovered under mouse
      const isHovered = isMouseInContainer && 
        posX - w/2 <= currentMousePos.x && currentMousePos.x <= posX + w/2 &&
        posY - h/2 <= currentMousePos.y && currentMousePos.y <= posY + h/2;

      // Apply active states (glowing styles)
      const isDragging = activeDragBody === body;
      const isMovingFast = body.speed > 1.2;

      if (isDragging) {
        dom.classList.add('is-dragging', 'is-active');
      } else if (isHovered || isMovingFast) {
        dom.classList.add('is-active');
        dom.classList.remove('is-dragging');
      } else {
        dom.classList.remove('is-active', 'is-dragging');
      }
    });

    // Reset mouse movement velocity delta
    lastMousePos.x = currentMousePos.x;
    lastMousePos.y = currentMousePos.y;
  });

  // 7. Window Resize Handler
  function handleResize() {
    if (!container) return;
    const newRect = container.getBoundingClientRect();
    const newW = newRect.width;
    const newH = newRect.height;

    currentWidth = newW;
    currentHeight = newH;

    // Rescale Canvas
    canvas.width = newW;
    canvas.height = newH;

    // Reposition Walls
    Body.setPosition(ground, { x: newW / 2, y: newH + wallThickness / 2 });
    Body.setPosition(ceiling, { x: newW / 2, y: -wallThickness / 2 });
    Body.setPosition(leftWall, { x: -wallThickness / 2, y: newH / 2 });
    Body.setPosition(rightWall, { x: newW + wallThickness / 2, y: newH / 2 });

    // scale physical shapes to match responsive DOM pill widths/heights
    trackers.forEach(item => {
      const { body, dom } = item;
      
      // Measure actual current DOM sizes
      const newPillW = dom.offsetWidth || 130;
      const newPillH = dom.offsetHeight || 42;
      
      // Calculate scaling relative to last recorded size
      const scaleX = newPillW / item.width;
      const scaleY = newPillH / item.height;
      
      // Scale Matter.js body
      Body.scale(body, scaleX, scaleY);
      
      // Update recorded sizing reference
      item.width = newPillW;
      item.height = newPillH;

      // Keep bodies within bounds if walls shrink
      const posX = Math.max(newPillW / 2, Math.min(newW - newPillW / 2, body.position.x));
      const posY = Math.max(newPillH / 2, Math.min(newH - newPillH / 2, body.position.y));
      Body.setPosition(body, { x: posX, y: posY });
    });
  }

  // Bind resize observer or standard window resize
  window.addEventListener('resize', handleResize);

  // 8. Sandbox Controls Implementation

  // Reset Box Action
  btnReset.addEventListener('click', () => {
    trackers.forEach((item, index) => {
      const { body, height: h } = item;

      // Calculate starting position grids
      const colCount = 4;
      const col = index % colCount;
      const row = Math.floor(index / colCount);
      const spawnX = (currentWidth / (colCount + 1)) * (col + 1) + (Math.random() - 0.5) * 30;
      const spawnY = 60 + row * 65;

      // Teleport body
      Body.setPosition(body, { x: spawnX, y: spawnY });
      Body.setVelocity(body, { x: 0, y: 0 });
      Body.setAngularVelocity(body, 0);
      Body.setAngle(body, (Math.random() - 0.5) * 0.4);
    });
  });

  // Zero-Gravity Toggle
  let zeroGActive = false;
  btnGravity.addEventListener('click', () => {
    zeroGActive = !zeroGActive;
    if (zeroGActive) {
      engine.gravity.y = 0;
      btnGravity.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;"><path d="M12 2v20M17 5l-5-5-5 5M17 19l-5 5-5-5"/></svg> Gravity: Zero-G`;
      btnGravity.classList.add('btn-primary');
      btnGravity.classList.remove('btn-secondary');
    } else {
      engine.gravity.y = 0.9;
      btnGravity.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;"><path d="M12 2v20M17 5l-5-5-5 5M17 19l-5 5-5-5"/></svg> Toggle Zero-G`;
      btnGravity.classList.remove('btn-primary');
      btnGravity.classList.add('btn-secondary');
    }
  });

  // Burst Explosion Action
  btnBurst.addEventListener('click', () => {
    trackers.forEach(item => {
      const { body } = item;
      const centerX = currentWidth / 2;
      const centerY = currentHeight / 2;
      
      // Angle vector from center
      const angleVectorX = body.position.x - centerX;
      const angleVectorY = body.position.y - centerY;
      const distance = Math.sqrt(angleVectorX * angleVectorX + angleVectorY * angleVectorY) || 1;
      
      // Explosion speed strength
      const explosionStrength = 0.03;
      
      // Set outward impulse force
      const force = {
        x: (angleVectorX / distance) * explosionStrength * body.mass,
        y: (angleVectorY / distance) * explosionStrength * body.mass - 0.015 * body.mass // upward blast bias
      };
      
      Body.applyForce(body, body.position, force);
      
      // Set random spin
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.45);
    });
  });
}

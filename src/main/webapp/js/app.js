/* =========================================================
   MI REPOSITORIO UPLA
   ACADEMIC JOURNEY UI
   ========================================================= */

@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap');


/* =========================================================
   VARIABLES
   ========================================================= */

:root {

    --bg: #f4f7f5;
    --surface: #ffffff;
    --surface-soft: #eef4f1;

    --dark: #0d1916;
    --dark-2: #13241f;

    --green: #1c5c4d;
    --green-2: #277865;
    --green-3: #3aa67f;

    --mint: #9ce6c3;
    --mint-light: #d9f8e9;

    --lime: #dff477;
    --lime-soft: #f0f8bd;

    --text: #17221e;
    --text-2: #3c4b45;
    --muted: #75827d;

    --line: rgba(13, 25, 22, .10);
    --line-light: rgba(255,255,255,.12);

    --shadow-sm:
        0 8px 25px rgba(20,40,32,.06);

    --shadow:
        0 18px 50px rgba(20,40,32,.10);

    --shadow-lg:
        0 35px 80px rgba(20,40,32,.14);

    --radius-sm: 14px;
    --radius: 22px;
    --radius-lg: 34px;

    --ease:
        cubic-bezier(.2,.8,.2,1);
}


/* =========================================================
   RESET
   ========================================================= */

* {
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {

    margin: 0;

    font-family:
        "DM Sans",
        "Segoe UI",
        Arial,
        sans-serif;

    color: var(--text);

    background:
        linear-gradient(
            rgba(20,50,40,.035) 1px,
            transparent 1px
        ),
        linear-gradient(
            90deg,
            rgba(20,50,40,.035) 1px,
            transparent 1px
        ),
        var(--bg);

    background-size:
        42px 42px;

    min-height: 100vh;

    overflow-x: hidden;
}

body::before {

    content: "";

    position: fixed;

    width: 450px;
    height: 450px;

    top: -180px;
    right: -180px;

    border-radius: 50%;

    background:
        rgba(156,230,195,.22);

    filter: blur(10px);

    pointer-events: none;

    z-index: -1;
}

body::after {

    content: "";

    position: fixed;

    width: 400px;
    height: 400px;

    bottom: -200px;
    left: -150px;

    border-radius: 50%;

    background:
        rgba(223,244,119,.15);

    pointer-events: none;

    z-index: -1;
}

a {
    color: inherit;
    text-decoration: none;
}

button,
input,
textarea,
select {
    font: inherit;
}

button {
    cursor: pointer;
}

img {
    max-width: 100%;
}

.hidden {
    display: none !important;
}

.wrap {

    width:
        min(1180px, calc(100% - 40px));

    margin-inline: auto;
}


/* =========================================================
   SCROLLBAR
   ========================================================= */

::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: #edf2ef;
}

::-webkit-scrollbar-thumb {

    background: #9bb9ae;

    border-radius: 20px;

    border: 3px solid #edf2ef;
}

::-webkit-scrollbar-thumb:hover {
    background: var(--green);
}


/* =========================================================
   TOP STRIP
   ========================================================= */

.top-strip {

    background: var(--dark);

    color: rgba(255,255,255,.70);

    font-size: 13px;
}

.top-strip__inner {

    min-height: 37px;

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 20px;
}

.top-actions {

    display: flex;

    align-items: center;

    gap: 14px;
}

.top-btn {

    border: 0;

    background: transparent;

    color: var(--mint);

    font-weight: 700;

    padding: 4px;

    transition: .2s ease;
}

.top-btn:hover {
    color: white;
}


/* =========================================================
   HEADER
   ========================================================= */

.site-header {

    position: sticky;

    top: 0;

    z-index: 100;

    background:
        rgba(255,255,255,.88);

    backdrop-filter:
        blur(18px);

    border-bottom:
        1px solid var(--line);
}

.site-header__inner {

    min-height: 78px;

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 30px;
}


/* =========================================================
   BRAND
   ========================================================= */

.brand {

    display: flex;

    align-items: center;

    gap: 13px;
}

.brand-mark {

    width: 45px;
    height: 45px;

    border-radius: 14px;

    display: grid;

    place-items: center;

    background: var(--dark);

    color: var(--lime);

    font-family: "Manrope", sans-serif;

    font-weight: 800;

    font-size: 19px;

    box-shadow:
        0 8px 25px rgba(13,25,22,.15);

    transition:
        transform .25s var(--ease);
}

.brand:hover .brand-mark {
    transform: rotate(-7deg) scale(1.05);
}

.brand strong {

    display: block;

    font-family:
        "Manrope",
        sans-serif;

    font-size: 17px;

    letter-spacing: -.02em;
}

.brand span {

    display: block;

    color: var(--muted);

    font-size: 11px;

    margin-top: 2px;
}


/* =========================================================
   NAV
   ========================================================= */

.main-nav {

    display: flex;

    align-items: center;

    gap: 5px;

    padding: 5px;

    border:
        1px solid var(--line);

    background:
        rgba(244,247,245,.8);

    border-radius: 16px;
}

.main-nav a {

    position: relative;

    padding:
        10px 15px;

    border-radius: 11px;

    color: var(--text-2);

    font-size: 14px;

    font-weight: 600;

    transition:
        all .25s var(--ease);
}

.main-nav a:hover {

    background: white;

    color: var(--dark);
}

.main-nav a.active {

    background: var(--dark);

    color: white;

    box-shadow:
        0 8px 20px rgba(13,25,22,.13);
}

.menu-toggle {

    display: none;

    border: 1px solid var(--line);

    border-radius: 12px;

    background: white;

    color: var(--text);

    padding:
        10px 15px;

    font-weight: 700;
}


/* =========================================================
   GENERAL
   ========================================================= */

.section {

    padding:
        80px 0;
}

.eyebrow {

    display: inline-flex;

    align-items: center;

    gap: 8px;

    color: var(--green);

    font-size: 11px;

    font-weight: 800;

    letter-spacing: .13em;

    text-transform: uppercase;
}

.eyebrow::before {

    content: "";

    width: 19px;

    height: 2px;

    background: currentColor;

    border-radius: 20px;
}

.section-head {

    display: flex;

    align-items: flex-end;

    justify-content: space-between;

    gap: 30px;

    margin-bottom: 32px;
}

.section-head h2 {

    margin:
        7px 0 0;

    font-family:
        "Manrope",
        sans-serif;

    font-size:
        clamp(27px,4vw,42px);

    line-height: 1.05;

    letter-spacing: -.045em;
}


/* =========================================================
   HOME HERO
   ========================================================= */

.hero {

    position: relative;

    overflow: hidden;

    padding:
        105px 0 90px;

    color: white;

    background:
        radial-gradient(
            circle at 75% 20%,
            rgba(156,230,195,.18),
            transparent 28%
        ),
        radial-gradient(
            circle at 10% 90%,
            rgba(223,244,119,.10),
            transparent 28%
        ),
        var(--dark);
}

.hero::before {

    content: "";

    position: absolute;

    inset: 0;

    background:
        linear-gradient(
            rgba(255,255,255,.025) 1px,
            transparent 1px
        ),
        linear-gradient(
            90deg,
            rgba(255,255,255,.025) 1px,
            transparent 1px
        );

    background-size:
        45px 45px;

    pointer-events: none;
}

.hero__inner {

    position: relative;

    z-index: 2;

    display: grid;

    grid-template-columns:
        minmax(0,1.3fr)
        minmax(300px,.7fr);

    gap: 70px;

    align-items: center;
}

.hero .eyebrow {
    color: var(--mint);
}

.hero h1 {

    max-width: 700px;

    margin:
        18px 0;

    font-family:
        "Manrope",
        sans-serif;

    font-size:
        clamp(48px,7vw,85px);

    line-height: .94;

    letter-spacing: -.065em;
}

.hero__copy > p {

    max-width: 620px;

    color:
        rgba(255,255,255,.68);

    font-size: 18px;

    line-height: 1.75;
}

.hero__actions {

    display: flex;

    flex-wrap: wrap;

    gap: 12px;

    margin-top: 30px;
}


/* =========================================================
   BUTTONS
   ========================================================= */

.btn {

    min-height: 48px;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    padding:
        0 21px;

    border:
        1px solid transparent;

    border-radius:
        13px;

    font-weight: 800;

    font-size: 14px;

    transition:
        transform .25s var(--ease),
        box-shadow .25s var(--ease),
        background .25s ease;
}

.btn:hover {

    transform:
        translateY(-3px);
}

.btn.primary {

    background:
        var(--lime);

    color:
        var(--dark);

    box-shadow:
        0 12px 30px
        rgba(223,244,119,.13);
}

.btn.primary:hover {

    box-shadow:
        0 16px 35px
        rgba(223,244,119,.22);
}

.btn.secondary {

    color: white;

    border-color:
        rgba(255,255,255,.18);

    background:
        rgba(255,255,255,.07);

    backdrop-filter:
        blur(10px);
}

.btn.secondary:hover {

    background:
        rgba(255,255,255,.12);
}


/* =========================================================
   HERO CARD
   ========================================================= */

.hero-card {

    position: relative;

    padding:
        32px;

    border:
        1px solid
        rgba(255,255,255,.12);

    border-radius:
        var(--radius-lg);

    background:
        rgba(255,255,255,.065);

    backdrop-filter:
        blur(16px);

    box-shadow:
        0 35px 80px
        rgba(0,0,0,.18);
}

.hero-card::before {

    content: "";

    position: absolute;

    width: 11px;
    height: 11px;

    top: 25px;
    right: 25px;

    border-radius: 50%;

    background:
        var(--lime);

    box-shadow:
        0 0 0 7px
        rgba(223,244,119,.08);
}

.hero-card small {

    color:
        var(--mint);

    font-weight: 800;

    text-transform: uppercase;

    letter-spacing: .1em;

    font-size: 10px;
}

.hero-card > strong {

    display: block;

    margin:
        13px 0;

    font-family:
        "Manrope",
        sans-serif;

    font-size: 27px;

    line-height: 1.1;
}

.hero-card > p {

    color:
        rgba(255,255,255,.60);

    line-height: 1.65;
}

.hero-card__stats {

    display: grid;

    grid-template-columns:
        repeat(2,1fr);

    gap: 10px;

    margin-top: 25px;
}

.hero-card__stats div {

    padding:
        18px;

    border-radius:
        16px;

    background:
        rgba(255,255,255,.07);

    border:
        1px solid
        rgba(255,255,255,.08);
}

.hero-card__stats b {

    display: block;

    color:
        var(--lime);

    font-family:
        "Manrope",
        sans-serif;

    font-size: 28px;
}

.hero-card__stats span {

    color:
        rgba(255,255,255,.55);

    font-size: 12px;
}


/* =========================================================
   QUICK CARDS
   ========================================================= */

.quick-grid {

    display: grid;

    grid-template-columns:
        repeat(3,1fr);

    gap: 17px;
}

.quick-card {

    position: relative;

    overflow: hidden;

    min-height: 220px;

    display: flex;

    flex-direction: column;

    justify-content:
        space-between;

    padding:
        27px;

    background:
        var(--surface);

    border:
        1px solid var(--line);

    border-radius:
        var(--radius);

    box-shadow:
        var(--shadow-sm);

    transition:
        all .3s var(--ease);
}

.quick-card::after {

    content: "";

    position: absolute;

    width: 120px;
    height: 120px;

    border-radius: 50%;

    right: -70px;
    top: -70px;

    background:
        var(--mint-light);

    transition:
        transform .4s var(--ease);
}

.quick-card:hover {

    transform:
        translateY(-7px);

    box-shadow:
        var(--shadow);
}

.quick-card:hover::after {

    transform:
        scale(1.5);
}

.quick-card strong {

    position: relative;

    z-index: 2;

    max-width: 200px;

    font-family:
        "Manrope",
        sans-serif;

    font-size: 21px;

    letter-spacing: -.03em;
}

.quick-card p {

    position: relative;

    z-index: 2;

    color:
        var(--muted);

    line-height: 1.65;

    font-size: 14px;
}

.link-arrow {

    position: relative;

    z-index: 2;

    color:
        var(--green);

    font-size: 13px;

    font-weight: 800;
}


/* =========================================================
   PAGE BANNER
   ========================================================= */

.page-banner {

    position: relative;

    overflow: hidden;

    padding:
        70px 0;

    background:
        var(--dark);

    color: white;
}

.page-banner::after {

    content: "";

    position: absolute;

    width: 330px;
    height: 330px;

    right: -100px;
    top: -160px;

    border-radius: 50%;

    background:
        rgba(156,230,195,.12);
}

.page-banner .eyebrow {
    color: var(--mint);
}

.page-banner h1 {

    margin:
        12px 0 8px;

    font-family:
        "Manrope",
        sans-serif;

    font-size:
        clamp(38px,6vw,65px);

    line-height: 1;

    letter-spacing: -.055em;
}

.page-banner p {

    max-width: 650px;

    color:
        rgba(255,255,255,.60);

    line-height: 1.7;
}


/* =========================================================
   NUEVO MAPA ACADÉMICO
   ========================================================= */

.academic-journey-hero {

    position: relative;

    overflow: hidden;

    padding:
        95px 0 85px;

    color: white;

    background:
        radial-gradient(
            circle at 75% 20%,
            rgba(156,230,195,.18),
            transparent 30%
        ),
        radial-gradient(
            circle at 15% 100%,
            rgba(223,244,119,.10),
            transparent 30%
        ),
        var(--dark);
}

.academic-journey-hero::before {

    content: "";

    position: absolute;

    inset: 0;

    opacity: .5;

    background-image:
        radial-gradient(
            rgba(255,255,255,.11)
            1px,
            transparent 1px
        );

    background-size:
        28px 28px;

    pointer-events: none;
}

.journey-hero-grid {

    position: relative;

    z-index: 2;

    display: grid;

    grid-template-columns:
        minmax(0,1.3fr)
        minmax(300px,.7fr);

    gap: 75px;

    align-items: center;
}

.journey-kicker {

    display: inline-flex;

    align-items: center;

    gap: 9px;

    color:
        var(--mint);

    font-size: 11px;

    font-weight: 800;

    letter-spacing: .14em;
}

.journey-kicker::before {

    content: "";

    width: 24px;
    height: 2px;

    background:
        currentColor;
}

.journey-kicker.dark {

    color:
        var(--green);
}

.journey-hero-copy h1 {

    margin:
        18px 0;

    max-width: 650px;

    font-family:
        "Manrope",
        sans-serif;

    font-size:
        clamp(50px,7vw,82px);

    line-height: .95;

    letter-spacing: -.065em;
}

.journey-hero-copy h1 span {

    display: block;

    color:
        var(--lime);
}

.journey-hero-copy > p {

    max-width: 600px;

    color:
        rgba(255,255,255,.63);

    font-size: 17px;

    line-height: 1.75;
}

.journey-summary {

    display: flex;

    gap: 8px;

    margin-top: 33px;
}

.journey-summary div {

    min-width: 110px;

    padding:
        15px 18px;

    border:
        1px solid
        rgba(255,255,255,.09);

    border-radius:
        15px;

    background:
        rgba(255,255,255,.055);
}

.journey-summary strong {

    display: block;

    color:
        var(--lime);

    font-family:
        "Manrope",
        sans-serif;

    font-size: 25px;
}

.journey-summary span {

    color:
        rgba(255,255,255,.50);

    font-size: 11px;
}


/* =========================================================
   PROGRESS CARD
   ========================================================= */

.journey-progress-card {

    position: relative;

    padding:
        32px;

    border-radius:
        30px;

    border:
        1px solid
        rgba(255,255,255,.12);

    background:
        rgba(255,255,255,.06);

    backdrop-filter:
        blur(18px);

    box-shadow:
        0 35px 80px
        rgba(0,0,0,.17);
}

.progress-mini-title {

    color:
        rgba(255,255,255,.50);

    font-size: 10px;

    font-weight: 800;

    letter-spacing: .14em;
}

.progress-number {

    margin:
        18px 0 13px;

    color:
        var(--lime);

    font-family:
        "Manrope",
        sans-serif;

    font-size: 72px;

    font-weight: 800;

    letter-spacing: -.07em;

    line-height: 1;
}

.progress-number small {

    font-size: 28px;

    color:
        var(--mint);
}

.progress-track {

    width: 100%;
    height: 8px;

    overflow: hidden;

    border-radius: 20px;

    background:
        rgba(255,255,255,.10);
}

.progress-fill {

    height: 100%;

    border-radius: inherit;

    background:
        linear-gradient(
            90deg,
            var(--mint),
            var(--lime)
        );

    animation:
        progressGrow
        1.2s var(--ease);
}

@keyframes progressGrow {

    from {
        width: 0;
    }
}

.journey-progress-card p {

    margin:
        17px 0;

    color:
        rgba(255,255,255,.58);

    line-height: 1.6;

    font-size: 13px;
}

.journey-admin-link {

    display: inline-flex;

    margin-top: 8px;

    color:
        var(--lime);

    font-size: 13px;

    font-weight: 800;
}

.journey-public-state {

    display: inline-flex;

    padding:
        8px 11px;

    margin-top: 6px;

    border-radius:
        9px;

    background:
        rgba(156,230,195,.09);

    color:
        var(--mint);

    font-size: 11px;

    font-weight: 800;
}


/* =========================================================
   JOURNEY SECTION
   ========================================================= */

.journey-section {

    padding:
        90px 0 110px;
}

.journey-heading {

    display: flex;

    align-items: flex-end;

    justify-content: space-between;

    gap: 50px;

    margin-bottom: 48px;
}

.journey-heading h2 {

    margin:
        11px 0 0;

    font-family:
        "Manrope",
        sans-serif;

    font-size:
        clamp(36px,5vw,60px);

    line-height: .98;

    letter-spacing: -.055em;
}

.journey-heading > p {

    max-width: 410px;

    margin: 0;

    color:
        var(--muted);

    line-height: 1.7;
}


/* =========================================================
   JOURNEY BOARD
   ========================================================= */

.journey-board {

    position: relative;

    overflow: hidden;

    padding:
        38px;

    border:
        1px solid var(--line);

    border-radius:
        34px;

    background:
        var(--surface);

    box-shadow:
        var(--shadow);

    isolation: isolate;
}

.journey-board::before {

    content: "";

    position: absolute;

    inset: 0;

    z-index: -1;

    background:
        linear-gradient(
            rgba(20,60,50,.035) 1px,
            transparent 1px
        ),
        linear-gradient(
            90deg,
            rgba(20,60,50,.035) 1px,
            transparent 1px
        );

    background-size:
        30px 30px;
}


/* =========================================================
   START
   ========================================================= */

.journey-start {

    display: flex;

    align-items: center;

    gap: 17px;

    margin-bottom: 38px;
}

.journey-start span {

    display: grid;

    place-items: center;

    width: 62px;
    height: 62px;

    border-radius: 50%;

    background:
        var(--dark);

    color:
        var(--lime);

    font-size: 9px;

    font-weight: 800;

    letter-spacing: .12em;

    box-shadow:
        0 12px 30px
        rgba(13,25,22,.15);
}

.journey-start strong {

    font-family:
        "Manrope",
        sans-serif;

    font-size: 17px;

    line-height: 1.25;
}


/* =========================================================
   PATH
   ========================================================= */

.journey-path {

    position: relative;

    display: grid;

    grid-template-columns:
        repeat(4,1fr);

    gap:
        34px 42px;

    padding:
        10px 10px 25px;
}

.journey-path::before {

    content: "";

    position: absolute;

    left: 8%;
    right: 8%;

    top: 50%;

    height: 2px;

    z-index: -1;

    background:
        repeating-linear-gradient(
            90deg,
            rgba(28,92,77,.18) 0,
            rgba(28,92,77,.18) 8px,
            transparent 8px,
            transparent 16px
        );
}


/* =========================================================
   WEEK NODE
   ========================================================= */

.journey-week {

    position: relative;

    min-height: 165px;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    text-align: center;

    padding:
        17px 10px;

    border-radius:
        22px;

    transition:
        transform .3s var(--ease),
        background .3s ease,
        box-shadow .3s var(--ease);

    animation:
        journeyEnter
        .55s var(--ease)
        both;

    animation-delay:
        calc(var(--week-index) * 45ms);
}

@keyframes journeyEnter {

    from {

        opacity: 0;

        transform:
            translateY(20px);
    }

    to {

        opacity: 1;

        transform:
            translateY(0);
    }
}

.journey-week:hover {

    z-index: 3;

    transform:
        translateY(-7px);

    background:
        var(--surface-soft);

    box-shadow:
        0 16px 35px
        rgba(20,40,32,.08);
}


/* =========================================================
   NODE
   ========================================================= */

.journey-node {

    position: relative;

    width: 67px;
    height: 67px;

    display: grid;

    place-items: center;

    border-radius: 50%;

    background:
        white;

    border:
        2px solid
        rgba(28,92,77,.18);

    box-shadow:
        0 10px 25px
        rgba(20,50,40,.10);

    transition:
        all .3s var(--ease);
}

.journey-status {

    position: relative;

    z-index: 2;

    color:
        var(--green);

    font-family:
        "Manrope",
        sans-serif;

    font-size: 16px;

    font-weight: 800;
}

.journey-pulse {

    position: absolute;

    inset: -7px;

    border-radius: 50%;

    border:
        1px solid
        rgba(28,92,77,.12);

    opacity: 0;

    transform:
        scale(.8);

    transition:
        all .3s ease;
}

.journey-week:hover
.journey-pulse {

    opacity: 1;

    transform:
        scale(1);
}

.journey-week:hover
.journey-node {

    transform:
        scale(1.08);

    border-color:
        var(--green);

    box-shadow:
        0 15px 35px
        rgba(28,92,77,.17);
}


/* =========================================================
   COMPLETED NODE
   ========================================================= */

.journey-week.completed
.journey-node {

    background:
        var(--dark);

    border-color:
        var(--dark);
}

.journey-week.completed
.journey-status {

    color:
        var(--lime);

    font-size: 20px;
}

.journey-week.completed
.journey-pulse {

    border-color:
        rgba(223,244,119,.30);
}


/* =========================================================
   WEEK INFO
   ========================================================= */

.journey-info {

    margin-top:
        13px;
}

.journey-label {

    display: block;

    color:
        var(--green);

    font-size: 9px;

    font-weight: 800;

    letter-spacing: .11em;
}

.journey-info strong {

    display: block;

    margin:
        5px 0 3px;

    font-family:
        "Manrope",
        sans-serif;

    font-size: 13px;
}

.journey-info small {

    color:
        var(--muted);

    font-size: 10px;
}


/* =========================================================
   FINISH
   ========================================================= */

.journey-finish {

    display: flex;

    align-items: center;

    justify-content: flex-end;

    gap: 14px;

    margin-top: 30px;
}

.finish-symbol {

    width: 60px;
    height: 60px;

    display: grid;

    place-items: center;

    border-radius: 18px;

    background:
        var(--lime);

    color:
        var(--dark);

    font-size: 23px;

    box-shadow:
        0 12px 30px
        rgba(170,190,70,.18);

    transform:
        rotate(5deg);
}

.journey-finish span {

    display: block;

    color:
        var(--muted);

    font-size: 9px;

    font-weight: 800;

    letter-spacing: .12em;
}

.journey-finish strong {

    display: block;

    margin-top: 3px;

    font-family:
        "Manrope",
        sans-serif;

    font-size: 17px;
}


/* =========================================================
   HELP
   ========================================================= */

.journey-help {

    max-width: 620px;

    display: flex;

    align-items: center;

    gap: 17px;

    margin:
        25px auto 0;

    padding:
        19px 22px;

    border-radius:
        18px;

    border:
        1px solid var(--line);

    background:
        rgba(255,255,255,.65);
}

.help-number {

    flex:
        0 0 42px;

    width: 42px;
    height: 42px;

    display: grid;

    place-items: center;

    border-radius: 50%;

    background:
        var(--mint-light);

    color:
        var(--green);

    font-family:
        "Manrope",
        sans-serif;

    font-weight: 800;
}

.journey-help strong {

    font-size: 13px;
}

.journey-help p {

    margin:
        4px 0 0;

    color:
        var(--muted);

    font-size: 12px;

    line-height: 1.5;
}


/* =========================================================
   FALLBACK WEEK GRID
   ========================================================= */

.week-grid {

    display: grid;

    grid-template-columns:
        repeat(4,1fr);

    gap: 17px;
}

.week-card {

    padding:
        25px;

    border:
        1px solid var(--line);

    border-radius:
        var(--radius);

    background:
        white;

    box-shadow:
        var(--shadow-sm);

    transition:
        all .3s var(--ease);
}

.week-card:hover {

    transform:
        translateY(-5px);

    box-shadow:
        var(--shadow);
}

.week-number {

    width: 48px;
    height: 48px;

    display: grid;

    place-items: center;

    margin-bottom:
        20px;

    border-radius:
        14px;

    background:
        var(--dark);

    color:
        var(--lime);

    font-family:
        "Manrope",
        sans-serif;

    font-weight: 800;
}

.week-card h3 {

    margin:
        0 0 8px;

    font-family:
        "Manrope",
        sans-serif;
}

.week-card p {

    color:
        var(--muted);

    font-size: 13px;

    line-height: 1.6;
}

.week-meta {

    color:
        var(--green);

    font-size: 11px;

    font-weight: 800;

    margin:
        17px 0;
}


/* =========================================================
   PANELS
   ========================================================= */

.panel {

    padding:
        28px;

    border:
        1px solid var(--line);

    border-radius:
        var(--radius);

    background:
        white;

    box-shadow:
        var(--shadow-sm);
}

.panel h2 {

    font-family:
        "Manrope",
        sans-serif;

    letter-spacing: -.03em;
}


/* =========================================================
   ACTIVITY + FILE LIST
   ========================================================= */

.activity-list,
.file-list {

    display: grid;

    gap: 10px;
}

.activity-row,
.file-row {

    display: flex;

    align-items: center;

    justify-content:
        space-between;

    gap: 20px;

    padding:
        18px 20px;

    border:
        1px solid var(--line);

    border-radius:
        15px;

    background:
        white;

    transition:
        all .25s var(--ease);
}

.activity-row:hover,
.file-row:hover {

    transform:
        translateX(4px);

    border-color:
        rgba(28,92,77,.25);

    box-shadow:
        var(--shadow-sm);
}

.activity-row strong,
.file-row strong {

    display: block;

    font-size: 14px;
}

.activity-row span,
.file-row span {

    display: block;

    margin-top: 4px;

    color:
        var(--muted);

    font-size: 12px;
}


/* =========================================================
   BADGES
   ========================================================= */

.badge {

    display: inline-flex !important;

    width: max-content;

    padding:
        7px 11px;

    margin: 0 !important;

    border-radius:
        20px;

    font-size:
        10px !important;

    font-weight: 800;
}

.badge.done {

    color:
        #126040;

    background:
        #dcf8e9;
}

.badge.pending {

    color:
        #795d0a;

    background:
        #fff4c7;
}


/* =========================================================
   SMALL BUTTONS
   ========================================================= */

.week-actions {

    display: flex;

    flex-wrap: wrap;

    gap: 7px;
}

.small-btn {

    display: inline-flex;

    align-items: center;

    justify-content: center;

    min-height: 35px;

    padding:
        0 12px;

    border:
        1px solid var(--line);

    border-radius:
        9px;

    background:
        white;

    color:
        var(--text);

    font-size: 11px;

    font-weight: 800;

    transition:
        all .2s ease;
}

.small-btn:hover {

    background:
        var(--surface-soft);

    transform:
        translateY(-2px);
}

.small-btn.primary {

    background:
        var(--dark);

    border-color:
        var(--dark);

    color:
        white;
}


/* =========================================================
   PROFILE
   ========================================================= */

.profile-card {

    display: grid;

    grid-template-columns:
        180px 1fr;

    gap: 45px;

    align-items: start;

    padding:
        38px;

    border:
        1px solid var(--line);

    border-radius:
        30px;

    background:
        white;

    box-shadow:
        var(--shadow);
}

.profile-avatar {

    width: 180px;
    height: 180px;

    object-fit: cover;

    border-radius:
        27px;

    border:
        7px solid
        var(--surface-soft);

    box-shadow:
        var(--shadow-sm);
}

.profile-avatar.fallback {

    display: grid;

    place-items: center;

    background:
        var(--dark);

    color:
        var(--lime);

    font-family:
        "Manrope",
        sans-serif;

    font-size: 43px;

    font-weight: 800;
}

.profile-card h2 {

    margin:
        8px 0;

    font-family:
        "Manrope",
        sans-serif;

    font-size:
        clamp(28px,4vw,42px);

    letter-spacing: -.045em;
}

.profile-card > div > p {

    max-width: 700px;

    color:
        var(--muted);

    line-height: 1.7;
}

.info-grid {

    display: grid;

    grid-template-columns:
        repeat(2,1fr);

    gap: 10px;

    margin-top: 24px;
}

.info-grid div {

    padding:
        17px;

    border-radius:
        14px;

    background:
        var(--surface-soft);
}

.info-grid span {

    display: block;

    margin-bottom: 4px;

    color:
        var(--muted);

    font-size: 10px;

    text-transform: uppercase;

    letter-spacing: .08em;

    font-weight: 700;
}

.info-grid strong {

    font-size: 13px;
}


/* =========================================================
   ADMIN
   ========================================================= */

.admin-grid {

    display: grid;

    grid-template-columns:
        repeat(2,1fr);

    gap: 20px;
}

.form-stack {

    display: grid;

    gap: 17px;

    margin-top: 22px;
}

.form-stack label {

    display: grid;

    gap: 7px;

    color:
        var(--text-2);

    font-size: 12px;

    font-weight: 700;
}

.form-stack input,
.form-stack textarea,
.form-stack select {

    width: 100%;

    border:
        1px solid var(--line);

    outline: none;

    border-radius:
        12px;

    background:
        #fafcfb;

    color:
        var(--text);

    padding:
        13px 14px;

    transition:
        border .2s ease,
        box-shadow .2s ease,
        background .2s ease;
}

.form-stack textarea {
    resize: vertical;
}

.form-stack input:focus,
.form-stack textarea:focus,
.form-stack select:focus {

    background:
        white;

    border-color:
        var(--green-3);

    box-shadow:
        0 0 0 4px
        rgba(58,166,127,.10);
}

.form-message {

    min-height: 20px;

    color:
        var(--green);

    font-size: 12px;

    font-weight: 700;
}


/* =========================================================
   MODAL
   ========================================================= */

.modal {

    position: fixed;

    inset: 0;

    z-index: 1000;

    display: none;

    align-items: center;

    justify-content: center;

    padding: 20px;

    background:
        rgba(5,15,12,.66);

    backdrop-filter:
        blur(9px);
}

.modal.open {
    display: flex;
}

.modal-card {

    width:
        min(520px,100%);

    max-height:
        calc(100vh - 40px);

    overflow-y: auto;

    padding:
        30px;

    border:
        1px solid
        rgba(255,255,255,.15);

    border-radius:
        27px;

    background:
        white;

    box-shadow:
        0 40px 100px
        rgba(0,0,0,.30);

    animation:
        modalIn .3s var(--ease);
}

@keyframes modalIn {

    from {

        opacity: 0;

        transform:
            translateY(20px)
            scale(.97);
    }

    to {

        opacity: 1;

        transform:
            translateY(0)
            scale(1);
    }
}

.modal-head {

    display: flex;

    align-items: flex-start;

    justify-content:
        space-between;

    gap: 20px;
}

.modal-head h2 {

    margin:
        7px 0 0;

    font-family:
        "Manrope",
        sans-serif;

    font-size: 28px;

    letter-spacing: -.04em;
}

.close-btn {

    border:
        1px solid var(--line);

    border-radius:
        10px;

    background:
        var(--surface-soft);

    color:
        var(--text);

    padding:
        9px 12px;

    font-size: 11px;

    font-weight: 800;
}


/* =========================================================
   PARTICLES
   ========================================================= */

.tech-particles {

    position: fixed;

    inset: 0;

    overflow: hidden;

    pointer-events: none;

    z-index: -1;
}

.tech-particle {

    position: absolute;

    border-radius: 50%;

    background:
        rgba(28,92,77,.13);

    animation:
        particleFloat
        var(--duration)
        ease-in-out
        var(--delay)
        infinite alternate;
}

@keyframes particleFloat {

    from {

        transform:
            translateY(0)
            translateX(0);

        opacity: .2;
    }

    to {

        transform:
            translateY(-45px)
            translateX(20px);

        opacity: .7;
    }
}


/* =========================================================
   FOOTER
   ========================================================= */

.site-footer {

    display: flex;

    justify-content:
        space-between;

    gap: 30px;

    padding:
        32px 0 40px;

    border-top:
        1px solid var(--line);
}

.site-footer strong {

    display: block;

    font-family:
        "Manrope",
        sans-serif;

    font-size: 14px;
}

.site-footer span {

    display: block;

    margin-top: 4px;

    color:
        var(--muted);

    font-size: 11px;
}

.site-footer p {

    max-width: 400px;

    margin: 0;

    color:
        var(--muted);

    font-size: 11px;

    line-height: 1.6;

    text-align: right;
}


/* =========================================================
   RESPONSIVE TABLET
   ========================================================= */

@media (max-width: 950px) {

    .hero__inner,
    .journey-hero-grid {

        grid-template-columns:
            1fr;

        gap: 45px;
    }

    .quick-grid {

        grid-template-columns:
            repeat(2,1fr);
    }

    .week-grid {

        grid-template-columns:
            repeat(2,1fr);
    }

    .journey-path {

        grid-template-columns:
            repeat(2,1fr);
    }

    .journey-path::before {
        display: none;
    }

    .admin-grid {

        grid-template-columns:
            1fr;
    }

}


/* =========================================================
   RESPONSIVE MOBILE
   ========================================================= */

@media (max-width: 720px) {

    .wrap {

        width:
            min(100% - 26px,1180px);
    }

    .top-strip__inner {

        min-height: 42px;
    }

    .top-strip__inner > span {
        display: none;
    }

    .top-actions {

        width: 100%;

        justify-content:
            space-between;
    }

    .site-header__inner {

        min-height: 68px;
    }

    .brand span {
        display: none;
    }

    .menu-toggle {
        display: block;
    }

    .main-nav {

        position: absolute;

        display: none;

        top: calc(100% + 8px);

        left: 13px;
        right: 13px;

        padding: 9px;

        border-radius: 17px;

        background: white;

        box-shadow:
            var(--shadow);
    }

    .main-nav.open {

        display: grid;
    }

    .main-nav a {

        padding:
            13px 14px;
    }

    .hero {

        padding:
            70px 0;
    }

    .hero h1 {

        font-size:
            clamp(43px,14vw,65px);
    }

    .section {

        padding:
            60px 0;
    }

    .quick-grid,
    .week-grid {

        grid-template-columns:
            1fr;
    }

    .section-head,
    .journey-heading {

        align-items:
            flex-start;

        flex-direction:
            column;

        gap: 18px;
    }

    .academic-journey-hero {

        padding:
            70px 0 65px;
    }

    .journey-hero-copy h1 {

        font-size:
            clamp(45px,14vw,65px);
    }

    .journey-summary {

        display: grid;

        grid-template-columns:
            repeat(3,1fr);

        gap: 6px;
    }

    .journey-summary div {

        min-width: 0;

        padding:
            13px 9px;
    }

    .journey-summary strong {

        font-size: 21px;
    }

    .journey-summary span {

        font-size: 9px;
    }

    .progress-number {

        font-size: 60px;
    }

    .journey-section {

        padding:
            65px 0 80px;
    }

    .journey-board {

        padding:
            25px 14px;
    }

    .journey-path {

        grid-template-columns:
            1fr 1fr;

        gap:
            12px 5px;

        padding:
            5px 0 15px;
    }

    .journey-week {

        min-height: 150px;

        padding:
            12px 4px;
    }

    .journey-node {

        width: 58px;
        height: 58px;
    }

    .journey-info strong {

        font-size: 11px;
    }

    .journey-info small {

        font-size: 9px;
    }

    .journey-finish {

        justify-content:
            flex-start;
    }

    .journey-help {

        align-items:
            flex-start;
    }

    .profile-card {

        grid-template-columns:
            1fr;

        gap: 25px;

        padding: 25px;
    }

    .profile-avatar {

        width: 130px;
        height: 130px;
    }

    .info-grid {

        grid-template-columns:
            1fr;
    }

    .activity-row,
    .file-row {

        align-items:
            flex-start;

        flex-direction:
            column;
    }

    .site-footer {

        flex-direction:
            column;
    }

    .site-footer p {

        text-align: left;
    }

}


/* =========================================================
   SMALL MOBILE
   ========================================================= */

@media (max-width: 430px) {

    .journey-path {

        grid-template-columns:
            1fr;
    }

    .journey-week {

        min-height: auto;

        flex-direction: row;

        justify-content:
            flex-start;

        text-align: left;

        gap: 15px;

        padding:
            13px;
    }

    .journey-info {

        margin-top: 0;
    }

    .journey-summary {

        grid-template-columns:
            1fr 1fr 1fr;
    }

    .hero-card__stats {

        grid-template-columns:
            1fr;
    }

}


/* =========================================================
   ACCESSIBILITY
   ========================================================= */

@media (prefers-reduced-motion: reduce) {

    *,
    *::before,
    *::after {

        animation-duration:
            .01ms !important;

        animation-iteration-count:
            1 !important;

        scroll-behavior:
            auto !important;

        transition-duration:
            .01ms !important;
    }

}

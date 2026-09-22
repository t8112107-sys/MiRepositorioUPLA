// =====================================================
// MI REPOSITORIO UPLA
// APP.JS COMPLETO
// =====================================================


// =====================================================
// SUPABASE
// =====================================================

const cfg = window.APP_CONFIG || {};

const configured =
    cfg.SUPABASE_URL &&
    cfg.SUPABASE_ANON_KEY &&
    !cfg.SUPABASE_URL.includes("PEGA_AQUI") &&
    !cfg.SUPABASE_ANON_KEY.includes("PEGA_AQUI");

const sb = configured
    ? window.supabase.createClient(
        cfg.SUPABASE_URL,
        cfg.SUPABASE_ANON_KEY
    )
    : null;


// =====================================================
// ELEMENTOS PRINCIPALES
// =====================================================

const app = document.getElementById("app");
const nav = document.getElementById("mainNav");
const menuToggle = document.getElementById("menuToggle");

const authModal = document.getElementById("authModal");
const loginTopBtn = document.getElementById("loginTopBtn");
const logoutTopBtn = document.getElementById("logoutTopBtn");

const userState = document.getElementById("userState");
const closeAuth = document.getElementById("closeAuth");
const loginForm = document.getElementById("loginForm");
const authMessage = document.getElementById("authMessage");

let session = null;
let profile = null;


// =====================================================
// SEMANAS
// =====================================================

const weeks = Array.from(
    { length: 16 },
    (_, i) => ({
        id: i + 1,
        title: `Semana ${String(i + 1).padStart(2, "0")}`,
        description:
            `Material académico, actividades y archivos correspondientes a la semana ${i + 1}.`
    })
);


// =====================================================
// ACTIVIDADES
// =====================================================

const activities = [
    {
        title: "Presentación del repositorio",
        week: 1,
        type: "Trabajo",
        status: "done"
    },
    {
        title: "Organización de materiales",
        week: 2,
        type: "Actividad",
        status: "done"
    },
    {
        title: "Desarrollo de contenido semanal",
        week: 3,
        type: "Práctica",
        status: "done"
    },
    {
        title: "Actualización del portafolio",
        week: 4,
        type: "Trabajo",
        status: "pending"
    }
];


// =====================================================
// MENÚ
// =====================================================

if (menuToggle && nav) {

    menuToggle.addEventListener(
        "click",
        () => {
            nav.classList.toggle("open");
        }
    );

}


// =====================================================
// MODAL LOGIN
// =====================================================

if (loginTopBtn && authModal) {

    loginTopBtn.addEventListener(
        "click",
        () => {
            authModal.classList.add("open");
        }
    );

}


if (closeAuth && authModal) {

    closeAuth.addEventListener(
        "click",
        () => {
            authModal.classList.remove("open");
        }
    );

}


if (authModal) {

    authModal.addEventListener(
        "click",
        (event) => {

            if (event.target === authModal) {
                authModal.classList.remove("open");
            }

        }
    );

}


if (logoutTopBtn) {

    logoutTopBtn.addEventListener(
        "click",
        logout
    );

}


window.addEventListener(
    "hashchange",
    render
);


// =====================================================
// LOGIN
// =====================================================

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            if (!sb) {

                if (authMessage) {
                    authMessage.textContent =
                        "Primero debes configurar Supabase en js/config.js.";
                }

                return;
            }

            if (authMessage) {
                authMessage.textContent =
                    "Iniciando sesión...";
            }

            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("loginPassword")
                    .value;

            try {

                const { data, error } =
                    await sb.auth.signInWithPassword({
                        email,
                        password
                    });

                if (error) {
                    throw error;
                }

                session = data.session;

                if (session) {
                    await loadProfile();
                }

                updateAuthUI();

                if (authMessage) {
                    authMessage.textContent = "";
                }

                if (authModal) {
                    authModal.classList.remove("open");
                }

                loginForm.reset();

                location.hash =
                    "#administrar";

            } catch (error) {

                console.error(error);

                if (authMessage) {
                    authMessage.textContent =
                        "No se pudo iniciar sesión. Verifica tu correo y contraseña.";
                }

            }

        }
    );

}


// =====================================================
// INICIAR APLICACIÓN
// =====================================================

async function init() {

    try {

        if (sb) {

            const { data, error } =
                await sb.auth.getSession();

            if (!error) {
                session = data.session;
            }

            if (session) {
                await loadProfile();
            }

            sb.auth.onAuthStateChange(
                async (_event, newSession) => {

                    session = newSession;
                    profile = null;

                    if (session) {
                        await loadProfile();
                    }

                    updateAuthUI();
                    render();

                }
            );

        }

    } catch (error) {

        console.error(
            "Error al iniciar Supabase:",
            error
        );

    }

    updateAuthUI();
    render();

}


// =====================================================
// ACTUALIZAR SESIÓN
// =====================================================

function updateAuthUI() {

    const logged = !!session;

    if (loginTopBtn) {

        loginTopBtn.classList.toggle(
            "hidden",
            logged
        );

    }

    if (logoutTopBtn) {

        logoutTopBtn.classList.toggle(
            "hidden",
            !logged
        );

    }

    document
        .querySelectorAll(".admin-link")
        .forEach((element) => {

            element.classList.toggle(
                "hidden",
                !logged
            );

        });


    if (userState) {

        userState.textContent =
            logged
                ? (
                    profile?.full_name ||
                    session.user.email
                )
                : "Invitado";

    }

}


// =====================================================
// CERRAR SESIÓN
// =====================================================

async function logout() {

    try {

        if (sb) {
            await sb.auth.signOut();
        }

    } catch (error) {

        console.error(error);

    }

    session = null;
    profile = null;

    updateAuthUI();

    location.hash =
        "#inicio";

}


// =====================================================
// CARGAR PERFIL
// =====================================================

async function loadProfile() {

    if (!sb || !session) {
        return;
    }

    try {

        const { data, error } =
            await sb
                .from("profiles")
                .select("*")
                .eq(
                    "id",
                    session.user.id
                )
                .maybeSingle();

        if (error) {
            throw error;
        }

        profile =
            data || null;

    } catch (error) {

        console.error(
            "Error al cargar perfil:",
            error
        );

        profile = null;

    }

}


// =====================================================
// NAVEGACIÓN
// =====================================================

function setActive(route) {

    document
        .querySelectorAll("[data-route]")
        .forEach((link) => {

            link.classList.toggle(
                "active",
                link.dataset.route === route
            );

        });


    if (nav) {
        nav.classList.remove("open");
    }

}


// =====================================================
// PLANTILLA INTERNA
// =====================================================

function page(
    title,
    subtitle,
    content
) {

    return `

        <section class="page-banner">

            <div class="wrap">

                <span class="eyebrow">
                    Repositorio UPLA
                </span>

                <h1>
                    ${title}
                </h1>

                <p>
                    ${subtitle}
                </p>

            </div>

        </section>


        <section class="section">

            <div class="wrap">

                ${content}

            </div>

        </section>

    `;

}


// =====================================================
// ROUTER
// =====================================================

function render() {

    if (!app) {

        console.error(
            "No se encontró #app."
        );

        return;
    }


    const raw =
        location.hash.replace("#", "") ||
        "inicio";


    const [route, param] =
        raw.split("/");


    setActive(
        route === "semana"
            ? "semanas"
            : route
    );


    switch (route) {

        case "inicio":

            renderHome();
            break;


        case "semanas":

            renderWeeks();
            break;


        case "semana":

            renderWeek(
                Number(param) || 1
            );

            break;


        case "actividades":

            renderActivities();
            break;


        case "perfil":

            renderProfile();
            break;


        case "administrar":

            renderAdmin();
            break;


        default:

            renderHome();

    }

}


// =====================================================
// INICIO
// =====================================================

function renderHome() {

    app.innerHTML = `

        <section class="hero">

            <div class="wrap hero__inner">


                <div class="hero__copy">

                    <span class="eyebrow">
                        Ingeniería de Sistemas y Computación
                    </span>


                    <h1>
                        Mi Repositorio
                        Académico
                    </h1>


                    <p>
                        Espacio personal para organizar y presentar
                        trabajos, actividades, materiales y avances
                        académicos durante las 16 semanas del ciclo.
                    </p>


                    <div class="hero__actions">

                        <a
                            href="#semanas"
                            class="btn primary"
                        >
                            Explorar mi recorrido
                        </a>


                        <a
                            href="#actividades"
                            class="btn secondary"
                        >
                            Ver actividades
                        </a>

                    </div>

                </div>



                <aside class="hero-card">

                    <small>
                        PERÍODO ACADÉMICO
                    </small>


                    <strong>
                        Mi espacio de aprendizaje
                    </strong>


                    <p>
                        Un recorrido digital donde cada semana
                        representa una nueva etapa del ciclo.
                    </p>


                    <div class="hero-card__stats">

                        <div>

                            <b>
                                16
                            </b>

                            <span>
                                Semanas
                            </span>

                        </div>


                        <div>

                            <b>
                                ${activities.length}
                            </b>

                            <span>
                                Actividades
                            </span>

                        </div>

                    </div>

                </aside>

            </div>

        </section>



        <section class="section">

            <div class="wrap">


                <div class="section-head">

                    <div>

                        <span class="eyebrow">
                            Explora mi repositorio
                        </span>

                        <h2>
                            Todo mi ciclo
                            en un solo lugar
                        </h2>

                    </div>

                </div>



                <div class="quick-grid">


                    <a
                        class="quick-card"
                        href="#semanas"
                    >

                        <strong>
                            Mi recorrido académico
                        </strong>

                        <p>
                            Explora las 16 semanas como un
                            recorrido visual durante el ciclo.
                        </p>

                        <span class="link-arrow">
                            Comenzar recorrido →
                        </span>

                    </a>



                    <a
                        class="quick-card"
                        href="#actividades"
                    >

                        <strong>
                            Actividades
                        </strong>

                        <p>
                            Consulta trabajos, prácticas y
                            actividades registradas.
                        </p>

                        <span class="link-arrow">
                            Ver actividades →
                        </span>

                    </a>



                    <a
                        class="quick-card"
                        href="#perfil"
                    >

                        <strong>
                            Perfil académico
                        </strong>

                        <p>
                            Conoce la información general
                            del estudiante y del repositorio.
                        </p>

                        <span class="link-arrow">
                            Ver perfil →
                        </span>

                    </a>


                    ${
                        session
                            ? `

                            <a
                                class="quick-card"
                                href="#administrar"
                            >

                                <strong>
                                    Administrar contenido
                                </strong>

                                <p>
                                    Agrega, edita y elimina
                                    archivos de tus semanas.
                                </p>

                                <span class="link-arrow">
                                    Administrar →
                                </span>

                            </a>

                            `
                            : ""
                    }

                </div>

            </div>

        </section>

    `;

}


// =====================================================
// RECORRIDO DE 16 SEMANAS
// =====================================================

function renderWeeks() {

    const completedWeeks =
        new Set(
            activities
                .filter(
                    (activity) =>
                        activity.status === "done"
                )
                .map(
                    (activity) =>
                        activity.week
                )
        );


    const completedCount =
        completedWeeks.size;


    const progress =
        Math.round(
            (
                completedCount /
                weeks.length
            ) * 100
        );


    const journeyWeeks =
        weeks
            .map(
                (week, index) => {

                    const completed =
                        completedWeeks.has(
                            week.id
                        );


                    const activityCount =
                        activities.filter(
                            (activity) =>
                                activity.week === week.id
                        ).length;


                    return `

                        <a
                            href="#semana/${week.id}"
                            class="journey-week ${completed ? "completed" : ""}"
                            style="--week-index:${index}"
                        >


                            <div class="journey-node">

                                <span class="journey-status">

                                    ${
                                        completed
                                            ? "✓"
                                            : String(
                                                week.id
                                            ).padStart(
                                                2,
                                                "0"
                                            )
                                    }

                                </span>


                                <span
                                    class="journey-pulse"
                                ></span>

                            </div>



                            <div class="journey-info">

                                <span class="journey-label">
                                    SEMANA
                                </span>


                                <strong>
                                    ${String(
                                        week.id
                                    ).padStart(
                                        2,
                                        "0"
                                    )}
                                </strong>


                                <small>

                                    ${
                                        activityCount > 0

                                            ? `${activityCount} ${
                                                activityCount === 1
                                                    ? "actividad"
                                                    : "actividades"
                                            }`

                                            : "Material académico"
                                    }

                                </small>

                            </div>

                        </a>

                    `;

                }
            )
            .join("");



    app.innerHTML = `


        <section class="academic-journey-hero">

            <div class="wrap journey-hero-grid">


                <div class="journey-hero-copy">

                    <span class="journey-kicker">
                        MI RECORRIDO ACADÉMICO
                    </span>


                    <h1>

                        Un ciclo.

                        <span>
                            16 etapas.
                        </span>

                    </h1>


                    <p>
                        Explora mi avance académico semana por semana.
                        Cada etapa reúne actividades, materiales,
                        trabajos y evidencias desarrolladas
                        durante el ciclo.
                    </p>



                    <div class="journey-summary">


                        <div>

                            <strong>
                                ${weeks.length}
                            </strong>

                            <span>
                                Semanas
                            </span>

                        </div>


                        <div>

                            <strong>
                                ${activities.length}
                            </strong>

                            <span>
                                Actividades
                            </span>

                        </div>


                        <div>

                            <strong>
                                ${completedCount}
                            </strong>

                            <span>
                                Completadas
                            </span>

                        </div>


                    </div>

                </div>



                <aside class="journey-progress-card">


                    <span class="progress-mini-title">
                        PROGRESO DEL CICLO
                    </span>


                    <div class="progress-number">

                        ${progress}

                        <small>
                            %
                        </small>

                    </div>



                    <div class="progress-track">

                        <div
                            class="progress-fill"
                            style="width:${progress}%"
                        ></div>

                    </div>



                    <p>
                        ${completedCount} de
                        ${weeks.length} semanas
                        registradas como completadas.
                    </p>



                    ${
                        session

                            ? `

                                <a
                                    href="#administrar"
                                    class="journey-admin-link"
                                >
                                    Administrar contenido →
                                </a>

                            `

                            : `

                                <span class="journey-public-state">
                                    Modo público
                                </span>

                            `
                    }


                </aside>

            </div>

        </section>



        <section class="journey-section">

            <div class="wrap">


                <div class="journey-heading">


                    <div>

                        <span class="journey-kicker dark">
                            MAPA DEL SEMESTRE
                        </span>


                        <h2>
                            Mi camino durante
                            el ciclo
                        </h2>

                    </div>



                    <p>
                        Selecciona cualquier semana para
                        consultar los archivos y materiales
                        académicos almacenados en ella.
                    </p>


                </div>



                <div class="journey-board">


                    <div class="journey-start">

                        <span>
                            INICIO
                        </span>

                        <strong>
                            Comienza el recorrido
                        </strong>

                    </div>



                    <div class="journey-path">

                        ${journeyWeeks}

                    </div>



                    <div class="journey-finish">


                        <div>

                            <span>
                                META
                            </span>

                            <strong>
                                Fin del ciclo
                            </strong>

                        </div>


                        <div class="finish-symbol">
                            ✓
                        </div>


                    </div>


                </div>



                <div class="journey-help">


                    <div class="help-number">
                        ?
                    </div>


                    <div>

                        <strong>
                            ¿Cómo funciona?
                        </strong>

                        <p>
                            Presiona una semana para abrir
                            sus materiales, trabajos y archivos.
                            Las semanas marcadas con ✓ contienen
                            actividades completadas.
                        </p>

                    </div>


                </div>


            </div>

        </section>

    `;

}


// =====================================================
// DETALLE DE SEMANA
// =====================================================

async function renderWeek(id) {

    const week =
        weeks.find(
            (item) =>
                item.id === id
        ) ||
        weeks[0];


    app.innerHTML =
        page(

            week.title,

            `Materiales y archivos correspondientes a la semana ${week.id}.`,

            `

            <div class="section-head">


                <div>

                    <span class="eyebrow">
                        Material académico
                    </span>

                    <h2>
                        Archivos disponibles
                    </h2>

                </div>


                ${
                    session

                        ? `

                        <button
                            class="btn primary"
                            id="addWeekFileBtn"
                        >
                            Agregar archivo
                        </button>

                        `

                        : ""
                }


            </div>



            <div class="panel">

                <div id="weekFiles">
                    Cargando archivos...
                </div>

            </div>

            `
        );


    const addButton =
        document.getElementById(
            "addWeekFileBtn"
        );


    if (addButton) {

        addButton.addEventListener(
            "click",
            () => {

                sessionStorage.setItem(
                    "selectedWeek",
                    String(week.id)
                );

                location.hash =
                    "#administrar";

            }
        );

    }


    const box =
        document.getElementById(
            "weekFiles"
        );


    if (!box) {
        return;
    }


    if (!sb) {

        box.innerHTML = `

            <div class="activity-row">

                <div>

                    <strong>
                        Supabase aún no está configurado
                    </strong>

                    <span>
                        Configura la conexión para
                        visualizar los archivos.
                    </span>

                </div>

            </div>

        `;

        return;
    }


    try {

        const { data, error } =
            await sb
                .from("repository_files")
                .select("*")
                .eq(
                    "week",
                    week.id
                )
                .order(
                    "created_at",
                    {
                        ascending: false
                    }
                );


        if (error) {
            throw error;
        }


        if (
            !data ||
            data.length === 0
        ) {

            box.innerHTML = `

                <div class="activity-row">

                    <div>

                        <strong>
                            No hay archivos
                            en esta semana
                        </strong>

                        <span>

                            ${
                                session

                                    ? "Puedes agregar el primer archivo utilizando el botón superior."

                                    : "Todavía no se ha publicado material para esta semana."
                            }

                        </span>

                    </div>

                </div>

            `;

            return;
        }


        box.innerHTML = `

            <div class="file-list">

                ${
                    data
                        .map(
                            (file) => `

                            <div class="file-row">


                                <div>

                                    <strong>
                                        ${escapeHtml(
                                            file.file_name
                                        )}
                                    </strong>

                                    <span>

                                        ${escapeHtml(
                                            file.description ||
                                            "Archivo académico"
                                        )}

                                    </span>

                                </div>



                                <div class="week-actions">


                                    <a
                                        class="small-btn primary"
                                        href="${attr(
                                            file.public_url
                                        )}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Abrir
                                    </a>


                                    ${
                                        session &&
                                        file.user_id ===
                                            session.user.id

                                            ? `

                                            <button
                                                type="button"
                                                class="small-btn"
                                                onclick="openEditFile('${file.id}')"
                                            >
                                                Editar
                                            </button>

                                            `

                                            : ""
                                    }


                                </div>


                            </div>

                            `
                        )
                        .join("")
                }

            </div>

        `;


    } catch (error) {

        console.error(error);


        box.innerHTML = `

            <div class="activity-row">

                <div>

                    <strong>
                        No se pudieron cargar
                        los archivos
                    </strong>

                    <span>
                        ${escapeHtml(
                            error.message
                        )}
                    </span>

                </div>

            </div>

        `;

    }

}


// =====================================================
// ACTIVIDADES
// =====================================================

function renderActivities() {

    app.innerHTML =
        page(

            "Actividades",

            "Trabajos, prácticas y actividades registradas en el repositorio.",

            `

            <div class="activity-list">

                ${
                    activities
                        .map(
                            (activity) => `

                            <article class="activity-row">


                                <div>

                                    <strong>
                                        ${escapeHtml(
                                            activity.title
                                        )}
                                    </strong>

                                    <span>

                                        Semana
                                        ${activity.week}

                                        ·

                                        ${escapeHtml(
                                            activity.type
                                        )}

                                    </span>

                                </div>



                                <span
                                    class="badge ${activity.status}"
                                >

                                    ${
                                        activity.status ===
                                        "done"

                                            ? "Completado"

                                            : "Pendiente"
                                    }

                                </span>


                            </article>

                            `
                        )
                        .join("")
                }

            </div>

            `
        );

}


// =====================================================
// FOTO DE PERFIL
// =====================================================

function profilePicture() {

    if (profile?.avatar_url) {

        return `

            <img
                class="profile-avatar"
                src="${attr(
                    profile.avatar_url
                )}"
                alt="Foto de perfil"
            >

        `;

    }


    const name =
        profile?.full_name ||
        "Antony Daniel";


    const initials =
        name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map(
                (word) =>
                    word[0] || ""
            )
            .join("")
            .toUpperCase();


    return `

        <div class="profile-avatar fallback">
            ${escapeHtml(initials)}
        </div>

    `;

}


// =====================================================
// PERFIL
// =====================================================

function renderProfile() {

    const name =
        profile?.full_name ||
        "Antony Daniel Leiva Cárdenas";


    const career =
        profile?.career ||
        "Ingeniería de Sistemas y Computación";


    const bio =
        profile?.bio ||
        "Repositorio académico personal para organizar trabajos, evidencias y materiales del ciclo.";


    app.innerHTML =
        page(

            "Perfil académico",

            "Información general del estudiante.",

            `

            <div class="profile-card">


                ${profilePicture()}



                <div>


                    <span class="eyebrow">
                        Estudiante
                    </span>


                    <h2>
                        ${escapeHtml(name)}
                    </h2>


                    <p>
                        ${escapeHtml(bio)}
                    </p>



                    <div class="info-grid">


                        <div>

                            <span>
                                Universidad
                            </span>

                            <strong>
                                Universidad Peruana
                                Los Andes
                            </strong>

                        </div>



                        <div>

                            <span>
                                Carrera
                            </span>

                            <strong>
                                ${escapeHtml(career)}
                            </strong>

                        </div>



                        <div>

                            <span>
                                Organización
                            </span>

                            <strong>
                                16 semanas
                            </strong>

                        </div>



                        <div>

                            <span>
                                Estado
                            </span>

                            <strong>

                                ${
                                    session
                                        ? "Sesión iniciada"
                                        : "Perfil público"
                                }

                            </strong>

                        </div>


                    </div>



                    ${
                        session

                            ? `

                            <div
                                class="hero__actions"
                                style="margin-top:20px"
                            >

                                <a
                                    class="btn primary"
                                    href="#administrar"
                                >
                                    Editar perfil
                                </a>

                            </div>

                            `

                            : ""
                    }


                </div>


            </div>

            `
        );

}


// =====================================================
// ADMINISTRAR
// =====================================================

function renderAdmin() {

    if (!session) {

        app.innerHTML =
            page(

                "Administrar",

                "Acceso exclusivo para el administrador del repositorio.",

                `

                <div class="panel">

                    <h2>
                        Inicia sesión
                    </h2>

                    <p>
                        Debes iniciar sesión para editar
                        tu perfil y administrar archivos.
                    </p>

                    <button
                        class="btn primary"
                        id="adminLoginBtn"
                    >
                        Iniciar sesión
                    </button>

                </div>

                `
            );


        const button =
            document.getElementById(
                "adminLoginBtn"
            );


        if (
            button &&
            authModal
        ) {

            button.addEventListener(
                "click",
                () => {
                    authModal.classList.add(
                        "open"
                    );
                }
            );

        }


        return;
    }


    const selectedWeek =
        Number(
            sessionStorage.getItem(
                "selectedWeek"
            )
        ) || 1;


    sessionStorage.removeItem(
        "selectedWeek"
    );


    app.innerHTML =
        page(

            "Administrar contenido",

            "Edita tu perfil y administra los archivos del repositorio.",

            `

            <div class="admin-grid">


                <section class="panel">


                    <span class="eyebrow">
                        Perfil
                    </span>


                    <h2>
                        Editar información
                    </h2>



                    <form
                        id="profileForm"
                        class="form-stack"
                    >


                        <label>

                            Nombre completo

                            <input
                                id="fullName"
                                type="text"
                                value="${attr(
                                    profile?.full_name ||
                                    ""
                                )}"
                                placeholder="Escribe tu nombre completo"
                            >

                        </label>



                        <label>

                            Carrera

                            <input
                                id="career"
                                type="text"
                                value="${attr(
                                    profile?.career ||
                                    "Ingeniería de Sistemas y Computación"
                                )}"
                            >

                        </label>



                        <label>

                            Descripción

                            <textarea
                                id="bio"
                                rows="5"
                                placeholder="Escribe una breve descripción"
                            >${escapeHtml(
                                profile?.bio ||
                                ""
                            )}</textarea>

                        </label>



                        <label>

                            Foto de perfil

                            <input
                                id="avatarFile"
                                type="file"
                                accept="image/*"
                            >

                        </label>



                        <button
                            class="btn primary"
                            type="submit"
                        >
                            Guardar cambios
                        </button>


                        <p
                            id="profileMsg"
                            class="form-message"
                        ></p>


                    </form>


                </section>



                <section class="panel">


                    <span class="eyebrow">
                        Repositorio
                    </span>


                    <h2>
                        Agregar archivo
                    </h2>



                    <form
                        id="uploadForm"
                        class="form-stack"
                    >


                        <label>

                            Semana

                            <select id="weekSelect">

                                ${
                                    weeks
                                        .map(
                                            (week) => `

                                            <option
                                                value="${week.id}"
                                                ${
                                                    week.id ===
                                                    selectedWeek

                                                        ? "selected"

                                                        : ""
                                                }
                                            >
                                                ${week.title}
                                            </option>

                                            `
                                        )
                                        .join("")
                                }

                            </select>

                        </label>



                        <label>

                            Descripción

                            <input
                                id="fileDescription"
                                type="text"
                                placeholder="Ej. Práctica de redes"
                            >

                        </label>



                        <label>

                            Seleccionar archivo

                            <input
                                id="repoFile"
                                type="file"
                                required
                            >

                        </label>



                        <button
                            class="btn primary"
                            type="submit"
                        >
                            Subir archivo
                        </button>


                        <p
                            id="uploadMsg"
                            class="form-message"
                        ></p>


                    </form>


                </section>


            </div>



            <section
                class="panel"
                style="margin-top:20px"
            >


                <div class="section-head">

                    <div>

                        <span class="eyebrow">
                            Gestión de archivos
                        </span>

                        <h2>
                            Mis archivos
                        </h2>

                    </div>

                </div>


                <div id="adminFiles">
                    Cargando archivos...
                </div>


            </section>



            <div
                id="editFileModal"
                class="modal"
            >


                <div class="modal-card">


                    <div class="modal-head">


                        <div>

                            <span class="eyebrow">
                                Archivo
                            </span>

                            <h2>
                                Editar archivo
                            </h2>

                        </div>


                        <button
                            type="button"
                            class="close-btn"
                            id="closeEditFile"
                        >
                            Cerrar
                        </button>


                    </div>



                    <form
                        id="editFileForm"
                        class="form-stack"
                    >


                        <input
                            type="hidden"
                            id="editFileId"
                        >



                        <label>

                            Nombre del archivo

                            <input
                                id="editFileName"
                                type="text"
                                disabled
                            >

                        </label>



                        <label>

                            Semana

                            <select id="editFileWeek">

                                ${
                                    weeks
                                        .map(
                                            (week) => `

                                            <option
                                                value="${week.id}"
                                            >
                                                ${week.title}
                                            </option>

                                            `
                                        )
                                        .join("")
                                }

                            </select>

                        </label>



                        <label>

                            Descripción

                            <input
                                id="editFileDescription"
                                type="text"
                                placeholder="Descripción del archivo"
                            >

                        </label>



                        <button
                            class="btn primary"
                            type="submit"
                        >
                            Guardar cambios
                        </button>


                        <p
                            id="editFileMsg"
                            class="form-message"
                        ></p>


                    </form>


                </div>


            </div>

            `
        );


    const profileForm =
        document.getElementById(
            "profileForm"
        );


    const uploadForm =
        document.getElementById(
            "uploadForm"
        );


    const editFileForm =
        document.getElementById(
            "editFileForm"
        );


    const closeEditFile =
        document.getElementById(
            "closeEditFile"
        );


    const editModal =
        document.getElementById(
            "editFileModal"
        );


    if (profileForm) {

        profileForm.addEventListener(
            "submit",
            saveProfile
        );

    }


    if (uploadForm) {

        uploadForm.addEventListener(
            "submit",
            uploadFile
        );

    }


    if (editFileForm) {

        editFileForm.addEventListener(
            "submit",
            saveFileChanges
        );

    }


    if (
        closeEditFile &&
        editModal
    ) {

        closeEditFile.addEventListener(
            "click",
            () => {

                editModal.classList.remove(
                    "open"
                );

            }
        );

    }


    if (editModal) {

        editModal.addEventListener(
            "click",
            (event) => {

                if (
                    event.target ===
                    editModal
                ) {

                    editModal.classList.remove(
                        "open"
                    );

                }

            }
        );

    }


    loadAdminFiles();

}


// =====================================================
// GUARDAR PERFIL
// =====================================================

async function saveProfile(event) {

    event.preventDefault();


    if (
        !sb ||
        !session
    ) {
        return;
    }


    const msg =
        document.getElementById(
            "profileMsg"
        );


    if (msg) {
        msg.textContent =
            "Guardando cambios...";
    }


    try {

        let avatarUrl =
            profile?.avatar_url ||
            null;


        const avatarInput =
            document.getElementById(
                "avatarFile"
            );


        const avatar =
            avatarInput?.files?.[0];


        if (avatar) {

            const extension =
                avatar.name
                    .split(".")
                    .pop();


            const path =
                `${session.user.id}/avatar.${extension}`;


            const {
                error: uploadError
            } =
                await sb.storage
                    .from("avatars")
                    .upload(
                        path,
                        avatar,
                        {
                            upsert: true
                        }
                    );


            if (uploadError) {
                throw uploadError;
            }


            const { data: urlData } =
                sb.storage
                    .from("avatars")
                    .getPublicUrl(path);


            avatarUrl =
                `${urlData.publicUrl}?v=${Date.now()}`;

        }


        const payload = {

            id:
                session.user.id,

            full_name:
                document
                    .getElementById(
                        "fullName"
                    )
                    .value
                    .trim(),

            career:
                document
                    .getElementById(
                        "career"
                    )
                    .value
                    .trim(),

            bio:
                document
                    .getElementById(
                        "bio"
                    )
                    .value
                    .trim(),

            avatar_url:
                avatarUrl,

            updated_at:
                new Date()
                    .toISOString()

        };


        const { error } =
            await sb
                .from("profiles")
                .upsert(payload);


        if (error) {
            throw error;
        }


        await loadProfile();

        updateAuthUI();


        if (msg) {
            msg.textContent =
                "Perfil actualizado correctamente.";
        }


    } catch (error) {

        console.error(error);


        if (msg) {

            msg.textContent =
                `Error: ${error.message}`;

        }

    }

}


// =====================================================
// SUBIR ARCHIVO
// =====================================================

async function uploadFile(event) {

    event.preventDefault();


    if (
        !sb ||
        !session
    ) {
        return;
    }


    const msg =
        document.getElementById(
            "uploadMsg"
        );


    const input =
        document.getElementById(
            "repoFile"
        );


    const file =
        input?.files?.[0];


    if (!file) {

        if (msg) {
            msg.textContent =
                "Selecciona un archivo.";
        }

        return;
    }


    if (msg) {
        msg.textContent =
            "Subiendo archivo...";
    }


    try {

        const week =
            Number(
                document
                    .getElementById(
                        "weekSelect"
                    )
                    .value
            );


        const description =
            document
                .getElementById(
                    "fileDescription"
                )
                .value
                .trim();


        const safeName =
            file.name.replace(
                /[^a-zA-Z0-9._-]/g,
                "_"
            );


        const path =
            `${session.user.id}/semana-${week}/${Date.now()}-${safeName}`;


        const {
            error: uploadError
        } =
            await sb.storage
                .from("repository-files")
                .upload(
                    path,
                    file
                );


        if (uploadError) {
            throw uploadError;
        }


        const { data: urlData } =
            sb.storage
                .from("repository-files")
                .getPublicUrl(path);


        const {
            error: databaseError
        } =
            await sb
                .from("repository_files")
                .insert({

                    user_id:
                        session.user.id,

                    week:
                        week,

                    file_name:
                        file.name,

                    description:
                        description,

                    storage_path:
                        path,

                    public_url:
                        urlData.publicUrl

                });


        if (databaseError) {

            await sb.storage
                .from("repository-files")
                .remove([path]);


            throw databaseError;

        }


        if (msg) {

            msg.textContent =
                "Archivo agregado correctamente.";

        }


        event.target.reset();

        await loadAdminFiles();


    } catch (error) {

        console.error(error);


        if (msg) {

            msg.textContent =
                `Error: ${error.message}`;

        }

    }

}


// =====================================================
// CARGAR ARCHIVOS ADMIN
// =====================================================

async function loadAdminFiles() {

    const box =
        document.getElementById(
            "adminFiles"
        );


    if (
        !box ||
        !sb ||
        !session
    ) {
        return;
    }


    box.innerHTML =
        "Cargando archivos...";


    try {

        const { data, error } =
            await sb
                .from("repository_files")
                .select("*")
                .eq(
                    "user_id",
                    session.user.id
                )
                .order(
                    "created_at",
                    {
                        ascending: false
                    }
                );


        if (error) {
            throw error;
        }


        if (
            !data ||
            data.length === 0
        ) {

            box.innerHTML = `

                <div class="activity-row">

                    <div>

                        <strong>
                            Todavía no hay archivos
                        </strong>

                        <span>
                            Utiliza el formulario superior
                            para agregar tu primer archivo.
                        </span>

                    </div>

                </div>

            `;

            return;
        }


        box.innerHTML = `

            <div class="file-list">

                ${
                    data
                        .map(
                            (file) => `

                            <div class="file-row">


                                <div>

                                    <strong>
                                        ${escapeHtml(
                                            file.file_name
                                        )}
                                    </strong>

                                    <span>

                                        Semana
                                        ${file.week}

                                        ·

                                        ${escapeHtml(
                                            file.description ||
                                            "Sin descripción"
                                        )}

                                    </span>

                                </div>



                                <div class="week-actions">


                                    <a
                                        class="small-btn"
                                        href="${attr(
                                            file.public_url
                                        )}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Abrir
                                    </a>



                                    <button
                                        class="small-btn"
                                        type="button"
                                        onclick="openEditFile('${file.id}')"
                                    >
                                        Editar
                                    </button>



                                    <button
                                        class="small-btn"
                                        type="button"
                                        onclick="deleteFile(
                                            '${file.id}',
                                            '${jsstr(
                                                file.storage_path
                                            )}'
                                        )"
                                    >
                                        Eliminar
                                    </button>


                                </div>


                            </div>

                            `
                        )
                        .join("")
                }

            </div>

        `;


    } catch (error) {

        console.error(error);


        box.innerHTML = `

            <div class="activity-row">

                <div>

                    <strong>
                        Error al cargar
                        los archivos
                    </strong>

                    <span>
                        ${escapeHtml(
                            error.message
                        )}
                    </span>

                </div>

            </div>

        `;

    }

}


// =====================================================
// ABRIR EDICIÓN
// =====================================================

async function openEditFile(id) {

    if (
        !sb ||
        !session
    ) {
        return;
    }


    try {

        const { data, error } =
            await sb
                .from("repository_files")
                .select("*")
                .eq(
                    "id",
                    id
                )
                .eq(
                    "user_id",
                    session.user.id
                )
                .single();


        if (error) {
            throw error;
        }


        const idInput =
            document.getElementById(
                "editFileId"
            );


        const nameInput =
            document.getElementById(
                "editFileName"
            );


        const weekInput =
            document.getElementById(
                "editFileWeek"
            );


        const descriptionInput =
            document.getElementById(
                "editFileDescription"
            );


        const message =
            document.getElementById(
                "editFileMsg"
            );


        const modal =
            document.getElementById(
                "editFileModal"
            );


        if (idInput) {
            idInput.value = data.id;
        }


        if (nameInput) {
            nameInput.value =
                data.file_name;
        }


        if (weekInput) {
            weekInput.value =
                data.week;
        }


        if (descriptionInput) {

            descriptionInput.value =
                data.description ||
                "";

        }


        if (message) {
            message.textContent = "";
        }


        if (modal) {
            modal.classList.add(
                "open"
            );
        }


    } catch (error) {

        console.error(error);


        alert(
            `No se pudo abrir el archivo: ${error.message}`
        );

    }

}


// =====================================================
// GUARDAR CAMBIOS ARCHIVO
// =====================================================

async function saveFileChanges(event) {

    event.preventDefault();


    if (
        !sb ||
        !session
    ) {
        return;
    }


    const msg =
        document.getElementById(
            "editFileMsg"
        );


    if (msg) {
        msg.textContent =
            "Guardando cambios...";
    }


    const id =
        document.getElementById(
            "editFileId"
        ).value;


    const week =
        Number(
            document
                .getElementById(
                    "editFileWeek"
                )
                .value
        );


    const description =
        document
            .getElementById(
                "editFileDescription"
            )
            .value
            .trim();


    try {

        const { error } =
            await sb
                .from("repository_files")
                .update({

                    week:
                        week,

                    description:
                        description

                })
                .eq(
                    "id",
                    id
                )
                .eq(
                    "user_id",
                    session.user.id
                );


        if (error) {
            throw error;
        }


        if (msg) {

            msg.textContent =
                "Archivo actualizado correctamente.";

        }


        await loadAdminFiles();


        setTimeout(
            () => {

                const modal =
                    document.getElementById(
                        "editFileModal"
                    );


                if (modal) {

                    modal.classList.remove(
                        "open"
                    );

                }

            },
            500
        );


    } catch (error) {

        console.error(error);


        if (msg) {

            msg.textContent =
                `Error: ${error.message}`;

        }

    }

}


// =====================================================
// ELIMINAR ARCHIVO
// =====================================================

async function deleteFile(
    id,
    path
) {

    if (
        !sb ||
        !session
    ) {
        return;
    }


    const confirmed =
        confirm(
            "¿Seguro que deseas eliminar este archivo?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const {
            error: storageError
        } =
            await sb.storage
                .from("repository-files")
                .remove([path]);


        if (storageError) {
            throw storageError;
        }


        const {
            error: databaseError
        } =
            await sb
                .from("repository_files")
                .delete()
                .eq(
                    "id",
                    id
                )
                .eq(
                    "user_id",
                    session.user.id
                );


        if (databaseError) {
            throw databaseError;
        }


        await loadAdminFiles();


    } catch (error) {

        console.error(error);


        alert(
            `No se pudo eliminar el archivo: ${error.message}`
        );

    }

}


// =====================================================
// UTILIDADES
// =====================================================

function escapeHtml(
    value = ""
) {

    return String(value)
        .replace(
            /[&<>"']/g,
            (character) => ({

                "&":
                    "&amp;",

                "<":
                    "&lt;",

                ">":
                    "&gt;",

                '"':
                    "&quot;",

                "'":
                    "&#039;"

            }[character])
        );

}


function attr(
    value = ""
) {

    return escapeHtml(
        value
    );

}


function jsstr(
    value = ""
) {

    return String(value)
        .replace(
            /\\/g,
            "\\\\"
        )
        .replace(
            /'/g,
            "\\'"
        );

}


// =====================================================
// PARTÍCULAS
// =====================================================

function createTechParticles() {

    const container =
        document.getElementById(
            "techParticles"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    const total = 24;


    for (
        let i = 0;
        i < total;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "tech-particle";


        particle.style.left =
            Math.random() *
            100 +
            "%";


        particle.style.top =
            Math.random() *
            100 +
            "%";


        particle.style.setProperty(
            "--duration",
            7 +
            Math.random() *
            8 +
            "s"
        );


        particle.style.setProperty(
            "--delay",
            -Math.random() *
            10 +
            "s"
        );


        const size =
            3 +
            Math.random() *
            5;


        particle.style.width =
            size +
            "px";


        particle.style.height =
            size +
            "px";


        container.appendChild(
            particle
        );

    }

}


// =====================================================
// INICIAR TODO
// =====================================================

createTechParticles();

init();

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
                        </div>                        </div>

                    </div>


                    <div class="journey-help">

                        <div class="help-number">
                            ?
                        </div>


                        <div>

                            <strong>
                                ¿Cómo explorar el recorrido?
                            </strong>

                            <p>
                                Haz clic en cualquier semana para
                                revisar sus actividades, documentos
                                y materiales académicos.
                            </p>

                        </div>

                    </div>


                </div>

            </div>

        </section>

    `;

}


// =====================================================
// DETALLE DE UNA SEMANA
// =====================================================

async function renderWeek(id) {

    const week =
        weeks.find(
            (item) =>
                item.id === id
        );


    if (!week) {

        app.innerHTML =
            page(
                "Semana no encontrada",
                "La semana seleccionada no existe.",
                `

                    <div class="panel">

                        <p>
                            Selecciona una semana válida
                            del recorrido académico.
                        </p>

                        <br>

                        <a
                            href="#semanas"
                            class="btn primary"
                        >
                            Volver al recorrido
                        </a>

                    </div>

                `
            );

        return;
    }


    app.innerHTML =
        page(
            week.title,
            week.description,
            `

                <div class="panel">

                    <div class="section-head">

                        <div>

                            <span class="eyebrow">
                                MATERIAL ACADÉMICO
                            </span>

                            <h2>
                                Archivos de
                                ${week.title}
                            </h2>

                        </div>


                        <a
                            href="#semanas"
                            class="small-btn"
                        >
                            Volver al recorrido
                        </a>

                    </div>


                    <div
                        id="weekFiles"
                        class="file-list"
                    >

                        <div class="activity-row">

                            <div>

                                <strong>
                                    Cargando archivos...
                                </strong>

                                <span>
                                    Espera un momento.
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            `
        );


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
                        Supabase no está configurado
                    </strong>

                    <span>
                        Configura las credenciales
                        para visualizar los archivos.
                    </span>

                </div>

            </div>

        `;

        return;
    }


    try {

        let query =
            sb
                .from("repository_files")
                .select("*")
                .eq(
                    "week",
                    week.id
                );


        /*
         * Si existe una sesión, mostramos solamente
         * los archivos pertenecientes al usuario.
         *
         * Si el repositorio permite lectura pública
         * mediante RLS, un visitante podrá visualizar
         * los archivos públicos de la semana.
         */
        if (session) {

            query =
                query.eq(
                    "user_id",
                    session.user.id
                );

        }


        const {
            data,
            error
        } =
            await query.order(
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
                            Esta semana todavía
                            no tiene archivos
                        </strong>

                        <span>
                            Cuando agregues contenido
                            a la Semana ${week.id},
                            aparecerá aquí.
                        </span>

                    </div>

                </div>

            `;

            return;
        }


        /*
         * Seguridad adicional:
         * verificamos otra vez que solamente se
         * rendericen archivos de la semana actual.
         */
        const correctFiles =
            data.filter(
                (file) =>
                    Number(file.week) ===
                    week.id
            );


        if (
            correctFiles.length === 0
        ) {

            box.innerHTML = `

                <div class="activity-row">

                    <div>

                        <strong>
                            No hay archivos
                            para esta semana
                        </strong>

                        <span>
                            Los archivos encontrados
                            pertenecen a otra semana.
                        </span>

                    </div>

                </div>

            `;

            return;
        }


        box.innerHTML =
            correctFiles
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
                                    ${String(
                                        Number(file.week)
                                    ).padStart(
                                        2,
                                        "0"
                                    )}

                                    ·

                                    ${escapeHtml(
                                        file.description ||
                                        "Sin descripción"
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
                                    Abrir archivo
                                </a>


                                ${
                                    session
                                        ? `

                                            <button
                                                class="small-btn"
                                                type="button"
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
                .join("");


    } catch (error) {

        console.error(
            "Error al cargar archivos:",
            error
        );


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

    const rows =
        activities
            .slice()
            .sort(
                (a, b) =>
                    a.week - b.week
            )
            .map(
                (activity) => `

                    <div class="activity-row">


                        <div>

                            <strong>
                                ${escapeHtml(
                                    activity.title
                                )}
                            </strong>


                            <span>

                                Semana
                                ${String(
                                    activity.week
                                ).padStart(
                                    2,
                                    "0"
                                )}

                                ·

                                ${escapeHtml(
                                    activity.type
                                )}

                            </span>

                        </div>


                        <span
                            class="badge ${
                                activity.status === "done"
                                    ? "done"
                                    : "pending"
                            }"
                        >

                            ${
                                activity.status === "done"
                                    ? "Completado"
                                    : "Pendiente"
                            }

                        </span>

                    </div>

                `
            )
            .join("");


    app.innerHTML =
        page(
            "Actividades",
            "Trabajos, prácticas y actividades realizadas durante el ciclo.",
            `

                <div class="panel">


                    <div class="section-head">

                        <div>

                            <span class="eyebrow">
                                REGISTRO ACADÉMICO
                            </span>

                            <h2>
                                Mis actividades
                            </h2>

                        </div>

                    </div>


                    <div class="activity-list">

                        ${
                            rows ||
                            `

                                <div class="activity-row">

                                    <div>

                                        <strong>
                                            No hay actividades
                                        </strong>

                                        <span>
                                            Todavía no se han
                                            registrado actividades.
                                        </span>

                                    </div>

                                </div>

                            `
                        }

                    </div>

                </div>

            `
        );

}


// =====================================================
// FOTO DEL PERFIL
// =====================================================

function profilePicture() {

    const avatar =
        profile?.avatar_url;


    if (avatar) {

        return `

            <img
                class="profile-avatar"
                src="${attr(avatar)}"
                alt="Foto de perfil"
                onerror="
                    this.style.display='none';
                    this.nextElementSibling.style.display='grid';
                "
            >

            <div
                class="profile-avatar fallback"
                style="display:none"
            >
                ${getInitials(
                    profile?.full_name ||
                    session?.user?.email ||
                    "UPLA"
                )}
            </div>

        `;

    }


    return `

        <div class="profile-avatar fallback">

            ${getInitials(
                profile?.full_name ||
                session?.user?.email ||
                "UPLA"
            )}

        </div>

    `;

}


// =====================================================
// PERFIL
// =====================================================

function renderProfile() {

    const fullName =
        profile?.full_name ||
        "Estudiante UPLA";


    const career =
        profile?.career ||
        "Ingeniería de Sistemas y Computación";


    const university =
        profile?.university ||
        "Universidad Peruana Los Andes";


    const semester =
        profile?.semester ||
        "Ciclo académico";


    const code =
        profile?.student_code ||
        "Sin registrar";


    const bio =
        profile?.bio ||
        "Repositorio académico orientado a organizar y presentar las evidencias desarrolladas durante el ciclo.";


    app.innerHTML =
        page(
            "Perfil académico",
            "Información general del estudiante y su repositorio.",
            `

                <div class="profile-card">


                    <div>

                        ${profilePicture()}

                    </div>


                    <div>


                        <span class="eyebrow">
                            ESTUDIANTE
                        </span>


                        <h2>
                            ${escapeHtml(
                                fullName
                            )}
                        </h2>


                        <p>
                            ${escapeHtml(
                                bio
                            )}
                        </p>


                        <div class="info-grid">


                            <div>

                                <span>
                                    Carrera
                                </span>

                                <strong>
                                    ${escapeHtml(
                                        career
                                    )}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Universidad
                                </span>

                                <strong>
                                    ${escapeHtml(
                                        university
                                    )}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Ciclo
                                </span>

                                <strong>
                                    ${escapeHtml(
                                        semester
                                    )}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Código
                                </span>

                                <strong>
                                    ${escapeHtml(
                                        code
                                    )}
                                </strong>

                            </div>


                        </div>


                        ${
                            session
                                ? `

                                    <div
                                        style="
                                            margin-top:22px;
                                        "
                                    >

                                        <a
                                            href="#administrar"
                                            class="btn primary"
                                        >
                                            Editar desde administración
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
// ADMINISTRACIÓN
// =====================================================

function renderAdmin() {

    if (!session) {

        app.innerHTML =
            page(
                "Administración",
                "Inicia sesión para administrar el repositorio.",
                `

                    <div class="panel">

                        <div class="section-head">

                            <div>

                                <span class="eyebrow">
                                    ACCESO PRIVADO
                                </span>

                                <h2>
                                    Inicia sesión
                                </h2>

                            </div>

                        </div>


                        <p>
                            Para subir, editar o eliminar
                            archivos debes iniciar sesión.
                        </p>


                        <div
                            style="
                                margin-top:20px;
                            "
                        >

                            <button
                                class="btn primary"
                                type="button"
                                id="adminLoginButton"
                            >
                                Iniciar sesión
                            </button>

                        </div>

                    </div>

                `
            );


        const adminLoginButton =
            document.getElementById(
                "adminLoginButton"
            );


        if (
            adminLoginButton &&
            authModal
        ) {

            adminLoginButton.addEventListener(
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


    const weekOptions =
        weeks
            .map(
                (week) => `

                    <option value="${week.id}">
                        ${week.title}
                    </option>

                `
            )
            .join("");


    app.innerHTML =
        page(
            "Administrar",
            "Gestiona tu perfil y organiza los archivos de cada semana.",
            `

                <div class="admin-grid">


                    <div class="panel">


                        <div class="section-head">

                            <div>

                                <span class="eyebrow">
                                    PERFIL
                                </span>

                                <h2>
                                    Datos académicos
                                </h2>

                            </div>

                        </div>


                        <form
                            id="profileForm"
                            class="form-stack"
                        >


                            <label>

                                Nombre completo

                                <input
                                    id="profileName"
                                    type="text"
                                    value="${attr(
                                        profile?.full_name ||
                                        ""
                                    )}"
                                    placeholder="Nombre completo"
                                >

                            </label>


                            <label>

                                Carrera

                                <input
                                    id="profileCareer"
                                    type="text"
                                    value="${attr(
                                        profile?.career ||
                                        "Ingeniería de Sistemas y Computación"
                                    )}"
                                    placeholder="Carrera"
                                >

                            </label>


                            <label>

                                Universidad

                                <input
                                    id="profileUniversity"
                                    type="text"
                                    value="${attr(
                                        profile?.university ||
                                        "Universidad Peruana Los Andes"
                                    )}"
                                    placeholder="Universidad"
                                >

                            </label>


                            <label>

                                Ciclo

                                <input
                                    id="profileSemester"
                                    type="text"
                                    value="${attr(
                                        profile?.semester ||
                                        ""
                                    )}"
                                    placeholder="Ejemplo: VI ciclo"
                                >

                            </label>


                            <label>

                                Código de estudiante

                                <input
                                    id="profileCode"
                                    type="text"
                                    value="${attr(
                                        profile?.student_code ||
                                        ""
                                    )}"
                                    placeholder="Código"
                                >

                            </label>


                            <label>

                                Descripción

                                <textarea
                                    id="profileBio"
                                    rows="5"
                                    placeholder="Escribe una pequeña descripción"
                                >${escapeHtml(
                                    profile?.bio ||
                                    ""
                                )}</textarea>

                            </label>


                            <label>

                                URL de foto

                                <input
                                    id="profileAvatar"
                                    type="url"
                                    value="${attr(
                                        profile?.avatar_url ||
                                        ""
                                    )}"
                                    placeholder="https://..."
                                >

                            </label>


                            <button
                                class="btn primary"
                                type="submit"
                            >
                                Guardar perfil
                            </button>


                            <div
                                id="profileMsg"
                                class="form-message"
                            ></div>


                        </form>

                    </div>



                    <div class="panel">


                        <div class="section-head">

                            <div>

                                <span class="eyebrow">
                                    NUEVO ARCHIVO
                                </span>

                                <h2>
                                    Agregar material
                                </h2>

                            </div>

                        </div>


                        <form
                            id="uploadForm"
                            class="form-stack"
                        >


                            <label>

                                Semana

                                <select
                                    id="weekSelect"
                                    required
                                >

                                    ${weekOptions}

                                </select>

                            </label>


                            <label>

                                Descripción

                                <textarea
                                    id="fileDescription"
                                    rows="4"
                                    placeholder="Descripción del archivo"
                                ></textarea>

                            </label>


                            <label>

                                Archivo

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


                            <div
                                id="uploadMsg"
                                class="form-message"
                            ></div>


                        </form>

                    </div>

                </div>



                <div
                    class="panel"
                    style="
                        margin-top:18px;
                    "
                >


                    <div class="section-head">

                        <div>

                            <span class="eyebrow">
                                ARCHIVOS
                            </span>

                            <h2>
                                Mis archivos por semana
                            </h2>

                        </div>

                    </div>


                    <div
                        id="adminFiles"
                        class="file-list"
                    >

                        <div class="activity-row">

                            <div>

                                <strong>
                                    Cargando archivos...
                                </strong>

                                <span>
                                    Organizando el contenido
                                    por semanas.
                                </span>

                            </div>

                        </div>

                    </div>


                </div>



                <div
                    id="editFileModal"
                    class="modal"
                >

                    <div class="modal-card">


                        <div class="modal-head">

                            <div>

                                <span class="eyebrow">
                                    EDITAR ARCHIVO
                                </span>

                                <h2>
                                    Modificar información
                                </h2>

                            </div>


                            <button
                                id="closeEditFile"
                                class="close-btn"
                                type="button"
                            >
                                Cerrar
                            </button>

                        </div>


                        <form
                            id="editFileForm"
                            class="form-stack"
                        >


                            <input
                                id="editFileId"
                                type="hidden"
                            >


                            <label>

                                Nombre del archivo

                                <input
                                    id="editFileName"
                                    type="text"
                                    required
                                >

                            </label>


                            <label>

                                Semana

                                <select
                                    id="editFileWeek"
                                    required
                                >

                                    ${weekOptions}

                                </select>

                            </label>


                            <label>

                                Descripción

                                <textarea
                                    id="editFileDescription"
                                    rows="4"
                                ></textarea>

                            </label>


                            <button
                                class="btn primary"
                                type="submit"
                            >
                                Guardar cambios
                            </button>


                            <div
                                id="editFileMsg"
                                class="form-message"
                            ></div>


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


    if (closeEditFile) {

        closeEditFile.addEventListener(
            "click",
            () => {

                document
                    .getElementById(
                        "editFileModal"
                    )
                    ?.classList
                    .remove("open");

            }
        );

    }


    const editModal =
        document.getElementById(
            "editFileModal"
        );


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

}// =====================================================
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

        const name =
            document
                .getElementById(
                    "profileName"
                )
                ?.value
                ?.trim() || "";


        const career =
            document
                .getElementById(
                    "profileCareer"
                )
                ?.value
                ?.trim() || "";


        const bio =
            document
                .getElementById(
                    "profileBio"
                )
                ?.value
                ?.trim() || "";


        const avatarUrl =
            document
                .getElementById(
                    "profileAvatar"
                )
                ?.value
                ?.trim() || null;


        /*
         * Conservamos únicamente los campos principales
         * que utiliza la tabla profiles del proyecto.
         */
        const payload = {

            id:
                session.user.id,

            full_name:
                name,

            career:
                career,

            bio:
                bio,

            avatar_url:
                avatarUrl,

            updated_at:
                new Date()
                    .toISOString()

        };


        const { error } =
            await sb
                .from("profiles")
                .upsert(
                    payload
                );


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

        console.error(
            "Error al guardar perfil:",
            error
        );


        if (msg) {

            msg.textContent =
                `Error: ${error.message}`;

        }

    }

}


// =====================================================
// SUBIR ARCHIVO
// CORREGIDO: MANTIENE LA SEMANA SELECCIONADA
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


    const weekSelect =
        document.getElementById(
            "weekSelect"
        );


    const descriptionInput =
        document.getElementById(
            "fileDescription"
        );


    const file =
        input?.files?.[0];


    // -------------------------------------------------
    // VALIDAR ARCHIVO
    // -------------------------------------------------

    if (!file) {

        if (msg) {

            msg.textContent =
                "Selecciona un archivo.";

        }

        return;
    }


    // -------------------------------------------------
    // OBTENER SEMANA
    // -------------------------------------------------

    const week =
        Number(
            weekSelect?.value
        );


    /*
     * Esta validación evita guardar accidentalmente
     * semanas inválidas como 0, 17, NaN, etc.
     */
    if (
        !Number.isInteger(week) ||
        week < 1 ||
        week > weeks.length
    ) {

        if (msg) {

            msg.textContent =
                "Selecciona una semana válida del 1 al 16.";

        }

        return;
    }


    const description =
        descriptionInput
            ?.value
            ?.trim() || "";


    if (msg) {

        msg.textContent =
            `Subiendo archivo a la Semana ${String(
                week
            ).padStart(
                2,
                "0"
            )}...`;

    }


    try {

        // -------------------------------------------------
        // NOMBRE SEGURO
        // -------------------------------------------------

        const safeName =
            file.name.replace(
                /[^a-zA-Z0-9._-]/g,
                "_"
            );


        /*
         * Cada archivo se guarda físicamente dentro
         * de la carpeta correspondiente a su semana.
         *
         * Ejemplo:
         *
         * usuario/semana-05/archivo.pdf
         */
        const path =
            `${session.user.id}/semana-${String(
                week
            ).padStart(
                2,
                "0"
            )}/${Date.now()}-${safeName}`;


        // -------------------------------------------------
        // SUBIR A STORAGE
        // -------------------------------------------------

        const {
            error: uploadError
        } =
            await sb.storage
                .from(
                    "repository-files"
                )
                .upload(
                    path,
                    file
                );


        if (uploadError) {
            throw uploadError;
        }


        // -------------------------------------------------
        // OBTENER URL
        // -------------------------------------------------

        const {
            data: urlData
        } =
            sb.storage
                .from(
                    "repository-files"
                )
                .getPublicUrl(
                    path
                );


        // -------------------------------------------------
        // GUARDAR EN BASE DE DATOS
        // -------------------------------------------------

        const {
            error: databaseError
        } =
            await sb
                .from(
                    "repository_files"
                )
                .insert({

                    user_id:
                        session.user.id,

                    /*
                     * IMPORTANTE:
                     * La semana guardada en Supabase
                     * es exactamente la seleccionada.
                     */
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


        /*
         * Si falla la base de datos eliminamos
         * el archivo que acabamos de subir.
         *
         * Así evitamos archivos huérfanos.
         */
        if (databaseError) {

            await sb.storage
                .from(
                    "repository-files"
                )
                .remove(
                    [path]
                );


            throw databaseError;
        }


        // -------------------------------------------------
        // MENSAJE DE ÉXITO
        // -------------------------------------------------

        if (msg) {

            msg.textContent =
                `Archivo agregado correctamente a la Semana ${String(
                    week
                ).padStart(
                    2,
                    "0"
                )}.`;

        }


        /*
         * IMPORTANTE:
         *
         * Antes se podía utilizar:
         *
         * event.target.reset();
         *
         * Eso reiniciaba también el selector de semana
         * y podía hacer que regresara a Semana 01.
         *
         * Ahora SOLO limpiamos:
         *
         * - archivo
         * - descripción
         *
         * La semana seleccionada se conserva.
         */


        if (input) {

            input.value =
                "";

        }


        if (descriptionInput) {

            descriptionInput.value =
                "";

        }


        if (weekSelect) {

            weekSelect.value =
                String(
                    week
                );

        }


        // -------------------------------------------------
        // ACTUALIZAR LISTA
        // -------------------------------------------------

        await loadAdminFiles();


    } catch (error) {

        console.error(
            "Error al subir archivo:",
            error
        );


        if (msg) {

            msg.textContent =
                `Error: ${error.message}`;

        }

    }

}


// =====================================================
// CARGAR ARCHIVOS DEL ADMINISTRADOR
// CORREGIDO: ORDEN SEMANA 01 → SEMANA 16
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

        /*
         * PRIMER ORDEN:
         * Semana de menor a mayor.
         *
         * SEGUNDO ORDEN:
         * Dentro de cada semana, archivo más
         * reciente primero.
         */

        const {
            data,
            error
        } =
            await sb
                .from(
                    "repository_files"
                )
                .select("*")
                .eq(
                    "user_id",
                    session.user.id
                )
                .order(
                    "week",
                    {
                        ascending: true
                    }
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


        // -------------------------------------------------
        // SIN ARCHIVOS
        // -------------------------------------------------

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


        // -------------------------------------------------
        // AGRUPAR POR SEMANA
        // -------------------------------------------------

        /*
         * No dependemos únicamente del orden
         * devuelto por Supabase.
         *
         * Agrupamos nosotros mismos los archivos
         * usando las 16 semanas oficiales.
         */

        const groupedFiles =
            weeks
                .map(
                    (week) => ({

                        week:

                            week,

                        files:

                            data.filter(
                                (file) =>
                                    Number(
                                        file.week
                                    ) ===
                                    week.id
                            )

                    })
                )
                .filter(
                    (group) =>
                        group.files.length > 0
                );


        // -------------------------------------------------
        // MOSTRAR GRUPOS
        // -------------------------------------------------

        box.innerHTML =
            groupedFiles
                .map(
                    (group) => `

                        <section
                            class="admin-week-group"
                            data-week="${group.week.id}"
                            style="
                                margin-bottom:24px;
                            "
                        >


                            <div
                                class="section-head"
                                style="
                                    margin-bottom:12px;
                                "
                            >


                                <div>


                                    <span class="eyebrow">

                                        SEMANA
                                        ${String(
                                            group.week.id
                                        ).padStart(
                                            2,
                                            "0"
                                        )}

                                    </span>


                                    <h3
                                        style="
                                            margin-top:6px;
                                        "
                                    >

                                        ${group.files.length}

                                        ${
                                            group.files.length === 1
                                                ? "archivo"
                                                : "archivos"
                                        }

                                    </h3>


                                </div>


                            </div>



                            <div class="file-list">


                                ${
                                    group.files
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
                                                            ${String(
                                                                Number(
                                                                    file.week
                                                                )
                                                            ).padStart(
                                                                2,
                                                                "0"
                                                            )}

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


                        </section>

                    `
                )
                .join("");


    } catch (error) {

        console.error(
            "Error al cargar archivos:",
            error
        );


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
// ABRIR EDICIÓN DE ARCHIVO
// =====================================================

async function openEditFile(id) {

    if (
        !sb ||
        !session
    ) {

        return;

    }


    try {

        const {
            data,
            error
        } =
            await sb
                .from(
                    "repository_files"
                )
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


        /*
         * Comprobamos que el archivo tenga
         * una semana válida.
         */
        const currentWeek =
            Number(
                data.week
            );


        if (
            !Number.isInteger(
                currentWeek
            ) ||
            currentWeek < 1 ||
            currentWeek > weeks.length
        ) {

            throw new Error(
                "El archivo tiene una semana inválida."
            );

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

            idInput.value =
                data.id;

        }


        if (nameInput) {

            nameInput.value =
                data.file_name;

        }


        if (weekInput) {

            /*
             * Aquí se coloca EXACTAMENTE
             * la semana que tiene el archivo
             * en la base de datos.
             */
            weekInput.value =
                String(
                    currentWeek
                );

        }


        if (descriptionInput) {

            descriptionInput.value =
                data.description ||
                "";

        }


        if (message) {

            message.textContent =
                "";

        }


        if (modal) {

            modal.classList.add(
                "open"
            );

        }


    } catch (error) {

        console.error(
            "Error al abrir archivo:",
            error
        );


        alert(
            `No se pudo abrir el archivo: ${error.message}`
        );

    }

}

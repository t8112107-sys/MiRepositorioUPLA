<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%
    request.setCharacterEncoding("UTF-8");
    response.setCharacterEncoding("UTF-8");
%>

<!DOCTYPE html>

<html lang="es">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <meta
        name="description"
        content="Repositorio académico personal de Ingeniería de Sistemas y Computación - UPLA"
    >

    <meta
        name="theme-color"
        content="#0d1916"
    >

    <title>
        Mi Repositorio Académico | UPLA
    </title>


    <!-- ============================================== -->
    <!-- ESTILOS -->
    <!-- ============================================== -->

    <link
        rel="stylesheet"
        href="<%= request.getContextPath() %>/css/styles.css?v=8"
    >

</head>


<body>


    <!-- ============================================== -->
    <!-- PARTÍCULAS / FONDO -->
    <!-- ============================================== -->

    <div
        class="tech-particles"
        id="techParticles"
        aria-hidden="true"
    ></div>



    <!-- ============================================== -->
    <!-- BARRA SUPERIOR -->
    <!-- ============================================== -->

    <div class="top-strip">

        <div class="wrap top-strip__inner">

            <span>
                Ingeniería de Sistemas y Computación
            </span>


            <div class="top-actions">

                <span id="userState">
                    Invitado
                </span>


                <button
                    id="loginTopBtn"
                    class="top-btn"
                    type="button"
                >
                    Iniciar sesión
                </button>


                <button
                    id="logoutTopBtn"
                    class="top-btn hidden"
                    type="button"
                >
                    Cerrar sesión
                </button>

            </div>

        </div>

    </div>



    <!-- ============================================== -->
    <!-- HEADER -->
    <!-- ============================================== -->

    <header class="site-header">

        <div class="wrap site-header__inner">


            <!-- MARCA -->

            <a
                class="brand"
                href="#inicio"
                aria-label="Ir al inicio"
            >

                <div class="brand-mark">
                    U
                </div>


                <div>

                    <strong>
                        UPLA
                    </strong>

                    <span>
                        Mi espacio académico
                    </span>

                </div>

            </a>



            <!-- BOTÓN MÓVIL -->

            <button
                class="menu-toggle"
                id="menuToggle"
                type="button"
                aria-label="Abrir menú"
            >
                Menú
            </button>



            <!-- NAVEGACIÓN -->

            <nav
                class="main-nav"
                id="mainNav"
                aria-label="Navegación principal"
            >

                <a
                    href="#inicio"
                    data-route="inicio"
                >
                    Inicio
                </a>


                <a
                    href="#semanas"
                    data-route="semanas"
                >
                    Mi recorrido
                </a>


                <a
                    href="#actividades"
                    data-route="actividades"
                >
                    Actividades
                </a>


                <a
                    href="#perfil"
                    data-route="perfil"
                >
                    Perfil
                </a>


                <a
                    href="#administrar"
                    data-route="administrar"
                    class="admin-link"
                >
                    Administrar
                </a>

            </nav>

        </div>

    </header>



    <!-- ============================================== -->
    <!-- CONTENIDO DINÁMICO -->
    <!-- ============================================== -->

    <main id="app">

        <section class="section">

            <div class="wrap">

                <span class="eyebrow">
                    Repositorio UPLA
                </span>

                <p>
                    Preparando tu espacio académico...
                </p>

            </div>

        </section>

    </main>



    <!-- ============================================== -->
    <!-- FOOTER -->
    <!-- ============================================== -->

    <footer class="site-footer wrap">

        <div>

            <strong>
                Mi Repositorio Académico
            </strong>

            <span>
                Ingeniería de Sistemas y Computación
            </span>

        </div>


        <p>
            Un espacio personal para documentar,
            organizar y presentar mi recorrido académico
            durante las 16 semanas del ciclo.
        </p>

    </footer>



    <!-- ============================================== -->
    <!-- MODAL LOGIN -->
    <!-- ============================================== -->

    <div
        id="authModal"
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="loginTitle"
    >

        <div class="modal-card">


            <div class="modal-head">

                <div>

                    <span class="eyebrow">
                        Área privada
                    </span>

                    <h2 id="loginTitle">
                        Bienvenido
                    </h2>

                </div>


                <button
                    id="closeAuth"
                    class="close-btn"
                    type="button"
                >
                    Cerrar
                </button>

            </div>



            <p
                style="
                    color:var(--muted);
                    line-height:1.6;
                    font-size:13px;
                    margin-top:12px;
                "
            >
                Inicia sesión para administrar tu perfil
                y los materiales del repositorio.
            </p>



            <form
                id="loginForm"
                class="form-stack"
            >

                <label>

                    Correo electrónico

                    <input
                        id="loginEmail"
                        type="email"
                        required
                        autocomplete="email"
                        placeholder="correo@ejemplo.com"
                    >

                </label>


                <label>

                    Contraseña

                    <input
                        id="loginPassword"
                        type="password"
                        required
                        autocomplete="current-password"
                        placeholder="Ingresa tu contraseña"
                    >

                </label>


                <button
                    class="btn primary"
                    type="submit"
                >
                    Entrar a mi espacio
                </button>

            </form>


            <p
                id="authMessage"
                class="form-message"
                aria-live="polite"
            ></p>


        </div>

    </div>



    <!-- ============================================== -->
    <!-- SUPABASE -->
    <!-- ============================================== -->

    <script
        charset="UTF-8"
        src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
    ></script>



    <!-- ============================================== -->
    <!-- CONFIGURACIÓN -->
    <!-- ============================================== -->

    <script
        charset="UTF-8"
        src="<%= request.getContextPath() %>/js/config.js?v=8"
    ></script>



    <!-- ============================================== -->
    <!-- APLICACIÓN -->
    <!-- ============================================== -->

    <script
        charset="UTF-8"
        src="<%= request.getContextPath() %>/js/app.js?v=8"
    ></script>


</body>

</html>

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
        content="Repositorio académico de Ingeniería de Sistemas y Computación"
    >

    <title>
        Mi Repositorio Académico | UPLA
    </title>

    <!--
        El ?v=7 obliga al navegador a cargar
        la versión nueva del CSS.
    -->
    <link
        rel="stylesheet"
        href="<%= request.getContextPath() %>/css/styles.css?v=7"
    >

</head>


<body>
<div class="tech-particles" id="techParticles"></div>

    <!-- ============================================== -->
    <!-- BARRA SUPERIOR -->
    <!-- ============================================== -->

    <div class="top-strip">

        <div class="wrap top-strip__inner">

            <span>
                Repositorio Académico
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
    <!-- ENCABEZADO -->
    <!-- ============================================== -->

    <header class="site-header">

        <div class="wrap site-header__inner">


            <a
                class="brand"
                href="#inicio"
            >

                <div class="brand-mark">
                    U
                </div>


                <div>

                    <strong>
                        UPLA
                    </strong>

                    <span>
                        Universidad Peruana Los Andes
                    </span>

                </div>

            </a>



            <button
                class="menu-toggle"
                id="menuToggle"
                type="button"
            >
                Menú
            </button>



            <nav
                class="main-nav"
                id="mainNav"
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
                    Semanas
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
    <!-- CONTENIDO -->
    <!-- ============================================== -->

    <main id="app">

        <section class="section">

            <div class="wrap">

                <p>
                    Cargando repositorio...
                </p>

            </div>

        </section>

    </main>



    <!-- ============================================== -->
    <!-- PIE DE PÁGINA -->
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
            Repositorio académico desarrollado con JSP,
            Tomcat y Supabase.
        </p>

    </footer>



    <!-- ============================================== -->
    <!-- MODAL DE INICIO DE SESIÓN -->
    <!-- ============================================== -->

    <div
        id="authModal"
        class="modal"
    >

        <div class="modal-card">


            <div class="modal-head">

                <div>

                    <span class="eyebrow">
                        Acceso administrativo
                    </span>

                    <h2>
                        Iniciar sesión
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
                        placeholder="correo@ejemplo.com"
                    >

                </label>


                <label>

                    Contraseña

                    <input
                        id="loginPassword"
                        type="password"
                        required
                        placeholder="Ingresa tu contraseña"
                    >

                </label>


                <button
                    class="btn primary"
                    type="submit"
                >
                    Ingresar
                </button>

            </form>


            <p
                id="authMessage"
                class="form-message"
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


    <!--
        IMPORTANTE:
        Cambiamos la versión para evitar que Chrome
        utilice archivos antiguos guardados en caché.
    -->

    <script
        charset="UTF-8"
        src="<%= request.getContextPath() %>/js/config.js?v=7"
    ></script>


    <script
        charset="UTF-8"
        src="<%= request.getContextPath() %>/js/app.js?v=7"
    ></script>


</body>

</html>
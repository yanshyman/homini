<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Sinum.Homini.Web.Default" %>

<!DOCTYPE html>


<html data-ng-app="homini">
<head runat="server">

    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Homini</title>
    <meta name="viewport" content="width=device-width" />
    <link href="Content/bootstrap.min.css" rel="stylesheet" />
    <link href="Content/style.css" rel="stylesheet" />
    <link href="Content/font-awesome.min.css" rel="stylesheet" />
    <link href="Content/perfect-scrollbar.min.css" rel="stylesheet" />
    <style>
        [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
            display: none !important;
        }
    </style>
</head>

<body data-ng-controller="mainController as controller" class="ng-cloak">
    <div class=" container-scroller">
        <!--Navbar-->
        <nav class="navbar bg-primary-gradient col-lg-12 col-12 p-0 fixed-top navbar-inverse d-flex flex-row">
            <h3 class="mb-3 ml-4 mt-3 text-white">Homini</h3>
            <div class="navbar-menu-wrapper d-flex align-items-center">
                <button class="navbar-toggler navbar-toggler hidden-md-down align-self-center mr-3" type="button" data-toggle="minimize">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <ul class="navbar-nav ml-lg-auto d-flex align-items-center flex-row">
                </ul>
                <button class="navbar-toggler navbar-toggler-right hidden-lg-up align-self-center" type="button" data-toggle="offcanvas">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
        <!--End navbar-->
        <div class="container-fluid">
            <div class="row row-offcanvas row-offcanvas-right">
                <nav class="bg-white sidebar sidebar-fixed sidebar-offcanvas" id="sidebar">
                    <ul class="nav">
                        <li class="nav-item">
                            <a class="nav-link" href="#">

                                <i class="fa fa-bar-chart" aria-hidden="true"></i>
                                <span class="menu-title">Statystyki</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="pages/widgets.html">
                                <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                                <span class="menu-title">Powiadomienia</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="pages/forms.html">

                                <i class="fa fa-cog" aria-hidden="true"></i>
                                <span class="menu-title">Ustawienia</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="pages/buttons.html">

                                <i class="fa fa-user-o" aria-hidden="true"></i>
                                <span class="menu-title">Wyloguj</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <div class="content-wrapper">     
                    <div data-ng-view>
                    </div> 
                <footer class="footer">
                    <div class="container-fluid clearfix">
                        <span class="float-right">
                            <a href="#">Sinum</a> &copy; info@sinum.pl 2017
                      </span>
                    </div>
                </footer>
            </div>
        </div>
    </div>

    <script src="Scripts/jquery-3.2.1<%= MinString %>.js"></script>
    <script src="Scripts/angular<%= MinString %>.js"></script>
    <script src="Scripts/angular-route<%= MinString %>.js"></script>
    <script src="Scripts/angular-resource<%= MinString %>.js"></script>
    <script src="Scripts/angular-sanitize<%= MinString %>.js"></script>
    <script src="Scripts/perfect-scrollbar.jquery<%= MinString %>.js"></script>
    <script src="Scripts/tether<%= MinString %>.js"></script>
    <script src="Scripts/bootstrap<%= MinString %>.js"></script>
    <script src="Scripts/moment<%= MinString %>.js"></script>
    <script src="Scripts/moment-with-locales<%= MinString %>.js"></script>
    <script src="Scripts/misc.js"></script>
    <script src="Scripts/off-canvas.js"></script>
    <script src="Scripts/hoverable-collapse.js"></script>
    <script src="App/homini.js"></script>
</body>
</html>

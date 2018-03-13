
// <!-- Underscore js -->
import underscore from 'underscore';

// // <!-- AdminLTE App -->
import adminlte from './assets/js/adminlte';
import icheck from './assets/js/icheck';

$(function () {
    $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
    });
});


// <!-- Bootstrap 3.3.7 -->
import bootstrap from 'bootstrap';

// <!-- DataTables -->
import datatables from 'datatables';

// <!-- Angular lib -->
import angular from 'angular';
import router from '@uirouter/angularjs';

// <!-- Utility Function -->
import { utility_Gender, utility_Race, utility_Review, utility_isSenior, utility_isMale } from './assets/js/Utility_Function';

// <!-- My angular app module -->
import app from './app/app';

// <!-- Global Service -->
import globalservice from './app/globalservice/module';
import shareDataservice from './app/globalservice/shareDataservice';

// <!-- Dashboard  Module -->
import dashboard from './app/dashboard/module';
import dashboardService from './app/dashboard/service/dashboardService';
import dashboardController from './app/dashboard/controllers/dashboardController';

// <!-- Login Module -->
import login from './app/login/module';
import loginService  from './app/login/service/loginService';
import loginController from './app/login/controllers/loginController';


// <!-- Employee  Module -->
import employee from './app/employee/module';
import employeeService from './app/employee/service/employeeService';
import employeeController from './app/employee/controllers/employeeController';

// <!-- Profile Controller -->
import profile from './app/profile/module';
import profileController from './app/profile/controllers/profileController';


// <!-- Our Stye Sheet. -->

// <!-- bootstrap -->
 import './assets/css/bootstrap.css';

// <!-- Font Awesome -->
 import './assets/css/font-awesome.css';

// <!-- Ionicons -->
import './assets/css/ionicons.css';

// <!-- DataTables -->
import './assets/css/dataTables.bootstrap.css';

// <!-- Theme style -->
import AdminLTEStyle from './assets/css/AdminLTE.css';
import skinStyle from './assets/css/skin-blue.css';
import blue from './assets/css/blue.css';

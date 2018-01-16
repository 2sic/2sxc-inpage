/// <reference types="../../typings/2sxc-js/2sxcInterfaces" />
//import i18next = require('../translate/libs/i18next.min.js');
import * as i18next from 'i18next';
import i18nextXHRBackend = require('../translate/libs/i18nextXHRBackend.min.js');
import jqueryI18next = require('../translate/libs/jquery-i18next.min.js');

export interface Window {
    $2sxc: SxcController;
    dnn_tabVersioningEnabled: any;
    dnn: any;
    $quickE: i$quickE;
    i18next: i18next.i18n;
    i18nextXHRBackend: any;
    location: any;
}

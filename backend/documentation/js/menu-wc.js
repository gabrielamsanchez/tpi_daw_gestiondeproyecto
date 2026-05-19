'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-54088b5d3fad4987880788c2ca29514872bd376132e8e95b46d3364943e237dd2b7883d863bbf6973f6238a76ebeb5d25802bae19c0b7bab3ebe8a0feb9d1a8e"' : 'data-bs-target="#xs-controllers-links-module-AppModule-54088b5d3fad4987880788c2ca29514872bd376132e8e95b46d3364943e237dd2b7883d863bbf6973f6238a76ebeb5d25802bae19c0b7bab3ebe8a0feb9d1a8e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-54088b5d3fad4987880788c2ca29514872bd376132e8e95b46d3364943e237dd2b7883d863bbf6973f6238a76ebeb5d25802bae19c0b7bab3ebe8a0feb9d1a8e"' :
                                            'id="xs-controllers-links-module-AppModule-54088b5d3fad4987880788c2ca29514872bd376132e8e95b46d3364943e237dd2b7883d863bbf6973f6238a76ebeb5d25802bae19c0b7bab3ebe8a0feb9d1a8e"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-54088b5d3fad4987880788c2ca29514872bd376132e8e95b46d3364943e237dd2b7883d863bbf6973f6238a76ebeb5d25802bae19c0b7bab3ebe8a0feb9d1a8e"' : 'data-bs-target="#xs-injectables-links-module-AppModule-54088b5d3fad4987880788c2ca29514872bd376132e8e95b46d3364943e237dd2b7883d863bbf6973f6238a76ebeb5d25802bae19c0b7bab3ebe8a0feb9d1a8e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-54088b5d3fad4987880788c2ca29514872bd376132e8e95b46d3364943e237dd2b7883d863bbf6973f6238a76ebeb5d25802bae19c0b7bab3ebe8a0feb9d1a8e"' :
                                        'id="xs-injectables-links-module-AppModule-54088b5d3fad4987880788c2ca29514872bd376132e8e95b46d3364943e237dd2b7883d863bbf6973f6238a76ebeb5d25802bae19c0b7bab3ebe8a0feb9d1a8e"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ClientesModule.html" data-type="entity-link" >ClientesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ClientesModule-c5e33f3ef18a962ad09ed1406ba5e721a2aaf06b381f4af043835aa700963bdc243d19639f4f953716b9fb936c8b40f399359aeb5a722331cee0586f30d8a6e7"' : 'data-bs-target="#xs-controllers-links-module-ClientesModule-c5e33f3ef18a962ad09ed1406ba5e721a2aaf06b381f4af043835aa700963bdc243d19639f4f953716b9fb936c8b40f399359aeb5a722331cee0586f30d8a6e7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ClientesModule-c5e33f3ef18a962ad09ed1406ba5e721a2aaf06b381f4af043835aa700963bdc243d19639f4f953716b9fb936c8b40f399359aeb5a722331cee0586f30d8a6e7"' :
                                            'id="xs-controllers-links-module-ClientesModule-c5e33f3ef18a962ad09ed1406ba5e721a2aaf06b381f4af043835aa700963bdc243d19639f4f953716b9fb936c8b40f399359aeb5a722331cee0586f30d8a6e7"' }>
                                            <li class="link">
                                                <a href="controllers/ClienteController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClienteController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ClientesModule-c5e33f3ef18a962ad09ed1406ba5e721a2aaf06b381f4af043835aa700963bdc243d19639f4f953716b9fb936c8b40f399359aeb5a722331cee0586f30d8a6e7"' : 'data-bs-target="#xs-injectables-links-module-ClientesModule-c5e33f3ef18a962ad09ed1406ba5e721a2aaf06b381f4af043835aa700963bdc243d19639f4f953716b9fb936c8b40f399359aeb5a722331cee0586f30d8a6e7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ClientesModule-c5e33f3ef18a962ad09ed1406ba5e721a2aaf06b381f4af043835aa700963bdc243d19639f4f953716b9fb936c8b40f399359aeb5a722331cee0586f30d8a6e7"' :
                                        'id="xs-injectables-links-module-ClientesModule-c5e33f3ef18a962ad09ed1406ba5e721a2aaf06b381f4af043835aa700963bdc243d19639f4f953716b9fb936c8b40f399359aeb5a722331cee0586f30d8a6e7"' }>
                                        <li class="link">
                                            <a href="injectables/ClienteService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClienteService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GestionModule.html" data-type="entity-link" >GestionModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProyectosModule.html" data-type="entity-link" >ProyectosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProyectosModule-f8c80b2a35e6f93641a7aca956c4ddb22672dda50f6eb67809f04e8cfb1aa997387ca6008620480554e781733295798ee93efe02ae1fd994469dc81d20f8ff57"' : 'data-bs-target="#xs-controllers-links-module-ProyectosModule-f8c80b2a35e6f93641a7aca956c4ddb22672dda50f6eb67809f04e8cfb1aa997387ca6008620480554e781733295798ee93efe02ae1fd994469dc81d20f8ff57"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProyectosModule-f8c80b2a35e6f93641a7aca956c4ddb22672dda50f6eb67809f04e8cfb1aa997387ca6008620480554e781733295798ee93efe02ae1fd994469dc81d20f8ff57"' :
                                            'id="xs-controllers-links-module-ProyectosModule-f8c80b2a35e6f93641a7aca956c4ddb22672dda50f6eb67809f04e8cfb1aa997387ca6008620480554e781733295798ee93efe02ae1fd994469dc81d20f8ff57"' }>
                                            <li class="link">
                                                <a href="controllers/ProyectosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProyectosController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProyectosModule-f8c80b2a35e6f93641a7aca956c4ddb22672dda50f6eb67809f04e8cfb1aa997387ca6008620480554e781733295798ee93efe02ae1fd994469dc81d20f8ff57"' : 'data-bs-target="#xs-injectables-links-module-ProyectosModule-f8c80b2a35e6f93641a7aca956c4ddb22672dda50f6eb67809f04e8cfb1aa997387ca6008620480554e781733295798ee93efe02ae1fd994469dc81d20f8ff57"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProyectosModule-f8c80b2a35e6f93641a7aca956c4ddb22672dda50f6eb67809f04e8cfb1aa997387ca6008620480554e781733295798ee93efe02ae1fd994469dc81d20f8ff57"' :
                                        'id="xs-injectables-links-module-ProyectosModule-f8c80b2a35e6f93641a7aca956c4ddb22672dda50f6eb67809f04e8cfb1aa997387ca6008620480554e781733295798ee93efe02ae1fd994469dc81d20f8ff57"' }>
                                        <li class="link">
                                            <a href="injectables/ProyectosService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProyectosService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ClienteController.html" data-type="entity-link" >ClienteController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProyectosController.html" data-type="entity-link" >ProyectosController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Cliente.html" data-type="entity-link" >Cliente</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateClienteDto.html" data-type="entity-link" >CreateClienteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProyectoDto.html" data-type="entity-link" >CreateProyectoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Proyecto.html" data-type="entity-link" >Proyecto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateClienteDto.html" data-type="entity-link" >UpdateClienteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProyectoDto.html" data-type="entity-link" >UpdateProyectoDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClienteService.html" data-type="entity-link" >ClienteService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProyectosService.html" data-type="entity-link" >ProyectosService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
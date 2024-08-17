// src/fontawesome.js
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faProjectDiagram, faCode, faUpload, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Add the icons to the library
library.add(faHome, faProjectDiagram, faCode, faUpload, faCog);

export { FontAwesomeIcon };

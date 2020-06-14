import Vue from 'vue';
import VueMdijs from 'vue-mdijs';
import {
  mdiMagnify,
  mdiPencil,
  mdiCog,
  mdiPencilBoxMultiple,
  mdiDelete,
  mdiPlus,
  mdiMinus,
  mdiTranslate,
  mdiChevronDown,
  mdiClose,
  mdiCheck,
  mdiLinkLock,
  mdiLink,
  mdiAccount,
  mdiEmail,
  mdiKey,
  mdiEye,
  mdiEyeOff,
  mdiDotsHorizontal,
  mdiLogout
} from '@mdi/js';

VueMdijs.add({
  mdiMagnify,
  mdiPencil,
  mdiCog,
  mdiPlus,
  mdiMinus,
  mdiPencilBoxMultiple,
  mdiDelete,
  mdiTranslate,
  mdiChevronDown,
  mdiClose,
  mdiCheck,
  mdiLinkLock,
  mdiLink,
  mdiAccount,
  mdiEmail,
  mdiKey,
  mdiEye,
  mdiEyeOff,
  mdiDotsHorizontal,
  mdiLogout
});

Vue.use(VueMdijs);

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
  mdiMessageProcessing,
  mdiChevronDown,
  mdiClose,
  mdiCheck,
  mdiLinkLock,
  mdiLink,
  mdiAccount,
  mdiEmail,
  mdiKey,
  mdiEye,
  mdiEyeOff
} from '@mdi/js';

VueMdijs.add({
  mdiMagnify,
  mdiPencil,
  mdiCog,
  mdiPlus,
  mdiMinus,
  mdiPencilBoxMultiple,
  mdiDelete,
  mdiMessageProcessing,
  mdiChevronDown,
  mdiClose,
  mdiCheck,
  mdiLinkLock,
  mdiLink,
  mdiAccount,
  mdiEmail,
  mdiKey,
  mdiEye,
  mdiEyeOff
});

Vue.use(VueMdijs);

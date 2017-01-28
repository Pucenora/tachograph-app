import I18n from 'react-native-i18n';
import moment from 'moment';
import 'moment/locale/de';

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true;
I18n.default_locale = 'de';

moment.locale('de');

I18n.translations = {
  en: {

  },
  de: {

  },
};

import I18n from 'react-native-i18n';
import moment from 'moment';
import 'moment/locale/de';

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true;
I18n.default_locale = 'de';

moment.locale('de');


I18n.translations = {
  en: {
    TripListView_empty_list_header_title: 'You haven\'t added any trips yet.',
    TripListView_empty_list_header_subtitle: 'Add a trip now with the button below.',
    TripListView_action_button_add_trip: 'Add trip manually',
    TripListView_action_button_add_record_trip: 'Record new trip',
    CarListView_action_button_add_car: 'Add a new car',
    DriverListView_empty_header_title: 'No drivers yet',
    DriverListView_empty_header_subtitle: 'If multiple drivers share a car, you can add them here.',
    DriverListView_action_button_add_driver: 'Add a new driver',
    AboutView_title: 'About Tachograph',
    AboutView_label_app_name: 'Tachograph',
    AboutView_label_version: 'Version {{version}}',
    AboutView_label_buildNumber: 'Build number: {{buildNumber}}',
    AboutView_label_buildDate: 'Build date: {{buildDate}}',
    AboutView_label_gitCommit: 'Git Commit: {{gitCommit}}',
    AboutView_label_apiVersion: 'API version: {{apiVersion}}',
    AboutView_label_apiUrl: 'API URL: {{apiUrl}}',
    AboutView_label_apiGitCommit: 'API git commit: {{gitCommit}}',
    AboutView_label_copyright: 'Licensed under the',
    AboutView_button_terms: 'Usage policy',
    AboutView_button_privacy: 'Privacy policy',
    AboutView_license_label: 'GNU Affero General Public License Version 3',
    AboutView_github_label: 'Project page at GitHub',
    AboutView_github_url: 'https://github.com/fkoester/tachograph-app',
    AboutView_terms_url: 'https://www.fabian-koester.com',
    AboutView_privacy_url: 'https://www.fabian-koester.com',
    AboutView_license_url: 'http://www.gnu.org/licenses/agpl-3.0.en.html',
  },
  de: {
    TripListView_empty_list_header_title: 'Sie haben noch keine Fahrten eingetragen.',
    TripListView_empty_list_header_subtitle: 'Fügen Sie jetzt eine Fahrt mit dem Knopf unten hinzu.',
    TripListView_action_button_add_trip: 'Fahrt manuell hinzufügen',
    TripListView_action_button_add_record_trip: 'Fahrt automatisch aufzeichnen',
    CarListView_action_button_add_car: 'Fahrzeug hinzufügen',
    DriverListView_empty_header_title: 'Noch keine Fahrer angelegt.',
    DriverListView_empty_header_subtitle: 'Falls mehrere Fahrer das selbe Fahrzeug nutzen können diese hier angelegt werden.\n\nDrücken Sie dazu einfach den blauen Button unten rechts!',
    DriverListView_action_button_add_driver: 'Fahrer hinzufügen',
    AboutView_title: 'Über Tachograph',
    AboutView_label_app_name: 'Tachograph',
    AboutView_label_version: 'Version {{version}}',
    AboutView_label_buildNumber: 'Buildnummer: {{buildNumber}}',
    AboutView_label_buildDate: 'Erstellung: {{buildDate}}',
    AboutView_label_gitCommit: 'Git Commit: {{gitCommit}}',
    AboutView_label_apiVersion: 'API-Version: {{apiVersion}}',
    AboutView_label_apiUrl: 'API URL: {{apiUrl}}',
    AboutView_label_apiGitCommit: 'API Git Commit: {{gitCommit}}',
    AboutView_label_copyright: 'Lizenziert unter der',
    AboutView_button_terms: 'Nutzungsbedingungen',
    AboutView_button_privacy: 'Datenschutzerklärung',
    AboutView_license_label: 'GNU Affero General Public License Version 3',
    AboutView_imprint_header: 'Impressum',
    AboutView_imprint_text: 'Angaben gemäß § 5 TMG:\nFabian Köster\nRheindorfer Str. 257\n40764 Langenfeld',
    AboutView_github_label: 'Projektseite bei GitHub',
    AboutView_github_url: 'https://github.com/fkoester/tachograph-app',
    AboutView_terms_url: 'https://www.fabian-koester.com',
    AboutView_privacy_url: 'https://www.fabian-koester.com',
    AboutView_license_url: 'http://www.gnu.org/licenses/agpl-3.0.de.html',
  },
};

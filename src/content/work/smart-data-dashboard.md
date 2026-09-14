## Daten für Alle

Wie viel Regen fiel letzten Monat? Wie viele Radfahrer passieren die Innenstadt? Wie hoch ist der UV-Index heute? Kommunen sitzen auf einem Berg an Open Data, der für Bürger meist unsichtbar bleibt. Das **Smart Data Dashboard** macht diese Daten sichtbar – live, verständlich und ohne Excel-Kenntnisse. Vorgestellt am Beispiel [Marburg in Zahlen](https://marburg-in-zahlen.de/).

### Was?
* Konzept & Architektur
* Frontend
* Headless CMS
* Datenimport
* Kern-Plugins

### Wie?
* Next.js
* Statamic (Laravel)
* Apache ECharts
* Python

![Marburg in Zahlen](/images/marburg-in-zahlen.png)
*Kategorie "Umwelt und Klima" mit Live-Daten*

### Umsetzung
Die Ausgangsbasis war das Open-Source-Projekt [Klimadashboard Münster](https://klimadashboard.ms/). Dort ist jede Kachel eine eigene Datei – schön für einen Prototyp, mühsam für jede weitere Stadt. Also habe ich das Prinzip umgedreht: **der Inhalt bestimmt die Ansicht, nicht der Code.** Kachel-Typen sind wiederverwendbare Layouts, die beliebig oft mit unterschiedlichen Datenquellen bestückt werden können. Redaktionen legen neue Kacheln, Seiten und Kategorien selbst an – ohne Entwickler, ohne Deployment.

Das **Frontend** ist eine Next.js-App mit einem Kachel-Raster und je einer Seite pro Kategorie. Die Diagramme entstehen mit [Apache ECharts](https://echarts.apache.org/), das auch bei mehreren tausend Datenpunkten pro Kachel nicht ins Schwitzen kommt. Dazu kommen Volltextsuche über alle Kacheln, Mehrsprachigkeit, Screenreader-taugliche Alternativdarstellungen der Diagramme und ein PWA-Modus.

Das **CMS** ist ein flat-file Statamic auf Laravel – kein Datenbankserver, dafür versionierbare Inhalte im Git. Es liefert nicht nur Texte und Konfiguration, sondern normalisiert auch die hochgeladenen CSV-Datensätze: leere Spalten fliegen raus, Spaltenschemata werden geprüft, Quellenangaben hängen am Datensatz statt im Code.

Alles, was sich nicht minütlich ändert, wird beim Build in einen **statischen Cache** geschrieben. Nur echte Live-Daten – Wetter, UV-Index, Verkehrszähler – werden zur Laufzeit abgefragt, gebündelt über eigene Endpunkte, damit API-Keys und Rate-Limits serverseitig bleiben. Der Cache wird per Webhook aus dem CMS invalidiert. Ergebnis: eine Seite, die Live-Daten zeigt, aber wie eine statische Website ausgeliefert wird.

Für die **historischen Datensätze** gibt es Python-Importer, die die Rohdaten des Deutschen Wetterdienstes einlesen und zu auswertbaren Zeitreihen verdichten – Klimaindizes, Mittelwerte, Langzeitvergleiche. Denn ein Temperaturwert allein sagt wenig; interessant wird er im Vergleich zu vierzig Jahren Messreihe.

### Kern-Plugins
Damit die Städte nicht auseinanderlaufen, steckt die Basis in Paketen, die ich entworfen und umgesetzt habe:

* **Statamic-Core-Addon** – die serverseitige Hälfte: REST-Endpunkte für Inhalte, Kacheln, Navigation und Taxonomien, Konnektoren zu externen Datenquellen (DWD, Open-Meteo), CSV-Verarbeitung, eigene Fieldtypes und Layout-Vorschauen direkt im Control Panel.
* **React-Statamic-API** – die Client-Hälfte als npm-Paket: typisierte Datenabfrage, Caching, Routing und die Basis-Komponenten der Kacheln. Ein Kachel-Typ implementiert nur noch seine Darstellung, alles andere kommt aus dem Paket.

Der Effekt ist der eigentliche Punkt: Ein Bugfix oder ein neues Feature passiert an *einer* Stelle und landet nach einem `composer update` in allen Installationen. Was stadtspezifisch bleibt, sind Inhalte, Farben und ein paar Sonder-Kacheln.

### Mehrfach adaptiert
Das Dashboard läuft inzwischen in mehreren Kommunen – Marburg, Aschaffenburg, Frankfurt und Remscheid – jeweils mit eigenen Datenquellen, eigenem Corporate Design und eigenen Schwerpunkten. Jede Adaption hat die Basis geschärft: was zum zweiten Mal kopiert wurde, ist ins Kern-Plugin gewandert. Ein neues Projekt ist heute vor allem Konfiguration.

### Fazit
Das spannendste an diesem Projekt ist nicht die Technik, sondern die Übersetzungsarbeit: von Rohdaten zu einer Aussage, die man in drei Sekunden versteht. Und die Erkenntnis, dass sich Wiederverwendbarkeit erst dann auszahlt, wenn man sie schon einmal falsch gemacht hat.

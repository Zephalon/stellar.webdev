## Produkte Maximal

Auf Frankfurt Minimal werden Möbelklassiker angeboten. Meine Aufgabe ware es, eine Produktdatenbank inklusive API zu entwickeln und das passende Frontend umzusetzen.

### Was?
* Produktdatenbank
* REST-API
* Frontend Produktsuche

### Wie?
* Contao
* React

![Produktkonfigurator](/images/frankfurt-minimal-1.png)

### Umsetzung
Im **Backend** habe ich einen neuen Inhalte-Typ mit den ensprechenden Datenbankfeldern hinzugefügt. Dort kann man bequem die aktuell vorhandenen Produkte (zweisprachig) einpflegen.

Über die **REST-Schnittstelle** wird die Produktliste im JSON Format abgerufen. Es ist auch möglich diese nach Kriterien wie "hervorgehoben" oder "archiviert" zu filtern. Über einen Sprach-Parameter wird gesteuert, ob die Inhalte auf Deutsch oder Englisch ausgeliefert werden. Um die Datenmenge zu reduzieren, werden nur die Indices der Eigenschaften wie Designer, Stil oder Hersteller übertagen.

![REST-API](/images/frankfurt-minimal-2.png)

Das **React-Frontend** ruft beim Start die komplette Liste an verfügbaren Produkten auf. Da es sich um eine keine besonders große Datenbank handelt, ist Ladezeit in diesem Anwendungsfall vernachlässigbar (ca. 0,25s für die Datenbank-Abfrage).

Die React-App iteriert danach durch alle vorhandenen Produkte und baut die entsprechenden Filter auf. Es müssen also keine weiteren Anfragen an den Server gesendet werden, die einen Performancegewinn einer paginierten Anzeige zunichte gemacht hätten. Die Produktbilder werden erst bei Bedarf nachgeladen, um den initialen Fussabdruck gering zu halten.

Die Produktseiten werden durch das CMS erzeugt, um maximale Sichtbarkeit für Suchmaschinen zu gewährleisten. Deshalb, und um die Weiterleitung zu ermöglichen, wird der letzte Zustand der Produktsuche über die URL-Parameter gespeichert.

### Fazit
Eine schlanke und flotte Lösung die zur Aufgabenstellung passt, das macht den Kunden und auch die Besucher glücklich.
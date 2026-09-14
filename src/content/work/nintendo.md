## Großer Fisch

Ich habe viele Projekte für Nintendo Europe umgesetzt, vor allem Microsites und Werbemittel. Der Kids Club war aber mein mit Abstand größtes Projekt, das ich federführend für diesen Kunden umgesetzt habe.

Ziel war es, eine Website zu entwickeln, auf der (vor allem) Kinder Inhalte konsumieren oder herunterladen konnten. Das sollte die Marke "Nintendo" in der Zielgruppe stärken und die Sichtbarkeit im Web erhöhen. Inhalte waren z. B. PDF zum Ausdrucken, eine YouTube-Show, aber auch Mini-Spiele.

**Spoiler:** Leider wurden die Inhalte inzwischen aus diversen Gründen in das "Mutterschiff" integriert und die Website ist nicht mehr erreichbar.

### Was?
* Technische Konzeption
* Umsetzung

### Wie?
* Custom Framework

![Front Page](/images/nintendo-kids-club-1.jpg)
*Startseite*

### Umsetzung
Bei der Umsetzung gab es strikte technische Vorgaben und diverse Sonderwünsche. Deshalb hatte ich mich entschieden ein eigenes, maßgeschneidertes Framework einzusetzen, das ohne Ballast daher kam und uns maximale Flexibilität ermöglichte. Die gesamte Struktur der Website war zudem relativ simpel.

Eine große Herausforderung waren die vielen verschiedenen Sprachversionen. Die Website musste zwölf Sprachen und mehrere lokalisierte Sprachvarianten bedienen (z. B. für die Schweiz: Deutsch, Französisch und Italienisch). Um das abzubilden, gab es ein *"Cascading-Content-System"* (CCM®) auf Basis von XML. Angefangen von der *Master-Sprache* wurde zuerst die allgemeine (z. B. "DE") und dann die spezialisierte Sprachversion (z. B. CH-DE) durchlaufen. Sollte für den jeweiligen Knoten, wie z. B. einen Titel, Bild oder Link, ein lokalisierter vorhanden sein, wurde er damit überschrieben. So konnte man nicht nur lokalisierte Texte, sondern auch Bilder, Dateien oder externe Links abdecken.

Um die Navigation zu beschleunigen, hatte ich mich entschieden auf **AJAX** zu setzen. Einmal auf der Seite angekommen, wurden alle weiteren Inhalte im Hintergrund über JavaScript nachgeladen. Der Vorteil war, abseits der besseren Nutzererfahrung, dass die übertragene Datenmenge um etwa zwei Drittel sank. Bei einem direkten Seitenaufruf bekam man aber weiterhin die komplette Website mit Header und Footer ausgeliefert.

Alle Inhalte waren statisch und wurden entsprechend auch als statische Dateien exportiert. Zu jeder Seite gab es eine HTML-Datei für direkte Aufrufe und eine JSON-Datei für die AJAX-Aufrufe. Das trug zusätzlich dazu bei, die Serverlast und Antwortzeiten gering zu halten.

Die Mini-Spiele wurden größtenteils von externen Agenturen geliefert. Um eine abgeschlossene Umgebung zu schaffen, gab es die *GameBox*. Diese stellte diverse Standard-Methoden, wie z. B. den Start-Bildschirm oder die Schwierigkeitsauswahl bereit. So wurde ein homogenes Nutzererlebnis möglich, ohne dass jedes Mal das Rad neu erfunden (und übersetzt) werden musste.

### Fazit
Das eigens dafür entwickelte System war flott, absolut sicher und flexibel. Sonderwünsche einzelner Nintendo Abteilungen konnten wir aufgrund der soliden Basis über mehrere Jahre hinweg sauber umsetzen.
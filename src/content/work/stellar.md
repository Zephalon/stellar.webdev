## Portfolio No.7

*Stellar* – *Hervorragend*. So sollte meine neue Website werden, inzwischen die Siebente. Meine Vorgaben waren simpel: ich will mich präsentieren, sie soll im Gedächtnis bleiben und meine Bewerbungen unterstützen. Die Website muss weder über Google gefunden werden, noch sich dem Massengeschmack anpassen. Zielgruppe sind alle, die bereits mit der Webentwicklung affin sind.

### Was?
* Konzept
* Design
* Code

### Wie?
* Next.js
* p5.js
* KI-Tools
* Herzblut

### Umsetzung
Nachdem ich die Website auf Papier grob konzipiert hatte, waren die Rahmenbedingungen abgesteckt: eine Single Page Application mit dynamischer Navigation sollte es werden, ohne Bruch in der Benutzerführung. Außerdem sollte es eine Mischung aus **Bauhaus** (Formen & Farben), **Druck** (der Mediengestalter lässt grüßen) und **Weltraum** werden. LoFi und minimaler Einsatz von Bildern. Die Inhalte können statisch sein, da sie sich nur selten ändern.

![Sketch](/images/stellar-1.jpg)
*Nur zwei von vielen Seiten*

Das Skelett der Website bildet [Next.js](https://nextjs.org/) mit dem App Router. Die Inhalte liegen als Markdown-Dateien im Projekt und werden zur Build-Zeit über [remark](https://remark.js.org/) in HTML übersetzt. Heraus fällt ein statischer Export, der ohne Node-Runtime auf jedem Webspace liegen darf – trotzdem bekommt jede Unterseite eine echte URL, statt eines Fragment-Bezeichners.

Die Animationen mit CSS umzusetzen wäre möglich gewesen, aber *langweilig* und wenig performant. Deshalb bin ich bei den Hintergründen bei [p5.js](https://p5js.org/) gelandet. Da die üblichen React-Wrapper für p5.js entweder unmaintained sind oder React 19 nicht mögen, habe ich mir einen eigenen, schlanken Ersatz gebaut – inklusive korrektem Aufräumen von Instanzen und Event-Listenern, denn ein Speicherleck pro Seitenwechsel ist kein Feature.

Beim Design war die Herausforderung, aus der reduzierten Farben- und Form-Palette gute UX zu schmieden. Der Nutzer muss, trotz der ungewohnten Navigation, zu jeder Zeit wissen wie es weitergeht. Zudem durfte das Ergebnis nicht zu reduziert sein, um nicht dröge zu wirken. Hier kommen die Animationen und Halbton-Effekte ins Spiel.

Für beides musste ich dann tiefer ins Mathe-Buch schauen und die Performance im Auge behalten. Gerendert wird nur das, was sein muss, die Ergebnisse der Berechnungen werden soweit wie möglich zwischengespeichert. Als Lichtquelle dient der Mauszeiger – auf Mobilgeräten übernimmt das Gyroskop, sofern es der Browser hergibt.

Grundsätzlich gibt das DOM die Struktur der Seite vor, so kann der Browser die Positionierung der Elemente auf den verschiedenen Endgeräten dynamisch vorgeben. p5.js übernimmt aber die Darstellung vieler UI-Elemente und bietet so ein nahtloses, dynamisches Interface. Und das ohne auf die Flexibilität von React verzichten zu müssen.

### KI im Werkzeugkasten
Die erste Fassung dieser Website war eine Create-React-App – ein Setup, das inzwischen in Rente gegangen ist. Die Migration nach Next.js habe ich gemeinsam mit einem KI-Agenten durchgezogen: Klassen-Komponenten zu Hooks, eigener p5-Wrapper, statischer Export samt Build-Pipeline für die Inhalte.

So arbeite ich mit KI:

* **Kontext schlägt Prompt.** Projektregeln, Konventionen und Architektur-Entscheidungen liegen versioniert im Repository, damit das Werkzeug nicht rät.
* **Kleine, überprüfbare Schritte.** Ein Thema pro Durchgang, danach Review und Test. Was ich nicht erklären kann, kommt nicht in den Commit.
* **Zweifel bleiben Pflicht.** Halluzinierte APIs und plausibel aussehender Unsinn sind Alltag – deshalb wird gegen die Doku und den laufenden Build geprüft, nicht gegen das Bauchgefühl.
* **Die Verantwortung bleibt bei mir.** KI beschleunigt Recherche, Refactorings und Boilerplate. Die Architektur, das Design und die Entscheidung, was gut genug ist, nicht.

Kurz: ein sehr schneller, sehr selbstbewusster Junior, der nie müde wird. Nützlich, wenn man ihn führt.

### Fazit
Bin ich zufrieden mit dem Ergebnis? Ja*. Die Website ist in [drei Wimpernschlägen](https://www.scinexx.de/news/biowissen/gehirn-macht-beim-blinzeln-pause/) geladen, stilistisch eigenständig und definitiv einzigartig. Habe ich noch viele weitere Ideen für die Zukunft? Klar**.

Wer sich dafür interessiert, kann sich gerne den [Quellcode](https://github.com/Zephalon/stellar.webdev) auf GitHub anschauen.

**noch*

***deutlich mehr als Freizeit*

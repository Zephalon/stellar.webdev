## Portfolio No.7

*Stellar* – *Hervorragend*. So sollte meine neue Website werden, inzwischen die Siebente. Meine Vorgaben waren simpel: ich will mich präsentieren, sie soll im Gedächtnis bleiben und meine Bewerbungen unterstützen. Die Website muss werden über Google gefunden werden, noch sich dem Massengeschmack anpassen. Zielgruppe sind alle, die bereits mit der Webentwicklung affin sind.

### Was?
* Design
* Code

### Wie?
* React
* Herzblut

### Umsetzung
Nachdem ich die Website auf Papier grob konzipiert hatte, waren die Rahmenbedingungen abgesteckt: eine Single Page Application mit dynamischer Navigation sollte es werden, ohne Bruch in der Benutzerführung. Außerdem sollte es eine Mischung aus **Bauhaus** (Formen & Farben), **Druck** (der Mediengestalter lässt grüßen) und **Weltraum** werden. LoFi und minimaler Einsatz von Bildern. Die Inhalte können statisch sein, da sie sich nur selten ändern.

![Sketch](/images/stellar-1.jpg)
*Nur zwei von vielen Seiten*

Das Skelett der Website sollte Aufgrund meiner Anforderungen [react.js](https://reactjs.org/) bilden. Die Animationen mit CSS Elementen umsetzen wäre möglich gewesen, aber *langweilig* und wenig performant. Deshalb bin ich bei den Hintergründen bei [p5.js](https://p5js.org/) gelandet.

Beim Design war die Herausforderung, aus der reduzierten Farben- und Form-Palette gute UX zu schmieden. Der Nutzer muss, trotz der ungewohnten Navigation, zu jeder Zeit wissen wie es weitergeht. Zudem durfte das Ergebnis nicht zu reduziert sein, um nicht dröge zu wirken. Hier kommen die Animationen und Halbton-Effekte ins Spiel.

Für beides musste ich dann tiefer ins Mathe-Buch schauen und die Performance im Auge behalten. Gerendert wird nur das, was sein muss, die Ergebnisse der Berechnungen werden soweit wie möglich zwischengespeichert.

Grundsätzlich gibt das DOM die Struktur der Seite vor, so kann der Browser die Positionierung der Elemente auf den verschiedenen Endgeräten dynamisch vorgeben. p5.js übernimmt aber die Darstellung vieler UI-Elemente und bieten so ein nahtloses, dynamisches Interface. Und das ohne auf die Flexibilität von React verzichten zu müssen.

### Fazit
Bin ich zufrieden mit dem Ergebnis? Ja*. Die Website ist in [drei Wimpernschlägen](https://www.scinexx.de/news/biowissen/gehirn-macht-beim-blinzeln-pause/) geladen, stilistisch eigenständig und definitiv einzigartig. Habe ich noch viele weitere Ideen für die Zukunft? Klar**.

Wer sich dafür interessiert, kann sich gerne den [Quellcode](https://github.com/Zephalon/stellar.webdev) auf GitHub anschauen.

**noch*

***deutlich mehr als Freizeit*
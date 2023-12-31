# Veb aplikacija za rezervaciju karata u bioskopu

Projekat za ispit iz predmeta "Praktikum - Internet i veb tehnologije."

Broj indeksa: 2018201113
Ime i prezime: Petar Jovanović
Školska godinaČ 2022/23

## Projektni zahtev

Aplikacija treba da omogući korisnicima da on-lajn rezervišu kartu za bioskopsku projekciju filma za tačno određeno mesto u bioskopskoj sali. Administrator portala, koji pristupa nakon uspešne prijave sa korisničkim imenom i lozinkom, može da unosi planirane projekcije filmova, podatke o filmu i da raspoređuje projekcije filma u određene sale po datumu i vremenu početka projekcije. Administrator takođe može da vidi spisak rezervacija za pojedinačne projekcije. Korisnik veb aplikacije otvara spisak filmova, a pošto izabere film, otvara jednu od projekcija koje su navedene za izabrani film. Pošto otvori projekciju, prikazuje mu se prikaz sale sa rasporedom mesta. Mesta za koje je već izvršena rezervacija su obeležene kao nedostupne, a ona mesta koja su slobodna korisnik može da markira klikom na prikaz mesta, jedno po jedno. Prvi klik obeležava mesto, a drugi ga oslobađa. Pošto završi obeležavanje i popuni ime i prezime, kao i broj telefona u formularu ispod prikaza sale i klikne na dugme za potvrdu rezervacije, aplikacija na strani servera, pošto dobije podatke o rezervaciji, proverava da li je u međuvremenu neko od odabranih mesta već rezervisano. Ako jeste, prikazuje poruku i vraća korisnika na stranicu za rezervaciju da obeleži druga mesta. Ako su sva obeležena mesta bila slobodna, upisuje u bazu podataka njegovu rezervaciju. Grafički interfejs treba da bude realizovan sa responsive dizajnom.

## Tehnička ograničenja

- Aplikacija mora da bude realizovana na Node.js platformi korišćenjem Express biblioteke. Aplikacija mora da bude podeljena u dve nezavisne celine: back-end veb servis (API) i front-end (GUI aplikacija). Sav kôd aplikacije treba da bude organizovan u jednom Git spremištu u okviru korisničkog naloga za ovaj projekat, sa podelom kao u primeru zadatka sa vežbi.
- Baza podataka mora da bude relaciona i treba koristiti MySQL ili MariaDB sistem za upravljanje bazama podataka (RDBMS) i u spremištu back-end dela aplikacije mora da bude dostupan SQL dump strukture baze podataka, eventualno sa inicijalnim podacima, potrebnim za demonstraciju rada projekta.
- Back-end i front-end delovi projekta moraju da budi pisani na TypeScript jeziku, prevedeni TypeScript prevodiocem na adekvatan JavaScript. Back-end deo aplikacije, preveden na JavaScript iz izvornog TypeScript koda se pokreće kao Node.js aplikacija, a front-end deo se statički servira sa rute statičkih resursa back-end dela aplikacije i izvršava se na strani klijenta. Za postupak provere identiteta korisnika koji upućuje zahteve back-end delu aplikacije može da se koristi mehanizam sesija ili JWT (JSON Web Tokena), po slobodnom izboru.
- Sav generisani HTML kôd koji proizvodi front-end deo aplikacije mora da bude 100% validan, tj. da prođe proveru W3C Validatorom (dopuštena su upozorenja - Warning, ali ne i greške - Error). Grafički korisnički interfejs se generiše na strani klijenta (client side rendering), korišćenjem React biblioteke, dok podatke doprema asinhrono iz back-end dela aplikacije (iz API-ja). Nije neophodno baviti se izradom posebnog dizajna grafičkog interfejsa aplikacije, već je moguće koristiti CSS biblioteke kao što je Bootstrap CSS biblioteka. Front-end deo aplikacije treba da bude realizovan tako da se prilagođava različitim veličinama ekrana (responsive design).
- Potrebno je obezbediti proveru podataka koji se od korisnika iz front-end dela upućuju back-end delu aplikacije. Moguća su tri sloja zaštite i to: (1) JavaScript validacija vrednosti na front-end-u; (2) Provera korišćenjem adekvatnih testova ili regularnih izraza na strani servera u back-end-u (moguće je i korišćenjem izričitih šema - Schema za validaciju ili drugim pristupima) i (3) provera na nivou baze podataka korišćenjem okidača nad samim tabelama baze podataka.
- Neophodno je napisati prateću projektnu dokumentaciju o izradi aplikacije koja sadrži (1) model baze podataka sa detaljnim opisom svih tabela, njihovih polja i relacija; (2) dijagram baze podataka; (3) dijagram organizacije delova sistema, gde se vidi veza između baze, back-end, front-end i korisnika sa opisom smera kretanja informacija; (4) popis svih aktivnosti koje su podržane kroz aplikaciju za sve uloge korisnika aplikacije prikazane u obliku Use-Case dijagrama; kao i (5) sve ostale elemente dokumentacije predviđene uputstvom za izradu dokumentacije po ISO standardu.
- Izrada oba dela aplikacije (projekata) i promene kodova datoteka tih projekata moraju da bude praćene korišćenjem alata za verziranje koda Git, a kompletan kôd aplikacije bude dostupan na javnom Git spremištu, npr. na besplatnim GitHub ili Bitbucket servisima, jedno spremište za back-end projekat i jedno za front-end projekat. Ne može ceo projekat da bude otpremljen u samo nekoliko masovnih Git commit-a, već mora da bude pokazano da je projekat realizovan u kontinuitetu, da su korišćene grane (branching), da je bilo paralelnog rada u više grana koje su spojene (merging) sa ili bez konflikata (conflict resolution).

### Uloge korisnika

**Administrator**

- Kreiranje projekcija
- Uredjivanje projekcija
- Rasporedjivanje projekcija u odredjene sale
  - Po datumu i vremenu pocetka projekcije
- Pregled spiska rezervacija za pojedinacne projekcije

**Korisnik/Posetilac**

- Pregled projekcija
- Pregled sala sa rasporedom mesta
- Rezervacija mesta
- prijava -> Administrator

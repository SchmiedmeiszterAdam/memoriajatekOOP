const meret = 4; //ennyi kártyával dolgozuk


$(function () {
    new Jatek();
});
class Jatek {
    constructor() {
        let szuloElem = $("article"); //itt lesznek a kártyák
        let sablonElem = $(".kartya"); //ez a mintaelem, amit másolgatunk
        this.kepekTomb = []
        this.kepekTombFeltoltese();
        this.kartyaTomb = []
        //itt tárolom a kártya objektumokat
        const jatekter = new Jatekter(szuloElem, sablonElem, this.kepekTomb, this.kartyaTomb);
        this.kivalsztottKartyak = []; //itt fogom tárolni a kiválsztott Kártyákat
        //feliratkozunk a Kartya osztályban létrehozott *kartyaKattintas* eseményre

        $(window).on("kartyaKattintas", (event) => {
            //ha blokkolva van a kattintás, akkor ne is menjünk tovább
            if (event.detail.blocked) {
                return;
            }
            let kivalasztottKartya = "";
            this.kivalsztottKartyak.push(event.detail);
            //ha már van két kártya a kiválasztottKártyák között
            if (this.kivalsztottKartyak.length >= 2) {
                //Blokkolom az összes kártyát, azaz nem lesznek kattinthatóak
                this.TriggerBlocked();

                //ha egyenlő a két kártya
                if (
                    this.kivalsztottKartyak[0].fajlnev ==
                    this.kivalsztottKartyak[1].fajlnev
                ) {
                    //ürítsük ki a tömböt , miközben eltüntetjük a nyertes kártyákat
                    while ((kivalasztottKartya = this.kivalsztottKartyak.pop())) {
                        kivalasztottKartya.eltuntet();
                    }
                    TriggerUnBlocked(); //kiváltjuk a blokkolás eseményt
                } else {
                    //ha  akét kártya nem egynelő, akkor foduljanak visszaadni
                    //késleltetve
                    setTimeout(() => {
                        while (
                            (kivalasztottKartya = this.kivalsztottKartyak.pop())
                        ) {
                            kivalasztottKartya.allapotValtozas();
                        }
                        TriggerUnBlocked(); //megszüntetjük a blokkolást
                    }, 2000);
                }
            }
        });
        function TriggerUnBlocked() {
            window.dispatchEvent(new Event("gameUnBlocked"));
        }
    }
    TriggerBlocked() {
        window.dispatchEvent(new Event("gameBlocked"));
    }

    kepekTombFeltoltese() {
        for (let index = 1; index <= meret; index++) {
            this.kepekTomb.push("kepek/kep" + index + ".jpg");
            this.kepekTomb.push("kepek/kep" + index + ".jpg");
        }
        //kepekTomb vélelten sorrendű keverése, a tesztelés idejére kikommentezzük
        this.kepekTomb.sort((a, b) => {
            return Math.random() - 0.5;
        });
    }
}

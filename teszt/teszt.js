// JÁTÉK ELŐTTI TESZTELÉSEK
const { test } = QUnit
QUnit.module('Memóriajáték kártyák létrehozása', function (h) {
    h.beforeEach(() => {
        this.jatek = new Jatek()
    })
    test('Léttezik-e a függvény', (assert) => {
        assert.ok(this.jatek.kepekTombFeltoltese, "Létezik");
    });
    test('Függvény-e', (assert) => {
        assert.ok(typeof this.jatek.kepekTombFeltoltese == "function");
    });
    test('Keverés', (assert) => {
        assert.equal((this.jatek.kartyaTomb[0] != this.jatek.kartyaTomb[1]) || (this.jatek.kartyaTomb[2] != this.jatek.kartyaTomb[3]) || (this.jatek.kartyaTomb[4] != this.jatek.kartyaTomb[5]) || (this.jatek.kartyaTomb[6] != this.jatek.kartyaTomb[7]), true)
    });
    test('Keverés', (assert) => {
        assert.equal(this.jatek.kartyaTomb.length % 2 === 0, true)
    });
})

//KÁRTYÁKRA KATTINTÁS
QUnit.module('Kártyákra való kattintás', function (h) {
    h.beforeEach(() => {
        this.jatek = new Jatek()
    })
    test('Kattintásra állapotváltozás', (assert) => {
        this.jatek.kartyaTomb[0].kattintas()
        assert.equal(this.jatek.kartyaTomb[0].allapot === true, true)
        assert.equal(this.jatek.kartyaTomb[1].allapot === true, false)
        assert.equal(this.jatek.kartyaTomb[2].allapot === true, false)
        assert.equal(this.jatek.kartyaTomb[3].allapot === true, false)
        assert.equal(this.jatek.kartyaTomb[4].allapot === true, false)
        assert.equal(this.jatek.kartyaTomb[5].allapot === true, false)
        assert.equal(this.jatek.kartyaTomb[6].allapot === true, false)
        assert.equal(this.jatek.kartyaTomb[7].allapot === true, false)
    });
    test('Kattintásra blokkolás', (assert) => {
        this.jatek.kartyaTomb[0].kattintas()
        this.jatek.kartyaTomb[1].kattintas()
        assert.equal(this.jatek.kartyaTomb[0].blokkolt === true, true)
        assert.equal(this.jatek.kartyaTomb[1].blokkolt === true, true)
        assert.equal(this.jatek.kartyaTomb[2].blokkolt === true, true)
        assert.equal(this.jatek.kartyaTomb[3].blokkolt === true, true)
        assert.equal(this.jatek.kartyaTomb[4].blokkolt === true, true)
        assert.equal(this.jatek.kartyaTomb[5].blokkolt === true, true)
        assert.equal(this.jatek.kartyaTomb[6].blokkolt === true, true)
        assert.equal(this.jatek.kartyaTomb[7].blokkolt === true, true)
    });
    test('Kattintásra bekerül a tömbbe', (assert) => {
        this.jatek.kartyaTomb[0].kattintas()
        assert.equal(this.jatek.kivalsztottKartyak[0] === this.jatek.kartyaTomb[0], true)
    });
    test('2 azonos kártánál megváltozik a visibility értékük', function (assert) {
        const jatek = new Jatek()
        jatek.kartyaTomb[0].kattintas()
        jatek.kartyaTomb[1].kattintas()
        console.log(jatek.kartyaTomb[0])
        assert.equal($(jatek.kartyaTomb[0].elem).css("visibility") === "hidden", true)
        assert.equal($(jatek.kartyaTomb[1].elem).css("visibility") === "hidden", true)
    });
})

// FELÜLET TESZTELÉSE
QUnit.module('Felület tesztelése', function (h) {
    h.beforeEach(() => {
        this.jatek = new Jatek()
    })
    test('Létrejön a megfelelő számú Kártya elem', (assert) => {
        assert.equal(this.jatek.kartyaTomb.length === meret * 2, true)
    });
    test('Létrejön-e az IMG tag az elemben', (assert) => {
        let i = 0
        while (i < this.jatek.kartyaTomb.length && this.jatek.kartyaTomb[i].elem.children("img").length === 1) {
            i++
        }
        assert.equal(i === this.jatek.kartyaTomb.length, true)
    });
    test('Megfelelő-lesz-e az elem háttérképe', (assert) => {
        let i = 0
        while (i < this.jatek.kartyaTomb.length && this.jatek.kartyaTomb[i].kepElem.attr("src") === "kepek/hatter.jpg") {
            i++
        }
        assert.equal(i === this.jatek.kartyaTomb.length, true)
    });
    test('A létrejövő Kártya objektumok a blokkolt értéke false', (assert) => {
        assert.equal(this.jatek.kartyaTomb[0].allapot === true, false)
        assert.equal(this.jatek.kartyaTomb[1].allapot === true, false)
        assert.equal(this.jatek.kartyaTomb[2].allapot === true, false)
        assert.equal(this.jatek.kartyaTomb[3].allapot === true, false)
        assert.equal(this.jatek.kartyaTomb[4].allapot === true, false)
        assert.equal(this.jatek.kartyaTomb[5].allapot === true, false)
        assert.equal(this.jatek.kartyaTomb[6].allapot === true, false)
        assert.equal(this.jatek.kartyaTomb[7].allapot === true, false)
    });
    test('A kártyák alap blokkoltsága false', (assert) => {
        assert.equal(this.jatek.kartyaTomb[0].blokkolt === false, true)
        assert.equal(this.jatek.kartyaTomb[1].blokkolt === false, true)
        assert.equal(this.jatek.kartyaTomb[2].blokkolt === false, true)
        assert.equal(this.jatek.kartyaTomb[3].blokkolt === false, true)
        assert.equal(this.jatek.kartyaTomb[4].blokkolt === false, true)
        assert.equal(this.jatek.kartyaTomb[5].blokkolt === false, true)
        assert.equal(this.jatek.kartyaTomb[6].blokkolt === false, true)
        assert.equal(this.jatek.kartyaTomb[7].blokkolt === false, true)
    });
})

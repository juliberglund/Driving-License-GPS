// signsData.js
export const signsData = [
  {
    id: "vajningsplikt",
    name: "Väjningsplikt",
    signs: [
      {
        id: 1,
        name: "Väjningsplikt",
        image: require("../assets/väjningsplikt/väjningsplikt.png"),
        description: "Denna skylt betyder att du måste lämna företräde.",
      },
      {
        id: 2,
        name: "Stopplikt",
        image: require("../assets/väjningsplikt/stoppplikt.png"),
        description:
          "Stopplikt innebär att du måste stanna helt innan du kör vidare.",
      },
      {
        id: 3,
        name: "Huvudled",
        image: require("../assets/väjningsplikt/huvudled.png"),
        description: "Huvudled betyder att du har företräde på denna väg.",
      },
      {
        id: 4,
        name: "Huvudled Upphör",
        image: require("../assets/väjningsplikt/huvudledupphör.png"),
        description: "Denna skylt anger att huvudleden upphör.",
      },
      {
        id: 5,
        name: "Mötande trafik har väjningsplikt",
        image: require("../assets/väjningsplikt/mötandetrafikharväjningsplikt.png"),
        description:
          "Denna skylt visar att mötande trafik måste lämna dig företräde.",
      },
      {
        id: 6,
        name: "Väjningsplikt mot mötande trafik",
        image: require("../assets/väjningsplikt/väjningspliktmotmötandetrafik.png"),
        description: "Du måste lämna företräde för mötande trafik.",
      },
      {
        id: 7,
        name: "Övergångsställe",
        image: require("../assets/väjningsplikt/övergångsställe.png"),
        description: "Denna skylt visar att det finns ett övergångsställe.",
      },
    ],
  },
  {
    id: "varnings",
    name: "Varningsmärken",
    signs: [
      {
        id: 1,
        name: "Varning för farlig kurva",
        image: require("../assets/varning/varning-for-flera-farliga-kurvor.png"),
        description: "Märket varnar för en farlig kurva i vägen.",
      },
      {
        id: 2,
        name: "Varning för nedförslutning",
        image: require("../assets/varning/varning-for-nedforslutning.png"),
        description: "Varnar för en kraftig nedförsbacke.",
      },
      {
        id: 3,
        name: "Varning för avsmalnande väg",
        image: require("../assets/varning/varning-for-avsmalnad-vag.png"),
        description: "Vägen blir smalare längre fram.",
      },
      {
        id: 4,
        name: "Varning för ojämn väg",
        image: require("../assets/varning/varning-for-ojamn-vag.png"),
        description: "Ojämn väg som kan påverka fordonets stabilitet.",
      },
      {
        id: 5,
        name: "Varning för barn",
        image: require("../assets/varning/varning-for-barn.png"),
        description: "Barn kan vistas på eller vid vägen.",
      },
      {
        id: 6,
        name: "Varning för övergångsställe",
        image: require("../assets/varning/varning-for-overgangsstalle.png"),
        description: "Varnar för ett övergångsställe för gående.",
      },
      {
        id: 7,
        name: "Varning för bro",
        image: require("../assets/varning/varning-for-bro.png"),
        description: "Varnar för en rörlig eller smal bro.",
      },
      {
        id: 8,
        name: "Varning för ridande",
        image: require("../assets/varning/varning-for-ridande.png"),
        description: "Hästar och ryttare kan vistas på vägen.",
      },
      {
        id: 9,
        name: "Varning för cyklande",
        image: require("../assets/varning/varning-for-cyklande.png"),
        description: "Cyklande kan förekomma på eller vid vägen.",
      },
      {
        id: 10,
        name: "Varning för skidåkare",
        image: require("../assets/varning/varning-for-skidakare.png"),
        description: "Skidåkare kan korsa vägen.",
      },
      {
        id: 11,
        name: "Varning för djur",
        image: require("../assets/varning/varning-for-djur.png"),
        description: "Vilda eller tama djur kan förekomma på vägen.",
      },
      {
        id: 12,
        name: "Varning för slirig väg",
        image: require("../assets/varning/varning-for-slirig-vag.png"),
        description: "Halka eller slirigt väglag kan förekomma.",
      },
      {
        id: 13,
        name: "Varning för farthinder",
        image: require("../assets/varning/varning-for-farthinder.png"),
        description: "Ett farthinder finns på vägen.",
      },
      {
        id: 14,
        name: "Varning för stenras",
        image: require("../assets/varning/varning-for-stenras.png"),
        description: "Risk för fallande sten från bergvägg eller sluttning.",
      },
      {
        id: 15,
        name: "Varning för flera farliga kurvor",
        image: require("../assets/varning/varning-for-flera-farliga-kurvor.png"),
        description: "Flera farliga kurvor i följd.",
      },
      {
        id: 16,
        name: "Varning för stenskott",
        image: require("../assets/varning/varning-for-stenskott.png"),
        description: "Risk för stenskott – anpassa avståndet.",
      },
      {
        id: 17,
        name: "Varning för gående",
        image: require("../assets/varning/varning-for-gaende.png"),
        description: "Gående kan finnas på eller vid vägen.",
      },
      {
        id: 18,
        name: "Varning för stigning",
        image: require("../assets/varning/varning-for-stigning.png"),
        description: "Kraftig uppförsbacke framför dig.",
      },
      {
        id: 19,
        name: "Varning för kaj",
        image: require("../assets/varning/varning-for-kaj.png"),
        description: "Vägen slutar vid kaj – risk för att köra ner i vatten.",
      },
      {
        id: 21,
        name: "Slut på sträcka med vägarbete",
        image: require("../assets/varning/slut-pa-stracka-med-vagarbete.png"),
        description:
          "Märket anger slut på en vägsträcka med vägarbete som märkts ut med märke A20, varning för vägarbete. Märket är inte uppsatt om det ändå tydligt framgår var sträckan slutar.",
      },
      {
        id: 22,
        name: "Varning för mötande trafik",
        image: require("../assets/varning/varning-for-motande-trafik.png"),
        description:
          "Märket anger att en körbana med enkelriktad trafik övergår i en körbana med trafik i båda riktningarna.",
      },
      {
        id: 23,
        name: "Varning för sidvind",
        image: require("../assets/varning/varning-for-sidvind.png"),
        description:
          "Märket anger en vägsträcka där det ofta förekommer stark sidvind. Symbolen är anpassad efter förhållandena på platsen.",
      },
      {
        id: 24,
        name: "Varning för svag vägkant eller hög körbanekant",
        image: require("../assets/varning/varning-for-svag-vagkant.png"),
        description:
          "Märket anger att det finns en svag eller hög kant på körbanan.",
      },
      {
        id: 25,
        name: "Varning för tunnel",
        image: require("../assets/varning/varning-for-tunnel.png"),
        description: "Märket anger att en tunnel närmar sig.",
      },
      {
        id: 26,
        name: "Varning för vägkorsning",
        image: require("../assets/varning/varning-for-vagkorsning.png"),
        description:
          "Varningsmärket anger att en vägkorsning utan särskild förtur finns längre fram. Var beredd att lämna företräde.",
      },
      {
        id: 27,
        name: "Varning för flerfärgssignal",
        image: require("../assets/varning/varning-flerfarg.png"),
        description:
          "Märket anger en plats där trafiken regleras med flerfärgssignal med tre ljusöppningar. Inom tättbebyggt område är märket uppsatt endast om det finns särskilda skäl för det.",
      },
      {
        id: 28,
        name: "Varning för lågt flygplan",
        image: require("../assets/varning/varning-flygplan.png"),
        description: "Varning för lågt flygande flygplan",
      },
      {
        id: 29,
        name: "Varning för cirkulationsplats",
        image: require("../assets/varning/a30-1cirkulationsplats.png"),
        description:
          "Varningsmärket anger att en vägkorsning utan särskild förtur finns längre fram. Var beredd att lämna företräde.",
      },
      {
        id: 30,
        name: "Varning för vägkorsning där trafikanter på anslutande väg har väjningsplikt eller stopplikt",
        image: require("../assets/varning/varning-vagkorsning.png"),
        description:
          "Märket anger en vägkorsning där förare av fordon på anslutande vägar har väjningsplikt eller stopplikt. Symbolen är anpassad efter förhållandena på platsen.",
      },
      //Ny
      {
        id: 31,
        name: "Varning för järnvägskorsning med bommar",
        image: require("../assets/varning/varning-jarnva-bommar.png"),
        description:
          "Märket anger en korsning med järnväg eller spårväg där det finns bommar.",
      },
      {
        id: 32,
        name: "Varning för annan fara",
        image: require("../assets/varning/varning-fara.png"),
        description:
          "Märket anger en annan fara än sådan som kan anges med något annat varningsmärke. Farans art anges på en tilläggstavla.",
      },
      {
        id: 33,
        name: "Varning för fordon med förspänt dragdjur",
        image: require("../assets/varning/varning-fordon-dragdjur.png"),
        description:
          "Märket anger en vägsträcka där fordon förspända med dragdjur ofta korsar eller uppehåller sig på vägen. Andra symboler kan förekomma på märket. Transportstyrelsen får meddela föreskrifter om vilka andra symboler som får förekomma.",
      },
      {
        id: 34,
        name: "Varning för olycka",
        image: require("../assets/varning/varning-olycka.png"),
        description:
          "Märket anger en vägkorsning där förare av fordon på anslutande vägar har väjningsplikt eller stopplikt. Symbolen är anpassad efter förhållandena på platsen.",
      },
      {
        id: 36,
        name: "Varning för långsamtgående fordon",
        image: require("../assets/varning/varning-langsam-fordon.png"),
        description:
          "Märket anger en plats där långsamtgående fordon ofta korsar eller kör in på vägen.",
      },
      {
        id: 37,
        name: "Varning för terrängskotertrafik",
        image: require("../assets/varning/varning-terrangskotertrafik.png"),
        description:
          "Märket anger en plats där terrängskotrar ofta korsar eller kör in på vägen.",
      },
      {
        id: 38,
        name: "Varning för järnvägskorsning utan bommar",
        image: require("../assets/varning/varning-korsningjarnvag.png"),
        description: "järnvägskorsning utan bommar",
      },
      {
        id: 39,
        name: "Varning för korsning med spårväg utan bommar",
        image: require("../assets/varning/varning-sparvag.png"),
        description: "Varning för korsning med spårväg utan bommar",
      },
      {
        id: 40,
        name: "Varning för kö",
        image: require("../assets/varning/varning-ko.png"),
        description:
          "Märket anger en vägsträcka där det finns risk för köbildning.",
      },
      {
        id: 41,
        name: "kryssmärke",
        image: require("../assets/varning/varning-kryssmarke.png"),
        description:
          "Märket anger en korsning med järnväg eller spårväg med ett eller flera spår. Märket är uppsatt omedelbart före en plankorsning. Det behöver inte vara uppsatt vid enskild väg med lite trafik där det kan underlåtas utan fara för trafiksäkerheten. Märket kan även vara uppsatt viden annan korsning med järnväg eller spårväg än en plankorsning.",
      },
      {
        id: 42,
        name: "Avstånd till plankorsning",
        image: require("../assets/varning/varning-plankorsning.png"),
        description:
          "Märkena anger avståndet till en plankorsning i tredjedelar. Märket med tre markeringar är utom tättbebyggt område, uppsatt under något av märkena A35, varning för järnvägskorsning med bommar, A36, varning för järnvägskorsning utan bommar, eller A37, varning för korsning med spårväg utan bommar. Märket med två markeringar anger två tredjedels avstånd till plankorsning och märket med en markering anger den sista tredjedelen av avståndet.",
      },
    ],
  },
  {
    id: "forbud",
    name: "Förbudsmärken",
    signs: [
      {
        id: 1,
        name: "Förbud mot infart med fordon",
        image: require("./assets/forbud/c1.png"),
        description: "Förbud mot infart med fordon",
      },
      {
        id: 2,
        name: "Förbud mot trafik med fordon",
        image: require("./assets/forbud/c2.png"),
        description: "Förbud mot trafik med fordon",
      },
      {
        id: 3,
        name: "Förbud mot trafik med annat motordrivet fordon än moped klass II",
        image: require("./assets/forbud/c3.png"),
        description:
          "Avser förbudet även moped klass II anges detta på en tilläggstavla.",
      },
      {
        id: 4,
        name: "Förbud mot trafik med motordrivet fordon med fler än två hjul",
        image: require("./assets/forbud/c4.png"),
        description:
          "Förbud mot trafik med motordrivet fordon med fler än två hjul",
      },
      {
        id: 5,
        name: "Förbud mot trafik med motorcykel och moped klass I",
        image: require("./assets/forbud/c5.png"),
        description: "Förbud mot trafik med motorcykel och moped klass I",
      },
      {
        id: 6,
        name: "Förbud mot trafik med motordrivet fordon med tillkopplad släpvagn",
        image: require("./assets/forbud/c6.png"),
        description:
          "Märket anger förbud mot trafik med motordrivet fordon med tillkopplad släpvagn av annat slag än påhängsvagn eller släpkärra. Avser förbudet även trafik med motordrivet fordon med tillkopplad påhängsvagn eller släpkärra anges det på en tilläggstavla. Avser förbudet endast fordonståg med släpvagn vars totalvikt överstiger visst tontal anges det på tilläggstavla T5, totalvikt.",
      },
      {
        id: 7,
        name: "Förbud mot trafik med tung lastbil",
        image: require("./assets/forbud/c7.png"),
        description: "Förbud mot trafik med tung lastbil",
      },
      {
        id: 8,
        name: "Förbud mot trafik med traktor och motorredskap klass II",
        image: require("./assets/forbud/c8.png"),
        description:
          "Avser förbudet även trafik med traktor b eller motorredskap klass I anges det på en tilläggstavla.",
      },
      {
        id: 9,
        name: "Förbud mot trafik med fordon lastat med farligt gods",
        image: require("./assets/forbud/c9.png"),
        description:
          "Märket anger förbud mot trafik med fordon med sådan last som omfattas av krav på märkning med orangefärgad skylt enligt föreskrifter som har meddelats med stöd av lagen (2006:263) om transport av farligt gods. Tillsammans med tilläggstavla T23, tunnelkategori, anger märket tunnelkategori.",
      },
      {
        id: 10,
        name: "Förbud mot trafik med cykel och moped klass II",
        image: require("./assets/forbud/c10.png"),
        description:
          "Avser förbudet även trafik med moped klass I anges det på en tilläggstavla.",
      },
      {
        id: 11,
        name: "Förbud mot trafik med moped klass II",
        image: require("./assets/forbud/c11.png"),
        description:
          "Avser förbudet även trafik med moped klass I anges det på en tilläggstavla.",
      },
      {
        id: 12,
        name: "Förbud mot trafik med fordon förspänt med dragdjur",
        image: require("./assets/forbud/c12.png"),
        description: "Förbud mot trafik med fordon förspänt med dragdjur",
      },
      {
        id: 13,
        name: "Förbud mot trafik med terrängmotorfordon och terrängsläp",
        image: require("./assets/forbud/c13.png"),
        description:
          "Gäller förbudet inte terrängvagn anges det på en tilläggstavla.",
      },
      {
        id: 14,
        name: "Förbud mot ridning",
        image: require("./assets/forbud/c14.png"),
        description:
          "Avser förbudet även ledande av riddjur anges det på en tilläggstavla.",
      },
      {
        id: 15,
        name: "Förbud mot gångtrafik",
        image: require("./assets/forbud/c15.png"),
        description: "Förbud mot gångtrafik",
      },
      {
        id: 16,
        name: "Begränsad fordonsbredd",
        image: require("./assets/forbud/c16.png"),
        description:
          "Märket anger förbud mot trafik med fordon över en viss bredd. Största tillåtna bredd anges på märket.",
      },
      {
        id: 17,
        name: "Begränsad fordonshöjd",
        image: require("./assets/forbud/c17.png"),
        description:
          "Märket anger förbud mot trafik med fordon över en viss höjd om den fria höjden är lägre än 4,5 meter. Högsta tillåtna fordonshöjd anges på märket.",
      },
      {
        id: 18,
        name: "Begränsad fordonslängd",
        image: require("./assets/forbud/c18.png"),
        description:
          "Märket anger förbud mot trafik med fordon eller fordonståg över en viss längd. Längsta tillåtna längd anges på märket.",
      },
      {
        id: 19,
        name: "Minsta avstånd",
        image: require("./assets/forbud/c19.png"),
        description:
          "Märket anger förbud mot att hålla kortare avstånd till framförvarande motordrivna fordon i samma färdriktning än som anges på märket. Minsta tillåtna avstånd anges på märket.",
      },
      {
        id: 20,
        name: "Begränsad bruttovikt på fordon",
        image: require("./assets/forbud/c20.png"),
        description: "Högsta tillåtna bruttovikt anges på märket.",
      },
      {
        id: 21,
        name: "Begränsad bruttovikt på fordon och fordonståg",
        image: require("./assets/forbud/c21.png"),
        description: "Högsta tillåtna bruttovikt anges på märket.",
      },
      {
        id: 22,
        name: "Bärighetsklass",
        image: require("./assets/forbud/c22.png"),
        description: "Vägens bärighetsklass anges på märket.",
      },
      {
        id: 23,
        name: "Begränsat axeltryck",
        image: require("./assets/forbud/c23.png"),
        description: "Begränsat axeltryck",
      },
      {
        id: 24,
        name: "Begränsat boggitryck",
        image: require("./assets/forbud/c24.png"),
        description: "Högsta tillåtna axeltryck anges på märket.",
      },
      {
        id: 25,
        name: "Förbud mot sväng i korsning",
        image: require("./assets/forbud/c25.png"),
        description:
          "Förbudet gäller den korsning eller motsvarande som märket är placerat i eller före. Märket kan avse flera korsningar. Sträckans längd anges då på en tilläggstavla. Symbolen är anpassad efter förhållandena på platsen.",
      },
      {
        id: 26,
        name: "Förbud mot U-sväng",
        image: require("./assets/forbud/c26.png"),
        description:
          "Förbudet gäller den korsning eller motsvarande som märket är placerat i eller före. Märket kan avse flera korsningar. Sträckans längd anges då på en tilläggstavla. Symbolen är anpassad efter förhållandena på platsen.",
      },
      {
        id: 27,
        name: "Förbud mot omkörning",
        image: require("./assets/forbud/c27.png"),
        description:
          "Märket anger förbud mot att köra om andra motordrivna fordon än tvåhjuliga mopeder och tvåhjuliga motorcyklar utan sidvagn. Förbudet gäller på den väg märket är uppsatt och till den plats där märke C28, slut på förbud mot omkörning, är uppsatt.",
      },
      {
        id: 28,
        name: "Slut på förbud mot omkörning",
        image: require("./assets/forbud/c28.png"),
        description: "Slut på förbud mot omkörning",
      },
      {
        id: 29,
        name: "Förbud mot omkörning med tung lastbil",
        image: require("./assets/forbud/c29.png"),
        description:
          "Märket anger förbud mot att med en tung lastbil köra om andra motordrivna fordon än tvåhjuliga mopeder och tvåhjuliga motorcyklar utan sidvagn. Förbudet gäller på den väg märket är uppsatt till den plats där märke C30, slut på förbud mot omkörning med tung lastbil, är uppsatt.",
      },
      {
        id: 30,
        name: "Slut på förbud mot omkörning med tung lastbil",
        image: require("./assets/forbud/c30.png"),
        description: "Slut på förbud mot omkörning med tung lastbil",
      },
      {
        id: 31,
        name: "Hastighetsbegränsning",
        image: require("./assets/forbud/c31.png"),
        description:
          "Märket anger förbud mot att föra fordon med högre hastighet än den som anges på märket. Angivelsen gäller till den plats där en annan hastighetsbegränsning anges med märket, eller där märke C32, tillfällig hastighetsbegränsning upphör, E7, gågata, eller E9, gångfartsområde, satts upp. Märket behöver inte vara upprepat efter en vägkorsning om samma högsta tillåtna hastighet gäller på den korsande vägen.",
      },
      {
        id: 32,
        name: "Tillfällig hastighetsbegränsning upphör",
        image: require("./assets/forbud/c32.png"),
        description:
          "Märket anger att en tillfällig hastighet som märkts ut med märke C31, hastighetsbegränsning, upphör.",
      },
      {
        id: 33,
        name: "Stopp vid tull",
        image: require("./assets/forbud/c33.png"),
        description: "Stopp vid tull",
      },
      {
        id: 34,
        name: "Stopp för angivet ändamål",
        image: require("./assets/forbud/c34.png"),
        description:
          "Märket anger skyldighet att stanna av den anledning som anges under det vågräta strecket. Om märket är uppsatt före en trafiksignal, anger det att fordon som ska passera signalen ska stanna vid röd signalbild. Fordonet ska stannas vid en stopplinje eller, om sådan saknas, vid märket. Transportstyrelsen får meddela föreskrifter om vilka andra anledningar som får anges.",
      },
      {
        id: 35,
        name: "Förbud mot att parkera fordon",
        image: require("./assets/forbud/c35.png"),
        description:
          "Märket anger förbud mot att parkera fordon. Angivelsen gäller på den sida av vägen där märket är uppsatt. Angivelsen börjar gälla där märket satts upp och gäller enligt vad som anges på en tilläggstavla, till den plats där någon annan bestämmelse om stannande eller parkering märkts ut, till nästa korsning med en annan väg än sådan som avses i 3 kap. 21 § andra stycket trafikförordningen (1998:1276) eller till den plats dessförinnan där ett motsvarande märke med tilläggstavla T11, utsträckning, med nedåtriktad pil, har satts upp. Om en annan bestämmelse gäller på en kortare sträcka gäller angivelsen på nytt efter sträckans slut utan att det upprepas. Angivelsen gäller också på nytt utan att märket satts upp igen i det fall en parkeringsplats anordnats vid sidan av körbanan. Märket anger inte rätt att stanna där fordon inte får stannas eller parkeras enligt trafikförordningen, om inte detta tydligt framgår av märkets placering eller anges på en tilläggstavla.",
      },
      {
        id: 36,
        name: "Förbud mot att parkera fordon på dag med udda datum",
        image: require("./assets/forbud/c36.png"),
        description:
          "De närmare föreskrifterna till märke C35, förbud mot att parkera fordon, gäller även till detta märke.",
      },
      {
        id: 37,
        name: "Förbud mot att parkera fordon på dag med jämnt datum",
        image: require("./assets/forbud/c37.png"),
        description:
          "De närmare föreskrifterna till märke C35, förbud mot att parkera fordon, gäller även till detta märke.",
      },
      {
        id: 38,
        name: "Datumparkering",
        image: require("./assets/forbud/c38.png"),
        description:
          "Märket anger förbud mot att parkera fordon på dagar med jämnt datum på den sida av vägen som har jämna adressnummer och på dagar med udda datum på den sida av vägen som har udda adressnummer. De närmare föreskrifterna till märke C35, förbud mot att parkera fordon, gäller även till detta märke.",
      },
      {
        id: 39,
        name: "Förbud mot att stanna och parkera fordon",
        image: require("./assets/forbud/c39.png"),
        description:
          "Märket anger förbud mot att stanna och parkera fordon. De närmare föreskrifterna till märke C35, förbud mot att parkera fordon, andra stycket gäller även till detta märke.",
      },
      {
        id: 40,
        name: "Ändamålsplats",
        image: require("./assets/forbud/c40.png"),
        description:
          "Har ändamålet angetts med lastplats är ändamålet lastning eller lossning av tungt eller skrymmande gods. Transportstyrelsen får meddela föreskrifter om vilka andra ändamål som får anges och hur de anges.",
      },
      {
        id: 41,
        name: "Slut på ändamålsplats",
        image: require("./assets/forbud/c41.png"),
        description:
          "Märket behöver inte vara uppsatt om det ändå tydligt framgår att ändamålsplatsen upphör. Märket är anpassat till märke C40, ändamålsplats.",
      },
      {
        id: 42,
        name: "Vändplats",
        image: require("./assets/forbud/c42.png"),
        description:
          "Märket anger en plats som är avsedd för vändning av fordon och att det är förbjudet att parkera fordon. Om i stället märke C39, förbud mot att stanna och parkera fordon, är infogat i märket anger det att det är förbjudet att stanna eller parkera fordon.",
      },
      {
        id: 43,
        name: "Slut på vändplats",
        image: require("./assets/forbud/c43.png"),
        description:
          "Märket behöver inte vara uppsatt om det ändå tydligt framgår att vändplatsen upphör. Märket är anpassat till märke C42, vändplats.",
      },
      {
        id: 44,
        name: "Förbud mot trafik med annat motordrivet fordon med dubbdäck än moped klass II",
        image: require("./assets/forbud/c44.png"),
        description:
          "Avser förbudet även moped klass II anges det på en tilläggstavla.",
      },
      {
        id: 45,
        name: "Särskilda bestämmelser för stannande och parkering",
        image: require("./assets/forbud/c45.png"),
        description:
          "Märket anger det förbud som anges med det infogade märket. Märket kan också ange avvikelse från den reglering som anges med det märke som den är uppsatt under. Andra förbud kan anges med märket. Transportstyrelsen får meddela föreskrifter om vilka andra förbudsmärken som får infogas. Märket är uppsatt under något av märkena C35, förbud mot att parkera fordon, C36, förbud mot att parkera fordon på dag med udda datum, C37, förbud mot att parkera fordon på dag med jämnt datum, C38, datumparkering, C39, förbud mot att stanna och parkera fordon, C40, ändamålsplats, C42, vändplats, D10, påbjudet körfält eller körbana för fordon i linjetrafik m.fl., E19, parkering eller E20, områdesmärke. Märke E20, områdesmärke, får vara infogat. Är märket infogat gäller de närmare föreskrifterna till märke E20, områdesmärke. För tid gäller de närmare föreskrifterna för tilläggstavla T6, tidsangivelse. Andra begränsningar kan endast vara angivna på märket.",
      },
      {
        id: 46,
        name: "Begränsat trippelaxeltryck",
        image: require("./assets/forbud/c46.png"),
        description: "Högsta tillåtna trippelaxeltryck anges på märket.",
      },
    ],
  },
  {
    id: "pabud",
    name: "Påbudsmärken",
    signs: [
      // påbudsmärken...
    ],
  },
  {
    id: "anvisning",
    name: "Anvisningsmärken",
    signs: [
      // anvisningsmärken...
    ],
  },
];

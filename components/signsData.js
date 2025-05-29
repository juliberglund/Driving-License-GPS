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
      // förbudsmärken...
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

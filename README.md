
Deze tool helpt je om uit te rekenen wat je kunt verdienen op de beurs of op een spaarrekening.
Bekijk hoe de tool er uit kan zien: http://online-aandelenkopen.nl/gratis-beleggingstips/

![Voor nieuwe bezoekers ziet de tool er zo uit](screenshots/newvisitor.png "Nieuwe bezoekers")
![Voor terugkerende bezoekers ziet de tool er zo uit](screenshots/returningvisitor.png "Terugkerende bezoekers")

## Todo:

    - lijkt wel of het cookie niet gezet wordt, kan door file:// komen
    - browser testing


## Implementatie

Download financial-tool.min.js uit de `build` directory.

    <script src="/PATH/TO/financial-tool.min.js"></script>

    <div class="tool">
        <p>Startbedrag: <span class="inleg"></span></p>
        <div class="inleg_slider"></div>
        <p>Verwacht rendement: <span class="rendement">7,0%</span></p>
        <div class="rendement_slider"></div>
        <p>Inleg per maand: <span class="inlegpermaand">&euro; 500,-</span></p>
        <div class="inlegpermaand_slider"></div>
        <p>Investeringsduur: <span class="investeringsduur">20 jaar</span></p>
        <div class="investeringsduur_slider"></div>
        <p>Aantal jaar dat je wacht met beleggen: <span class="wachtmetinstappen">10 jaar</span></p>
        <div class="wachtmetinstappen_slider"></div>
        <div class="resultaat"></div>

        <div class="dialog"><p>Beweeg de sliders met uw muis om de getallen aan te passen.</p></div>
        <p class="oak3"><a href="http://online-aandelenkopen.nl/" title="Aandelen Kopen">Een tool van Online-Aandelen Kopen</a></p>
    </div>


## Bouwen

- Installeer jsl (javascript linter)
- Installeer jsmin (javascript minifier)
- Clone het project

    git clone https://github.com/afjlambert/financial-tool.git

- Ga naar de project-root en draai

    ./build.sh


## Copyright

Deze tool is gratis om te gebruiken onder de Creative Commons Attribution-NoDerivs licentie.
Zie http://creativecommons.org/licenses/by-nd/3.0/
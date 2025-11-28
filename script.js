const storyData = [
    {
        title: "Matilda, die Entdeckerin",
        text: "Es war einmal eine mutige Abenteurerin namens Matilda, deren Lachen so strahlend war wie die Sonne über den verschneiten Alpen. 🏔️☀️",
        image: "../whatsapp-fotos/strahlend im schnee.jpeg"
    },
    {
        title: "Kapitel 1: Der Ruf der Nebelberge",
        text: "Eines Sommers spürte Matilda den Ruf der Ferne. Sie reiste weit in den Norden, in ein Land der Mythen und Legenden: Schottland. 🏴󠁧󠁢󠁳󠁣󠁴󠁿",
        image: "../whatsapp-fotos/reiseplanung.jpeg"
    },
    {
        title: "Die versteinerten Riesen",
        text: "Dort wanderte sie furchtlos zu den versteinerten Riesen, die man den 'Old Man of Storr' nennt. 🗿",
        image: "../whatsapp-fotos/old man of  storr.jpeg"
    },
    {
        title: "Das gelbe Zauberschiff",
        text: "An der Küste, wo ein einsamer weißer Leuchtturm über das Meer wachte, bestieg sie ihr leuchtend gelbes Zauberschiff (ein Kajak). 🛶",
        image: "../whatsapp-fotos/kajak.jpeg"
    },
    {
        title: "Begegnung mit Nessie",
        text: "Und genau dort geschah es: Während sie mutig durch die Wellen paddelte, tauchte Nessie auf! 🦕✨",
        image: "../whatsapp-fotos/loch ness.jpeg"
    },
    {
        title: "Das Geheimnis des Tees",
        text: "Nessie war begeistert von Matildas gelbem Boot und verriet ihr das Geheimnis des besten schottischen Tees, den Matilda später sicher im Warmen genoss. ☕️🌧️",
        image: "../whatsapp-fotos/tee.jpeg"
    },
    {
        title: "Kapitel 2: Die neue Heimat",
        text: "Wieder zurück im Süden, traf Matilda eine wichtige Entscheidung. Sie wandte sich ab vom Reich der Zürcher und zog in die Stadt am See. 🌊",
        image: "../whatsapp-fotos/bier bienne.jpeg"
    },
    {
        title: "I ❤️ Biel",
        text: "Mit einem magischen Schild verkündete sie stolz: 'I ❤️ Biel'. Dort fand sie neue Kraftquellen... ❤️💙",
        image: "../whatsapp-fotos/i love biel.jpeg"
    },
    {
        title: "Der kleine Mond",
        text: "...wie das geheimnisvolle 'Badhaus Bräu', dessen Schild in der Nacht wie ein kleiner Mond leuchtete... 🌕🍺",
        image: "../whatsapp-fotos/badhaus bräu.jpeg"
    },
    {
        title: "Der goldene Trank",
        text: "...und den goldenen Trank der Appenzeller (Quöllfrisch), der ihr stets gute Laune bescherte. 🍻",
        image: "../whatsapp-fotos/quöllfrisch.jpeg"
    },
    {
        title: "Kapitel 3: Die Geschichtenerzählerin",
        text: "Doch Matilda war nicht nur eine Reisende. Sie war auch eine Hüterin der Geschichten. 📖✨",
        image: "../whatsapp-fotos/plattform 9 3/4.jpeg"
    },
    {
        title: "Die staunenden Zuhörer",
        text: "Oft saß sie auf dem Boden, umringt von kleinen, staunenden Zuhörern, und las ihnen aus großen Büchern vor, bis die Welt um sie herum vergessen war. 👧👦",
        image: "../whatsapp-fotos/geschichten erzählen am boden.jpeg"
    },
    {
        title: "Kapitel 4: Der Winterzauber",
        text: "Als der Winter kam und die Welt in weißes Puderzucker-Licht tauchte, stieg Matilda hoch hinauf auf die Berge. ❄️🏔️",
        image: "../whatsapp-fotos/langlauf.jpeg"
    },
    {
        title: "Der flauschige Freund",
        text: "Plötzlich hörte sie ein leises 'I-Ah'. Hinter einer Schneewehe trat ein kleiner, flauschiger Esel hervor. Er hatte das weichste Fell der Welt. 🫏❄️",
        image: "../whatsapp-fotos/wegweiser im schnee.jpeg"
    },
    {
        title: "Ein Versprechen",
        text: "Er flüsterte ihr zu, dass in Biel und in der weiten Welt noch viele Abenteuer auf sie warten würden. 🌍✨",
        image: "../whatsapp-fotos/maps-route.jpeg"
    },
    {
        title: "Das Fest",
        text: "Und so feiert Matilda heute ihren Geburtstag, als Königin von Biel, Bezwingerin der Highlands und Freundin aller Esel und Seeungeheuer. 👑🎂",
        image: "../whatsapp-fotos/schloss schottland.jpeg"
    }
];

const stackContainer = document.getElementById('card-stack');

// Initialize Stack
function initStack() {
    // Reverse loop to stack correctly (first item on top)
    [...storyData].reverse().forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        // HTML Content
        card.innerHTML = `
            <div class="card-image-container">
                <img src="${item.image}" class="card-image" alt="${item.title}" onerror="this.src='https://placehold.co/600x400?text=Bild+fehlt'">
            </div>
            <div class="card-content">
                <h3>${item.title}</h3>
                <p>${item.text}</p>
                <div class="decoration">❦</div>
            </div>
            <div class="status status-like">WEITER</div>
            <div class="status status-nope">ZURÜCK</div>
        `;

        stackContainer.appendChild(card);
        
        // Add Touch Events
        addSwipeLogic(card);
    });
}

function addSwipeLogic(card) {
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    
    const threshold = 100; // px to swipe to trigger action

    card.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        card.style.transition = 'none';
    });

    card.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        currentX = e.touches[0].clientX;
        const deltaX = currentX - startX;
        const rotation = deltaX * 0.05; // Slight rotation
        
        card.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
        
        // Opacity for indicators
        if (deltaX > 0) {
            card.querySelector('.status-like').style.opacity = Math.min(deltaX / 100, 1);
            card.querySelector('.status-nope').style.opacity = 0;
        } else {
            card.querySelector('.status-nope').style.opacity = Math.min(Math.abs(deltaX) / 100, 1);
            card.querySelector('.status-like').style.opacity = 0;
        }
    });

    card.addEventListener('touchend', (e) => {
        isDragging = false;
        const deltaX = currentX - startX;
        
        card.style.transition = 'transform 0.5s ease';

        if (Math.abs(deltaX) > threshold) {
            // Fly out
            const direction = deltaX > 0 ? 1 : -1;
            const endX = window.innerWidth * direction * 1.5;
            
            card.style.transform = `translateX(${endX}px) rotate(${direction * 30}deg)`;
            
            // Remove from DOM after animation
            setTimeout(() => {
                card.remove();
            }, 500);
        } else {
            // Reset
            card.style.transform = 'translateX(0) rotate(0)';
            card.querySelector('.status-like').style.opacity = 0;
            card.querySelector('.status-nope').style.opacity = 0;
        }
        
        startX = 0;
        currentX = 0;
    });
    
    // Mouse support for desktop testing
    card.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        card.style.transition = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault(); // Prevent selection
        
        currentX = e.clientX;
        const deltaX = currentX - startX;
        const rotation = deltaX * 0.05;
        
        card.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
        
        if (deltaX > 0) {
            card.querySelector('.status-like').style.opacity = Math.min(deltaX / 100, 1);
            card.querySelector('.status-nope').style.opacity = 0;
        } else {
            card.querySelector('.status-nope').style.opacity = Math.min(Math.abs(deltaX) / 100, 1);
            card.querySelector('.status-like').style.opacity = 0;
        }
    });

    document.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const deltaX = currentX - startX;
        
        card.style.transition = 'transform 0.5s ease';

        if (Math.abs(deltaX) > threshold) {
            const direction = deltaX > 0 ? 1 : -1;
            const endX = window.innerWidth * direction * 1.5;
            card.style.transform = `translateX(${endX}px) rotate(${direction * 30}deg)`;
            setTimeout(() => card.remove(), 500);
        } else {
            card.style.transform = 'translateX(0) rotate(0)';
            card.querySelector('.status-like').style.opacity = 0;
            card.querySelector('.status-nope').style.opacity = 0;
        }
        startX = 0;
        currentX = 0;
    });
}

// Start
initStack();
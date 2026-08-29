/* =========================================
   HYDRALIFE
   JAVASCRIPT
   ========================================= */


/* =========================================
   HEADER
   ========================================= */

const header =
  document.getElementById("header");


window.addEventListener("scroll", () => {

  header.classList.toggle(
    "scrolled",
    window.scrollY > 30
  );

});


/* =========================================
   MENU MOBILE
   ========================================= */

const toggle =
  document.getElementById("menuToggle");

const navLinks =
  document.getElementById("navLinks");


toggle.addEventListener("click", () => {

  navLinks.classList.toggle("open");

});


navLinks
  .querySelectorAll("a")
  .forEach(link => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("open");

    });

  });


/* =========================================
   ANO AUTOMÁTICO
   ========================================= */

document.getElementById("year").textContent =
  new Date().getFullYear();


/* =========================================
   ANIMAÇÕES REVEAL
   ========================================= */

const revealElements =
  document.querySelectorAll(".reveal");


const revealObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.15
    }

  );


revealElements.forEach(element => {

  revealObserver.observe(element);

});


/* =========================================
   CONTADORES
   ========================================= */

const counters =
  document.querySelectorAll(".counter");


const counterObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) {
          return;
        }


        const element =
          entry.target;

        const target =
          Number(element.dataset.target);

        const duration =
          1400;

        const start =
          performance.now();


        function animateCounter(now) {

          const progress =
            Math.min(
              (now - start) / duration,
              1
            );


          element.textContent =
            Math.floor(
              progress * target
            );


          if (progress < 1) {

            requestAnimationFrame(
              animateCounter
            );

          } else {

            element.textContent =
              target;

          }

        }


        requestAnimationFrame(
          animateCounter
        );


        counterObserver.unobserve(
          element
        );

      });

    },

    {
      threshold: 0.6
    }

  );


counters.forEach(counter => {

  counterObserver.observe(counter);

});


/* =========================================
   BARRAS DOS GRÁFICOS
   ========================================= */

const bars =
  document.querySelectorAll(".bar-fill");


const barObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach(entry => {

        if (
          entry.isIntersecting
        ) {

          entry.target.style.width =
            entry.target.dataset.w + "%";


          barObserver.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.4
    }

  );


bars.forEach(bar => {

  barObserver.observe(bar);

});


/* =========================================
   GRÁFICO DE COLUNAS
   ========================================= */

const columns =
  document.querySelectorAll(".col-bar");


const columnObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach(entry => {

        if (
          entry.isIntersecting
        ) {

          entry.target.style.height =
            entry.target.dataset.h + "%";


          columnObserver.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.4
    }

  );


columns.forEach(column => {

  columnObserver.observe(column);

});


/* =========================================
   GRÁFICO DONUT
   ========================================= */

const donut =
  document.getElementById("donut");

const donutValue =
  document.getElementById(
    "donutValue"
  );


const donutObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) {
          return;
        }


        const target =
          80;

        const duration =
          1600;

        const start =
          performance.now();


        function animateDonut(now) {

          const progress =
            Math.min(
              (now - start) / duration,
              1
            );


          const value =
            Math.floor(
              progress * target
            );


          donut.style.setProperty(
            "--p",
            value
          );


          donutValue.textContent =
            value + "%";


          if (progress < 1) {

            requestAnimationFrame(
              animateDonut
            );

          }

        }


        requestAnimationFrame(
          animateDonut
        );


        donutObserver.unobserve(
          donut
        );

      });

    },

    {
      threshold: 0.5
    }

  );


donutObserver.observe(donut);


/* =========================================
   SIMULADOR DE ÁGUA
   ========================================= */

const calcBtn =
  document.getElementById(
    "calcBtn"
  );

const copos =
  document.getElementById(
    "copos"
  );

const simResult =
  document.getElementById(
    "simResult"
  );


function calcular() {

  let quantidade =
    parseInt(copos.value);


  if (
    isNaN(quantidade) ||
    quantidade < 0
  ) {

    quantidade = 0;

  }


  if (quantidade > 30) {

    quantidade = 30;

  }


  const litros =
    (
      quantidade * 0.25
    )
      .toFixed(2)
      .replace(".", ",");


  let mensagem;


  if (quantidade === 0) {

    mensagem =
      "Você precisa começar hoje mesmo! 💧 Que tal o primeiro copo agora?";

  }

  else if (quantidade < 4) {

    mensagem =
      "Está abaixo da sua meta. Tente aumentar aos poucos! 🚰";

  }

  else if (quantidade < 8) {

    mensagem =
      "Você está no caminho certo! Continue aumentando aos poucos. 💪";

  }

  else if (quantidade <= 12) {

    mensagem =
      "Excelente! Você atingiu uma boa quantidade no simulador. 🌟";

  }

  else {

    mensagem =
      "Uau! Muito bem! Lembre-se de manter equilíbrio. 😉";

  }


  simResult.innerHTML = `

    <div class="litros">
      ${litros} L
    </div>

    <div class="msg">
      ${mensagem}
    </div>

  `;


  simResult.style.transform =
    "scale(1.02)";


  setTimeout(() => {

    simResult.style.transform =
      "scale(1)";

  }, 250);

}


calcBtn.addEventListener(
  "click",
  calcular
);


copos.addEventListener(
  "keyup",
  (event) => {

    if (
      event.key === "Enter"
    ) {

      calcular();

    }

  }
);


/* =========================================
   DESAFIO HYDRALIFE
   ========================================= */


/*
  Os dados do desafio ficam
  armazenados no navegador.

  Isso permite fechar e abrir
  a página sem perder o progresso.
*/

const CHALLENGE_KEY =
  "hydralifeChallengeV2";


const RANKING_KEY =
  "hydralifeRankingV2";


const DAILY_CUPS =
  8;


/* =========================================
   DATA DO DESAFIO
   ========================================= */

let challengeData =
  JSON.parse(
    localStorage.getItem(
      CHALLENGE_KEY
    )
  );


if (!challengeData) {

  challengeData = {

    day: 1,

    today: 0,

    totalCups: 0,

    points: 0,

    streak: 0,

    lastDate: "",

    completedDays: [],

    badges: []

  };

}


/* =========================================
   RANKING
   ========================================= */

let rankingData =
  JSON.parse(
    localStorage.getItem(
      RANKING_KEY
    )
  );


if (!rankingData) {

  rankingData = [

    {
      name: "Ana",
      cups: 7
    },

    {
      name: "Lucas",
      cups: 6
    },

    {
      name: "Mariana",
      cups: 5
    }

  ];

}


/* =========================================
   DATA ATUAL
   ========================================= */

function todayKey() {

  const date =
    new Date();


  return (

    date.getFullYear()
    + "-"
    + String(
        date.getMonth() + 1
      ).padStart(2, "0")
    + "-"
    + String(
        date.getDate()
      ).padStart(2, "0")

  );

}


/* =========================================
   SALVAR DESAFIO
   ========================================= */

function saveChallenge() {

  localStorage.setItem(

    CHALLENGE_KEY,

    JSON.stringify(
      challengeData
    )

  );

}


/* =========================================
   SALVAR RANKING
   ========================================= */

function saveRanking() {

  localStorage.setItem(

    RANKING_KEY,

    JSON.stringify(
      rankingData
    )

  );

}


/* =========================================
   VERIFICAR NOVO DIA
   ========================================= */

function checkNewDay() {

  const today =
    todayKey();


  if (
    challengeData.lastDate &&
    challengeData.lastDate !== today
  ) {

    challengeData.today = 0;

  }


  challengeData.lastDate =
    today;


  saveChallenge();

}


/* =========================================
   CRIAR OS 8 COPOS
   ========================================= */

function renderCups() {

  const container =
    document.getElementById(
      "cups"
    );


  container.innerHTML =
    "";


  for (
    let i = 1;
    i <= DAILY_CUPS;
    i++
  ) {

    const button =
      document.createElement(
        "button"
      );


    button.type =
      "button";


    button.className =
      "cup";


    if (
      i <= challengeData.today
    ) {

      button.classList.add(
        "active"
      );

    }


    button.innerHTML = `

      🥤

      <small>
        Copo ${i}<br>
        250 ml
      </small>

    `;


    button.addEventListener(
      "click",
      () => {

        registerCup(i);

      }
    );


    container.appendChild(
      button
    );

  }

}


/* =========================================
   REGISTRAR COPO
   ========================================= */

function registerCup(number) {

  if (
    number <= challengeData.today
  ) {

    challengeData.today =
      number - 1;


    challengeData.totalCups =
      Math.max(
        0,
        challengeData.totalCups - 1
      );


    challengeData.points =
      Math.max(
        0,
        challengeData.points - 10
      );

  }

  else {

    challengeData.today =
      number;


    challengeData.totalCups +=
      1;


    challengeData.points +=
      10;

  }


  updateChallenge();

}


/* =========================================
   CONQUISTAS
   ========================================= */

function checkBadges() {

  const badges = [

    {
      condition:
        challengeData.completedDays.includes(1),

      name:
        "💧 Primeiro dia"
    },

    {
      condition:
        challengeData.completedDays.includes(3),

      name:
        "🔥 3 dias seguidos"
    },

    {
      condition:
        challengeData.completedDays.includes(7),

      name:
        "🏆 Mestre da Hidratação"
    }

  ];


  badges.forEach(
    badge => {

      if (
        badge.condition &&
        !challengeData.badges.includes(
          badge.name
        )
      ) {

        challengeData.badges.push(
          badge.name
        );

      }

    }
  );

}


/* =========================================
   ATUALIZAR DESAFIO
   ========================================= */

function updateChallenge() {

  checkNewDay();


  const percentage =
    Math.round(

      (
        challengeData.today /
        DAILY_CUPS
      ) * 100

    );


  document.getElementById(
    "dayBadge"
  ).textContent =

    "Dia "
    + challengeData.day
    + "/7";


  document.getElementById(
    "challengeProgressText"
  ).textContent =

    challengeData.today
    + " / "
    + DAILY_CUPS
    + " copos";


  document.getElementById(
    "challengeProgress"
  ).style.width =

    percentage
    + "%";


  document.getElementById(
    "streakValue"
  ).textContent =

    challengeData.streak;


  document.getElementById(
    "totalCups"
  ).textContent =

    challengeData.totalCups;


  document.getElementById(
    "totalPoints"
  ).textContent =

    challengeData.points;


  document.getElementById(
    "badgesCount"
  ).textContent =

    challengeData.badges.length;


  const message =
    document.getElementById(
      "challengeMessage"
    );


  /*
    META DO DIA COMPLETA
  */

  if (
    challengeData.today >=
    DAILY_CUPS
  ) {


    if (
      !challengeData.completedDays.includes(
        challengeData.day
      )
    ) {

      challengeData.completedDays.push(
        challengeData.day
      );


      challengeData.streak +=
        1;


      challengeData.points +=
        50;


      checkBadges();


      if (
        challengeData.day < 7
      ) {

        challengeData.day +=
          1;

      }


      if (
        challengeData.day <= 7
      ) {

        message.textContent =
          "🎉 Dia concluído! Você ganhou 50 pontos. Continue para o próximo dia!";

      }

      else {

        message.textContent =
          "👑 Parabéns! Você completou o desafio de 7 dias!";

      }

    }

    else {

      message.textContent =
        "🎉 Meta de hoje concluída! Muito bem!";

    }

  }

  else if (
    challengeData.today === 0
  ) {

    message.textContent =
      "Clique nos copos para registrar sua água.";

  }

  else {

    message.textContent =

      "💪 Você está em "
      + percentage
      + "%. Continue assim!";

  }


  renderCups();


  saveChallenge();


  renderRanking();

}


/* =========================================
   RANKING
   ========================================= */

function renderRanking() {

  const list =
    document.getElementById(
      "rankingList"
    );


  const players = [

    {
      name:
        "Você",

      cups:
        challengeData.today,

      me:
        true
    },

    ...rankingData.map(
      friend => ({

        name:
          friend.name,

        cups:
          friend.cups,

        me:
          false

      })
    )

  ];


  /*
    Ordena do maior
    para o menor número de copos.
  */

  players.sort(
    (a, b) => {

      if (
        b.cups !== a.cups
      ) {

        return b.cups - a.cups;

      }


      /*
        Em caso de empate,
        "Você" fica na frente.
      */

      if (a.me) return -1;

      if (b.me) return 1;

      return 0;

    }
  );


  list.innerHTML =
    "";


  players.forEach(
    (person, index) => {

      const row =
        document.createElement(
          "div"
        );


      row.className =
        "rank-row";


      if (person.me) {

        row.classList.add(
          "me"
        );

      }


      let medal;


      if (index === 0) {

        medal = "🥇";

      }

      else if (index === 1) {

        medal = "🥈";

      }

      else if (index === 2) {

        medal = "🥉";

      }

      else {

        medal =
          index + 1;

      }


      row.innerHTML = `

        <div class="rank-pos">
          ${medal}
        </div>

        <div>

          <div class="rank-name">
            ${escapeHTML(person.name)}
          </div>

          <div class="rank-cups">
            ${person.cups} copo(s) hoje
          </div>

        </div>

        <div class="rank-score">
          ${person.cups * 10} pts
        </div>

      `;


      list.appendChild(
        row
      );

    }
  );

}


/* =========================================
   SEGURANÇA DO NOME
   ========================================= */

function escapeHTML(text) {

  const div =
    document.createElement(
      "div"
    );


  div.textContent =
    text;


  return div.innerHTML;

}


/* =========================================
   ADICIONAR AMIGO
   ========================================= */

const addFriendButton =
  document.getElementById(
    "addFriendBtn"
  );


const friendName =
  document.getElementById(
    "friendName"
  );


addFriendButton.addEventListener(
  "click",
  addFriend
);


function addFriend() {

  const name =
    friendName.value.trim();


  if (!name) {

    alert(
      "Digite o nome do seu amigo."
    );

    return;

  }


  /*
    Impede nomes repetidos.
  */

  const exists =
    rankingData.some(
      friend =>
        friend.name.toLowerCase() ===
        name.toLowerCase()
    );


  if (exists) {

    alert(
      "Esse amigo já está no ranking."
    );

    friendName.value =
      "";

    return;

  }


  /*
    Não permite adicionar
    "Você" como amigo.
  */

  if (
    name.toLowerCase() ===
    "você"
  ) {

    alert(
      "Esse nome já representa você no ranking."
    );

    friendName.value =
      "";

    return;

  }


  rankingData.push({

    name:
      name,

    cups:
      0

  });


  saveRanking();


  friendName.value =
    "";


  renderRanking();

}


/* =========================================
   ENTER PARA ADICIONAR AMIGO
   ========================================= */

friendName.addEventListener(
  "keyup",
  event => {

    if (
      event.key === "Enter"
    ) {

      addFriend();

    }

  }
);


/* =========================================
   INICIALIZAÇÃO
   ========================================= */

checkNewDay();

updateChallenge();

renderRanking();

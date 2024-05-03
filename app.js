let userName = "";
let yourTeam = "";
let oponTeam = "";
let batting = false;
let bowling = false;
const scoreTypes = ["Catch Out", "Bowled", 0, 1, 2, 3, 4, 5, 6];
let wicketsRemaining = 10;
let wickets = 0;
let totalRuns = 0;
let totalBalls = 12;
let currentBall = 0;
let targetScore = 0;

function getUserName() {
  const userInput = document.getElementById("user-name");
  userName = userInput.value;

  const loginSection = document.getElementById("login");
  loginSection.classList.add("hide");

  const teamSelection = document.getElementById("team-selection");
  teamSelection.classList.remove("hide");
}

function selectTeam(id) {
  const selectedTeam = document.getElementById(id);
  const selectedTeamName = id;

  if (oponTeam == "" || yourTeam == "") {
    selectedTeam.classList.add("selected-team");
  }

  if (yourTeam !== "") {
    oponTeam = selectedTeamName;
  } else {
    yourTeam = selectedTeamName;
  }

  const yourTeamText = document.getElementById("your-selection-text");
  const oponTeamText = document.getElementById("opon-selection-text");

  yourTeamText.classList.add("hide");
  oponTeamText.classList.remove("hide");
}

function gotoNextFromTeam() {
  const teamSection = document.getElementById("team-selection");
  teamSection.classList.add("hide");

  const tossSection = document.getElementById("toss");
  tossSection.classList.remove("hide");
}

function getUserToss(selected) {
  const tossResult = Math.floor(Math.random() * 2);
  const isWon = tossResult === selected;
  if (isWon) {
    Swal.fire("Congratulations You Won The Toss");
    batting = true;
  } else {
    Swal.fire("Unfortunately You Loss The Toss");
    bowling = true;
  }

  const tossSection = document.getElementById("toss");
  tossSection.classList.add("hide");

  const matchSection = document.getElementById("match");
  matchSection.classList.remove("hide");
  // console.log(yourTeam, oponTeam);

  const yourSelectedTeam = document.getElementById("your-team");
  let imgEle = document.createElement("img");
  imgEle.src = "images/" + yourTeam + "-flag.png";
  imgEle.classList.add("ground-team");
  yourSelectedTeam.append(imgEle);
  // yourSelectedTeam.classList.add("your-team");

  const oppoSelectedTeam = document.getElementById("opon-team");
  let imgEle2 = document.createElement("img");
  imgEle2.src = "images/" + oponTeam + "-flag.png";
  imgEle2.classList.add("ground-team");
  oppoSelectedTeam.append(imgEle2);

  // if (isWon) {
  //   yourSelectedTeam.innerText = yourTeam + "*";
  // } else {
  //   oppoSelectedTeam.innerText = oponTeam + "*";
  // }
  const wicketsRemainingSection = document.getElementById("wicket-remains");
  wicketsRemainingSection.innerText = wicketsRemaining;
  const totalRunsSection = document.getElementById("total-runs");
  totalRunsSection.innerText = totalRuns;
  const currentBallSection = document.getElementById("current-ball");
  currentBallSection.innerText = currentBall;
  const totalBallsection = document.getElementById("total-balls");
  totalBallsection.innerText = totalBalls;
  const wicketSection = document.getElementById("wickets");
  wicketSection.innerText = wickets;
}

function playBall() {
  const ballResultIndex = Math.floor(Math.random() * scoreTypes.length);
  const scoreUpdate = document.getElementById("score");
  scoreUpdate.innerHTML = scoreTypes[ballResultIndex];
  scoreUpdate.classList.remove("hide");
  // Audio

  switch (scoreTypes[ballResultIndex]) {
    case "Bowled":
    case "Catch Out":
    case 0:
      const dis = document.getElementById("crowd-disapointed");
      dis.load();
      dis.play();
      setTimeout(() => {
        dis.pause();
      }, [2000]);
      break;
    case 4:
    case 6:
      const cheer = document.getElementById("crowd-cheer");
      cheer.load();
      cheer.play();
      setTimeout(() => {
        cheer.pause();
      }, [2500]);
      break;
  }

  setTimeout(() => {
    scoreUpdate.classList.add("hide");
  }, [1000]);
  currentBall += 1;
  const currentBallSection = document.getElementById("current-ball");
  currentBallSection.innerText = currentBall;

  if (ballResultIndex === 0 || ballResultIndex === 1) {
    const wicketsRemainingSection = document.getElementById("wicket-remains");
    wicketsRemainingSection.innerText = --wicketsRemaining;

    const wicketsSection = document.getElementById("wickets");
    wicketsSection.innerText = ++wickets;
  } else {
    totalRuns += scoreTypes[ballResultIndex];
    const totalRunsSection = document.getElementById("total-runs");
    totalRunsSection.innerText = totalRuns;
  }

  if (currentBall == totalBalls || wicketsRemaining === 0) {
    if (targetScore != 0) {
      //End Game
      Swal.fire("Game Ended");
      const playbutton = document.getElementById("play-button");
      playbutton.classList.add("hide");
      const restartbtn = document.getElementById("restart-button");
      restartbtn.classList.remove("hide");
      let winner = "";
      if (totalRuns > targetScore && wicketsRemaining > 0) {
        winner = oponTeam;
      } else {
        winner = yourTeam;
      }
      Swal.fire(winner + " Won!");
    } else {
      Swal.fire("Opponent's Batting");
      const targetsec = document.getElementById("target-section");
      targetsec.classList.remove("hide");
      const targetSection = document.getElementById("target-score");
      targetScore = totalRuns;
      targetSection.innerText = totalRuns + " / " + wickets;
      wickets = 0;
      const wicketsSection = document.getElementById("wickets");
      wicketsSection.innerText = wickets;
      totalRuns = 0;
      const totalRunsSection = document.getElementById("total-runs");
      totalRunsSection.innerText = totalRuns;
      currentBall = 0;
      const currentBallSection = document.getElementById("current-ball");
      currentBallSection.innerText = currentBall;
    }
  }
}

function restartGame() {
  document.location.reload();
}

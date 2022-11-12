import $ from 'jquery';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import { pink } from '@mui/material/colors'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Modal from '@mui/material/Modal'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { BATTING, OUT } from './constants/BattingStatus'
import { BOLD, CATCH, HIT_WICKET, RUN_OUT, STUMP } from './constants/OutType'
import './ScoreBoard.css'
import { radioGroupBoxstyle } from './ui/RadioGroupBoxStyle'
import { db } from '../../firebase';
import { updateDoc, doc, query, collection, onSnapshot } from 'firebase/firestore';

export default function ScoreBoard() {

  const navigate = useNavigate()
  const tournamentDetails = useLocation().state;
  const tournament = tournamentDetails.tournament;
  const matchid = tournamentDetails.matchid;

  const [isLocalStorageLoaded, setIsLocalStorageLoaded] = useState(false);

  const [playerListOfTeam1, setPlayerListOfTeam1] = useState([])
  const [playerListOfTeam2, setPlayerListOfTeam2] = useState([])

  const [inningNo, setInningNo] = useState(1)
  const [match, setMatch] = useState({ inning1: { batters: [], bowlers: [] }, inning2: { batters: [], bowlers: [] } })
  const [currentRunStack, setCurrentRunStack] = useState([])
  const [totalRuns, setTotalRuns] = useState(0)
  const [extras, setExtras] = useState({ total: 0, wide: 0, noBall: 0 })
  const [runsByOver, setRunsByOver] = useState(0)
  const [wicketCount, setWicketCount] = useState(0)
  const [totalOvers, setTotalOvers] = useState(0)
  const [batters, setBatters] = useState([])
  const [ballCount, setBallCount] = useState(0)
  const [overCount, setOverCount] = useState(0)
  const [recentOvers, setRecentOvers] = useState([])
  const [batter1, setBatter1] = useState({})
  const [batter2, setBatter2] = useState({})
  const [battingOrder, setBattingOrder] = useState(0)
  const [isBatter1Edited, setBatter1Edited] = useState(false)
  const [isBatter2Edited, setBatter2Edited] = useState(false)
  const [isBowlerEdited, setBowlerEdited] = useState(false)
  const [bowler, setBowler] = useState({})
  const [bowlers, setBowlers] = useState([])
  const [isModalOpen, setModalOpen] = React.useState(false)
  const [outType, setOutType] = React.useState('')
  const [runOutPlayerName, setRunOutPlayerName] = React.useState('')
  const [remainingBalls, setRemainingBalls] = useState(0)
  const [remainingRuns, setRemainingRuns] = useState(0)
  const [strikeValue, setStrikeValue] = React.useState('strike')
  const [isNoBall, setNoBall] = useState(false)
  const [hasMatchEnded, setMatchEnded] = useState(false)
  const [batting, setBatting] = useState('')
  const [team1, setTeam1] = useState('')
  const [team2, setTeam2] = useState('')
  const [maxOver, setMaxOver] = useState(1)

  // set document title
  useEffect(() => {
    document.title = `${team1} VS ${team2} - ${maxOver} overs - ${matchid}nd match - ${tournament} Live Score`;
  }, [team1, team2]);
  // fetch data from localStorage
  useEffect(() => {

    const task = async () => {
      try {
        let data = JSON.parse(localStorage.getItem(`tournament_${tournament}_match_${matchid}`));

        if (data) {
          if (data.inningNo) await setInningNo(data.inningNo);
          if (data.match) await setMatch(data.match);
          if (data.currentRunStack) await setCurrentRunStack(data.currentRunStack);
          if (data.totalRuns) await setTotalRuns(data.totalRuns);
          if (data.extras) await setExtras(data.extras);
          if (data.runsByOver) await setRunsByOver(data.runsByOver);
          if (data.wicketCount) await setWicketCount(data.wicketCount);
          if (data.totalOvers) await setTotalOvers(data.totalOvers);
          if (data.batters) await setBatters(data.batters);
          if (data.ballCount) await setBallCount(data.ballCount);
          if (data.overCount) await setOverCount(data.overCount);
          if (data.recentOvers) await setRecentOvers(data.recentOvers);
          if (data.batter1) await setBatter1(data.batter1);
          if (data.batter2) await setBatter2(data.batter2);
          if (data.battingOrder) await setBattingOrder(data.battingOrder);
          if (data.isBatter1Edited) await setBatter1Edited(data.isBatter1Edited);
          if (data.isBatter2Edited) await setBatter2Edited(data.isBatter2Edited);
          if (data.isBowlerEdited) await setBowlerEdited(data.isBowlerEdited);
          if (data.bowler) await setBowler(data.bowler);
          if (data.bowlers) await setBowlers(data.bowlers);
          if (data.isModalOpen) await setModalOpen(data.isModalOpen);
          if (data.outType) await setOutType(data.outType);
          if (data.runOutPlayerName) await setRunOutPlayerName(data.runOutPlayerName);
          if (data.remainingBalls) await setRemainingBalls(data.remainingBalls);
          if (data.remainingRuns) await setRemainingRuns(data.remainingRuns);
          if (data.strikeValue) await setStrikeValue(data.strikeValue);
          if (data.isNoBall) await setNoBall(data.isNoBall);
          if (data.hasMatchEnded) await setMatchEnded(data.hasMatchEnded);

          if (data.maxOver) await setMaxOver(data.maxOver);
          if (data.team1) await setTeam1(data.team1);
          if (data.team2) await setTeam2(data.team2);
          if (data.batting) await setBatting(data.batting);

          if (data.maxOver)
            setIsLocalStorageLoaded(true);

          $('#end-inning').prop('disabled', true);
        }
      } catch (err) {
        console.error(err);
      }
    }
    task();

  }, []);

  // fetch player list from server
  useEffect(() => {

    if (isLocalStorageLoaded) {
      const task = async () => {
        try {

          const q1 = query(collection(db, `tournaments/${tournament}/teams/${team1}/players`));
          const q2 = query(collection(db, `tournaments/${tournament}/teams/${team2}/players`));

          onSnapshot(q1, (querySnapshot) => {
            let arr = []
            querySnapshot.forEach((t) => {
              arr.push(t.data().name);
            })
            setPlayerListOfTeam1(arr);
          })

          onSnapshot(q2, (querySnapshot) => {
            let arr = []
            querySnapshot.forEach((t) => {
              arr.push(t.data().name);
            })
            setPlayerListOfTeam2(arr);
          })

        } catch (e) {

        }
      }
      task()
    }
  }, [isLocalStorageLoaded]);

  // set select option according to prev values
  useEffect(() => {

    if (batter1.name !== undefined && batter1.name !== '') {
      $("#batter1Name").val(batter1.name)
      $("#batter1Name").prop('disabled', true)
    }

    if (batter2.name !== undefined && batter2.name !== '') {
      $("#batter2Name").val(batter2.name)
      $("#batter2Name").prop('disabled', true)
    }
    if (bowler.name !== undefined && bowler.name !== '') {
      $("#bowlerName").val(bowler.name)
      $("#bowlerName").prop('disabled', true)
    }

  }, [playerListOfTeam2]);

  // update data in localStorage to retain states in case of page reload
  useEffect(() => {

    if (isLocalStorageLoaded) {
      localStorage.setItem(`tournament_${tournament}_match_${matchid}`, JSON.stringify(
        {
          inningNo,
          match,
          currentRunStack,
          totalRuns,
          extras,
          wicketCount,
          totalOvers,
          overCount,
          recentOvers,
          batter1,
          batter2,
          bowler,
          strikeValue,
          hasMatchEnded,
          runsByOver,
          batters,
          ballCount,
          battingOrder,
          isBatter1Edited,
          isBatter2Edited,
          bowlers,
          isModalOpen,
          outType,
          runOutPlayerName,
          remainingBalls,
          remainingRuns,
          isNoBall,

          batting,
          team1,
          team2,
          maxOver,
        }
      ));
    }

  }, [extras, ballCount, hasMatchEnded, batter1, batter2, bowler, inningNo, match,isBatter1Edited, isBatter2Edited,isBowlerEdited]);

  const handleEndInning = (e) => {
    const endInningButton = document.getElementById('end-inning')
    if (endInningButton.textContent === 'Reset') {
      navigate('/');
    }

    if (batter1.name !== undefined && batter1.name !== '') {
      const { name, run, ball, four, six, strikeRate, onStrike } = batter1
      batters.push({
        name,
        run,
        ball,
        four,
        six,
        strikeRate,
        onStrike,
        battingOrder: batter1.battingOrder,
        battingStatus: BATTING,
      })
    }
    if (batter2.name !== undefined && batter2.name !== '') {
      batters.push({
        name: batter2.name,
        run: batter2.run,
        ball: batter2.ball,
        four: batter2.four,
        six: batter2.six,
        strikeRate: batter2.strikeRate,
        onStrike: batter2.onStrike,
        battingOrder: batter2.battingOrder,
        battingStatus: BATTING,
      })
    }
    if (bowler.name !== undefined && bowler.name !== '') {
      const currentDisplayOver = Math.round((ballCount === 6 ? 1 : ballCount * 0.1) * 10) / 10
      let isMaidenOver = true
      let countWicket = 0
      let countNoBall = 0
      let countWide = 0
      const deliveries = ['1', '2', '3', '4', '6', 'wd']
      for (let delivery of currentRunStack) {
        delivery = delivery.toString()
        if (deliveries.includes(delivery) || delivery.includes('nb')) {
          isMaidenOver = false
        }
        if (delivery === 'W') {
          countWicket++
        }
        if (delivery.includes('nb')) {
          countNoBall++
        }
        if (delivery.includes('wd')) {
          countWide++
        }
      }
      if (ballCount !== 6) {
        isMaidenOver = false
      }
      const index = bowlers.findIndex((blr) => {
        return blr.name === bowler.name
      })
      if (index !== -1) {
        const existingBowler = bowlers[index]
        const { maiden, wicket, noBall, wide, over } = existingBowler
        const bowlerTotalOver = over + ballCount / 6
        existingBowler.over = existingBowler.over + currentDisplayOver
        existingBowler.maiden = isMaidenOver ? maiden + 1 : maiden
        existingBowler.run = existingBowler.run + runsByOver
        existingBowler.wicket = wicket + countWicket
        existingBowler.noBall = noBall + countNoBall
        existingBowler.wide = wide + countWide
        existingBowler.economy = Math.round((existingBowler.run / bowlerTotalOver) * 100) / 100
        bowlers[index] = existingBowler
        setBowlers(bowlers)
      } else {
        if (ballCount !== 6) {
          bowlers.push({
            name: bowler.name,
            over: currentDisplayOver,
            maiden: isMaidenOver ? 1 : 0,
            run: runsByOver,
            wicket: countWicket,
            noBall: countNoBall,
            wide: countWide,
            economy: Math.round((runsByOver / (ballCount / 6)) * 100) / 100,
          })
          setBowlers(bowlers)
        }
      }
    }
    if (inningNo === 1) {
      setMatch((state) => {
        const totalFours = batters.map((batter) => batter.four).reduce((prev, next) => prev + next)
        const totalSixes = batters.map((batter) => batter.six).reduce((prev, next) => prev + next)
        return {
          ...state,
          inning1: {
            runs: totalRuns,
            wickets: wicketCount,
            runRate: crr,
            overs: totalOvers,
            four: totalFours,
            six: totalSixes,
            extra: extras,
            batters,
            bowlers,
          },
        }
      })
      setInningNo(2)
      setCurrentRunStack([])
      setTotalRuns(0)
      setExtras({ total: 0, wide: 0, noBall: 0 })
      setRunsByOver(0)
      setWicketCount(0)
      setTotalOvers(0)
      setBallCount(0)
      setOverCount(0)
      setRecentOvers([])
      setBatter1({})
      setBatter2({})
      setBatters([])
      setBowlers([])
      setBattingOrder(0)
      setBowler({})
      setRemainingBalls(maxOver * 6)
      setRemainingRuns(totalRuns + 1)
      const bowlerNameElement = document.getElementById('bowlerName')
      bowlerNameElement.value = ''
      bowlerNameElement.disabled = false
      const batter1NameElement = document.getElementById('batter1Name')
      batter1NameElement.value = ''
      batter1NameElement.disabled = false
      const batter2NameElement = document.getElementById('batter2Name')
      batter2NameElement.value = ''
      batter2NameElement.disabled = false
      setStrikeValue('strike')
      endInningButton.disabled = true
    } else {
      setMatch((state) => {
        let totalFours = 0, totalSixes = 0;
        batters.forEach((b) => {
          totalFours += b.four
          totalSixes += b.six
        })
        return {
          ...state,
          inning2: {
            runs: totalRuns,
            wickets: wicketCount,
            runRate: crr,
            overs: totalOvers,
            four: totalFours,
            six: totalSixes,
            extra: extras,
            batters,
            bowlers,
          },
        }
      })
      endInningButton.textContent = 'Reset'
      setMatchEnded(true)
      localStorage.removeItem(`tournament_${tournament}_match_${matchid}`);
    }
  }

  const updateMatch = () => {

    if (inningNo === 1) {
      setMatch((state) => {
        let totalFours = 0, totalSixes = 0;
        batters.forEach((b) => {
          totalFours += b.four
          totalSixes += b.six
        })


        return {
          ...state,
          inning1: {
            runs: totalRuns,
            wickets: wicketCount,
            runRate: crr,
            overs: totalOvers,
            four: totalFours,
            six: totalSixes,
            extra: extras,
            batters,
            bowlers,
          },
        }
      })
    } else {
      setMatch((state) => {
        let totalFours = 0, totalSixes = 0;
        batters.forEach((b) => {
          totalFours += b.four
          totalSixes += b.six
        })

        return {
          ...state,
          inning2: {
            runs: totalRuns,
            wickets: wicketCount,
            runRate: crr,
            overs: totalOvers,
            four: totalFours,
            six: totalSixes,
            extra: extras,
            batters,
            bowlers,
          },
        }
      })
    }
  }

  const handleBatter1Blur = (e) => {
    let name = e.target.value
    e.target.disabled = true
    if (isBatter1Edited){
      setBatter1((state) => ({
        ...state,
        name: name,
      }))
      setBatter1Edited(false)
    } else {
      setBatter1({
        name: name,
        run: 0,
        ball: 0,
        four: 0,
        six: 0,
        strikeRate: 0,
        onStrike: strikeValue === 'strike' ? true : false,
        battingOrder: battingOrder + 1,
        battingStatus: BATTING,
      })
      setBattingOrder(battingOrder + 1)
    }
  }
  const handleBatter2Blur = (e) => {
    let name = e.target.value
    e.target.disabled = true
    if (isBatter2Edited) {
      setBatter2((state) => ({
        ...state,
        name: name,
      }))
      setBatter2Edited(false)
    } else {
      setBatter2({
        name: name,
        run: 0,
        ball: 0,
        four: 0,
        six: 0,
        strikeRate: 0,
        onStrike: strikeValue === 'non-strike' ? true : false,
        battingOrder: battingOrder + 1,
        battingStatus: BATTING,
      })
      setBattingOrder(battingOrder + 1)
    }
  }
  const handleBowlerBlur = (e) => {
    let name = e.target.value

    e.target.disabled = true
    if (isBowlerEdited) {
      setBowler((state) => ({
        ...state,
        name: name,
      }))
      setBowlerEdited(false)
    } else {

      setBowler({
        name,
      })
    }
  }


  const overCompleted = (runsByOverParam, currentRunStackParam) => {
    disableAllScoreButtons()
    const bowlerNameElement = document.getElementById('bowlerName')
    bowlerNameElement.value = ''
    if (overCount + 1 >= maxOver) {
      const endInningButton = document.getElementById('end-inning')
      endInningButton.disabled = false
    } else {
      bowlerNameElement.disabled = false
    }

    setRecentOvers((state) => [
      ...state,
      { overNo: overCount + 1, bowler: bowler.name, runs: runsByOverParam, stack: currentRunStackParam },
    ])
    setBowler({})
    setCurrentRunStack([])
    setRunsByOver(0)
    setBallCount(0)
    setOverCount(overCount + 1)
    const index = bowlers.findIndex((blr) => blr.name === bowler.name)
    let isMaidenOver = true
    let countWicket = 0
    let countNoBall = 0
    let countWide = 0
    const deliveries = ['1', '2', '3', '4', '6', 'wd']
    for (let delivery of currentRunStackParam) {
      delivery = delivery.toString()
      if (deliveries.includes(delivery) || delivery.includes('nb')) {
        isMaidenOver = false
      }
      if (delivery === 'W') {
        countWicket++
      }
      if (delivery.includes('nb')) {
        countNoBall++
      }
      if (delivery.includes('wd')) {
        countWide++
      }
    }
    if (index !== -1) {
      const existingBowler = bowlers[index]
      const { over, maiden, run, wicket, noBall, wide } = existingBowler
      existingBowler.over = over + 1
      existingBowler.maiden = isMaidenOver ? maiden + 1 : maiden
      existingBowler.run = run + runsByOverParam
      existingBowler.wicket = wicket + countWicket
      existingBowler.noBall = noBall + countNoBall
      existingBowler.wide = wide + countWide
      existingBowler.economy = Math.round((existingBowler.run / existingBowler.over) * 100) / 100
      bowlers[index] = existingBowler
      setBowlers(bowlers)
    } else {
      setBowlers((state) => [
        ...state,
        {
          name: bowler.name,
          over: 1,
          maiden: isMaidenOver ? 1 : 0,
          run: runsByOverParam,
          wicket: countWicket,
          noBall: countNoBall,
          wide: countWide,
          economy: runsByOverParam,
        },
      ])
    }
    updateMatch()
  }
  const newBatter1 = () => {
    const batter1NameElement = document.getElementById('batter1Name')
    batter1NameElement.value = ''
    batter1NameElement.disabled = false
    const { name, run, ball, four, six, strikeRate, onStrike } = batter1
    setBatters((state) => [
      ...state,
      {
        name,
        run,
        ball,
        four,
        six,
        strikeRate,
        onStrike,
        battingOrder: batter1.battingOrder,
        battingStatus: OUT,
      },
    ])
    setBatter1({})
    updateMatch()
  }
  const newBatter2 = () => {
    const batter2NameElement = document.getElementById('batter2Name')
    batter2NameElement.value = ''
    batter2NameElement.disabled = false
    const { name, run, ball, four, six, strikeRate, onStrike } = batter2
    setBatters((state) => [
      ...state,
      {
        name,
        run,
        ball,
        four,
        six,
        strikeRate,
        onStrike,
        battingOrder: batter2.battingOrder,
        battingStatus: OUT,
      },
    ])
    setBatter2({})
    updateMatch()
  }
  const editBatter1Name = () => {
    if (overCount !== maxOver && wicketCount !== 10 && !hasMatchEnded) {
      const batter1NameElement = document.getElementById('batter1Name')
      batter1NameElement.disabled = false
      setBatter1Edited(true)
    }
  }
  const editBatter2Name = () => {
    if (overCount !== maxOver && wicketCount !== 10 && !hasMatchEnded) {
      const batter2NameElement = document.getElementById('batter2Name')
      batter2NameElement.disabled = false
      setBatter2Edited(true)
    }
  }
  const editBowlerName = () => {
    if (overCount !== maxOver && wicketCount !== 10 && !hasMatchEnded) {
      const bowlerNameElement = document.getElementById('bowlerName');
      bowlerNameElement.disabled = false
      setBowlerEdited(true)
    }
  }

  const undoWicket = (isNoBallParam) => {
    if (!isNoBallParam) {
      setBallCount(ballCount - 1)
      setTotalOvers(Math.round((totalOvers - 0.1) * 10) / 10)
    }
    setWicketCount(wicketCount - 1)
    const batter = batters[batters.length - 1]
    const { name, run, ball, four, six, strikeRate, onStrike } = batter
    if (batter1.name === undefined || batter1.onStrike) {
      const batter1NameElement = document.getElementById('batter1Name')
      batter1NameElement.value = batter.name
      batter1NameElement.disabled = true
      setBatter1({
        name,
        run,
        ball,
        four,
        six,
        strikeRate,
        onStrike,
        battingOrder: batter.battingOrder,
        battingStatus: BATTING,
      })
      if (!batter.onStrike) {
        changeStrikeRadio()
        setBatter2((state) => ({
          ...state,
          onStrike: true,
        }))
      }
    } else if (batter2.name === undefined || batter2.onStrike) {
      const batter2NameElement = document.getElementById('batter2Name')
      batter2NameElement.value = batter.name
      batter2NameElement.disabled = true
      setBatter2({
        name,
        run,
        ball,
        four,
        six,
        strikeRate,
        onStrike,
        battingOrder: batter.battingOrder,
        battingStatus: BATTING,
      })
      if (!batter.onStrike) {
        changeStrikeRadio()
        setBatter1((state) => ({
          ...state,
          onStrike: true,
        }))
      }
    }
    batters.pop()
    setBatters(batters)
  }

  const undoRun = (run, isNoBallParam) => {
    if (isNoBallParam) {
      setTotalRuns(totalRuns - (run + 1))
      setRunsByOver(runsByOver - (run + 1))
    } else {
      setTotalRuns(totalRuns - run)
      setRunsByOver(runsByOver - run)
      setBallCount(ballCount - 1)
      setTotalOvers(Math.round((totalOvers - 0.1) * 10) / 10)
      currentRunStack.pop()
      setCurrentRunStack(currentRunStack)
    }
    if (batter1.onStrike) {
      if (run % 2 === 0) {
        setBatter1((state) => {
          const updatedRun = state.run - run
          const updatedBall = state.ball - 1
          const updatedSr = updatedRun / updatedBall
          const sr = Math.round(isNaN(updatedSr) ? 0 : updatedSr * 100 * 100) / 100
          let four = state.four
          if (run === 4) {
            four = four - 1
          }
          let six = state.six
          if (run === 6) {
            six = six - 1
          }
          return {
            ...state,
            run: updatedRun,
            ball: updatedBall,
            four: four,
            six: six,
            strikeRate: sr,
          }
        })
      } else {
        changeStrikeRadio()
        switchBatterStrike()
        setBatter2((state) => {
          const updatedRun = state.run - run
          const updatedBall = state.ball - 1
          const updatedSr = updatedRun / updatedBall
          const sr = Math.round(isNaN(updatedSr) ? 0 : updatedSr * 100 * 100) / 100
          let four = state.four
          if (run === 4) {
            four = four - 1
          }
          let six = state.six
          if (run === 6) {
            six = six - 1
          }
          return {
            ...state,
            run: updatedRun,
            ball: updatedBall,
            four: four,
            six: six,
            strikeRate: sr,
          }
        })
      }
    } else if (batter2.onStrike) {
      if (run % 2 === 0) {
        setBatter2((state) => {
          const updatedRun = state.run - run
          const updatedBall = state.ball - 1
          const updatedSr = updatedRun / updatedBall
          const sr = Math.round(isNaN(updatedSr) ? 0 : updatedSr * 100 * 100) / 100
          let four = state.four
          if (run === 4) {
            four = four - 1
          }
          let six = state.six
          if (run === 6) {
            six = six - 1
          }
          return {
            ...state,
            run: updatedRun,
            ball: updatedBall,
            four: four,
            six: six,
            strikeRate: sr,
          }
        })
      } else {
        changeStrikeRadio()
        switchBatterStrike()
        setBatter1((state) => {
          const updatedRun = state.run - run
          const updatedBall = state.ball - 1
          const updatedSr = updatedRun / updatedBall
          const sr = Math.round(isNaN(updatedSr) ? 0 : updatedSr * 100 * 100) / 100
          let four = state.four
          if (run === 4) {
            four = four - 1
          }
          let six = state.six
          if (run === 6) {
            six = six - 1
          }
          return {
            ...state,
            run: updatedRun,
            ball: updatedBall,
            four: four,
            six: six,
            strikeRate: sr,
          }
        })
      }
    }
  }

  const undoDelivery = () => {
    if (currentRunStack.length > 0) {
      const last = currentRunStack[currentRunStack.length - 1]
      if (typeof last === 'number') {
        const run = parseInt(last)
        undoRun(run, false)
      } else {
        currentRunStack.pop()
        setCurrentRunStack(currentRunStack)
        if (last === 'wd') {
          setTotalRuns(totalRuns - 1)
          setExtras((state) => ({
            ...state,
            total: state.total - 1,
            wide: state.wide - 1,
          }))
        } else if (last === 'W') {
          undoWicket(false)
        } else {
          const lastChar = last.substr(last.length - 1)
          const run = parseInt(lastChar)
          if (isNaN(run)) {
            setTotalRuns(totalRuns - 1)
            setRunsByOver(runsByOver - 1)
            if (last !== 'nb') {
              undoWicket(true)
            }
          } else {
            undoRun(run, true)
          }
        }
      }
    }
  }

  const handleStrikeChange = (e) => {
    changeStrikeRadio(e.target.value)
    if (e.target.value === 'strike') {
      switchBatterStrike('batter1')
    } else {
      switchBatterStrike('batter2')
    }
  }
  const changeStrikeRadio = (strikeParam) => {
    if (strikeParam === undefined) {
      setStrikeValue(strikeValue === 'strike' ? 'non-strike' : 'strike')
    } else {
      setStrikeValue(strikeParam)
    }
  }
  const switchBatterStrike = (strikeParam) => {
    if (strikeParam === undefined) {
      setBatter1((state) => ({
        ...state,
        onStrike: !state.onStrike,
      }))
      setBatter2((state) => ({
        ...state,
        onStrike: !state.onStrike,
      }))
    } else {
      if (strikeParam === 'batter1') {
        setBatter1((state) => ({
          ...state,
          onStrike: true,
        }))
        setBatter2((state) => ({
          ...state,
          onStrike: false,
        }))
      } else if (strikeParam === 'batter2') {
        setBatter1((state) => ({
          ...state,
          onStrike: false,
        }))
        setBatter2((state) => ({
          ...state,
          onStrike: true,
        }))
      }
    }
  }
  const handleRun = (run) => {
    if (isNoBall) {
      setCurrentRunStack((state) => [...state, 'nb' + run])
      removeNoBallEffect()
    } else {
      setBallCount(ballCount + 1)
      setCurrentRunStack((state) => [...state, run])
    }
    setTotalRuns(totalRuns + run)
    setRunsByOver(runsByOver + run)
    if (inningNo === 2) {
      if (!isNoBall) {
        setRemainingBalls(remainingBalls - 1)
      }
      setRemainingRuns(remainingRuns - run)
    }
    if (ballCount === 5) {
      if (isNoBall) {
        if (run % 2 !== 0) {
          changeStrikeRadio()
        }
      } else {
        setTotalOvers(overCount + 1)
        const arr = [...currentRunStack]
        arr.push(run)
        overCompleted(runsByOver + run, arr)
        if (run % 2 === 0) {
          changeStrikeRadio()
        }
      }
    } else {
      if (!isNoBall) {
        setTotalOvers(Math.round((totalOvers + 0.1) * 10) / 10)
      }
      if (run % 2 !== 0) {
        changeStrikeRadio()
      }
    }
    if (batter1.onStrike) {
      setBatter1((state) => {
        const updatedRun = state.run + run
        const updatedBall = state.ball + 1
        const sr = Math.round((updatedRun / updatedBall) * 100 * 100) / 100
        let four = state.four
        if (run === 4) {
          four = four + 1
        }
        let six = state.six
        if (run === 6) {
          six = six + 1
        }
        return {
          ...state,
          run: updatedRun,
          ball: updatedBall,
          four: four,
          six: six,
          strikeRate: sr,
        }
      })
      if (isNoBall) {
        if (run % 2 !== 0) {
          switchBatterStrike()
        }
      } else {
        if ((ballCount === 5 && run % 2 === 0) || (ballCount !== 5 && run % 2 !== 0)) {
          switchBatterStrike()
        }
      }
    } else {
      setBatter2((state) => {
        const updatedRun = state.run + run
        const updatedBall = state.ball + 1
        const sr = Math.round((updatedRun / updatedBall) * 100 * 100) / 100
        let four = state.four
        if (run === 4) {
          four = four + 1
        }
        let six = state.six
        if (run === 6) {
          six = six + 1
        }
        return {
          ...state,
          run: updatedRun,
          ball: updatedBall,
          four: four,
          six: six,
          strikeRate: sr,
        }
      })
      if ((ballCount === 5 && run % 2 === 0) || (ballCount !== 5 && run % 2 !== 0)) {
        switchBatterStrike()
      }
    }
  }
  const handleNoBall = () => {
    if (inningNo === 2) {
      setRemainingRuns(remainingRuns - 1)
    }
    setTotalRuns(totalRuns + 1)
    setRunsByOver(runsByOver + 1)
    setExtras((state) => ({
      ...state,
      total: state.total + 1,
      noBall: state.noBall + 1,
    }))
    addNoBallEffect()
  }
  const addNoBallEffect = () => {
    const scoreTypesButtons = document.querySelectorAll('.score-types-button')
    for (let i = 0; i < scoreTypesButtons.length; i++) {
      scoreTypesButtons[i].classList.add('score-types-button-noball')
    }
    setNoBall(true)
  }
  const removeNoBallEffect = () => {
    const scoreTypesButtons = document.querySelectorAll('.score-types-button')
    for (let i = 0; i < scoreTypesButtons.length; i++) {
      scoreTypesButtons[i].classList.remove('score-types-button-noball')
    }
    setNoBall(false)
  }
  const handleWide = () => {
    if (isNoBall) {
      setCurrentRunStack((state) => [...state, 'nb'])
      removeNoBallEffect()
    } else {
      if (inningNo === 2) {
        setRemainingRuns(remainingRuns - 1)
      }
      setCurrentRunStack((state) => [...state, 'wd'])
      setTotalRuns(totalRuns + 1)
      setRunsByOver(runsByOver + 1)
      setExtras((state) => ({
        ...state,
        total: state.total + 1,
        wide: state.wide + 1,
      }))
    }
  }
  const handleWicket = (isRunOut, playerName) => {
    setRunOutPlayerName('')
    setRemainingBalls(remainingBalls - 1)
    if (ballCount === 5) {
      if (isNoBall) {
        removeNoBallEffect()
        if (isRunOut) {
          setCurrentRunStack((state) => [...state, 'nbW'])
          setWicketCount(wicketCount + 1)
          disableAllScoreButtons()
        } else {
          setCurrentRunStack((state) => [...state, 'nb'])
        }
      } else {
        setTotalOvers(overCount + 1)
        const arr = [...currentRunStack]
        arr.push('W')
        overCompleted(runsByOver, arr)
        setWicketCount(wicketCount + 1)
        disableAllScoreButtons()
      }
    } else {
      if (isNoBall) {
        removeNoBallEffect()
        if (isRunOut) {
          setCurrentRunStack((state) => [...state, 'nbW'])
          setWicketCount(wicketCount + 1)
          disableAllScoreButtons()
        } else {
          setCurrentRunStack((state) => [...state, 'nb'])
        }
      } else {
        setBallCount(ballCount + 1)
        setCurrentRunStack((state) => [...state, 'W'])
        setTotalOvers(Math.round((totalOvers + 0.1) * 10) / 10)
        setWicketCount(wicketCount + 1)
        disableAllScoreButtons()
      }
    }
    if (isRunOut) {
      if (batter1.name === playerName) {
        newBatter1()
        changeStrikeRadio('strike')
        switchBatterStrike('batter1')
      } else {
        newBatter2()
        changeStrikeRadio('non-strike')
        switchBatterStrike('batter2')
      }
    } else {
      if (!isNoBall) {
        if (batter1.onStrike) {
          newBatter1()
        } else {
          newBatter2()
        }
      }
    }
    if (isNoBall) {
      if (isRunOut && wicketCount + 1 === 10) {
        const endInningButton = document.getElementById('end-inning')
        endInningButton.disabled = false
        const bowlerNameElement = document.getElementById('bowlerName')
        bowlerNameElement.disabled = true
        const batter1NameElement = document.getElementById('batter1Name')
        batter1NameElement.disabled = true
        const batter2NameElement = document.getElementById('batter2Name')
        batter2NameElement.disabled = true

      }
    } else {
      if (wicketCount + 1 === 10) {
        const endInningButton = document.getElementById('end-inning')
        endInningButton.disabled = false
        const bowlerNameElement = document.getElementById('bowlerName')
        bowlerNameElement.disabled = true
        const batter1NameElement = document.getElementById('batter1Name')
        batter1NameElement.disabled = true
        const batter2NameElement = document.getElementById('batter2Name')
        batter2NameElement.disabled = true
      }
    }
  }
  const handleCloseModal = () => {
    if (outType !== '') {
      if (outType === RUN_OUT) {
        if (runOutPlayerName !== '') {
          handleWicket(true, runOutPlayerName)
        }
      } else {
        handleWicket(false, '')
      }
    }
    setModalOpen(false)
    setOutType('')
    setRunOutPlayerName('')
  }
  const handleOutTypeChange = (e) => {
    const outTypeValue = e.target.value
    setOutType(outTypeValue)
    if (outTypeValue === RUN_OUT) {
      const runOutPlayerElement = document.getElementById('run-out-player')
      runOutPlayerElement.classList.remove('hide')
      const runOutPlayerErrorElement = document.getElementById('run-out-player-error')
      runOutPlayerErrorElement.classList.remove('hide')
    }
  }
  const handleRunOutPlayerChange = (e) => {
    const playerName = e.target.value
    const runOutPlayerErrorElement = document.getElementById('run-out-player-error')
    runOutPlayerErrorElement.classList.add('hide')
    setRunOutPlayerName(playerName)
  }
  const endMatch = () => {
    disableAllScoreButtons()
    const endInningButton = document.getElementById('end-inning')
    if (endInningButton.textContent === 'Score Board') {
      endInningButton.disabled = false
    }
  }
  const disableAllScoreButtons = () => {
    const scoreTypesButtons = document.querySelectorAll('.score-types-button')
    for (let i = 0; i < scoreTypesButtons.length; i++) {
      scoreTypesButtons[i].disabled = true
    }
  }
  const enableAllScoreButtons = () => {
    const scoreTypesButtons = document.querySelectorAll('.score-types-button')
    for (let i = 0; i < scoreTypesButtons.length; i++) {
      scoreTypesButtons[i].disabled = false
    }
  }
  if (batter1.name !== undefined && batter2.name !== undefined && bowler.name !== undefined) {
    enableAllScoreButtons()
  }
  let rrr = (remainingRuns / (remainingBalls / 6)).toFixed(2)
  rrr = isFinite(rrr) ? rrr : 0
  let overs = overCount + ballCount / 6
  let crr = (totalRuns / overs).toFixed(2)
  crr = isFinite(crr) ? crr : 0
  let inning1 = match.inning1
  let inning2 = match.inning2
  let scoringTeam = batting === team1 ? team1 : team2
  let chessingTeam = scoringTeam === team1 ? team2 : team1
  let winningMessage = ""
  if (inningNo === 1) {
    winningMessage = `${scoringTeam} : ${totalRuns}/${wicketCount} (${totalOvers})`
  }

  if (inningNo === 2) {

    winningMessage = `${chessingTeam} needs ${remainingRuns} ${remainingRuns <= 1 ? 'run' : 'runs'
      } in ${remainingBalls} ${remainingBalls <= 1 ? 'ball' : 'balls'} to win`

    var target = inning1.runs + 1
    if (wicketCount < 10 && overCount <= maxOver && totalRuns >= target) {
      winningMessage = `${chessingTeam} won by ${10 - wicketCount} wickets`
      endMatch()
    }
    if ((wicketCount >= 10 || overCount >= maxOver) && totalRuns < target - 1) {
      winningMessage = `${scoringTeam} won by ${target - totalRuns - 1} runs`
      endMatch()
    }
    if (wicketCount < 10 && overCount === maxOver && totalRuns === target - 1) {
      winningMessage = 'Match Tied'
      endMatch()
    }
  }


  useEffect(() => {
    const task = async () => {
      try {
        const matchDoc = doc(db, `tournaments/${tournament}/matches`, matchid);
        updateDoc(matchDoc, {
          inningNo,
          match,
          currentRunStack,
          totalRuns,
          extras,
          wicketCount,
          totalOvers,
          overCount,
          recentOvers,
          batter1,
          batter2,
          bowler,
          strikeValue,
          hasMatchEnded,
          maxOver,
          scoringTeam,
          chessingTeam,
          winningMessage,
          crr: crr,
          rrr: rrr,
          batting
        });
      } catch (err) {
        console.error(err)
      }

    }
    if (isLocalStorageLoaded) {
      task();
    }

  }, [ballCount, overCount, extras, batter1, batter2, bowler, hasMatchEnded, match, inningNo]);


  const welcomeContent = (
    <>
      <div></div>
      <div>Welcome to Crilive Cricket Score Board</div>
      <div></div>
    </>
  )
  const firstInningCompletedContent = (
    <>
      {overCount === maxOver && <div>1st inning completed</div>}
      {wicketCount === 10 && <div>All Out</div>}
      <div>Please click "End Inning" button</div>
    </>
  )
  const remainingRunsContent = (
    <>
      <div>Target: {target}</div>
      <div>{winningMessage}</div>
      {hasMatchEnded ? <div></div> : <div>RRR: {isNaN(rrr) ? 0 : rrr}</div>}
    </>
  )

  return (
    <div >
      <div className='inning'>
        <div>
          {team1} vs {team2}, {inningNo === 1 ? '1st' : '2nd'} Inning
        </div>
        <div>
          <button id='end-inning' onClick={handleEndInning}>
            {inningNo === 1 ? 'End Inning' : 'Score Board'}
          </button>
        </div>
      </div>
      <div id='badge' className='badge badge-flex'>
        {inningNo === 2 ? remainingRunsContent : overCount === maxOver || wicketCount === 10 ? firstInningCompletedContent : welcomeContent}
      </div>
      <div className='score-container'>
        <div>
          <Modal
            open={isModalOpen}
            onClose={handleCloseModal}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={radioGroupBoxstyle}>
              <FormControl component='fieldset'>
                <RadioGroup
                  row
                  aria-label='wicket'
                  name='row-radio-buttons-group'
                  onChange={handleOutTypeChange}
                  sx={{ alignItems: 'center' }}
                >
                  <FormControlLabel
                    value={CATCH}
                    control={
                      <Radio
                        sx={{
                          '&.Mui-checked': {
                            color: pink[600],
                          },
                        }}
                      />
                    }
                    label={CATCH}
                  />
                  <FormControlLabel
                    value={STUMP}
                    control={
                      <Radio
                        sx={{
                          '&.Mui-checked': {
                            color: pink[600],
                          },
                        }}
                      />
                    }
                    label={STUMP}
                  />
                  <FormControlLabel
                    value={HIT_WICKET}
                    control={
                      <Radio
                        sx={{
                          '&.Mui-checked': {
                            color: pink[600],
                          },
                        }}
                      />
                    }
                    label={HIT_WICKET}
                  />
                  <FormControlLabel
                    value={BOLD}
                    control={
                      <Radio
                        sx={{
                          '&.Mui-checked': {
                            color: pink[600],
                          },
                        }}
                      />
                    }
                    label={BOLD}
                  />
                  <FormControlLabel
                    value={RUN_OUT}
                    control={
                      <Radio
                        sx={{
                          '&.Mui-checked': {
                            color: pink[600],
                          },
                        }}
                      />
                    }
                    label={RUN_OUT}
                  />
                  <select defaultValue='' id='run-out-player' className='run-out-player hide' onChange={handleRunOutPlayerChange}>
                    <option value='' disabled>
                      select option
                    </option>
                    <option value={batter1.name}>{batter1.name}</option>
                    <option value={batter2.name}>{batter2.name}</option>
                  </select>
                </RadioGroup>
                <div id='run-out-player-error' className='run-out-player-error hide'>
                  Please select run out player name
                </div>
              </FormControl>
            </Box>
          </Modal>
        </div>
        <div className='score'>
          <div>
            {inningNo === 1 ? scoringTeam : chessingTeam} : {totalRuns}/{wicketCount} ({totalOvers})
          </div>
          <div>CRR : {isNaN(crr) ? 0 : crr}</div>
        </div>
        <div className='batting-container'>
          <table>
            <thead>
              <tr>
                <td className='score-types padding-left'>Batting</td>
                <td className='score-types'>R(B)</td>
                <td className='score-types text-center'>4s</td>
                <td className='score-types text-center'>6s</td>
                <td className='score-types text-center'>SR</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='score-types'>
                  <span id='strike'>
                    <Radio
                      size='small'
                      checked={strikeValue === 'strike'}
                      onChange={handleStrikeChange}
                      value='strike'
                      name='radio-buttons'
                      inputProps={{ 'aria-label': 'strike' }}
                      style={{ padding: '0 4px 0 2px' }}
                    />
                  </span>

                  <select id='batter1Name' className='batter-name' onBlur={handleBatter1Blur}>
                    {((inningNo === 1 && team1 === scoringTeam) || (inningNo === 2 && team1 === chessingTeam)) ?
                      playerListOfTeam1.map((p1, i) => (
                        <option key={i} value={p1}>{p1}</option>
                      ))
                      :
                      playerListOfTeam2.map((p1, i) => (
                        <option key={i} value={p1}>{p1}</option>
                      ))
                    }
                  </select>
                  <IconButton color='primary' className='icon-button' onClick={editBatter1Name}>
                    <EditIcon className='icon-size' />
                  </IconButton>
                </td>
                <td className='score-types'>{batter1.run === undefined ? `0(0)` : `${batter1.run}(${batter1.ball})`}</td>
                <td className='score-types'>{batter1.four === undefined ? 0 : batter1.four}</td>
                <td className='score-types'>{batter1.six === undefined ? 0 : batter1.six}</td>
                <td className='score-types'>{batter1.strikeRate === undefined ? 0 : batter1.strikeRate}</td>
              </tr>
              <tr>
                <td className='score-types'>
                  <span id='non-strike'>
                    <Radio
                      size='small'
                      checked={strikeValue === 'non-strike'}
                      onChange={handleStrikeChange}
                      value='non-strike'
                      name='radio-buttons'
                      inputProps={{ 'aria-label': 'non-strike' }}
                      style={{ padding: '0 4px 0 2px' }}
                    />
                  </span>
                  <select id='batter2Name' className='batter-name' onBlur={handleBatter2Blur}>
                    {((inningNo === 1 && team1 === scoringTeam) || (inningNo === 2 && team1 === chessingTeam)) ?
                      playerListOfTeam1.map((p1, i) => (
                        <option key={i} value={p1}>{p1}</option>
                      ))
                      :
                      playerListOfTeam2.map((p1, i) => (
                        <option key={i} value={p1}>{p1}</option>
                      ))
                    }
                  </select>
                  <IconButton color='primary' className='icon-button' onClick={editBatter2Name}>
                    <EditIcon className='icon-size' />
                  </IconButton>
                </td>
                <td className='score-types'>{batter2.run === undefined ? `0(0)` : `${batter2.run}(${batter2.ball})`}</td>
                <td className='score-types'>{batter2.four === undefined ? 0 : batter2.four}</td>
                <td className='score-types'>{batter2.six === undefined ? 0 : batter2.six}</td>
                <td className='score-types'>{batter2.strikeRate === undefined ? 0 : batter2.strikeRate}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='bowler-container'>
          <div className='bowler'>
            Bowler:<select id='bowlerName' className='bowler-name' onBlur={handleBowlerBlur}>
              {((inningNo === 1 && team1 === scoringTeam) || (inningNo === 2 && team1 === chessingTeam)) ?
                playerListOfTeam2.map((p1, i) => (
                  <option key={i} value={p1}>{p1}</option>
                ))
                :
                playerListOfTeam1.map((p1, i) => (
                  <option key={i} value={p1}>{p1}</option>
                ))
              }
            </select>
            <IconButton color='primary' className='icon-button' onClick={editBowlerName}>
              <EditIcon className='icon-size' />
            </IconButton>
          </div>
          <div className='bowler-runs'>
            {currentRunStack.map((run, i) => (
              <div key={i}>{run}</div>
            ))}
            <IconButton color='warning' className='icon-button' onClick={undoDelivery}>
              <DeleteIcon className='delete-icon-size' />
            </IconButton>
          </div>
        </div>
        <div className='score-types-container'>
          <table>
            <tbody>
              <tr>
                <td className='score-types' onClick={() => handleRun(0)}>
                  <button className='score-types-button' disabled>
                    0
                  </button>
                </td>
                <td className='score-types' onClick={() => handleRun(1)}>
                  <button className='score-types-button' disabled>
                    1
                  </button>
                </td>
                <td className='score-types' onClick={() => handleRun(2)}>
                  <button className='score-types-button' disabled>
                    2
                  </button>
                </td>
                <td className='score-types' onClick={handleNoBall}>
                  <button className='score-types-button' disabled>
                    nb
                  </button>
                </td>
                <td rowSpan='2' className='score-types' onClick={() => setModalOpen(true)}>
                  <button className='score-types-button' disabled>
                    W
                  </button>
                </td>
              </tr>
              <tr>
                <td className='score-types' onClick={() => handleRun(3)}>
                  <button className='score-types-button' disabled>
                    3
                  </button>
                </td>
                <td className='score-types' onClick={() => handleRun(4)}>
                  <button className='score-types-button' disabled>
                    4
                  </button>
                </td>
                <td className='score-types' onClick={() => handleRun(6)}>
                  <button className='score-types-button' disabled>
                    6
                  </button>
                </td>
                <td className='score-types' onClick={handleWide}>
                  <button className='score-types-button' disabled>
                    wd
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='extras-container'>
          <div>Extras: {extras.total}</div>
          <div>Wd: {extras.wide}</div>
          <div>NB: {extras.noBall}</div>
        </div>
        <div className='recent-over-container'>
          <div className='recent-over-text'>Recent Overs</div>
          <div className='recent-over-details'>
            <table>
              <tbody>
                {recentOvers.map((recentOver, i) => (
                  <tr key={i}>
                    <td>{recentOver.overNo}.</td>
                    <td>{recentOver.bowler}:</td>
                    <td>
                      <div className='recent-over-runs'>
                        {recentOver.stack.map((run, index) => (
                          <div key={index}>{run}</div>
                        ))}
                      </div>
                    </td>
                    <td className='recent-over-total-run'>
                      <div>{recentOver.runs}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {isLocalStorageLoaded &&
          <div className='score-board-container'>
            <div className='score-board-text text-center'>Score Board</div>
            {/* Inning1 Starts here */}
            <div>
              <div className='score-board-innings'>
                <div>{scoringTeam} Innings</div>
                <div>RR:{inningNo === 1 ? crr : inning1.runRate}</div>
                <div>
                  {inningNo === 1 ? totalRuns : inning1.runs}-{inningNo === 1 ? wicketCount : inning1.wickets} (
                  {inningNo === 1 ? totalOvers : inning1.overs} Ov)
                </div>
              </div>

              <div className='sb-batting'>
                <table>
                  <thead>
                    <tr>
                      <td className='score-types padding-left'>Batter</td>
                      <td className='score-types'>R(B)</td>
                      <td className='score-types text-center'>4s</td>
                      <td className='score-types text-center'>6s</td>
                      <td className='score-types text-center'>SR</td>
                    </tr>
                  </thead>
                  <tbody>
                    {inning1.batters.map((batter, i) => {
                      return (
                        <tr key={i}>
                          <td className='score-types padding-left'>{batter.name}</td>
                          <td className='score-types'>
                            {batter.run}({batter.ball})
                          </td>
                          <td className='score-types text-center'>{batter.four}</td>
                          <td className='score-types text-center'>{batter.six}</td>
                          <td className='score-types text-center'>{batter.strikeRate}</td>
                        </tr>
                      )
                    })}
                    <tr>
                      <td className='score-types padding-left'>Extras:</td>
                      <td className='score-types'>{inningNo === 1 ? extras.total : inning1.extra.total}</td>
                      <td className='score-types text-center'>wd:{inningNo === 1 ? extras.wide : inning1.extra.wide}</td>
                      <td className='score-types text-center'>nb:{inningNo === 1 ? extras.noBall : inning1.extra.noBall}</td>
                      <td className='score-types text-center'></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='sb-bowling'>
                <table>
                  <thead>
                    <tr>
                      <td className='score-types padding-left'>Bowler</td>
                      <td className='score-types'>O</td>
                      <td className='score-types text-center'>M</td>
                      <td className='score-types text-center'>R</td>
                      <td className='score-types text-center'>W</td>
                      <td className='score-types text-center'>NB</td>
                      <td className='score-types text-center'>WD</td>
                      <td className='score-types text-center'>ECO</td>
                    </tr>
                  </thead>
                  <tbody>
                    {inning1.bowlers.map((blr, i) => {
                      const { name, over, maiden, run, wicket, noBall, wide, economy } = blr
                      return (
                        <tr key={i}>
                          <td className='score-types padding-left'>{name}</td>
                          <td className='score-types'>{over}</td>
                          <td className='score-types text-center'>{maiden}</td>
                          <td className='score-types text-center'>{run}</td>
                          <td className='score-types text-center'>{wicket}</td>
                          <td className='score-types text-center'>{noBall}</td>
                          <td className='score-types text-center'>{wide}</td>
                          <td className='score-types text-center'>{economy}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inning2 Starts here */}
            {inningNo === 2 && (
              <div>
                <div className='score-board-innings'>
                  <div>{chessingTeam} Innings</div>
                  <div>RR:{inningNo === 2 ? crr : inning2.runRate}</div>
                  <div>
                    {hasMatchEnded ? inning2.runs : totalRuns}-{hasMatchEnded ? inning2.wickets : wicketCount} (
                    {hasMatchEnded ? inning2.overs : totalOvers} Ov)
                  </div>
                </div>
                <div className='sb-batting'>
                  <table>
                    <thead>
                      <tr>
                        <td className='score-types padding-left'>Batter</td>
                        <td className='score-types'>R(B)</td>
                        <td className='score-types text-center'>4s</td>
                        <td className='score-types text-center'>6s</td>
                        <td className='score-types text-center'>SR</td>
                      </tr>
                    </thead>
                    <tbody>
                      {inning2.batters.map((batter, i) => {
                        return (
                          <tr key={i}>
                            <td className='score-types padding-left'>{batter.name}</td>
                            <td className='score-types'>
                              {batter.run}({batter.ball})
                            </td>
                            <td className='score-types text-center'>{batter.four}</td>
                            <td className='score-types text-center'>{batter.six}</td>
                            <td className='score-types text-center'>{batter.strikeRate}</td>
                          </tr>
                        )
                      })}
                      <tr>
                        <td className='score-types padding-left'>Extras:</td>
                        <td className='score-types'>{hasMatchEnded ? inning2.extra.total : extras.total}</td>
                        <td className='score-types text-center'>wd:{hasMatchEnded ? inning2.extra.wide : extras.wide}</td>
                        <td className='score-types text-center'>nb:{hasMatchEnded ? inning2.extra.noBall : extras.noBall}</td>
                        <td className='score-types text-center'></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className='sb-bowling'>
                  <table>
                    <thead>
                      <tr>
                        <td className='score-types padding-left'>Bowler</td>
                        <td className='score-types'>O</td>
                        <td className='score-types text-center'>M</td>
                        <td className='score-types text-center'>R</td>
                        <td className='score-types text-center'>W</td>
                        <td className='score-types text-center'>NB</td>
                        <td className='score-types text-center'>WD</td>
                        <td className='score-types text-center'>ECO</td>
                      </tr>
                    </thead>
                    <tbody>
                      {inning2.bowlers.map((blr, i) => {
                        const { name, over, maiden, run, wicket, noBall, wide, economy } = blr
                        return (
                          <tr key={i}>
                            <td className='score-types padding-left'>{name}</td>
                            <td className='score-types'>{over}</td>
                            <td className='score-types text-center'>{maiden}</td>
                            <td className='score-types text-center'>{run}</td>
                            <td className='score-types text-center'>{wicket}</td>
                            <td className='score-types text-center'>{noBall}</td>
                            <td className='score-types text-center'>{wide}</td>
                            <td className='score-types text-center'>{economy}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  )
}

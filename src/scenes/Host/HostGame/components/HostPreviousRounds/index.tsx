import React from 'react'
import { observer } from 'mobx-react'
import { Game } from '../../../../../models/Game/game'
import { Row, Col } from 'antd'
import { Round } from '../../../../../models/Round/round'
import "./index.less"

interface HostPreviousRoundsProps {
    game: Game
}

const HostPreviousRounds = (props: HostPreviousRoundsProps) => {
    const { game } = props

    return(
        <React.Fragment >
            <div className= "BackgroundContainer"></div>
            <div className = "RoundContainer">
            <Row>
                <h2>Previous Rounds</h2>
            </Row>
            {game.previousRounds.reverse().map((r: Round, i: number) => (
                <Row
                    key={"prevRound" + i}
                    className={r.missionVoteBad >= 1 ? "previousRoundMissionFailed" : "previousRoundMissionSuccess"}
                >
                    <Col className= "ContainerCol">
                        <Row className ={r.missionVoteBad >= 1 ? "HeaderFailure" : "HeaderSuccess"}>
                        <h2>#{game.previousRounds.length - i}</h2>   
                        </Row>
                        <Row>
                            <h3>Team: </h3>
                            <h3 className = "NameH">{r.teamString}</h3>
                        </Row>
                        <Row>
                            <Col>
                                <Row className = "VotesForTeam">
                                    <h4>Votes For Team: {r.votesForTeam + "       "}       </h4>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <h4>Votes Against Team: {r.votesAgainstTeam}</h4>
                                </Row>
                            </Col>
                        </Row>
                        {r.failedTeams > 0 
                            ?
                                <React.Fragment>
                                    <Row>
                                        <h4>Failed teams: {r.failedTeams} </h4>
                                    </Row>
                                </React.Fragment>
                            :
                                ""
                        }
                        {r.votesForTeam > r.votesAgainstTeam 
                            ?
                                <React.Fragment>
                                    <Row>
                                        <h4>Expedtion fail votes: {r.missionVoteBad}</h4>
                                    </Row>
                                </React.Fragment>
                            :
                                ""
                        }
                    </Col>
                </Row>
            ))}
            </div>
        </React.Fragment>
    )
}

export default observer(HostPreviousRounds)
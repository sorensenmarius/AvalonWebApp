import React from 'react'
import { observer } from 'mobx-react'
import { Game } from '../../../../../models/Game/game'
import { Row, Col } from 'antd'
import { Round } from '../../../../../models/Round/round'
import { Player } from '../../../../../models/Players/player'
import "./index.less"

interface HostPreviousRoundsProps {
    game: Game
}

const HostPreviousRounds = (props: HostPreviousRoundsProps) => {
    const { game } = props

    return(
        <React.Fragment>
            <Row>
                <h2>Previous Rounds</h2>
            </Row>
            {game.previousRounds.map((r: Round, i: number) => (
                <Row
                    className={r.missionVoteBad >= 1 ? "previousRoundMissionFailed" : "previousRoundMissionSuccess"}
                >
                    <Col>
                        <Row>
                            <h2>#{i + 1}</h2>
                        </Row>
                        <Row>
                            <h3>Team:</h3>
                        </Row>
                        <Row>
                            {r.currentTeam.map((p: Player) => (
                                <h4>{p.name}</h4>
                            ))}
                        </Row>
                        <Row>
                            <Col>
                                <Row>
                                    <h4>Votes For</h4>
                                </Row>
                                <Row>
                                    <h3>{r.votesForTeam}</h3>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <h4>Votes Against</h4>
                                </Row>
                                <Row>
                                    <h3>{r.votesAgainstTeam}</h3>
                                </Row>
                            </Col>
                        </Row>
                        {r.failedTeams > 0 
                            ?
                                <React.Fragment>
                                    <Row>
                                        <h4>Failed teams</h4>
                                    </Row>
                                    <Row>
                                        <h3>{r.failedTeams}</h3>
                                    </Row>
                                </React.Fragment>
                            :
                                ""
                        }
                        {r.votesForTeam > r.votesAgainstTeam 
                            ?
                                <React.Fragment>
                                    <Row>
                                        <h4>Fail votes</h4>
                                    </Row>
                                    <Row>
                                        <h3>{r.missionVoteBad}</h3>
                                    </Row>
                                </React.Fragment>
                            :
                                ""
                        }
                    </Col>
                </Row>
            ))}
        </React.Fragment>
    )
}

export default observer(HostPreviousRounds)
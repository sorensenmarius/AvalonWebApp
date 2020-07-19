import RoundStatus from './roundStatus';
import { Player } from '../Players/player';

export interface Round {
    failedTeams: number;
    currentTeam: Player[];
    status: RoundStatus;
    votesForTeam: number;
    votesAgainstTeam: number;
    missionVoteGood: number;
    missionVoteBad: number;
    requiredPlayers: number;
}

export class EmptyRound implements Round {
    failedTeams: number;
    currentTeam: Player[];
    status: RoundStatus;
    votesForTeam: number;
    votesAgainstTeam: number;
    missionVoteGood: number;
    missionVoteBad: number;
    requiredPlayers: number;

    constructor() {
        this.failedTeams = 0
        this.currentTeam = [];
        this.status = RoundStatus.SelectingTeam;
        this.votesForTeam = 0;
        this.votesAgainstTeam = 0;
        this.missionVoteGood = 0;
        this.missionVoteBad = 0;
        this.requiredPlayers = 0;
    }
}
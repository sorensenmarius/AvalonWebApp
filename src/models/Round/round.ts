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
}
enum RoundStatus {
    SelectingTeam = 0,
    VotingForTeam = 1,
    VotingExpedition = 2,
    TeamApproved = 3,
    TeamDenied = 4, //kanskje fjerne denne 
    MissionSuccess = 5,
    MissionFailed = 6,
    RoundEnded = -1
}

export default RoundStatus;
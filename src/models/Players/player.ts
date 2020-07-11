import PlayerRole from './playerRole';

export interface Player {
    id: string;
    name: string;
    role: PlayerRole;
    roleInfo: string;
    isEvil: boolean;
}

export class EmptyPlayer implements Player {
    id: string;
    name: string;
    role: PlayerRole;
    roleInfo: string;
    isEvil: boolean;

    constructor() {
        this.id = "";
        this.name = "";
        this.role = PlayerRole.NotYetChosen;
        this.roleInfo = "";
        this.isEvil = false;
    }
}
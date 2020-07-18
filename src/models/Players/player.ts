import PlayerRole from './playerRole';

export interface Player {
    id: string;
    name: string;
    roleId: PlayerRole;
    roleName: string;
    roleInfo: string;
    isEvil: boolean;
    order: number;
}

export class EmptyPlayer implements Player {
    id: string;
    name: string;
    roleId: PlayerRole;
    roleName: string;
    roleInfo: string;
    isEvil: boolean;
    order: number;

    constructor() {
        this.id = "";
        this.name = "";
        this.roleId = PlayerRole.NotYetChosen;
        this.roleName = "";
        this.roleInfo = "";
        this.isEvil = false;
        this.order = 0;
    }
}
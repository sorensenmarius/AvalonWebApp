export interface Player {
    id: string;
    name: string;
    role: string;
}

export class EmptyPlayer implements Player {
    id: string;
    name: string;
    role: string;

    constructor() {
        this.id = "";
        this.name = "";
        this.role = "";
    }
}
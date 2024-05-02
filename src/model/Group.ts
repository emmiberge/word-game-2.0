export enum Group{
    PINK,
    ORANGE,
    BLUE,
    YELLOW
}



export class GroupClass{
    public static readonly groupColorMap : Map<Group, string> = 
    new Map([
        [Group.PINK, "rgb(197, 162, 255)"],
        [Group.ORANGE, "rgb(246, 191, 74)"],
        [Group.BLUE, "rgb(113, 187, 240)"],
        [Group.YELLOW, "rgb(243, 225, 88)"]
    ]);
}
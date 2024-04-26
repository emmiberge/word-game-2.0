export enum Group{
    PINK,
    ORANGE,
    BLUE,
    YELLOW
}



export class GroupClass{
    public static readonly groupColorMap : Map<Group, string> = 
    new Map([
        [Group.PINK, "magenta"],
        [Group.ORANGE, "orange"],
        [Group.BLUE, "blue"],
        [Group.YELLOW, "yellow"]
    ]);
}
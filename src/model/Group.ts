export enum Group{
    YELLOW,
    PINK,
    PURPLE,
    BLUE,
    
}



export class GroupClass{
    public static readonly groupColorMap : Map<Group, string> = 
    new Map([
        [Group.YELLOW, "rgb(255, 248, 219)"],
        [Group.PINK, "rgb(255, 199, 237)"],
        [Group.PURPLE, "rgb(125, 138, 188)"],
        [Group.BLUE, "rgb(48, 68, 99)"],
        
    ]);
}
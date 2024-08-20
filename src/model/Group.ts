export enum Group{
    YELLOW,
    GREEN,
    ORANGE,
    BLUE,
    
}



export class GroupClass{
    public static readonly groupColorMap : Map<Group, string> = 
    new Map([
        [Group.YELLOW, "rgb(250, 240, 215)"],
        [Group.GREEN, "rgb(204, 238, 188)"],
        [Group.ORANGE, "rgb(255, 217, 192)"],
        [Group.BLUE, "rgb(140, 192, 222)"],
        
    ]);
}
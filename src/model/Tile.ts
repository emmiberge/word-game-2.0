import { Group } from "./Group";


// Represents a tile in the games grid
export class Tile {
    private word: string;
    private connection: string;
    private group: Group;
    private id: string;
    private isSelected: boolean;
    private isFound: boolean;
    private canBeSelected: boolean;



    constructor(w: string, c : string, g: Group, i: string){
        this.word = w;
        this.connection = c;
        this.group = g;
        this.id = i;
        this.isSelected = false;
        this.isFound = false;
        this.canBeSelected = true;
    }

    public getConnection(){
        return this.connection;
    }

    public getGroup(){
        return this.group;
    }

    public getCanBeSelected(){
        return this.canBeSelected;
    }

    public getId(){
        return this.id;
    }

    public getWord(){
        return this.word;
    }

    public getIsSelected(){
        return this.isSelected;
    }

    public getIsFound(){
        return this.isFound;
    }

    // Call to select this tile
    public select(){
        if(this.canBeSelected){
            this.isSelected = true;
            this.canBeSelected = false;
        }
        
    }

    // Call to unselect this tile
    public deselect(){
        if(this.isSelected){
            this.isSelected = false;
            this.canBeSelected = true;
        }
        
    }

    // Call when a tile is not to be selected ever again during this game
    public find(){
        this.lock();
        this.isSelected = false;
        this.isFound = true;
    }


    // Prevent this tile from being picked again (temporarily)
    public lock(){
        this.canBeSelected = false;
    }

    


}
import { Group } from "./Group";

export class Tile{
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
        //console.log("Called getIsFound");
        return this.isFound;
    }

    public select(){
        //console.log("Should select tile with id " + this.id);
        if(this.canBeSelected){
            console.log("Selected tile with id " + this.id);
            this.isSelected = true;
            this.canBeSelected = false;
        }
        
    }

    public deselect(){
        if(this.isSelected){
            this.isSelected = false;
            this.canBeSelected = true;
        }
        
    }

    public find(){
        this.canBeSelected = false;
        this.isSelected = false;
        this.isFound = true;
    }

    


}